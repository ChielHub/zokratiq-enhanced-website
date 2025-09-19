<?php
header('Content-Type: text/plain');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo 'Method not allowed';
    exit;
}

if (!isset($_FILES['heroImage']) || $_FILES['heroImage']['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo 'No file uploaded or upload error';
    exit;
}

$file = $_FILES['heroImage'];
$allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];

// Check file type
if (!in_array($file['type'], $allowedTypes)) {
    http_response_code(400);
    echo 'Invalid file type. Please upload an image file.';
    exit;
}

// Check file size (limit to 10MB)
$maxSize = 10 * 1024 * 1024;
if ($file['size'] > $maxSize) {
    http_response_code(400);
    echo 'File too large. Maximum size is 10MB.';
    exit;
}

$uploadDir = __DIR__ . '/';
$targetFile = $uploadDir . 'hero-image.jpeg';

// Move the uploaded file
if (move_uploaded_file($file['tmp_name'], $targetFile)) {
    // Set proper permissions
    chmod($targetFile, 0644);
    echo 'Hero image uploaded successfully';
} else {
    http_response_code(500);
    echo 'Failed to save uploaded file';
}
?>