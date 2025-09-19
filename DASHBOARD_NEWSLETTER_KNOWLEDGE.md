# Dashboard & Newsletter System Knowledge Base

## System Architecture Overview

### Core Components
- **Database**: SQLite at `/var/www/html/zokratiq.com/api/subscribers.db`
- **Admin Dashboard**: `https://zokratiq.com/admin-dashboard.php`
- **Email Service**: `https://zokratiq.com/email-service.php`
- **Primary Email**: `hello@zokratiq.com`

### Database Schema

#### Subscribers Table
```sql
CREATE TABLE subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    token TEXT,
    tokenExpires INTEGER,
    utm_source TEXT,
    referrer TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    activatedAt DATETIME,
    unsubscribedAt DATETIME
);
```

#### Email Templates Table
```sql
CREATE TABLE email_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    template_type TEXT DEFAULT 'custom',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Email Campaigns Table
```sql
CREATE TABLE email_campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    template_id INTEGER,
    subject TEXT NOT NULL,
    from_email TEXT DEFAULT 'signal@zokratiq.com',
    from_name TEXT DEFAULT 'The Signal by Zokratiq',
    status TEXT DEFAULT 'draft',
    recipient_count INTEGER DEFAULT 0,
    sent_count INTEGER DEFAULT 0,
    failed_count INTEGER DEFAULT 0,
    open_count INTEGER DEFAULT 0,
    click_count INTEGER DEFAULT 0,
    scheduled_at TIMESTAMP NULL,
    sent_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES email_templates (id)
);
```

## Newsletter Integration Pattern

### Standard Integration Steps
1. **Database Connection**
   ```php
   $dbPath = '/var/www/html/zokratiq.com/api/subscribers.db';
   $pdo = new PDO("sqlite:$dbPath");
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   ```

2. **Subscriber Management**
   ```php
   // Check existing subscriber
   $stmt = $pdo->prepare("SELECT id, status FROM subscribers WHERE email = ?");
   $stmt->execute([$email]);
   $existingSubscriber = $stmt->fetch(PDO::FETCH_ASSOC);

   // Add new or reactivate
   if ($existingSubscriber) {
       $stmt = $pdo->prepare("UPDATE subscribers SET status = 'active', activatedAt = CURRENT_TIMESTAMP, utm_source = ?, referrer = ? WHERE email = ?");
       $stmt->execute(['source-name', $_SERVER['HTTP_REFERER'] ?? 'direct', $email]);
   } else {
       $stmt = $pdo->prepare("INSERT INTO subscribers (email, status, utm_source, referrer, activatedAt) VALUES (?, 'active', ?, ?, CURRENT_TIMESTAMP)");
       $stmt->execute([$email, 'source-name', $_SERVER['HTTP_REFERER'] ?? 'direct']);
   }
   ```

3. **Email Template Creation**
   ```php
   $template = [
       'name' => 'Newsletter Name',
       'subject' => 'Welcome Subject',
       'html_content' => '<!-- HTML content -->',
       'text_content' => 'Plain text version',
       'template_type' => 'newsletter'
   ];

   $stmt = $pdo->prepare("INSERT OR REPLACE INTO email_templates (name, subject, html_content, text_content, template_type) VALUES (?, ?, ?, ?, ?)");
   $stmt->execute([$template['name'], $template['subject'], $template['html_content'], $template['text_content'], $template['template_type']]);
   ```

4. **Dual Email System**
   ```php
   // Send welcome email to subscriber
   $headers = [
       "From: Zokratiq <hello@zokratiq.com>",
       "Reply-To: hello@zokratiq.com",
       "MIME-Version: 1.0",
       "Content-Type: text/html; charset=UTF-8"
   ];
   mail($email, $subject, $htmlContent, implode("\r\n", $headers));

   // Send notification to admin
   $adminBody = "New signup for Newsletter:\n\nEmail: $email\nSource: source-name\nTime: " . date('Y-m-d H:i:s');
   mail('hello@zokratiq.com', "New Newsletter Signup: $email", $adminBody, "From: Zokratiq System <hello@zokratiq.com>");
   ```

## Current Newsletter Integrations

### 1. The Signal Newsletter
- **Template**: "The Signal Newsletter"
- **From**: `signal@zokratiq.com`
- **Type**: Weekly newsletter
- **Status**: Active

### 2. Cracks in the System
- **Template**: "Cracks in the System Welcome"
- **From**: `hello@zokratiq.com`
- **Type**: 6-part dispatch series
- **UTM Source**: `cracks-landing`
- **Status**: Active

### 3. Misfits OS
- **Database**: `misfits_os_leads` table
- **From**: `hello@zokratiq.com`
- **Type**: Lead capture
- **UTM Source**: `misfits-os-landing`
- **Status**: Active

## Common UI Issues & Solutions

### Tailwind CSS Styling Issues
**Problem**: Custom Tailwind classes not working in static exports
**Solution**: Check `next.config.js` for incorrect `basePath` configuration
```javascript
// ❌ Incorrect (causes asset path issues)
const nextConfig = {
  output: 'export',
  basePath: '/zokratiq',
  // ...
}

