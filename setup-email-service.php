<?php
/**
 * Setup script for Email Service
 * Run this once to initialize the database with email service tables
 */

session_start();

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    die("Access denied. Please log in as admin.");
}

$dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';
$schemaPath = '/var/www/html/zokratiq.com/email-service-schema.sql';

echo "<h1>Email Service Setup</h1>";
echo "<p>Setting up email service database...</p>";

try {
    // Create database connection
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Read and execute schema
    if (!file_exists($schemaPath)) {
        throw new Exception("Schema file not found: $schemaPath");
    }
    
    $schema = file_get_contents($schemaPath);
    $pdo->exec($schema);
    
    // Load The Signal template if it exists
    $htmlPath = '/var/www/html/zokratiq.com/out/the-signal-template.html';
    $textPath = '/var/www/html/zokratiq.com/out/the-signal-template-plain.txt';
    
    if (file_exists($htmlPath) && file_exists($textPath)) {
        $htmlContent = file_get_contents($htmlPath);
        $textContent = file_get_contents($textPath);
        
        $stmt = $pdo->prepare("UPDATE email_templates SET html_content = ?, text_content = ?, updated_at = CURRENT_TIMESTAMP WHERE name = 'The Signal Newsletter'");
        $stmt->execute([$htmlContent, $textContent]);
        
        echo "<p>✅ The Signal template loaded successfully!</p>";
    }
    
    echo "<p>✅ Email service database setup complete!</p>";
    echo "<p><a href='email-service.php' style='background: #00B3A6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;'>Go to Email Service</a></p>";
    echo "<p><a href='admin-dashboard.php'>Back to Dashboard</a></p>";
    
} catch (Exception $e) {
    echo "<p style='color: red;'>❌ Setup failed: " . htmlspecialchars($e->getMessage()) . "</p>";
    echo "<p><a href='admin-dashboard.php'>Back to Dashboard</a></p>";
}
?>