-- Email Service Database Schema
-- Extends existing subscribers table with email management features

-- Email Templates table
CREATE TABLE IF NOT EXISTS email_templates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    subject TEXT NOT NULL,
    html_content TEXT NOT NULL,
    text_content TEXT,
    template_type TEXT DEFAULT 'custom', -- 'newsletter', 'custom'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Campaigns table  
CREATE TABLE IF NOT EXISTS email_campaigns (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    template_id INTEGER,
    subject TEXT NOT NULL,
    from_email TEXT DEFAULT 'signal@zokratiq.com',
    from_name TEXT DEFAULT 'The Signal by Zokratiq',
    status TEXT DEFAULT 'draft', -- 'draft', 'scheduled', 'sending', 'sent', 'failed'
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

-- Email Sends table (individual email tracking)
CREATE TABLE IF NOT EXISTS email_sends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    campaign_id INTEGER NOT NULL,
    subscriber_email TEXT NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'bounced'
    sent_at TIMESTAMP NULL,
    opened_at TIMESTAMP NULL,
    clicked_at TIMESTAMP NULL,
    error_message TEXT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (campaign_id) REFERENCES email_campaigns (id)
);

-- Email Settings table
CREATE TABLE IF NOT EXISTS email_settings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT OR IGNORE INTO email_settings (setting_key, setting_value) VALUES
('smtp_host', 'localhost'),
('smtp_port', '587'),
('smtp_username', ''),
('smtp_password', ''),
('smtp_encryption', 'tls'),
('from_email', 'signal@zokratiq.com'),
('from_name', 'The Signal by Zokratiq'),
('reply_to_email', 'signal@zokratiq.com'),
('unsubscribe_url', 'https://zokratiq.com/unsubscribe'),
('track_opens', '1'),
('track_clicks', '1');

-- Insert The Signal template
INSERT OR IGNORE INTO email_templates (name, subject, html_content, text_content, template_type) 
SELECT 
    'The Signal Newsletter', 
    'The Signal — {{week_date}}',
    (SELECT CASE WHEN EXISTS (SELECT 1 FROM email_templates WHERE name = 'The Signal Newsletter') 
     THEN (SELECT html_content FROM email_templates WHERE name = 'The Signal Newsletter')
     ELSE 'Template content will be loaded from the-signal-template.html' END),
    'Plain text version will be loaded from the-signal-template-plain.txt',
    'newsletter'
WHERE NOT EXISTS (SELECT 1 FROM email_templates WHERE name = 'The Signal Newsletter');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_campaigns_status ON email_campaigns(status);
CREATE INDEX IF NOT EXISTS idx_sends_campaign ON email_sends(campaign_id);
CREATE INDEX IF NOT EXISTS idx_sends_email ON email_sends(subscriber_email);
CREATE INDEX IF NOT EXISTS idx_sends_status ON email_sends(status);