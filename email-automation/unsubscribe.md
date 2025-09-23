# Unsubscribe System & GDPR Compliance

**Generated:** 2025-09-23
**Domain:** zokratiq.com
**Compliance:** GDPR, EU/NL regulations, CAN-SPAM

## Overview

This document outlines the implementation of a GDPR-compliant unsubscribe system with one-click functionality, preference management, and comprehensive audit logging.

## 1. Unsubscribe Mechanisms

### 1.1 One-Click Unsubscribe (List-Unsubscribe Header)

**Email Headers Required:**
```
List-Unsubscribe: <mailto:unsubscribe@zokratiq.com?subject=unsubscribe>, <https://zokratiq.com/unsubscribe?token={{unsubscribe_token}}>
List-Unsubscribe-Post: List-Unsubscribe=One-Click
```

**Token Generation:**
```php
// HMAC-SHA256 token with 14-day expiry
$token = hash_hmac('sha256', $user_id . '|' . $expiry_timestamp, $secret_key);
$unsubscribe_url = "https://zokratiq.com/unsubscribe?token=" . base64_encode($user_id . '|' . $expiry_timestamp . '|' . $token);
```

### 1.2 Visible Footer Link

Every marketing email must include a visible unsubscribe link:
```html
<a href="{{unsubscribe_url}}" style="color: #00B3A6; text-decoration: none;">Unsubscribe</a>
```

### 1.3 Email Reply Unsubscribe

Support processing unsubscribe requests sent to reply addresses:
- Monitor replies for keywords: "unsubscribe", "stop", "remove"
- Auto-process and confirm via email
- Add to suppression list immediately

## 2. API Endpoints

### 2.1 GET /unsubscribe?token={token}

**Purpose:** Handle one-click and link-based unsubscribes
**Method:** GET (for email client compatibility)

**Parameters:**
- `token`: Base64 encoded `user_id|expiry|hmac`

**Response:**
- Valid token: Show unsubscribe confirmation page
- Invalid/expired token: Show error with manual unsubscribe form
- Already unsubscribed: Show status confirmation

### 2.2 POST /unsubscribe

**Purpose:** Process unsubscribe form submissions
**Method:** POST

**Parameters:**
- `email`: User email address
- `reason`: Optional reason for unsubscribing
- `preferences`: Array of subscription types to modify

**Validation:**
- Email format validation
- Rate limiting (max 5 requests per IP per minute)
- CAPTCHA for suspicious requests

### 2.3 POST /api/unsubscribe/one-click

**Purpose:** Handle List-Unsubscribe-Post headers
**Method:** POST

**Headers Required:**
```
List-Unsubscribe: One-Click
```

**Parameters:**
- Extract user from authentication or token
- Immediate suppression without confirmation page

## 3. Database Schema

### 3.1 Unsubscribe Events Table

```sql
CREATE TABLE unsubscribe_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    user_id INTEGER,
    unsubscribe_method TEXT NOT NULL, -- 'link', 'one_click', 'reply', 'manual'
    reason TEXT,
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    token_used TEXT,
    campaign_id INTEGER,

    INDEX idx_unsubscribe_email (email),
    INDEX idx_unsubscribe_timestamp (timestamp)
);
```

### 3.2 Suppression List Table

```sql
CREATE TABLE suppression_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    suppression_type TEXT DEFAULT 'all', -- 'all', 'marketing', 'newsletter'
    suppressed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    reason TEXT,
    source TEXT, -- 'unsubscribe', 'bounce', 'complaint', 'manual'

    INDEX idx_suppression_email (email),
    INDEX idx_suppression_type (suppression_type)
);
```

### 3.3 Consent Log Enhancement

```sql
ALTER TABLE consent_log ADD COLUMN unsubscribed_at DATETIME NULL;
ALTER TABLE consent_log ADD COLUMN unsubscribe_reason TEXT NULL;
ALTER TABLE consent_log ADD COLUMN suppression_type TEXT DEFAULT 'none';
```

## 4. Preference Center

### 4.1 URL Structure

`https://zokratiq.com/preferences?token={token}`

### 4.2 Subscription Types

**Marketing Communications:**
- [ ] The Signal Newsletter (weekly insights)
- [ ] Product Updates (monthly)
- [ ] Event Invitations (as announced)

**Transactional Communications:**
- [x] Contact Form Receipts (cannot unsubscribe)
- [x] Lead Magnet Deliveries (cannot unsubscribe)
- [x] Booking Confirmations (cannot unsubscribe)

### 4.3 Frequency Options

- Weekly
- Bi-weekly
- Monthly
- Major announcements only

## 5. Implementation Routes

### 5.1 Route 1: Custom Implementation

**Files Required:**
- `/api/unsubscribe/index.php` - Main unsubscribe handler
- `/api/unsubscribe/one-click.php` - List-Unsubscribe-Post handler
- `/preferences.php` - Preference center page
- `/components/UnsubscribeForm.jsx` - React form component

**Dependencies:**
- Existing SQLite database
- HMAC token generation/validation
- Email template system

