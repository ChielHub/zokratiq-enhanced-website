<?php
session_start();

// Check authentication
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: admin-login.php');
    exit();
}

// Database path
$dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';

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

// Scan for available template files
function getAvailableTemplates() {
    $templateDir = '/var/www/html/zokratiq.com/out/';
    $templates = [];
    
    // Look for template files
    $files = glob($templateDir . '*template*.html');
    foreach ($files as $file) {
        $filename = basename($file);
        $textFile = str_replace('.html', '-plain.txt', $file);
        
        $templates[] = [
            'id' => md5($filename),
            'name' => ucwords(str_replace(['-', '_'], ' ', str_replace('.html', '', $filename))),
            'filename' => $filename,
            'html_path' => $file,
            'text_path' => file_exists($textFile) ? $textFile : null,
            'size' => filesize($file),
            'modified' => filemtime($file),
            'preview_url' => 'https://zokratiq.com/' . basename($file)
        ];
    }
    
    return $templates;
}

// Load specific template into database
function loadTemplateFromFile($templateFile, $pdo) {
    $htmlPath = '/var/www/html/zokratiq.com/out/' . $templateFile['filename'];
    $textPath = $templateFile['text_path'];
    
    if (!file_exists($htmlPath)) {
        throw new Exception("HTML template file not found");
    }
    
    $htmlContent = file_get_contents($htmlPath);
    $textContent = $textPath && file_exists($textPath) ? file_get_contents($textPath) : '';
    
    // Create or update template
    $templateName = $templateFile['name'];
    
    // Check if template exists
    $stmt = $pdo->prepare("SELECT id FROM email_templates WHERE name = ?");
    $stmt->execute([$templateName]);
    $existing = $stmt->fetch();
    
    if ($existing) {
        // Update existing
        $stmt = $pdo->prepare("UPDATE email_templates SET html_content = ?, text_content = ?, updated_at = CURRENT_TIMESTAMP WHERE name = ?");
        $stmt->execute([$htmlContent, $textContent, $templateName]);
        return "updated";
    } else {
        // Create new
        $stmt = $pdo->prepare("INSERT INTO email_templates (name, subject, html_content, text_content, template_type, created_at, updated_at) VALUES (?, ?, ?, ?, 'newsletter', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)");
        $stmt->execute([$templateName, "{{subject}}", $htmlContent, $textContent]);
        return "created";
    }
}

$message = '';
$error = '';
$action = $_GET['action'] ?? $_POST['action'] ?? '';

$pdo = getDb($dbPath);
$availableTemplates = getAvailableTemplates();

// Handle actions
switch ($action) {
    case 'load_template':
        if ($pdo && isset($_POST['template_id'])) {
            $templateId = $_POST['template_id'];
            $template = null;
            
            foreach ($availableTemplates as $t) {
                if ($t['id'] === $templateId) {
                    $template = $t;
                    break;
                }
            }
            
            if ($template) {
                try {
                    $result = loadTemplateFromFile($template, $pdo);
                    $message = "Template '" . $template['name'] . "' " . $result . " successfully! HTML: " . number_format(strlen(file_get_contents($template['html_path']))) . " chars, Text: " . number_format(strlen(file_get_contents($template['text_path'] ?? ''))) . " chars.";
                } catch (Exception $e) {
                    $error = "Failed to load template: " . $e->getMessage();
                }
            } else {
                $error = "Template not found";
            }
        }
        break;
        
    case 'preview_template':
        if (isset($_GET['template_id'])) {
            $templateId = $_GET['template_id'];
            $template = null;
            
            foreach ($availableTemplates as $t) {
                if ($t['id'] === $templateId) {
                    $template = $t;
                    break;
                }
            }
            
            if ($template && file_exists($template['html_path'])) {
                // Serve the template with some basic replacements for preview
                $content = file_get_contents($template['html_path']);
                $content = str_replace([
                    '{{campaign_id}}', 
                    '{{view_in_browser_url}}',
                    '[[Week/Date]]',
                    '[[Teaser 1]]',
                    '[[Teaser 2]]',
                    '[[Teaser 3]]'
                ], [
                    'preview-123',
                    '#',
                    'Week of November 11, 2024',
                    'AI breakthrough in reasoning',
                    'New startup funding patterns',
                    'Remote work evolution'
                ], $content);
                
                header('Content-Type: text/html');
                echo $content;
                exit;
            }
        }
        header('HTTP/1.0 404 Not Found');
        exit;
}

