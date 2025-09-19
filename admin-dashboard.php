<?php
session_start();

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin-login.php');
    exit();
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin-login.php');
    exit();
}

// Function to get newsletter subscription data
function getNewsletterStats($dbPath) {
    if (!file_exists($dbPath)) {
        return [
            'total' => 0,
            'pending' => 0,
            'active' => 0,
            'unsubscribed' => 0,
            'pending_subscriptions' => []
        ];
    }
    
    $stats = [
        'total' => 0,
        'pending' => 0,
        'active' => 0,
        'unsubscribed' => 0,
        'pending_subscriptions' => []
    ];
    
    // Use command line sqlite3 as fallback
    $statusOutput = shell_exec("sqlite3 '$dbPath' 'SELECT status, COUNT(*) as count FROM subscribers GROUP BY status;' 2>/dev/null");
    if ($statusOutput) {
        $lines = explode("\n", trim($statusOutput));
        foreach ($lines as $line) {
            if (empty($line)) continue;
            $parts = explode("|", $line);
            if (count($parts) === 2) {
                $status = trim($parts[0]);
                $count = (int)trim($parts[1]);
                $stats[$status] = $count;
                $stats['total'] += $count;
            }
        }
    }
    
    // Get pending subscription details
    $pendingOutput = shell_exec("sqlite3 '$dbPath' 'SELECT email, createdAt, utm_source, referrer, tokenExpires FROM subscribers WHERE status = \"pending\" ORDER BY createdAt DESC;' 2>/dev/null");
    if ($pendingOutput) {
        $lines = explode("\n", trim($pendingOutput));
        foreach ($lines as $line) {
            if (empty($line)) continue;
            $parts = explode("|", $line);
            if (count($parts) >= 2) {
                $subscription = [
                    'email' => trim($parts[0]),
                    'createdAt' => trim($parts[1]),
                    'utm_source' => isset($parts[2]) ? trim($parts[2]) : '',
                    'referrer' => isset($parts[3]) ? trim($parts[3]) : '',
                    'tokenExpires' => isset($parts[4]) && !empty(trim($parts[4])) ? date('Y-m-d H:i:s', trim($parts[4]) / 1000) : '',
                    'expired' => isset($parts[4]) && !empty(trim($parts[4])) ? time() > (trim($parts[4]) / 1000) : false
                ];
                $stats['pending_subscriptions'][] = $subscription;
            }
        }
    }
    
    return $stats;
}

// Function to get Misfits OS lead stats
function getMisfitsOSStats($dbPath) {
    if (!file_exists($dbPath)) {
        return [
            'total' => 0,
            'new' => 0,
            'qualified' => 0,
            'recent_leads' => []
        ];
    }

    $stats = [
        'total' => 0,
        'new' => 0,
        'qualified' => 0,
        'recent_leads' => []
    ];

    try {
        $pdo = new PDO("sqlite:$dbPath");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Check if table exists
        $result = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='misfits_os_leads'");
        if (!$result->fetch()) {
            return $stats; // Table doesn't exist yet
        }

        // Get total count
        $stmt = $pdo->query("SELECT COUNT(*) FROM misfits_os_leads");
        $stats['total'] = (int)$stmt->fetchColumn();

        // Get count by status
        $stmt = $pdo->query("SELECT status, COUNT(*) as count FROM misfits_os_leads GROUP BY status");
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $stats[$row['status']] = (int)$row['count'];
        }

        // Get qualified leads (score >= 30)
        $stmt = $pdo->query("SELECT COUNT(*) FROM misfits_os_leads WHERE lead_score >= 30");
        $stats['qualified'] = (int)$stmt->fetchColumn();

        // Get recent leads
        $stmt = $pdo->query("
            SELECT email, company, role, challenge, lead_score, created_at
            FROM misfits_os_leads
            ORDER BY created_at DESC
            LIMIT 10
        ");
        $stats['recent_leads'] = $stmt->fetchAll(PDO::FETCH_ASSOC);

    } catch (PDOException $e) {
        error_log("Error getting Misfits OS stats: " . $e->getMessage());
    }

    return $stats;
}

// Function to get form handlers overview
function getFormHandlersOverview() {
    return [
        [
            'name' => 'Misfits OS Blueprint Form',
            'url' => '/api/misfits-os-form.php',
            'page' => '/misfits-os',
            'description' => 'Lead capture for Misfits OS Blueprint download',
            'fields' => ['email', 'company', 'role', 'challenge'],
            'database_table' => 'misfits_os_leads',
            'status' => 'active'
        ],
        [
            'name' => 'Newsletter Subscription',
            'url' => '/api/subscribe.php',
            'page' => '/ (footer)',
            'description' => 'General newsletter subscription',
            'fields' => ['email'],
            'database_table' => 'subscribers',
            'status' => 'active'
        ],
        [
            'name' => 'Contact Form',
            'url' => '/contact.php',
            'page' => '/contact',
            'description' => 'General contact inquiries',
            'fields' => ['name', 'email', 'company', 'message'],
            'database_table' => 'file_log',
            'status' => 'active'
        ]
    ];
}

