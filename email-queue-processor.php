#!/usr/bin/env php
<?php
/**
 * Email Queue Processor - Run via cron job
 * 
 * Add this to crontab to process emails every minute:
 * * * * * * /usr/bin/php /var/www/html/zokratiq.com/email-queue-processor.php >> /var/log/email-queue.log 2>&1
 */

require_once '/var/www/html/zokratiq.com/email-sender.php';

$dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';

try {
    $sender = new EmailSender($dbPath);
    $processed = $sender->processQueue(10); // Process 10 emails per run
    
    if ($processed > 0) {
        echo "[" . date('Y-m-d H:i:s') . "] Processed $processed emails\n";
    }
    
} catch (Exception $e) {
    echo "[" . date('Y-m-d H:i:s') . "] ERROR: " . $e->getMessage() . "\n";
}
?>