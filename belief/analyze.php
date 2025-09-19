<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

class BeliefCapitalAnalyst {
    
    private $dimensionInsights = [
        'Coherence' => [
            'high' => 'Your internal story is aligned—teams speak the same language about your mission.',
            'mid' => 'Some story alignment exists, but gaps appear between departments and leadership.',
            'low' => 'Your story fragments across teams—each group tells a different version of your mission.'
        ],
        'Resonance' => [
            'high' => 'Your market feels your beliefs—prospects connect before they understand your product.',
            'mid' => 'Some market resonance exists, but your beliefs don\'t consistently drive buying decisions.',
            'low' => 'Your market sees features, not beliefs—you\'re competing on specs, not story.'
        ],
        'Proof' => [
            'high' => 'You have compelling evidence that your beliefs create real results.',
            'mid' => 'Some proof exists, but it\'s scattered and not systematically leveraged.',
            'low' => 'You lack credible evidence that your beliefs translate to outcomes.'
        ],
        'Talent Signal' => [
            'high' => 'You attract talent who choose you for worldview, not just compensation.',
            'mid' => 'Some belief-aligned talent finds you, but it\'s not your primary recruiting advantage.',
            'low' => 'You compete on traditional benefits—mission doesn\'t drive talent acquisition.'
        ],
        'Rituals' => [
            'high' => 'Your daily practices consistently embody and reinforce your core beliefs.',
            'mid' => 'Some belief-driven practices exist, but they\'re inconsistent or siloed.',
            'low' => 'Your operations don\'t reflect your stated beliefs—disconnect between talk and action.'
        ],
        'Narrative–Market Fit' => [
            'high' => 'Your story creates clear differentiation within your category.',
            'mid' => 'Your story has some unique elements, but category clarity needs sharpening.',
            'low' => 'Your story blends into category noise—unclear why you vs. alternatives.'
        ]
    ];

    private $dimensionLevers = [
        'Coherence' => [
            'high' => 'Document your story framework and train every team lead to tell it consistently.',
            'mid' => 'Run story alignment workshops with each department head this month.',
            'low' => 'Write your belief manifesto in 200 words—make every team member memorize it.'
        ],
        'Resonance' => [
            'high' => 'Scale your belief-driven content strategy across all market channels.',
            'mid' => 'Test belief-first messaging in your next 3 marketing campaigns.',
            'low' => 'Rewrite your homepage to lead with beliefs, not features—A/B test it.'
        ],
        'Proof' => [
            'high' => 'Build a systematic proof documentation process for every client success.',
            'mid' => 'Interview your best 5 clients about why they chose your worldview.',
            'low' => 'Create your first belief-outcome case study using your strongest client.'
        ],
        'Talent Signal' => [
            'high' => 'Build recruiting content that showcases your culture and mission daily.',
            'mid' => 'Add belief-alignment questions to your interview process immediately.',
            'low' => 'Rewrite job descriptions to lead with mission before requirements.'
        ],
        'Rituals' => [
            'high' => 'Systematize your belief-driven practices across all company operations.',
            'mid' => 'Implement 3 weekly rituals that embody your core beliefs.',
            'low' => 'Start one daily practice that visibly demonstrates your beliefs.'
        ],
        'Narrative–Market Fit' => [
            'high' => 'Use your narrative clarity to expand into adjacent market categories.',
            'mid' => 'Sharpen your story\'s unique angle within your current category.',
            'low' => 'Map competitors\' stories—find the gap only your beliefs can fill.'
        ]
    ];