// Function to parse contact forms log
function parseContactFormsLog($logFile) {
    if (!file_exists($logFile)) {
        return [];
    }
    
    $content = file_get_contents($logFile);
    $submissions = [];
    
    // Split by the separator line
    $entries = explode('--------------------------------------------------------------------------------', $content);
    
    foreach ($entries as $entry) {
        $entry = trim($entry);
        if (empty($entry)) continue;
        
        $lines = explode("\n", $entry);
        $submission = [];
        
        foreach ($lines as $line) {
            $line = trim($line);
            if (empty($line)) continue;
            
            // Parse timestamp
            if (strpos($line, 'NEW CONTACT FORM SUBMISSION') !== false) {
                $submission['timestamp'] = substr($line, 0, 19);
                $submission['type'] = 'Contact Form';
                continue;
            }
            
            // Parse key-value pairs
            if (strpos($line, ':') !== false) {
                list($key, $value) = explode(':', $line, 2);
                $key = trim($key);
                $value = trim($value);
                
                switch ($key) {
                    case 'Email':
                        $submission['email'] = $value;
                        break;
                    case 'Name':
                        $submission['name'] = $value;
                        break;
                    case 'Company':
                        $submission['company'] = $value;
                        break;
                    case 'Industry':
                        $submission['industry'] = $value;
                        break;
                    case 'Challenge':
                        $submission['challenge'] = $value;
                        break;
                    case 'Subject':
                        $submission['subject'] = $value;
                        break;
                    case 'IP':
                        $submission['ip'] = $value;
                        break;
                    case 'Message':
                        // Handle multiline messages
                        $submission['message'] = $value;
                        break;
                }
            }
            
            // Detect partnership inquiries
            if (strpos($line, 'Partnership Inquiry') !== false) {
                $submission['type'] = strpos($line, 'Organization') !== false ? 'Partnership - Organization' : 'Partnership - Independent';
            }
        }
        
        if (!empty($submission) && isset($submission['email'])) {
            $submissions[] = $submission;
        }
    }
    
    // Sort by timestamp (newest first)
    usort($submissions, function($a, $b) {
        return strcmp($b['timestamp'] ?? '', $a['timestamp'] ?? '');
    });
    
    return $submissions;
}

$logFile = '/var/log/zokratiq_contact_forms.log';
$submissions = parseContactFormsLog($logFile);
$totalSubmissions = count($submissions);

