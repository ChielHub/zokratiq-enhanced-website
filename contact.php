<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

try {
    // Get JSON input
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    // Validate required fields
    if (!isset($data['name']) || !isset($data['email']) || !isset($data['message'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Name, email, and message are required']);
        exit();
    }
    
    $name = htmlspecialchars($data['name']);
    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);
    $company = isset($data['company']) ? htmlspecialchars($data['company']) : '';
    $industry = isset($data['industry']) ? htmlspecialchars($data['industry']) : '';
    $challenge = isset($data['challenge']) ? htmlspecialchars($data['challenge']) : '';
    $message = htmlspecialchars($data['message']);
    
    if (!$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }
    
    // Create email content
    $subject = "New Contact Form Submission from {$name}" . ($company ? " ({$company})" : '');
    
    $emailBody = '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Contact Form Submission</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
    <div style="background: linear-gradient(135deg, #00B3A6, #4ADFD6); padding: 30px; border-radius: 8px; margin-bottom: 30px;">
        <h1 style="color: white; margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Submission</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">From the Zokratiq website</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
        <div style="margin-bottom: 25px;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Contact Information</h3>
            <p style="margin: 5px 0; color: #374151;"><strong>Name:</strong> ' . $name . '</p>
            <p style="margin: 5px 0; color: #374151;"><strong>Email:</strong> <a href="mailto:' . $email . '" style="color: #00B3A6;">' . $email . '</a></p>';
            
    if ($company) {
        $emailBody .= '<p style="margin: 5px 0; color: #374151;"><strong>Company:</strong> ' . $company . '</p>';
    }
    if ($industry) {
        $emailBody .= '<p style="margin: 5px 0; color: #374151;"><strong>Industry:</strong> ' . $industry . '</p>';
    }
    if ($challenge) {
        $emailBody .= '<p style="margin: 5px 0; color: #374151;"><strong>Primary Challenge:</strong> ' . $challenge . '</p>';
    }
    
    $emailBody .= '
        </div>
        
        <div>
            <h3 style="color: #1f2937; margin: 0 0 10px 0; font-size: 16px; font-weight: 600;">Message</h3>
            <div style="background: #f9fafb; padding: 20px; border-radius: 6px; border-left: 4px solid #00B3A6;">
                <p style="margin: 0; color: #374151; line-height: 1.6;">' . nl2br($message) . '</p>
            </div>
        </div>
    </div>
    
    <div style="margin-top: 20px; padding: 15px; background: rgba(0,179,166,0.1); border-radius: 6px;">
        <p style="margin: 0; font-size: 14px; color: #6b7280; text-align: center;">
            Submitted on ' . date('F j, Y \a\t g:i A') . ' UTC
        </p>
    </div>
</body>
</html>';
    
    // Send email to hello@zokratiq.com
    $to = 'hello@zokratiq.com';
    $headers = array(
        'MIME-Version' => '1.0',
        'Content-type' => 'text/html; charset=UTF-8',
        'From' => $email,
        'Reply-To' => $email,
        'X-Mailer' => 'PHP/' . phpversion()
    );
    
    // Create a comprehensive log entry
    $logEntry = [
        'timestamp' => date('c'),
        'name' => $name,
        'email' => $email,
        'company' => $company,
        'industry' => $industry,
        'challenge' => $challenge,
        'subject' => $subject,
        'message' => $message,
        'ip' => $_SERVER['REMOTE_ADDR'] ?? 'unknown'
    ];
    
    // Log the submission to a file for manual review
    $logFile = '/var/log/zokratiq_contact_forms.log';
    $logContent = date('Y-m-d H:i:s') . " - NEW CONTACT FORM SUBMISSION\n";
    $logContent .= "Email: " . $email . "\n";
    $logContent .= "Name: " . $name . "\n";
    $logContent .= "Company: " . $company . "\n";
    $logContent .= "Industry: " . $industry . "\n";
    $logContent .= "Challenge: " . $challenge . "\n";
    $logContent .= "Subject: " . $subject . "\n";
    $logContent .= "Message: " . $message . "\n";
    $logContent .= "IP: " . ($logEntry['ip']) . "\n";
    $logContent .= str_repeat('-', 80) . "\n\n";
    
    // Try to log to file (create if doesn't exist)
    $logged = @file_put_contents($logFile, $logContent, FILE_APPEND | LOCK_EX);
    
    // Try to send email using mail() function
    $mailSent = @mail($to, $subject, $emailBody, implode("\r\n", array_map(
        function($k, $v) { return "$k: $v"; },
        array_keys($headers),
        $headers
    )));
    
    if ($mailSent) {
        // Email sent successfully
        error_log('Contact form email sent successfully to hello@zokratiq.com: ' . json_encode($logEntry));
        
        echo json_encode([
            'success' => true,
            'message' => 'Message sent successfully! We\'ll get back to you soon.'
        ]);
    } else if ($logged) {
        // Email failed but logged successfully - still consider it a success for user experience
        error_log('Contact form email failed but logged successfully: ' . json_encode($logEntry));
        
        echo json_encode([
            'success' => true,
            'message' => 'Message received! We\'ll get back to you soon.'
        ]);
    } else {
        // Both email and logging failed
        error_log('Contact form: both email and logging failed: ' . json_encode($logEntry));
        
        throw new Exception('Failed to send message. Please try again or contact us directly at hello@zokratiq.com');
    }
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    
    // Log the submission even if email fails
    error_log('Contact form submission (email failed): ' . json_encode([
        'error' => $e->getMessage(),
        'data' => $data ?? [],
        'timestamp' => date('c')
    ]));
    
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to send message. Please try again or contact hello@zokratiq.com directly.'
    ]);
}
?>