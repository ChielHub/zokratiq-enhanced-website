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
    if (!isset($data['email'])) {
        http_response_code(400);
        echo json_encode(['error' => 'Email is required']);
        exit();
    }

    $email = filter_var($data['email'], FILTER_VALIDATE_EMAIL);

    if (!$email) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email format']);
        exit();
    }

    // Database connection
    $dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Check if email already exists
    $stmt = $pdo->prepare("SELECT id, status FROM subscribers WHERE email = ?");
    $stmt->execute([$email]);
    $existingSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($existingSubscriber) {
        if ($existingSubscriber['status'] === 'active') {
            echo json_encode([
                'success' => true,
                'message' => 'You\'re already subscribed to our dispatches!'
            ]);
            exit();
        }
    }

    // Add to subscribers table
    if ($existingSubscriber) {
        // Reactivate existing subscriber
        $stmt = $pdo->prepare("UPDATE subscribers SET status = 'active', activatedAt = CURRENT_TIMESTAMP, utm_source = ?, referrer = ? WHERE email = ?");
        $stmt->execute(['cracks-landing', $_SERVER['HTTP_REFERER'] ?? 'direct', $email]);
    } else {
        // Add new subscriber
        $stmt = $pdo->prepare("INSERT INTO subscribers (email, status, utm_source, referrer, activatedAt) VALUES (?, 'active', ?, ?, CURRENT_TIMESTAMP)");
        $stmt->execute([$email, 'cracks-landing', $_SERVER['HTTP_REFERER'] ?? 'direct']);
    }

    // Create or update Cracks email template if it doesn't exist
    $cracksTemplate = [
        'name' => 'Cracks in the System Welcome',
        'subject' => 'Welcome to Cracks in the System - Your First Dispatch',
        'html_content' => '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Welcome to Cracks in the System</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1f2937;">
    <div style="background: linear-gradient(135deg, #00B3A6, #4ADFD6); padding: 40px; border-radius: 12px; margin-bottom: 30px; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to the Reality Explorers</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 18px;">You\'re now part of our growing community</p>
    </div>

    <div style="background: #374151; padding: 30px; border-radius: 12px; margin-bottom: 30px;">
        <h2 style="color: #00B3A6; margin: 0 0 20px 0; font-size: 24px; font-weight: 600;">Dispatch #1: The Great Resignation</h2>

        <div style="background: #4b5563; padding: 25px; border-radius: 8px; border-left: 4px solid #00B3A6; margin-bottom: 25px;">
            <h3 style="color: white; margin: 0 0 15px 0; font-size: 18px;">Why employees ghost their work</h3>
            <p style="color: #d1d5db; line-height: 1.6; margin: 0 0 15px 0;">
                50% say their job is meaningless. But this isn\'t laziness — it\'s a hunger for meaning.
            </p>
            <p style="color: #d1d5db; line-height: 1.6; margin: 0;">
                People aren\'t quitting because they\'re weak. They\'re quitting because the story broke.
                In a world drained of myth, sense-making becomes the new salary.
            </p>
        </div>

        <blockquote style="color: #00B3A6; font-size: 20px; font-style: italic; text-align: center; margin: 25px 0; padding: 20px; border-left: 4px solid #00B3A6; background: rgba(0,179,166,0.1);">
            "I want to matter, not just clock in."
        </blockquote>

        <div style="background: #4b5563; padding: 20px; border-radius: 8px; margin-top: 25px;">
            <h4 style="color: #00B3A6; margin: 0 0 15px 0; font-size: 16px; font-weight: 600;">🎁 Bonus: Fault Line Map</h4>
            <p style="color: #d1d5db; margin: 0; font-size: 14px; line-height: 1.5;">
                Your complimentary visual guide to all six fault lines. Perfect for sharing
                with your team or keeping on your desk as a reminder of what\'s really happening beneath the surface.
            </p>
        </div>
    </div>

    <div style="background: #374151; padding: 25px; border-radius: 12px; margin-bottom: 30px;">
        <h3 style="color: white; margin: 0 0 15px 0; font-size: 18px;">What\'s Next?</h3>
        <div style="color: #d1d5db; line-height: 1.6;">
            <p style="margin: 0 0 10px 0;">📅 <strong>Next week:</strong> Dispatch #2 - "The Great Stagnation"</p>
            <p style="margin: 0 0 10px 0;">📧 <strong>Frequency:</strong> One dispatch per week for 6 weeks</p>
            <p style="margin: 0;">🎯 <strong>After the series:</strong> Exclusive invitation to try our Reality Lens Scan</p>
        </div>
    </div>

    <div style="text-align: center; padding: 20px;">
        <p style="color: #9ca3af; font-size: 14px; margin: 0 0 15px 0;">
            You\'re now part of 1,500+ curious operators reframing their lens on work.
        </p>
        <a href="https://zokratiq.com/labs" style="display: inline-block; background: #00B3A6; color: white; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; margin: 10px;">
            Explore Zokratiq Labs →
        </a>
    </div>

    <div style="margin-top: 30px; padding: 20px; background: rgba(0,179,166,0.1); border-radius: 8px; text-align: center;">
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
            Dispatched from Zokratiq HQ | <a href="https://zokratiq.com" style="color: #00B3A6;">zokratiq.com</a>
        </p>
    </div>
</body>
</html>',
        'text_content' => 'Welcome to the Reality Explorers

You\'re now part of our growing community of curious operators.

DISPATCH #1: THE GREAT RESIGNATION
Why employees ghost their work

50% say their job is meaningless. But this isn\'t laziness — it\'s a hunger for meaning.

People aren\'t quitting because they\'re weak. They\'re quitting because the story broke. In a world drained of myth, sense-making becomes the new salary.

"I want to matter, not just clock in."

BONUS: Fault Line Map
Your complimentary visual guide to all six fault lines. Perfect for sharing with your team.

WHAT\'S NEXT?
📅 Next week: Dispatch #2 - "The Great Stagnation"
📧 Frequency: One dispatch per week for 6 weeks
🎯 After the series: Exclusive invitation to try our Reality Lens Scan

You\'re now part of 1,500+ curious operators reframing their lens on work.

Explore Zokratiq Labs: https://zokratiq.com/labs

Dispatched from Zokratiq HQ | zokratiq.com',
        'template_type' => 'newsletter'
    ];

    // Insert or update template
    $stmt = $pdo->prepare("INSERT OR REPLACE INTO email_templates (name, subject, html_content, text_content, template_type) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([
        $cracksTemplate['name'],
        $cracksTemplate['subject'],
        $cracksTemplate['html_content'],
        $cracksTemplate['text_content'],
        $cracksTemplate['template_type']
    ]);

    // Send welcome email to subscriber
    $subject = $cracksTemplate['subject'];
    $headers = [
        "From: Zokratiq <hello@zokratiq.com>",
        "Reply-To: hello@zokratiq.com",
        "MIME-Version: 1.0",
        "Content-Type: text/html; charset=UTF-8"
    ];

    mail($email, $subject, $cracksTemplate['html_content'], implode("\r\n", $headers));

    // Send notification to admin
    $adminSubject = "New Cracks in the System Signup: " . $email;
    $adminBody = "New signup for Cracks in the System newsletter:\n\n";
    $adminBody .= "Email: " . $email . "\n";
    $adminBody .= "Source: cracks-landing\n";
    $adminBody .= "Time: " . date('Y-m-d H:i:s') . "\n";
    $adminBody .= "User Agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . "\n";
    $adminBody .= "Referrer: " . ($_SERVER['HTTP_REFERER'] ?? 'direct') . "\n\n";
    $adminBody .= "View dashboard: https://zokratiq.com/admin-dashboard.php";

    mail('hello@zokratiq.com', $adminSubject, $adminBody, "From: Zokratiq System <hello@zokratiq.com>");

    // Log the signup
    error_log('Cracks newsletter signup: ' . json_encode([
        'email' => $email,
        'timestamp' => date('c'),
        'source' => 'cracks-landing',
        'user_agent' => $_SERVER['HTTP_USER_AGENT'] ?? 'unknown'
    ]));

    echo json_encode([
        'success' => true,
        'message' => 'Successfully signed up for Cracks in the System dispatches!'
    ]);

} catch (Exception $e) {
    error_log('Cracks signup error: ' . $e->getMessage());

    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to sign up. Please try again or contact hello@zokratiq.com directly.'
    ]);
}
?>