<?php
// Contact form submission handler
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// reCAPTCHA verification
function verifyRecaptcha($recaptchaResponse) {
    $secretKey = 'YOUR_RECAPTCHA_SECRET_KEY'; // Replace with your actual secret key
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    
    $data = [
        'secret' => $secretKey,
        'response' => $recaptchaResponse,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        return false;
    }
    
    $responseData = json_decode($result, true);
    return $responseData['success'] === true;
}

try {
    // Get form data
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $company = isset($_POST['company']) ? trim($_POST['company']) : '';
    $challenge = isset($_POST['challenge']) ? trim($_POST['challenge']) : '';
    $industry = isset($_POST['industry']) ? trim($_POST['industry']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';
    $recaptchaResponse = isset($_POST['g-recaptcha-response']) ? $_POST['g-recaptcha-response'] : '';
    
    // Validate required fields
    if (empty($name) || empty($email) || empty($message)) {
        http_response_code(400);
        echo json_encode(['error' => 'Required fields are missing']);
        exit;
    }
    
    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid email address']);
        exit;
    }
    
    // Verify reCAPTCHA
    if (!verifyRecaptcha($recaptchaResponse)) {
        http_response_code(400);
        echo json_encode(['error' => 'reCAPTCHA verification failed']);
        exit;
    }
    
    // Prepare email content
    $to = 'chiel@zokratiq.com';
    $subject = 'New Contact Form Submission - Zokratiq Reality Exploration';
    
    // Create email body
    $emailBody = "New contact form submission from Zokratiq website:\n\n";
    $emailBody .= "Name: " . $name . "\n";
    $emailBody .= "Email: " . $email . "\n";
    $emailBody .= "Company: " . ($company ?: 'Not provided') . "\n";
    $emailBody .= "Primary Challenge: " . ($challenge ?: 'Not selected') . "\n";
    $emailBody .= "Industry: " . ($industry ?: 'Not selected') . "\n";
    $emailBody .= "Message:\n" . $message . "\n\n";
    $emailBody .= "Submission Time: " . date('Y-m-d H:i:s') . "\n";
    $emailBody .= "IP Address: " . $_SERVER['REMOTE_ADDR'] . "\n";
    
    // Email headers
    $headers = "From: noreply@zokratiq.com\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
    
    // Send email
    if (mail($to, $subject, $emailBody, $headers)) {
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
    } else {
        throw new Exception('Failed to send email');
    }
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => 'Internal server error']);
}
?>