<?php
session_start();

// Simple admin credentials - you should change these!
$admin_username = 'zokratiq_admin';
$admin_password = 'Zok_Admin_2025!'; // Change this to a secure password

// Check if already logged in
if (isset($_SESSION['admin_logged_in']) && $_SESSION['admin_logged_in'] === true) {
    header('Location: admin-dashboard.php');
    exit();
}

$error = '';

if ($_POST) {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';
    
    if ($username === $admin_username && $password === $admin_password) {
        $_SESSION['admin_logged_in'] = true;
        $_SESSION['admin_username'] = $username;
        $_SESSION['login_time'] = time();
        header('Location: admin-dashboard.php');
        exit();
    } else {
        $error = 'Invalid username or password';
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Login - Zokratiq</title>
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
            display: flex;
            align-items: center;
            justify-content: center;
            color: #f5f5f5;
        }
        
        .login-container {
            background: rgba(45, 45, 45, 0.95);
            border: 1px solid #00B3A6;
            border-radius: 12px;
            padding: 2rem;
            max-width: 400px;
            width: 100%;
            backdrop-filter: blur(10px);
        }
        
        .logo {
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .logo h1 {
            color: #00B3A6;
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        
        .logo p {
            color: #888;
            font-size: 0.9rem;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        label {
            display: block;
            margin-bottom: 0.5rem;
            color: #f5f5f5;
            font-weight: 500;
        }
        
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid #444;
            border-radius: 6px;
            background: #2d2d2d;
            color: #f5f5f5;
            font-size: 1rem;
            transition: border-color 0.3s ease;
        }
        
        input[type="text"]:focus,
        input[type="password"]:focus {
            outline: none;
            border-color: #00B3A6;
        }
        
        .login-btn {
            width: 100%;
            padding: 0.75rem;
            background: linear-gradient(135deg, #00B3A6, #4ADFD6);
            color: #1a1a1a;
            border: none;
            border-radius: 6px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s ease;
        }
        
        .login-btn:hover {
            transform: translateY(-1px);
        }
        
        .error {
            background: rgba(220, 53, 69, 0.1);
            border: 1px solid #dc3545;
            color: #ff6b6b;
            padding: 0.75rem;
            border-radius: 6px;
            margin-bottom: 1rem;
            text-align: center;
        }
        
        .security-note {
            margin-top: 2rem;
            padding: 1rem;
            background: rgba(255, 193, 7, 0.1);
            border: 1px solid #ffc107;
            border-radius: 6px;
            font-size: 0.85rem;
            color: #ffc107;
        }
    </style>
</head>
<body>
    <div class="login-container">
        <div class="logo">
            <h1>Zokratiq Admin</h1>
            <p>Contact Forms Dashboard</p>
        </div>
        
        <?php if ($error): ?>
            <div class="error"><?php echo htmlspecialchars($error); ?></div>
        <?php endif; ?>
        
        <form method="POST" action="">
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" required autocomplete="username">
            </div>
            
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" required autocomplete="current-password">
            </div>
            
            <button type="submit" class="login-btn">
                Login to Dashboard
            </button>
        </form>
        
        <div class="security-note">
            <strong>Security Notice:</strong> Change the default credentials in admin-login.php before using in production.
        </div>
    </div>
</body>
</html>