// Get existing templates from database
$dbTemplates = [];
if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT *, length(html_content) as html_size, length(text_content) as text_size FROM email_templates ORDER BY updated_at DESC");
        $dbTemplates = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        $error = "Failed to fetch database templates: " . $e->getMessage();
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template Manager - Zokratiq Admin</title>
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
        
        .template-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .template-card {
            background: rgba(26, 26, 26, 0.8);
            border: 1px solid #444;
            border-radius: 8px;
            padding: 1rem;
            transition: border-color 0.3s ease;
        }
        
        .template-card:hover {
            border-color: #00B3A6;
        }
        
        .template-name {
            font-size: 1.1rem;
            font-weight: 600;
            color: #f5f5f5;
            margin-bottom: 0.5rem;
        }
        
        .template-meta {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        
        .template-stats {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;
            font-size: 0.8rem;
            color: #888;
        }
        
        .template-actions {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
        }
        
        .btn {
            background: #00B3A6;
            color: white;
            padding: 0.5rem 1rem;
            border: none;
            border-radius: 4px;
            font-size: 0.85rem;
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
        
        .btn-small {
            padding: 0.25rem 0.75rem;
            font-size: 0.8rem;
        }
        
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 12px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .status-file {
            background: #ffc107;
            color: #1a1a1a;
        }
        
        .status-database {
            background: #00B3A6;
            color: white;
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
    </style>
</head>
<body>
    <div class="header">
        <h1>Template Manager</h1>
        <div class="nav">
            <a href="admin-dashboard.php">Dashboard</a>
            <a href="email-service.php">Email Service</a>
            <a href="template-manager.php" class="active">Templates</a>
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
        
        <!-- Available Template Files -->
        <div class="card">
            <h2>📁 Available Template Files</h2>
            <p style="color: #888; margin-bottom: 1.5rem;">Select a template file to load into the email service database.</p>
            
            <?php if (empty($availableTemplates)): ?>
                <p style="color: #888;">No template files found in /var/www/html/zokratiq.com/out/</p>
            <?php else: ?>
                <div class="template-grid">
                    <?php foreach ($availableTemplates as $template): ?>
                        <div class="template-card">
                            <div class="template-name"><?php echo htmlspecialchars($template['name']); ?></div>
                            <div class="template-meta">
                                <span class="status-badge status-file">File</span>
                                <span style="margin-left: 0.5rem;"><?php echo $template['filename']; ?></span>
                            </div>
                            <div class="template-stats">
                                <span>Size: <?php echo number_format($template['size']); ?> bytes</span>
                                <span>Modified: <?php echo date('M j, Y', $template['modified']); ?></span>
                            </div>
                            <div class="template-actions">
                                <form method="POST" style="display: inline;">
                                    <input type="hidden" name="action" value="load_template">
                                    <input type="hidden" name="template_id" value="<?php echo $template['id']; ?>">
                                    <button type="submit" class="btn btn-small">Load into Database</button>
                                </form>
                                <a href="?action=preview_template&template_id=<?php echo $template['id']; ?>" target="_blank" class="btn btn-secondary btn-small">Preview</a>
                                <a href="<?php echo $template['preview_url']; ?>" target="_blank" class="btn btn-secondary btn-small">View Live</a>
                            </div>
                        </div>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
        
        <!-- Database Templates -->
        <div class="card">
            <h2>🗄️ Templates in Database</h2>
            <p style="color: #888; margin-bottom: 1rem;">Templates loaded and ready for email campaigns.</p>
            
            <?php if (empty($dbTemplates)): ?>
                <p style="color: #888;">No templates loaded in database yet. Load templates from files above.</p>
            <?php else: ?>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Template Name</th>
                            <th>Type</th>
                            <th>Content Size</th>
                            <th>Last Updated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($dbTemplates as $template): ?>
                            <tr>
                                <td>
                                    <strong><?php echo htmlspecialchars($template['name']); ?></strong><br>
                                    <small style="color: #888;"><?php echo htmlspecialchars($template['subject']); ?></small>
                                </td>
                                <td>
                                    <span class="status-badge status-database">
                                        <?php echo ucfirst($template['template_type']); ?>
                                    </span>
                                </td>
                                <td>
                                    HTML: <?php echo number_format($template['html_size']); ?> chars<br>
                                    <small style="color: #888;">Text: <?php echo number_format($template['text_size']); ?> chars</small>
                                </td>
                                <td><?php echo date('M j, Y H:i', strtotime($template['updated_at'])); ?></td>
                                <td>
                                    <button class="btn btn-secondary btn-small" onclick="previewDbTemplate(<?php echo $template['id']; ?>)">Preview</button>
                                </td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            <?php endif; ?>
        </div>
        
        <!-- Template Creation Guide -->
        <div class="card">
            <h2>📝 Template Creation Guide</h2>
            <p style="color: #888; margin-bottom: 1rem;">How to add your own templates:</p>
            
            <ol style="color: #f5f5f5; line-height: 1.8; margin-left: 2rem;">
                <li><strong>Create HTML file:</strong> Save your template as <code style="background: rgba(0,0,0,0.3); padding: 2px 6px;">your-template-name.html</code></li>
                <li><strong>Create text version:</strong> Save plain text version as <code style="background: rgba(0,0,0,0.3); padding: 2px 6px;">your-template-name-plain.txt</code></li>
                <li><strong>Upload files:</strong> Place both files in <code style="background: rgba(0,0,0,0.3); padding: 2px 6px;">/var/www/html/zokratiq.com/out/</code></li>
                <li><strong>Reload this page</strong> to see your new template</li>
                <li><strong>Click "Load into Database"</strong> to make it available for campaigns</li>
            </ol>
        </div>
    </div>
    
    <script>
        function previewDbTemplate(templateId) {
            // You can implement database template preview here
            alert('Database template preview would show the stored HTML content');
        }
    </script>
</body>
</html>