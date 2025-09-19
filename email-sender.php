<?php
/**
 * Email Sender Class - Handles bulk email sending with proper queue management
 */
class EmailSender {
    private $pdo;
    private $dbPath;
    
    public function __construct($dbPath) {
        $this->dbPath = $dbPath;
        $this->pdo = new PDO("sqlite:$dbPath");
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    
    /**
     * Queue a campaign for sending
     */
    public function queueCampaign($campaignId) {
        try {
            // Get campaign details
            $stmt = $this->pdo->prepare("
                SELECT c.*, t.html_content, t.text_content 
                FROM email_campaigns c 
                JOIN email_templates t ON c.template_id = t.id 
                WHERE c.id = ?
            ");
            $stmt->execute([$campaignId]);
            $campaign = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$campaign) {
                throw new Exception("Campaign not found");
            }
            
            // Get active subscribers
            $stmt = $this->pdo->query("SELECT email FROM subscribers WHERE status = 'active'");
            $subscribers = $stmt->fetchAll(PDO::FETCH_COLUMN);
            
            if (empty($subscribers)) {
                throw new Exception("No active subscribers found");
            }
            
            // Update campaign status and recipient count
            $stmt = $this->pdo->prepare("
                UPDATE email_campaigns 
                SET status = 'sending', recipient_count = ?, updated_at = CURRENT_TIMESTAMP 
                WHERE id = ?
            ");
            $stmt->execute([count($subscribers), $campaignId]);
            
            // Queue individual emails
            $stmt = $this->pdo->prepare("
                INSERT INTO email_sends (campaign_id, subscriber_email, status) 
                VALUES (?, ?, 'pending')
            ");
            
            foreach ($subscribers as $email) {
                $stmt->execute([$campaignId, $email]);
            }
            
            return count($subscribers);
            
        } catch (Exception $e) {
            error_log("Failed to queue campaign: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Send a single email
     */
    public function sendSingleEmail($campaignId, $recipientEmail, $isTest = false) {
        try {
            // Get campaign and template data
            $stmt = $this->pdo->prepare("
                SELECT c.*, t.html_content, t.text_content 
                FROM email_campaigns c 
                JOIN email_templates t ON c.template_id = t.id 
                WHERE c.id = ?
            ");
            $stmt->execute([$campaignId]);
            $campaign = $stmt->fetch(PDO::FETCH_ASSOC);
            
            if (!$campaign) {
                throw new Exception("Campaign not found");
            }
            
            // Prepare email content
            $subject = $isTest ? "[TEST] " . $campaign['subject'] : $campaign['subject'];
            $htmlContent = $this->processTemplate($campaign['html_content'], $campaignId, $recipientEmail);
            $textContent = $this->processTemplate($campaign['text_content'], $campaignId, $recipientEmail);
            
            // Send email using PHP mail (you can replace this with PHPMailer, SMTP, etc.)
            $success = $this->mailSend(
                $recipientEmail,
                $subject,
                $htmlContent,
                $textContent,
                $campaign['from_email'],
                $campaign['from_name']
            );
            
            if (!$isTest) {
                // Update send record
                $status = $success ? 'sent' : 'failed';
                $stmt = $this->pdo->prepare("
                    UPDATE email_sends 
                    SET status = ?, sent_at = CURRENT_TIMESTAMP, error_message = ?
                    WHERE campaign_id = ? AND subscriber_email = ?
                ");
                $stmt->execute([
                    $status,
                    $success ? null : 'Mail send failed',
                    $campaignId,
                    $recipientEmail
                ]);
                
                // Update campaign counters
                if ($success) {
                    $this->pdo->prepare("UPDATE email_campaigns SET sent_count = sent_count + 1 WHERE id = ?")->execute([$campaignId]);
                } else {
                    $this->pdo->prepare("UPDATE email_campaigns SET failed_count = failed_count + 1 WHERE id = ?")->execute([$campaignId]);
                }
            }
            
            return $success;
            
        } catch (Exception $e) {
            error_log("Failed to send email: " . $e->getMessage());
            return false;
        }
    }
    
    /**
     * Process email template with merge tags
     */
    private function processTemplate($content, $campaignId, $recipientEmail) {
        // Basic merge tags
        $merges = [
            '{{campaign_id}}' => $campaignId,
            '{{subscriber_email}}' => $recipientEmail,
            '{{unsubscribe_url}}' => "https://zokratiq.com/unsubscribe?email=" . urlencode($recipientEmail),
            '{{view_in_browser_url}}' => "https://zokratiq.com/email-view?campaign=" . $campaignId,
            '{{manage_prefs_url}}' => "https://zokratiq.com/manage-preferences?email=" . urlencode($recipientEmail),
            '{{year}}' => date('Y'),
            '{{sender_address_line_1}}' => 'Zokratiq Labs',
            '{{sender_city}}' => 'Global',
            '{{sender_country}}' => 'Remote',
        ];
        
        return str_replace(array_keys($merges), array_values($merges), $content);
    }
    
    /**
     * Send email using PHP mail function
     * You can replace this with PHPMailer, SendGrid, etc.
     */
    private function mailSend($to, $subject, $htmlContent, $textContent, $fromEmail, $fromName) {
        // Create a boundary for multipart email
        $boundary = md5(time());
        
        // Headers
        $headers = [
            "From: $fromName <$fromEmail>",
            "Reply-To: $fromEmail",
            "MIME-Version: 1.0",
            "Content-Type: multipart/alternative; boundary=\"$boundary\"",
            "X-Mailer: Zokratiq Email Service"
        ];
        
        // Email body
        $body = "--$boundary\r\n";
        $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $body .= $textContent . "\r\n\r\n";
        
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: text/html; charset=UTF-8\r\n";
        $body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $body .= $htmlContent . "\r\n\r\n";
        
        $body .= "--$boundary--";
        
        return mail($to, $subject, $body, implode("\r\n", $headers));
    }
    
    /**
     * Process email queue (run via cron job)
     */
    public function processQueue($batchSize = 10) {
        try {
            // Get pending emails
            $stmt = $this->pdo->prepare("
                SELECT es.*, c.name as campaign_name 
                FROM email_sends es
                JOIN email_campaigns c ON es.campaign_id = c.id
                WHERE es.status = 'pending'
                ORDER BY es.created_at ASC
                LIMIT ?
            ");
            $stmt->execute([$batchSize]);
            $emails = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $processed = 0;
            foreach ($emails as $email) {
                $success = $this->sendSingleEmail($email['campaign_id'], $email['subscriber_email']);
                $processed++;
                
                // Small delay to avoid overwhelming the mail server
                usleep(100000); // 0.1 second
            }
            
            // Update campaign status if all emails are processed
            $this->updateCampaignStatus();
            
            return $processed;
            
        } catch (Exception $e) {
            error_log("Failed to process email queue: " . $e->getMessage());
            return 0;
        }
    }
    
    /**
     * Update campaign status based on send completion
     */
    private function updateCampaignStatus() {
        $stmt = $this->pdo->query("
            UPDATE email_campaigns 
            SET status = 'sent', sent_at = CURRENT_TIMESTAMP 
            WHERE status = 'sending' 
            AND id NOT IN (
                SELECT DISTINCT campaign_id 
                FROM email_sends 
                WHERE status = 'pending'
            )
        ");
    }
    
    /**
     * Get campaign statistics
     */
    public function getCampaignStats($campaignId) {
        $stmt = $this->pdo->prepare("
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as sent,
                SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed,
                SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN opened_at IS NOT NULL THEN 1 ELSE 0 END) as opened,
                SUM(CASE WHEN clicked_at IS NOT NULL THEN 1 ELSE 0 END) as clicked
            FROM email_sends 
            WHERE campaign_id = ?
        ");
        $stmt->execute([$campaignId]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}

// Command line usage for queue processing
if (php_sapi_name() === 'cli' && basename(__FILE__) === basename($argv[0])) {
    $dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';
    $sender = new EmailSender($dbPath);
    
    $processed = $sender->processQueue(10);
    echo "Processed $processed emails\n";
}
?>