### 5.2 Route 2: AI Email Tool Integration

**MailerLite Integration:**
```php
// Sync unsubscribes to MailerLite
$mailerlite = new MailerLite\MailerLite(['api_key' => $api_key]);
$mailerlite->subscribers->delete($email);

// Mirror to local suppression list
$stmt = $pdo->prepare("INSERT INTO suppression_list (email, source) VALUES (?, 'mailerlite_sync')");
$stmt->execute([$email]);
```

**ConvertKit Integration:**
```php
// ConvertKit unsubscribe
$convertkit = new ConvertKit\ConvertKit($api_key, $api_secret);
$convertkit->unsubscribe_email($email);
```

## 6. Compliance Requirements

### 6.1 GDPR Requirements

**Data Retention:**
- Keep unsubscribe events for 3 years (legal requirement)
- Purge suppression list entries only upon explicit request
- Maintain audit trail for data protection authorities

**Right to be Forgotten:**
```sql
-- Complete data deletion procedure
DELETE FROM subscribers WHERE email = ?;
DELETE FROM consent_log WHERE email = ?;
DELETE FROM unsubscribe_events WHERE email = ?;
DELETE FROM suppression_list WHERE email = ?;
-- Log deletion event for audit
INSERT INTO data_deletion_log (email, deleted_at, requester_ip) VALUES (?, NOW(), ?);
```

### 6.2 Response Time Requirements

- **One-click unsubscribe:** Immediate (< 2 seconds)
- **Link-based unsubscribe:** Within 10 business days (aim for immediate)
- **Email reply unsubscribe:** Within 3 business days
- **Manual requests:** Within 48 hours

### 6.3 Confirmation Requirements

**Required Confirmations:**
1. Email confirmation of unsubscribe action
2. Clear statement of what they're unsubscribed from
3. Option to resubscribe if done in error
4. Contact information for questions

**Template:**
```
Subject: Unsubscribe confirmed - Zokratiq

Hi {{first_name}},

You've been successfully unsubscribed from our marketing emails.

What this means:
✓ No more newsletter emails
✓ No more product updates
✗ You'll still receive receipts for forms you submit

Questions? Reply to this email or contact hello@zokratiq.com

Want to resubscribe? Visit: https://zokratiq.com/newsletter
```

## 7. Testing & Quality Assurance

### 7.1 Test Matrix

**One-Click Unsubscribe:**
- [ ] Gmail web client
- [ ] Outlook desktop
- [ ] Apple Mail
- [ ] Mobile email apps

**Link-Based Unsubscribe:**
- [ ] Valid token processing
- [ ] Expired token handling
- [ ] Invalid token error handling
- [ ] Already unsubscribed status

**Edge Cases:**
- [ ] Double unsubscribe attempts
- [ ] Malformed tokens
- [ ] High-volume unsubscribe requests
- [ ] Cross-domain referrer issues

### 7.2 Monitoring & Alerts

**Metrics to Track:**
- Unsubscribe rate by campaign
- Method breakdown (link vs one-click)
- Time to process unsubscribe requests
- Failed unsubscribe attempts

**Alerts:**
- Unsubscribe rate > 5% for single campaign
- Failed one-click processing
- Suppression list growth > 10% week-over-week

## 8. Legal & Audit Trail

### 8.1 Documentation Requirements

For each unsubscribe event, log:
- Email address
- Timestamp (UTC)
- IP address
- User agent string
- Unsubscribe method
- Campaign that triggered request
- Reason provided (if any)

### 8.2 Audit Queries

**Monthly Unsubscribe Report:**
```sql
SELECT
    DATE(timestamp) as date,
    unsubscribe_method,
    COUNT(*) as count
FROM unsubscribe_events
WHERE timestamp >= DATE_SUB(NOW(), INTERVAL 1 MONTH)
GROUP BY DATE(timestamp), unsubscribe_method
ORDER BY date DESC;
```

**Compliance Check:**
```sql
-- Verify all unsubscribes processed within SLA
SELECT email, timestamp, unsubscribe_method
FROM unsubscribe_events
WHERE email NOT IN (SELECT email FROM suppression_list)
AND timestamp < DATE_SUB(NOW(), INTERVAL 1 HOUR);
```

## 9. Implementation Checklist

### Phase 1: Core System
- [ ] Database tables created
- [ ] Token generation/validation functions
- [ ] Basic unsubscribe endpoint
- [ ] Suppression list integration

### Phase 2: Compliance
- [ ] List-Unsubscribe headers added to all emails
- [ ] One-click unsubscribe endpoint
- [ ] Preference center implementation
- [ ] Audit logging complete

### Phase 3: Integration
- [ ] Email template updates
- [ ] Provider sync (MailerLite/ConvertKit)
- [ ] Monitoring dashboard
- [ ] Testing & QA complete

### Phase 4: Go-Live
- [ ] Legal review complete
- [ ] Staff training completed
- [ ] Monitoring alerts configured
- [ ] Documentation published