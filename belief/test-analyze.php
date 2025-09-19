<?php
// Test the analyzer directly
require_once 'analyze.php';

// Create test data
$testData = [
    'company' => 'Test Company',
    'sector' => 'B2B SaaS',
    'role' => 'Founder',
    'score' => 45,
    'band' => 'Emerging',
    'dimensions' => [
        'Coherence' => 40,
        'Resonance' => 50, 
        'Proof' => 30,
        'Talent Signal' => 60,
        'Rituals' => 35,
        'Narrative–Market Fit' => 55
    ]
];

// Create analyzer instance and test
$analyst = new BeliefCapitalAnalyst();
$result = $analyst->analyze($testData);

// Pretty print the result
echo json_encode($result, JSON_PRETTY_PRINT);
?>