$newsletterDbPath = '/var/www/html/zokratiq.com/api/subscribers.db';
$newsletterStats = getNewsletterStats($newsletterDbPath);
$misfitsStats = getMisfitsOSStats($newsletterDbPath);
$formHandlers = getFormHandlersOverview();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Zokratiq Contact Forms</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            min-height: 100vh;
            color: #f5f5f5;
        }
        
        .header {
            background: rgba(45, 45, 45, 0.95);
            border-bottom: 1px solid #00B3A6;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .header h1 {
            color: #00B3A6;
            font-size: 1.5rem;
        }
        
        .header-info {
            display: flex;
            align-items: center;
            gap: 2rem;
            font-size: 0.9rem;
            color: #888;
        }
        
        .logout-btn {
            background: #dc3545;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9rem;
            transition: background-color 0.3s ease;
        }
        
        .logout-btn:hover {
            background: #c82333;
        }
        
        .stats {
            padding: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .stat-card {
            background: rgba(45, 45, 45, 0.95);
            border: 1px solid #444;
            border-radius: 8px;
            padding: 1.5rem;
            text-align: center;
        }
        
        .stat-number {
            font-size: 2rem;
            font-weight: bold;
            color: #00B3A6;
            margin-bottom: 0.5rem;
        }
        
        .stat-label {
            color: #888;
            font-size: 0.9rem;
        }
        
        .submissions {
            padding: 2rem;
            max-width: 1200px;
            margin: 0 auto;
        }
        
        .submissions h2 {
            color: #f5f5f5;
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
        }
        
        .submission-card {
            background: rgba(45, 45, 45, 0.95);
            border: 1px solid #444;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .submission-card:hover {
            border-color: #00B3A6;
        }
        
        .submission-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 1rem;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .submission-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: #00B3A6;
        }
        
        .submission-type {
            background: #4ADFD6;
            color: #1a1a1a;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .submission-type.pending {
            background: #ffc107;
            color: #1a1a1a;
        }
        
        .submission-type.expired {
            background: #dc3545;
            color: white;
        }
        
        .submission-card.expired {
            opacity: 0.7;
            border-color: #dc3545;
        }
        
        .submission-details {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 1rem;
        }
        
        .detail-item {
            display: flex;
            flex-direction: column;
        }
        
        .detail-label {
            color: #888;
            font-size: 0.8rem;
            margin-bottom: 0.25rem;
        }
        
        .detail-value {
            color: #f5f5f5;
            font-size: 0.9rem;
            word-break: break-word;
        }
        
        .message-content {
            background: rgba(26, 26, 26, 0.5);
            border: 1px solid #333;
            border-radius: 4px;
            padding: 1rem;
            margin-top: 1rem;
            white-space: pre-wrap;
            color: #f5f5f5;
            font-size: 0.9rem;
            line-height: 1.5;
        }
        
        .no-submissions {
            text-align: center;
            color: #888;
            font-style: italic;
            margin-top: 3rem;
        }
        
        .refresh-btn {
            background: #00B3A6;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            text-decoration: none;
            font-size: 0.9rem;
            margin-left: 1rem;
            transition: background-color 0.3s ease;
        }
        
        .refresh-btn:hover {
            background: #008b80;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Zokratiq Admin Dashboard</h1>
        <div class="header-info">
            <a href="email-service.php" style="color: #00B3A6; text-decoration: none; margin-right: 1rem;">📧 Email Service</a>
            <span>Logged in as: <?php echo htmlspecialchars($_SESSION['admin_username']); ?></span>
            <span>Total Submissions: <?php echo $totalSubmissions; ?></span>
            <a href="?refresh=1" class="refresh-btn">Refresh</a>
            <a href="?logout=1" class="logout-btn">Logout</a>
        </div>
    </div>
    
    <div class="stats">
        <div class="stat-card">
            <div class="stat-number"><?php echo $totalSubmissions; ?></div>
            <div class="stat-label">Total Submissions</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php 
                echo count(array_filter($submissions, function($s) { 
                    return ($s['type'] ?? '') === 'Contact Form'; 
                })); 
            ?></div>
            <div class="stat-label">Contact Forms</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php 
                echo count(array_filter($submissions, function($s) { 
                    return strpos($s['type'] ?? '', 'Partnership') !== false; 
                })); 
            ?></div>
            <div class="stat-label">Partnership Inquiries</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php 
                $today = date('Y-m-d');
                echo count(array_filter($submissions, function($s) use ($today) { 
                    return strpos($s['timestamp'] ?? '', $today) === 0; 
                })); 
            ?></div>
            <div class="stat-label">Today</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php echo $newsletterStats['total']; ?></div>
            <div class="stat-label">Newsletter Subscribers</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php echo $newsletterStats['pending']; ?></div>
            <div class="stat-label">Pending Confirmations</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php echo $newsletterStats['active']; ?></div>
            <div class="stat-label">Active Subscribers</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #8B5CF6;">
            <div class="stat-number"><?php echo $misfitsStats['total']; ?></div>
            <div class="stat-label">Misfits OS Leads</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #8B5CF6;">
            <div class="stat-number"><?php echo $misfitsStats['qualified']; ?></div>
            <div class="stat-label">Qualified Leads</div>
        </div>
    </div>

    <!-- Form Handlers Overview -->
    <div class="submissions" style="margin: 2rem auto; max-width: 1200px;">
        <h2>Form Handlers Overview</h2>
        <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
            <?php foreach ($formHandlers as $handler): ?>
                <div class="submission-card">
                    <div class="submission-header">
                        <div class="submission-title">
                            <strong><?php echo htmlspecialchars($handler['name']); ?></strong>
                        </div>
                        <div class="submission-type <?php echo $handler['status']; ?>">
                            <?php echo ucfirst($handler['status']); ?>
                        </div>
                    </div>

                    <div class="submission-details" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1rem;">
                        <div class="detail-item">
                            <div class="detail-label">Handler URL</div>
                            <div class="detail-value" style="font-family: monospace; background: #333; padding: 4px 8px; border-radius: 4px;">
                                <?php echo htmlspecialchars($handler['url']); ?>
                            </div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Connected Page</div>
                            <div class="detail-value">
                                <a href="<?php echo htmlspecialchars($handler['page']); ?>" target="_blank" style="color: #00B3A6; text-decoration: none;">
                                    <?php echo htmlspecialchars($handler['page']); ?> ↗
                                </a>
                            </div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Database Table</div>
                            <div class="detail-value" style="font-family: monospace; background: #333; padding: 4px 8px; border-radius: 4px;">
                                <?php echo htmlspecialchars($handler['database_table']); ?>
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 1rem;">
                        <div class="detail-label">Description</div>
                        <div class="detail-value"><?php echo htmlspecialchars($handler['description']); ?></div>
                    </div>

                    <div style="margin-top: 1rem;">
                        <div class="detail-label">Form Fields</div>
                        <div class="detail-value">
                            <?php foreach ($handler['fields'] as $field): ?>
                                <span style="background: #444; padding: 2px 6px; border-radius: 3px; margin-right: 6px; font-size: 0.9rem;">
                                    <?php echo htmlspecialchars($field); ?>
                                </span>
                            <?php endforeach; ?>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
    
    <div class="submissions">
        <h2>Recent Form Submissions</h2>
        
        <?php if (empty($submissions)): ?>
            <div class="no-submissions">
                No form submissions found. Check that the log file exists at: <?php echo htmlspecialchars($logFile); ?>
            </div>
        <?php else: ?>
            <?php foreach ($submissions as $submission): ?>
                <div class="submission-card">
                    <div class="submission-header">
                        <div class="submission-title">
                            <?php echo htmlspecialchars($submission['name'] ?? 'Unknown'); ?>
                            <?php if (!empty($submission['email'])): ?>
                                (<?php echo htmlspecialchars($submission['email']); ?>)
                            <?php endif; ?>
                        </div>
                        <div class="submission-type">
                            <?php echo htmlspecialchars($submission['type'] ?? 'Unknown'); ?>
                        </div>
                    </div>
                    
                    <div class="submission-details">
                        <?php if (!empty($submission['timestamp'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">Submitted</div>
                                <div class="detail-value"><?php echo htmlspecialchars($submission['timestamp']); ?></div>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($submission['company'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">Company</div>
                                <div class="detail-value"><?php echo htmlspecialchars($submission['company']); ?></div>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($submission['industry'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">Industry</div>
                                <div class="detail-value"><?php echo htmlspecialchars($submission['industry']); ?></div>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($submission['challenge'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">Challenge</div>
                                <div class="detail-value"><?php echo htmlspecialchars($submission['challenge']); ?></div>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($submission['ip'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">IP Address</div>
                                <div class="detail-value"><?php echo htmlspecialchars($submission['ip']); ?></div>
                            </div>
                        <?php endif; ?>
                    </div>
                    
                    <?php if (!empty($submission['message'])): ?>
                        <div class="message-content">
                            <?php echo htmlspecialchars($submission['message']); ?>
                        </div>
                    <?php endif; ?>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
    
    <div class="submissions">
        <h2>Pending Newsletter Subscriptions</h2>
        
        <?php if (empty($newsletterStats['pending_subscriptions'])): ?>
            <div class="no-submissions">
                No pending newsletter subscriptions found.
            </div>
        <?php else: ?>
            <?php foreach ($newsletterStats['pending_subscriptions'] as $subscription): ?>
                <div class="submission-card <?php echo $subscription['expired'] ? 'expired' : ''; ?>">
                    <div class="submission-header">
                        <div class="submission-title">
                            <?php echo htmlspecialchars($subscription['email']); ?>
                        </div>
                        <div class="submission-type <?php echo $subscription['expired'] ? 'expired' : 'pending'; ?>">
                            <?php echo $subscription['expired'] ? 'Expired' : 'Pending'; ?>
                        </div>
                    </div>
                    
                    <div class="submission-details">
                        <div class="detail-item">
                            <div class="detail-label">Subscribed</div>
                            <div class="detail-value"><?php echo htmlspecialchars($subscription['createdAt']); ?></div>
                        </div>
                        
                        <?php if ($subscription['tokenExpires']): ?>
                            <div class="detail-item">
                                <div class="detail-label">Token Expires</div>
                                <div class="detail-value"><?php echo htmlspecialchars($subscription['tokenExpires']); ?></div>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($subscription['utm_source'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">Source</div>
                                <div class="detail-value"><?php echo htmlspecialchars($subscription['utm_source']); ?></div>
                            </div>
                        <?php endif; ?>
                        
                        <?php if (!empty($subscription['referrer'])): ?>
                            <div class="detail-item">
                                <div class="detail-label">Referrer</div>
                                <div class="detail-value"><?php echo htmlspecialchars($subscription['referrer']); ?></div>
                            </div>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php endif; ?>
    </div>
</body>
</html>