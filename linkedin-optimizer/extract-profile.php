<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

function extractLinkedInProfile($url) {
    // Validate LinkedIn URL
    if (!preg_match('/linkedin\.com\/in\//', $url)) {
        return ['error' => 'Invalid LinkedIn profile URL'];
    }
    
    // Initialize cURL
    $ch = curl_init();
    
    // Set cURL options to mimic a real browser
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_USERAGENT => 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        CURLOPT_HTTPHEADER => [
            'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language: en-US,en;q=0.5',
            'Accept-Encoding: gzip, deflate, br',
            'Connection: keep-alive',
            'Upgrade-Insecure-Requests: 1',
        ]
    ]);
    
    $html = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 || !$html) {
        return ['error' => 'Unable to fetch profile. Make sure your LinkedIn profile is public.'];
    }
    
    // Parse HTML to extract profile data
    $headline = '';
    $bio = '';
    
    // Extract headline - LinkedIn uses various selectors
    if (preg_match('/<h1[^>]*class="[^"]*text-heading-xlarge[^"]*"[^>]*>(.*?)<\/h1>/s', $html, $matches)) {
        $headline = strip_tags(trim($matches[1]));
    } elseif (preg_match('/<h1[^>]*>(.*?)<\/h1>/s', $html, $matches)) {
        $headline = strip_tags(trim($matches[1]));
    }
    
    // Extract bio/about section - LinkedIn uses various selectors
    if (preg_match('/<div[^>]*class="[^"]*pv-about__summary-text[^"]*"[^>]*>(.*?)<\/div>/s', $html, $matches)) {
        $bio = strip_tags(trim($matches[1]));
    } elseif (preg_match('/<section[^>]*id="about"[^>]*>.*?<div[^>]*class="[^"]*display-flex[^"]*"[^>]*>(.*?)<\/div>/s', $html, $matches)) {
        $bio = strip_tags(trim($matches[1]));
    }
    
    // Clean up extracted text
    $headline = preg_replace('/\s+/', ' ', $headline);
    $bio = preg_replace('/\s+/', ' ', $bio);
    
    // If we couldn't extract data, return error
    if (empty($headline) && empty($bio)) {
        return ['error' => 'Could not extract profile data. Your profile might be private or have restricted access.'];
    }
    
    return [
        'success' => true,
        'headline' => $headline ?: 'Headline not found',
        'bio' => $bio ?: 'Bio/About section not found or empty'
    ];
}

// Handle the request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $url = $input['url'] ?? '';
    
    if (empty($url)) {
        echo json_encode(['error' => 'URL is required']);
        exit;
    }
    
    $result = extractLinkedInProfile($url);
    echo json_encode($result);
} else {
    echo json_encode(['error' => 'Only POST requests allowed']);
}
?>