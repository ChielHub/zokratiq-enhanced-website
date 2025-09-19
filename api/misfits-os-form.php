<?php
/**
 * Misfits OS Form Handler
 * Processes lead capture form submissions for the Misfits OS Blueprint
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Only accept POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input or form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

// Validate required fields
$required_fields = ['email', 'company', 'role'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode([
        'error' => 'Missing required fields',
        'missing_fields' => $missing_fields
    ]);
    exit;
}

// Sanitize inputs
$email = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
$company = trim($input['company']);
$role = trim($input['role']);
$challenge = isset($input['challenge']) ? trim($input['challenge']) : '';

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

// Calculate lead score
$lead_score = 0;

// Email domain scoring
if (strpos($email, '@gmail.com') !== false ||
    strpos($email, '@yahoo.com') !== false ||
    strpos($email, '@hotmail.com') !== false) {
    $lead_score += 5; // Personal email
} else {
    $lead_score += 15; // Business email
}

// Role scoring
$role_scores = [
    'founder-ceo' => 30,
    'vp-strategy' => 25,
    'vp-product' => 20,
    'vp-people' => 20,
    'innovation-lead' => 25,
    'other' => 10
];

$lead_score += isset($role_scores[$role]) ? $role_scores[$role] : 10;

// Challenge scoring (indicates pain awareness)
if (!empty($challenge) && $challenge !== 'other') {
    $lead_score += 10;
}

// Database connection
$dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create misfits_os_leads table if it doesn't exist
    $pdo->exec("
        CREATE TABLE IF NOT EXISTS misfits_os_leads (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT NOT NULL,
            company TEXT NOT NULL,
            role TEXT NOT NULL,
            challenge TEXT,
            lead_score INTEGER DEFAULT 0,
            source TEXT DEFAULT 'misfits-os-landing',
            utm_source TEXT,
            utm_medium TEXT,
            utm_campaign TEXT,
            referrer TEXT,
            user_agent TEXT,
            ip_address TEXT,
            status TEXT DEFAULT 'new',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(email)
        )
    ");

    // Collect tracking data
    $utm_source = isset($_GET['utm_source']) ? trim($_GET['utm_source']) : '';
    $utm_medium = isset($_GET['utm_medium']) ? trim($_GET['utm_medium']) : '';
    $utm_campaign = isset($_GET['utm_campaign']) ? trim($_GET['utm_campaign']) : '';
    $referrer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : '';
    $user_agent = isset($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : '';
    $ip_address = $_SERVER['REMOTE_ADDR'] ?? '';

    // Insert or update lead
    $stmt = $pdo->prepare("
        INSERT OR REPLACE INTO misfits_os_leads
        (email, company, role, challenge, lead_score, utm_source, utm_medium, utm_campaign, referrer, user_agent, ip_address, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    ");

    $stmt->execute([
        $email, $company, $role, $challenge, $lead_score,
        $utm_source, $utm_medium, $utm_campaign, $referrer, $user_agent, $ip_address
    ]);

    // Also add to main subscribers table for email campaigns
    $stmt2 = $pdo->prepare("
        INSERT OR IGNORE INTO subscribers (email, status, utm_source, referrer)
        VALUES (?, 'active', ?, ?)
    ");
    $stmt2->execute([$email, 'misfits-os-' . $utm_source, $referrer]);

    // Log successful submission
    $log_entry = date('Y-m-d H:i:s') . " - Misfits OS Lead: {$email} from {$company} ({$role}) - Score: {$lead_score}\n";
    file_put_contents('/var/www/html/zokratiq.com/logs/misfits-os-leads.log', $log_entry, FILE_APPEND | LOCK_EX);

    // Prepare success response
    $response = [
        'success' => true,
        'message' => 'Thank you! Your Misfits OS Blueprint is being prepared.',
        'lead_score' => $lead_score,
        'redirect_url' => '/misfits-os/thanks?email=' . urlencode($email)
    ];

    // Trigger email if we have email service configured
    $email_settings = [];
    $settings_stmt = $pdo->query("SELECT setting_key, setting_value FROM email_settings");
    while ($row = $settings_stmt->fetch(PDO::FETCH_ASSOC)) {
        $email_settings[$row['setting_key']] = $row['setting_value'];
    }

    // If email is configured, send welcome email
    if (!empty($email_settings['smtp_host']) && !empty($email_settings['from_email'])) {
        // Here you would trigger the email sending
        // For now, just log that email should be sent
        $email_log = date('Y-m-d H:i:s') . " - Should send Misfits OS welcome email to: {$email}\n";
        file_put_contents('/var/www/html/zokratiq.com/logs/email-queue.log', $email_log, FILE_APPEND | LOCK_EX);
    }

    echo json_encode($response);

} catch (PDOException $e) {
    error_log("Misfits OS form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Database error occurred']);
} catch (Exception $e) {
    error_log("Misfits OS form error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'An error occurred']);
}
?>