    public function analyze($data) {
        $company = $data['company'] ?? 'Your Organization';
        $sector = $data['sector'] ?? '';
        $role = $data['role'] ?? '';
        $score = $data['score'];
        $band = $data['band'];
        $dimensions = $data['dimensions'];

        // Generate summary
        $summary = $this->generateSummary($company, $score, $band);

        // Analyze dimensions
        $dimensionAnalysis = $this->analyzeDimensions($dimensions);

        // Generate moves
        $moves = $this->generateMoves($dimensions, $band);

        // Generate message upgrade
        $messageUpgrade = $this->generateMessageUpgrade($company, $sector, $dimensions);

        // Generate metrics
        $metrics = $this->generateMetrics($band, $dimensions);

        // Generate MDX
        $mdx = $this->generateMDX($summary, $dimensionAnalysis, $moves, $messageUpgrade, $metrics);

        return [
            'summary' => $summary,
            'dimensions' => $dimensionAnalysis,
            'moves' => $moves,
            'message_upgrade' => $messageUpgrade,
            'metrics' => $metrics,
            'mdx' => $mdx
        ];
    }

    private function generateSummary($company, $score, $band) {
        $templates = [
            'Compelling' => "$company operates with compelling belief capital ($score/100)—your narrative engine is market-ready and should drive aggressive expansion. Your story creates competitive moats that pure product features cannot replicate.",
            'Coalescing' => "$company shows coalescing belief capital ($score/100)—your story has strong bones but needs systematic proof points and embedded rituals. You're 2-3 strategic moves from narrative-driven market leadership.",
            'Emerging' => "$company has emerging belief capital ($score/100)—story fragments exist but lack market coherence. Your beliefs need sharpening and systematic activation across all business functions to create competitive advantage.",
            'Latent' => "$company sits on latent belief capital ($score/100)—raw narrative signal that's mostly untapped. Your mission contains power, but it needs explicit articulation and systematic integration to drive business results."
        ];

        return $templates[$band] ?? $templates['Latent'];
    }

    private function analyzeDimensions($dimensions) {
        $analysis = [];
        
        foreach ($dimensions as $dim => $score) {
            $tier = $this->getScoreTier($score);
            $insight = $this->dimensionInsights[$dim][$tier] ?? '';
            $lever = $this->dimensionLevers[$dim][$tier] ?? '';
            
            $analysis[] = [
                'name' => $dim,
                'insight' => $insight,
                'lever' => $lever
            ];
        }

        return $analysis;
    }

    private function generateMoves($dimensions, $band) {
        // Sort dimensions by score to identify gaps
        arsort($dimensions);
        $gaps = array_slice(array_reverse($dimensions, true), 0, 3, true);

        $moveTemplates = [
            'Coherence' => [
                'title' => 'Story Sync Sprint',
                'why' => 'Internal story fragmentation kills external credibility',
                'micro_step' => 'Write your belief manifesto in exactly 200 words',
                'kpi' => 'All 5 team leads can recite core beliefs verbatim'
            ],
            'Resonance' => [
                'title' => 'Belief-First Messaging Test',
                'why' => 'Market connects to beliefs before features',
                'micro_step' => 'Rewrite homepage hero to lead with worldview',
                'kpi' => 'Homepage time-on-page increases 20%'
            ],
            'Proof' => [
                'title' => 'Belief-Outcome Case Study',
                'why' => 'Social proof validates your narrative claims',
                'micro_step' => 'Call your strongest client for 15min belief interview',
                'kpi' => 'One published case study within 14 days'
            ],
            'Talent Signal' => [
                'title' => 'Mission-First Job Descriptions',
                'why' => 'Right talent chooses mission over money',
                'micro_step' => 'Rewrite one job posting to lead with beliefs',
                'kpi' => 'Applications mention company mission unprompted'
            ],
            'Rituals' => [
                'title' => 'Daily Belief Practice',
                'why' => 'Consistent behavior makes beliefs tangible',
                'micro_step' => 'Choose one 5-minute daily ritual for next week',
                'kpi' => '100% team participation for 14 consecutive days'
            ],
            'Narrative–Market Fit' => [
                'title' => 'Category Story Mapping',
                'why' => 'Clear differentiation drives premium pricing',
                'micro_step' => 'List 5 competitors and their core narratives',
                'kpi' => 'Identify unique story angle within 7 days'
            ]
        ];

        $moves = [];
        $rank = 1;
        
        foreach ($gaps as $dim => $score) {
            if (isset($moveTemplates[$dim]) && $rank <= 3) {
                $move = $moveTemplates[$dim];
                $move['rank'] = $rank;
                $moves[] = $move;
                $rank++;
            }
        }

        // Fill remaining spots if needed
        while (count($moves) < 3) {
            $fallback = [
                'rank' => count($moves) + 1,
                'title' => 'Belief Documentation Sprint',
                'why' => 'Explicit beliefs create systematic advantage',
                'micro_step' => 'Write your top 3 company beliefs in one sentence each',
                'kpi' => 'All beliefs documented and shared with team'
            ];
            $moves[] = $fallback;
        }

        return array_slice($moves, 0, 3);
    }

