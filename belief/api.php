<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Scoring model constants
const WEIGHTS = [
    'Coherence' => 2,
    'Resonance' => 2, 
    'Proof' => 2,
    'Talent Signal' => 1.5,
    'Rituals' => 1.5,
    'Narrative–Market Fit' => 1
];

// Question to dimension mapping
const QUESTION_MAPPING = [
    'question-1' => 'Coherence',          // prospects understand what you stand for
    'question-2' => 'Coherence',          // team can articulate beliefs
    'question-3' => 'Resonance',          // marketing leads with values
    'question-4' => 'Proof',              // premium price acceptance
    'question-5' => 'Talent Signal',      // attract worldview-aligned talent
    'question-6' => 'Narrative–Market Fit' // decisions guided by principles
];

function calculateBeliefScore($responses) {
    // Initialize dimension scores
    $dimensionScores = [];
    $dimensionCounts = [];
    
    foreach (WEIGHTS as $dimension => $weight) {
        $dimensionScores[$dimension] = 0;
        $dimensionCounts[$dimension] = 0;
    }
    
    // Aggregate responses by dimension
    foreach ($responses as $question => $score) {
        if (isset(QUESTION_MAPPING[$question])) {
            $dimension = QUESTION_MAPPING[$question];
            $dimensionScores[$dimension] += ($score - 1); // Convert 1-5 to 0-4
            $dimensionCounts[$dimension]++;
        }
    }
    
    // Calculate weighted average for each dimension
    $finalDimensionScores = [];
    $totalWeightedScore = 0;
    $totalMaxScore = 0;
    
    foreach (WEIGHTS as $dimension => $weight) {
        if ($dimensionCounts[$dimension] > 0) {
            $avgScore = $dimensionScores[$dimension] / $dimensionCounts[$dimension];
            $dimensionPercentage = round(($avgScore / 4) * 100); // Convert to 0-100
            $finalDimensionScores[$dimension] = $dimensionPercentage;
            
            $totalWeightedScore += $avgScore * $weight;
            $totalMaxScore += 4 * $weight;
        } else {
            $finalDimensionScores[$dimension] = 0;
        }
    }
    
    // Calculate overall score
    $overallScore = $totalMaxScore > 0 ? round(($totalWeightedScore / $totalMaxScore) * 100) : 0;
    
    return [
        'score' => $overallScore,
        'dimensions' => $finalDimensionScores
    ];
}

function getBand($score) {
    if ($score < 25) return 'Latent';
    if ($score < 50) return 'Emerging';  
    if ($score < 75) return 'Coalescing';
    return 'Compelling';
}

function generateInsights($score, $band, $dimensions) {
    $insights = [];
    
    // Overall assessment
    switch ($band) {
        case 'Compelling':
            $insights['overall'] = "Excellent belief capital foundation. Your narrative engine is market-ready.";
            break;
        case 'Coalescing':
            $insights['overall'] = "Strong belief capital that needs proof points and consistent rituals.";
            break;
        case 'Emerging':
            $insights['overall'] = "Belief fragments exist but need greater coherence and market resonance.";
            break;
        default:
            $insights['overall'] = "Raw belief signal that needs significant development and articulation.";
    }
    
    // Find strengths and gaps
    arsort($dimensions);
    $strengths = array_slice($dimensions, 0, 2, true);
    $gaps = array_slice(array_reverse($dimensions, true), 0, 2, true);
    
    $insights['strengths'] = $strengths;
    $insights['gaps'] = $gaps;
    
    return $insights;
}

// Handle the request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['responses'])) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }
    
    $responses = $input['responses'];
    $company = $input['company'] ?? 'Your Organization';
    $role = $input['role'] ?? '';
    $sector = $input['sector'] ?? '';
    
    // Calculate scores
    $result = calculateBeliefScore($responses);
    $band = getBand($result['score']);
    $insights = generateInsights($result['score'], $band, $result['dimensions']);
    
    // Return results
    echo json_encode([
        'success' => true,
        'score' => $result['score'],
        'band' => $band,
        'dimensions' => $result['dimensions'],
        'insights' => $insights,
        'company' => $company,
        'role' => $role,
        'sector' => $sector
    ]);
    
} else {
    echo json_encode(['error' => 'Only POST requests allowed']);
}
?>