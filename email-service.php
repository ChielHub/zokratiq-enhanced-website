<?php
session_start();

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin-login.php');
    exit();
}

// Database path
$dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';

// Initialize database with email service schema
function initializeEmailDatabase($dbPath) {
    if (!file_exists($dbPath)) {
        // Create the database file
        touch($dbPath);
        chmod($dbPath, 0666);
    }
    
    try {
        $pdo = new PDO("sqlite:$dbPath");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        // Read and execute schema
        $schema = file_get_contents('/var/www/html/zokratiq.com/email-service-schema.sql');
        $pdo->exec($schema);
        
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database initialization failed: " . $e->getMessage());
        return null;
    }
}

// Get database connection
function getDb($dbPath) {
    try {
        $pdo = new PDO("sqlite:$dbPath");
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        error_log("Database connection failed: " . $e->getMessage());
        return null;
    }
}

// Load The Signal template content
function loadSignalTemplate() {
    $htmlPath = '/var/www/html/zokratiq.com/out/the-signal-template.html';
    $textPath = '/var/www/html/zokratiq.com/out/the-signal-template-plain.txt';
    
    $htmlContent = file_exists($htmlPath) ? file_get_contents($htmlPath) : '';
    $textContent = file_exists($textPath) ? file_get_contents($textPath) : '';
    
    return [
        'html' => $htmlContent,
        'text' => $textContent
    ];
}

// Handle actions
$action = $_GET['action'] ?? $_POST['action'] ?? '';
$message = '';
$error = '';

// Initialize database
$pdo = initializeEmailDatabase($dbPath);
if (!$pdo) {
    $error = "Database connection failed";
}

