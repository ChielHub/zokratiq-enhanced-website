<?php
// Simple database viewer - REMOVE AFTER USE OR SECURE WITH AUTH!
$dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';

try {
    $pdo = new PDO("sqlite:$dbPath");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query = $_GET['q'] ?? 'SELECT email, status, utm_source, createdAt FROM subscribers ORDER BY createdAt DESC LIMIT 20';

    $stmt = $pdo->query($query);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

} catch (PDOException $e) {
    die("Error: " . $e->getMessage());
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>Database Viewer</title>
    <style>
        body { font-family: monospace; margin: 20px; background: #1a1a1a; color: #fff; }
        table { border-collapse: collapse; width: 100%; background: #2d2d2d; }
        th, td { border: 1px solid #555; padding: 8px; text-align: left; }
        th { background: #00B3A6; }
        .form { margin-bottom: 20px; }
        input[type="text"] { width: 500px; padding: 8px; background: #333; color: #fff; border: 1px solid #555; }
        button { padding: 8px 16px; background: #00B3A6; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <h1>Zokratiq Database Viewer</h1>

    <div class="form">
        <form method="GET">
            <input type="text" name="q" value="<?php echo htmlspecialchars($query); ?>" placeholder="SQL Query">
            <button type="submit">Execute</button>
        </form>

        <p><strong>Quick Queries:</strong></p>
        <ul>
            <li><a href="?q=SELECT email, status, utm_source, createdAt FROM subscribers ORDER BY createdAt DESC LIMIT 20">Recent Subscribers</a></li>
            <li><a href="?q=SELECT utm_source, COUNT(*) as count FROM subscribers GROUP BY utm_source">Subscribers by Source</a></li>
            <li><a href="?q=SELECT * FROM subscribers WHERE utm_source = 'cracks-landing'">Cracks Newsletter Signups</a></li>
            <li><a href="?q=SELECT name, template_type, created_at FROM email_templates">Email Templates</a></li>
            <li><a href="?q=SELECT name, status, recipient_count, created_at FROM email_campaigns">Email Campaigns</a></li>
        </ul>
    </div>

    <?php if (!empty($results)): ?>
        <table>
            <thead>
                <tr>
                    <?php foreach (array_keys($results[0]) as $column): ?>
                        <th><?php echo htmlspecialchars($column); ?></th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($results as $row): ?>
                    <tr>
                        <?php foreach ($row as $value): ?>
                            <td><?php echo htmlspecialchars($value); ?></td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach; ?>
            </tbody>
        </table>

        <p><strong>Rows returned:</strong> <?php echo count($results); ?></p>
    <?php else: ?>
        <p>No results found or query executed successfully with no output.</p>
    <?php endif; ?>

    <p><strong>Query executed:</strong> <code><?php echo htmlspecialchars($query); ?></code></p>
</body>
</html>