// ✅ Correct (for root domain serving)
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // No basePath needed
}
```

### CSS Asset Path Issues
- Check that CSS files are correctly referenced in HTML output
- Ensure `/_next/static/css/` paths are working
- Rebuild and redeploy after config changes: `npm run build && cp -r out/* /var/www/html/zokratiq.com/out/`

## Email Service Management

### Admin Dashboard Features
- View active subscribers count
- Recent signups with source tracking
- Newsletter performance metrics
- Lead management for different campaigns

### Email Service Features
- Template management with preview
- Campaign creation and scheduling
- Test email functionality
- Subscriber management
- Analytics tracking

### Template Types
- `newsletter` - Recurring newsletters (The Signal)
- `sequence` - Multi-part series (Cracks in the System)
- `transactional` - Welcome emails, confirmations
- `custom` - One-off campaigns

## Email Configuration

### SMTP Settings (via email_settings table)
- **Host**: localhost (default)
- **Port**: 587
- **Encryption**: TLS
- **From Email**: `signal@zokratiq.com` (newsletters) / `hello@zokratiq.com` (transactional)

### Email Headers Standard
```php
$headers = [
    "From: Zokratiq <hello@zokratiq.com>",
    "Reply-To: hello@zokratiq.com",
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=UTF-8"
];
```

## Monitoring & Troubleshooting

### Log Locations
- **Nginx Error Log**: `/var/log/nginx/error.log`
- **PHP Error Log**: Check nginx error log for FastCGI stderr messages
- **Application Logs**: `error_log()` calls in PHP scripts

### Database Queries for Debugging
```sql
-- Check recent signups
SELECT email, status, utm_source, createdAt FROM subscribers ORDER BY createdAt DESC LIMIT 10;

-- Check email templates
SELECT name, template_type, created_at FROM email_templates ORDER BY created_at DESC;

-- Check campaign stats
SELECT name, status, recipient_count, sent_count FROM email_campaigns ORDER BY created_at DESC;
```

### Testing Integration
```bash
# Test signup endpoint
curl -k -X POST -H "Content-Type: application/json" -d '{"email":"test@example.com"}' https://zokratiq.com/your-signup-endpoint.php

# Check database after test
sqlite3 /var/www/html/zokratiq.com/api/subscribers.db "SELECT * FROM subscribers WHERE email = 'test@example.com';"
```

## Integration Checklist

### For New Newsletter Forms:
- [ ] Database integration with subscribers table
- [ ] Email template added to email_templates table
- [ ] Dual email system (subscriber + admin notification)
- [ ] UTM source tracking implemented
- [ ] Admin dashboard integration verified
- [ ] Email service integration confirmed
- [ ] UI styling working (check basePath)
- [ ] Form submission testing completed
- [ ] Email delivery testing completed

### Required Prompt Addition:
```
When creating newsletter signups, integrate with existing email system: database at `/var/www/html/zokratiq.com/api/subscribers.db`, admin dashboard, email service at `/email-service.php`, send emails from `hello@zokratiq.com`, and notify admin of signups.
```

## File Locations Reference

### Core Files
- **Database**: `/var/www/html/zokratiq.com/api/subscribers.db`
- **Admin Dashboard**: `/var/www/html/zokratiq.com/admin-dashboard.php`
- **Email Service**: `/var/www/html/zokratiq.com/email-service.php`
- **Email Schema**: `/var/www/html/zokratiq.com/email-service-schema.sql`

### Newsletter Endpoints
- **Cracks Signup**: `/var/www/html/zokratiq.com/cracks-signup.php`
- **Misfits OS**: `/var/www/html/zokratiq.com/api/misfits-os-form.php`

### Static Files
- **Web Root**: `/var/www/html/zokratiq.com/out/`
- **Next.js Config**: `/var/www/html/zokratiq/next.config.js`
- **Tailwind Config**: `/var/www/html/zokratiq/tailwind.config.js`

This knowledge base should be referenced for all future newsletter integrations and dashboard modifications.