    private function generateMessageUpgrade($company, $sector, $dimensions) {
        $audience = !empty($sector) ? "B2B leaders in $sector" : "forward-thinking businesses";
        
        // Simplified message formula
        $messages = [
            "We help $audience build systematic competitive advantage through belief-driven operations.",
            "We help $audience transform company culture into market differentiation through systematic belief integration.",
            "We help $audience convert mission statements into measurable business outcomes through proven narrative frameworks."
        ];

        return $messages[array_rand($messages)];
    }

    private function generateMetrics($band, $dimensions) {
        $baseMetrics = [
            'Team story consistency (% who can articulate core beliefs)',
            'Belief-first content engagement rates',
            'Mission-driven talent application rates',
            'Client selection based on values alignment',
            'Revenue from belief-aligned customer segments'
        ];

        // Prioritize based on lowest scoring dimensions
        $sortedDims = $dimensions;
        asort($sortedDims);
        $priorities = array_keys(array_slice($sortedDims, 0, 3, true));

        $priorityMetrics = [];
        if (in_array('Coherence', $priorities)) {
            $priorityMetrics[] = 'Internal story alignment score (team surveys)';
        }
        if (in_array('Resonance', $priorities)) {
            $priorityMetrics[] = 'Belief-driven content conversion rates';
        }
        if (in_array('Proof', $priorities)) {
            $priorityMetrics[] = 'Case studies linking beliefs to outcomes';
        }

        $combinedMetrics = array_merge($priorityMetrics, $baseMetrics);
        return array_slice(array_unique($combinedMetrics), 0, 5);
    }

    private function generateMDX($summary, $dimensions, $moves, $messageUpgrade, $metrics) {
        $mdx = "## Executive Summary\n\n$summary\n\n";
        
        $mdx .= "## Dimension Analysis\n\n";
        foreach ($dimensions as $dim) {
            $mdx .= "### {$dim['name']}\n\n**Insight:** {$dim['insight']}\n\n**Lever:** {$dim['lever']}\n\n";
        }

        $mdx .= "## Priority Moves (Next 14 Days)\n\n";
        foreach ($moves as $move) {
            $mdx .= "### {$move['rank']}. {$move['title']}\n\n";
            $mdx .= "**Why it matters:** {$move['why']}\n\n";
            $mdx .= "**First micro-step:** {$move['micro_step']}\n\n";
            $mdx .= "**KPI to track:** {$move['kpi']}\n\n";
        }

        $mdx .= "## Message Upgrade\n\n*$messageUpgrade*\n\n";

        $mdx .= "## Metrics to Watch (Next 30 Days)\n\n";
        foreach ($metrics as $metric) {
            $mdx .= "- $metric\n";
        }

        return $mdx;
    }

    private function getScoreTier($score) {
        if ($score >= 70) return 'high';
        if ($score >= 40) return 'mid';
        return 'low';
    }
}

// Handle the request
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        echo json_encode(['error' => 'Invalid input data']);
        exit;
    }

    $analyst = new BeliefCapitalAnalyst();
    $analysis = $analyst->analyze($input);
    
    echo json_encode([
        'success' => true,
        'analysis' => $analysis
    ]);
    
} else {
    echo json_encode(['error' => 'Only POST requests allowed']);
}
?>