switch ($action) {
    case 'load_template':
        if ($pdo) {
            $template = loadSignalTemplate();
            try {
                $stmt = $pdo->prepare("UPDATE email_templates SET html_content = ?, text_content = ?, updated_at = CURRENT_TIMESTAMP WHERE name = 'The Signal Newsletter'");
                $stmt->execute([$template['html'], $template['text']]);
                $message = "Template loaded successfully!";
            } catch (PDOException $e) {
                $error = "Failed to load template: " . $e->getMessage();
            }
        }
        break;
        
    case 'create_campaign':
        if ($pdo && $_POST) {
            try {
                $stmt = $pdo->prepare("INSERT INTO email_campaigns (name, template_id, subject, from_email, from_name, status) VALUES (?, ?, ?, ?, ?, 'draft')");
                $stmt->execute([
                    $_POST['campaign_name'],
                    $_POST['template_id'],
                    $_POST['subject'],
                    $_POST['from_email'] ?? 'signal@zokratiq.com',
                    $_POST['from_name'] ?? 'The Signal by Zokratiq'
                ]);
                $message = "Campaign created successfully!";
            } catch (PDOException $e) {
                $error = "Failed to create campaign: " . $e->getMessage();
            }
        }
        break;
        
    case 'send_test':
        if ($pdo && $_POST) {
            $testEmail = $_POST['test_email'];
            $campaignId = $_POST['campaign_id'];
            
            // Get campaign and template data
            try {
                $stmt = $pdo->prepare("
                    SELECT c.*, t.html_content, t.text_content 
                    FROM email_campaigns c 
                    JOIN email_templates t ON c.template_id = t.id 
                    WHERE c.id = ?
                ");
                $stmt->execute([$campaignId]);
                $campaign = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if ($campaign) {
                    // Simple mail sending (you can integrate with PHPMailer or similar)
                    $subject = "[TEST] " . $campaign['subject'];
                    $headers = [
                        "From: " . $campaign['from_name'] . " <" . $campaign['from_email'] . ">",
                        "Reply-To: " . $campaign['from_email'],
                        "MIME-Version: 1.0",
                        "Content-Type: text/html; charset=UTF-8"
                    ];
                    
                    $htmlContent = str_replace('{{campaign_id}}', 'test-' . $campaignId, $campaign['html_content']);
                    
                    if (mail($testEmail, $subject, $htmlContent, implode("\r\n", $headers))) {
                        $message = "Test email sent to " . $testEmail;
                    } else {
                        $error = "Failed to send test email";
                    }
                }
            } catch (PDOException $e) {
                $error = "Failed to send test email: " . $e->getMessage();
            }
        }
        break;
}

// Get data for display
$subscribers = [];
$templates = [];
$campaigns = [];

if ($pdo) {
    // Get active subscribers
    try {
        $stmt = $pdo->query("SELECT email, status, createdAt FROM subscribers WHERE status = 'active' ORDER BY createdAt DESC");
        $subscribers = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Failed to fetch subscribers: " . $e->getMessage());
    }
    
    // Get templates
    try {
        $stmt = $pdo->query("SELECT * FROM email_templates ORDER BY created_at DESC");
        $templates = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Failed to fetch templates: " . $e->getMessage());
    }
    
    // Get campaigns
    try {
        $stmt = $pdo->query("SELECT c.*, t.name as template_name FROM email_campaigns c LEFT JOIN email_templates t ON c.template_id = t.id ORDER BY c.created_at DESC");
        $campaigns = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Failed to fetch campaigns: " . $e->getMessage());
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Service - Zokratiq Admin</title>
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
        
        .nav {
            display: flex;
            gap: 1rem;
        }
        
        .nav a {
            color: #888;
            text-decoration: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            transition: all 0.3s ease;
        }
        
        .nav a:hover, .nav a.active {
            background: #00B3A6;
            color: white;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .card {
            background: rgba(45, 45, 45, 0.95);
            border: 1px solid #444;
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 2rem;
        }
        
        .card h2 {
            color: #00B3A6;
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .form-group {
            margin-bottom: 1rem;
        }
        
        .form-group label {
            display: block;
            color: #888;
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            background: rgba(26, 26, 26, 0.8);
            border: 1px solid #444;
            border-radius: 4px;
            color: #f5f5f5;
            font-size: 0.9rem;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #00B3A6;
        }
        
        .btn {
            background: #00B3A6;
            color: white;
            padding: 0.75rem 1.5rem;
            border: none;
            border-radius: 4px;
            font-size: 0.9rem;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: background-color 0.3s ease;
        }
        
        .btn:hover {
            background: #008b80;
        }
        
        .btn-secondary {
            background: #666;
        }
        
        .btn-secondary:hover {
            background: #555;
        }
        
        .btn-danger {
            background: #dc3545;
        }
        
        .btn-danger:hover {
            background: #c82333;
        }
        
        .alert {
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
        }
        
        .alert-success {
            background: rgba(40, 167, 69, 0.2);
            border: 1px solid #28a745;
            color: #28a745;
        }
        
        .alert-error {
            background: rgba(220, 53, 69, 0.2);
            border: 1px solid #dc3545;
            color: #dc3545;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
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
        
        .table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
        }
        
        .table th,
        .table td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #444;
        }
        
        .table th {
            background: rgba(26, 26, 26, 0.5);
            color: #888;
            font-weight: 600;
        }
        
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .status-draft {
            background: #ffc107;
            color: #1a1a1a;
        }
        
        .status-sent {
            background: #28a745;
            color: white;
        }
        
        .status-active {
            background: #00B3A6;
            color: white;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>Email Service</h1>
        <div class="nav">
            <a href="admin-dashboard.php">Dashboard</a>
            <a href="email-service.php" class="active">Email Service</a>
            <a href="?logout=1">Logout</a>
        </div>
    </div>
    
    <div class="container">
        <?php if ($message): ?>
            <div class="alert alert-success"><?php echo htmlspecialchars($message); ?></div>
        <?php endif; ?>
        
        <?php if ($error): ?>
            <div class="alert alert-error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <!-- Stats -->
        <div class="stats">
            <div class="stat-card">
                <div class="stat-number"><?php echo count($subscribers); ?></div>
                <div class="stat-label">Active Subscribers</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count($templates); ?></div>
                <div class="stat-label">Email Templates</div>
            </div>
            <div class="stat-card">
                <div class="stat-number"><?php echo count($campaigns); ?></div>
                <div class="stat-label">Email Campaigns</div>
            </div>
        </div>
        
        <!-- Template Management -->
        <div class="card">
            <h2>Template Management</h2>
            <p style="color: #888; margin-bottom: 1rem;">Manage your email templates and import The Signal template.</p>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1.5rem;">
                <form method="POST" style="display: inline;">
                    <input type="hidden" name="action" value="load_template">
                    <button type="submit" class="btn">Quick Load Signal Template</button>
                </form>
                <a href="template-manager.php" class="btn btn-secondary">📁 Advanced Template Manager</a>
            </div>
            
            <div style="background: rgba(0,179,166,0.1); border: 1px solid #00B3A6; border-radius: 4px; padding: 1rem; margin-bottom: 1rem;">
                <strong style="color: #00B3A6;">💡 Pro Tip:</strong> Use the Advanced Template Manager to preview templates, see file sizes, and manage multiple template versions!
            </div>
            
            <?php if (!empty($templates)): ?>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Created</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($templates as $template): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($template['name']); ?></td>
                                <td>
                                    <span class="status-badge status-<?php echo $template['template_type'] === 'newsletter' ? 'active' : 'draft'; ?>">
                                        <?php echo ucfirst($template['template_type']); ?>
                                    </span>
                                </td>
                                <td><?php echo date('M j, Y', strtotime($template['created_at'])); ?></td>
                                <td>
                                    <button class="btn btn-secondary" onclick="previewTemplate(<?php echo $template['id']; ?>)">Preview</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        
        <!-- Campaign Management -->
        <div class="card">
            <h2>Create New Campaign</h2>
            <form method="POST">
                <input type="hidden" name="action" value="create_campaign">
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="campaign_name">Campaign Name</label>
                        <input type="text" id="campaign_name" name="campaign_name" required placeholder="The Signal - Week of Nov 11">
                    </div>
                    
                    <div class="form-group">
                        <label for="template_id">Email Template</label>
                        <select id="template_id" name="template_id" required>
                            <option value="">Select Template</option>
                            <?php foreach ($templates as $template): ?>
                                <option value="<?php echo $template['id']; ?>"><?php echo htmlspecialchars($template['name']); ?></option>
                            <?php endforeach; ?>
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="subject">Email Subject</label>
                    <input type="text" id="subject" name="subject" required placeholder="The Signal — Week of Nov 11, 2024">
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="from_name">From Name</label>
                        <input type="text" id="from_name" name="from_name" value="The Signal by Zokratiq">
                    </div>
                    
                    <div class="form-group">
                        <label for="from_email">From Email</label>
                        <input type="email" id="from_email" name="from_email" value="signal@zokratiq.com">
                    </div>
                </div>
                
                <button type="submit" class="btn">Create Campaign</button>
            </form>
        </div>
        
        <!-- Campaign List -->
        <?php if (!empty($campaigns)): ?>
        <div class="card">
            <h2>Email Campaigns</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Campaign</th>
                        <th>Template</th>
                        <th>Status</th>
                        <th>Created</th>
                        <th>Recipients</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($campaigns as $campaign): ?>
                        <tr>
                            <td>
                                <strong><?php echo htmlspecialchars($campaign['name']); ?></strong><br>
                                <small style="color: #888;"><?php echo htmlspecialchars($campaign['subject']); ?></small>
                            </td>
                            <td><?php echo htmlspecialchars($campaign['template_name'] ?? 'Unknown'); ?></td>
                            <td>
                                <span class="status-badge status-<?php echo $campaign['status']; ?>">
                                    <?php echo ucfirst($campaign['status']); ?>
                                </span>
                            </td>
                            <td><?php echo date('M j, Y', strtotime($campaign['created_at'])); ?></td>
                            <td><?php echo $campaign['recipient_count']; ?></td>
                            <td>
                                <?php if ($campaign['status'] === 'draft'): ?>
                                    <button class="btn btn-secondary" onclick="sendTest(<?php echo $campaign['id']; ?>)">Send Test</button>
                                <?php endif; ?>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <?php endif; ?>
        
        <!-- Subscribers -->
        <div class="card">
            <h2>Active Subscribers</h2>
            <?php if (!empty($subscribers)): ?>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Subscribed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach (array_slice($subscribers, 0, 10) as $subscriber): ?>
                            <tr>
                                <td><?php echo htmlspecialchars($subscriber['email']); ?></td>
                                <td>
                                    <span class="status-badge status-active">
                                        <?php echo ucfirst($subscriber['status']); ?>
                                    </span>
                                </td>
                                <td><?php echo date('M j, Y', strtotime($subscriber['createdAt'])); ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
                
                <?php if (count($subscribers) > 10): ?>
                    <p style="color: #888; margin-top: 1rem;">Showing 10 of <?php echo count($subscribers); ?> subscribers</p>
                <?php endif; ?>
            <?php else: ?>
                <p style="color: #888;">No active subscribers found.</p>
            <?php endif; ?>
        </div>
    </div>
    
    <!-- Test Email Modal -->
    <div id="testEmailModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 1000;">
        <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: #2d2d2d; padding: 2rem; border-radius: 8px; min-width: 400px;">
            <h3 style="color: #00B3A6; margin-bottom: 1rem;">Send Test Email</h3>
            <form method="POST" id="testEmailForm">
                <input type="hidden" name="action" value="send_test">
                <input type="hidden" name="campaign_id" id="testCampaignId">
                
                <div class="form-group">
                    <label for="test_email">Test Email Address</label>
                    <input type="email" id="test_email" name="test_email" required placeholder="your-email@example.com">
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                    <button type="button" class="btn btn-secondary" onclick="closeTestModal()">Cancel</button>
                    <button type="submit" class="btn">Send Test</button>
                </div>
            </form>
        </div>
    </div>
    
    <script>
        function sendTest(campaignId) {
            document.getElementById('testCampaignId').value = campaignId;
            document.getElementById('testEmailModal').style.display = 'block';
        }
        
        function closeTestModal() {
            document.getElementById('testEmailModal').style.display = 'none';
        }
        
        function previewTemplate(templateId) {
            // You can implement template preview functionality here
            alert('Template preview functionality would be implemented here');
        }
        
        // Close modal when clicking outside
        document.getElementById('testEmailModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeTestModal();
            }
        });
    </script>
</body>
</html>