-- GDPR Compliant Consent & Audit Trail Schema
-- Generated: 2025-09-23
-- Compliance: GDPR Art. 7, Art. 30 (Records of Processing Activities)

-- ============================================================================
-- CONSENT MANAGEMENT TABLES
-- ============================================================================

-- Primary consent log for all user interactions
CREATE TABLE IF NOT EXISTS consent_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    form_id INTEGER NOT NULL,

    -- Consent Details
    consent_type TEXT NOT NULL CHECK (consent_type IN (
        'double_opt_in',
        'single_opt_in',
        'transactional',
        'legitimate_interest'
    )),
    consent_status TEXT NOT NULL DEFAULT 'pending' CHECK (consent_status IN (
        'pending',      -- DOI sent, awaiting confirmation
        'confirmed',    -- User confirmed subscription
        'withdrawn',    -- User unsubscribed/withdrew consent
        'expired'       -- Consent expired (2 years GDPR rule)
    )),

    -- GDPR Required Fields
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    ip_address TEXT NOT NULL,
    user_agent TEXT NOT NULL,
    source_url TEXT NOT NULL,

    -- Marketing Attribution
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,

    -- Policy & Legal Basis
    policy_version TEXT NOT NULL DEFAULT '2025-09-23',
    legal_basis TEXT NOT NULL DEFAULT 'consent' CHECK (legal_basis IN (
        'consent',
        'contract',
        'legal_obligation',
        'vital_interests',
        'public_task',
        'legitimate_interests'
    )),

    -- Checkbox States (JSON)
    checkbox_state TEXT NOT NULL, -- JSON: {"marketing": true, "terms": true, "privacy": true}

    -- Confirmation Details (for DOI)
    confirmed_at DATETIME NULL,
    confirmed_ip TEXT NULL,
    confirmed_user_agent TEXT NULL,
    confirmation_token TEXT NULL,

    -- Withdrawal Details
    withdrawn_at DATETIME NULL,
    withdrawal_reason TEXT NULL,
    withdrawal_method TEXT CHECK (withdrawal_method IN (
        'unsubscribe_link',
        'one_click',
        'email_reply',
        'phone_call',
        'manual_request',
        'bounce_suppression',
        'complaint_suppression'
    )),

    -- Data Retention
    retention_period INTEGER DEFAULT 1095, -- 3 years in days
    expires_at DATETIME GENERATED ALWAYS AS (
        datetime(timestamp, '+' || retention_period || ' days')
    ) STORED,

    -- Audit Trail
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    -- Indexes for performance
    INDEX idx_consent_email (email),
    INDEX idx_consent_form (form_id),
    INDEX idx_consent_timestamp (timestamp),
    INDEX idx_consent_status (consent_status),
    INDEX idx_consent_expires (expires_at)
);

-- Communication preferences per subscriber
CREATE TABLE IF NOT EXISTS communication_preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,

    -- Subscription Preferences
    newsletter BOOLEAN DEFAULT FALSE,
    product_updates BOOLEAN DEFAULT FALSE,
    event_invitations BOOLEAN DEFAULT FALSE,
    educational_content BOOLEAN DEFAULT FALSE,

    -- Frequency Preferences
    frequency TEXT DEFAULT 'weekly' CHECK (frequency IN (
        'daily', 'weekly', 'biweekly', 'monthly', 'quarterly'
    )),

    -- Format Preferences
    email_format TEXT DEFAULT 'html' CHECK (email_format IN ('html', 'text', 'both')),
    language TEXT DEFAULT 'en-GB',
    timezone TEXT DEFAULT 'Europe/Amsterdam',

    -- Metadata
    last_updated DATETIME DEFAULT CURRENT_TIMESTAMP,
    preference_source TEXT DEFAULT 'default', -- 'form', 'preference_center', 'api'

    INDEX idx_prefs_email (email)
);

-- ============================================================================
-- SUPPRESSION & UNSUBSCRIBE MANAGEMENT
-- ============================================================================

-- Global suppression list
CREATE TABLE IF NOT EXISTS suppression_list (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,

    -- Suppression Details
    suppression_type TEXT NOT NULL DEFAULT 'all' CHECK (suppression_type IN (
        'all',          -- Complete suppression
        'marketing',    -- Marketing emails only
        'newsletter',   -- Newsletter only
        'promotional'   -- Promotional content only
    )),

    -- Suppression Reason
    reason TEXT NOT NULL CHECK (reason IN (
        'user_request',     -- User unsubscribed
        'bounce_hard',      -- Hard bounce (invalid email)
        'bounce_soft',      -- Soft bounce (temporary issue)
        'spam_complaint',   -- User marked as spam
        'policy_violation', -- Violated terms
        'data_quality',     -- Invalid/fake email detected
        'manual_admin'      -- Admin suppression
    )),

    -- Legal/Audit Trail
    suppressed_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL,
    suppressed_by TEXT DEFAULT 'system', -- 'user', 'system', 'admin', 'bounce_handler'
    ip_address TEXT,
    user_agent TEXT,

    -- Re-engagement
    can_resubscribe BOOLEAN DEFAULT TRUE,
    resubscribed_at DATETIME NULL,

    -- External Provider Sync
    mailerlite_suppressed BOOLEAN DEFAULT FALSE,
    resend_suppressed BOOLEAN DEFAULT FALSE,
    sync_status TEXT DEFAULT 'pending' CHECK (sync_status IN (
        'pending', 'synced', 'failed'
    )),

    INDEX idx_suppression_email (email),
    INDEX idx_suppression_type (suppression_type),
    INDEX idx_suppression_reason (reason),
    INDEX idx_suppression_date (suppressed_at)
);

-- Detailed unsubscribe events
CREATE TABLE IF NOT EXISTS unsubscribe_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,

    -- Unsubscribe Method
    unsubscribe_method TEXT NOT NULL CHECK (unsubscribe_method IN (
        'link',         -- Clicked unsubscribe link in email
        'one_click',    -- List-Unsubscribe header
        'reply',        -- Replied with unsubscribe request
        'phone',        -- Called to unsubscribe
        'form',         -- Preference center form
        'manual'        -- Manual admin action
    )),

    -- Context
    campaign_id TEXT,           -- Which campaign triggered unsubscribe
    email_template TEXT,        -- Which email template
    template_send_date DATETIME, -- When that email was sent

    -- User Feedback
    reason_category TEXT CHECK (reason_category IN (
        'too_frequent',
        'not_relevant',
        'never_signed_up',
        'poor_content',
        'technical_issues',
        'other'
    )),
    reason_text TEXT,

    -- Technical Details
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    token_used TEXT,

    -- Processing
    processed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    processing_duration_ms INTEGER,

    INDEX idx_unsubscribe_email (email),
    INDEX idx_unsubscribe_method (unsubscribe_method),
    INDEX idx_unsubscribe_campaign (campaign_id),
    INDEX idx_unsubscribe_date (processed_at)
);

-- ============================================================================
-- DATA SUBJECT RIGHTS (GDPR)
-- ============================================================================

-- Data export requests (Right to Data Portability - Art. 20)
CREATE TABLE IF NOT EXISTS data_export_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,

    -- Request Details
    request_type TEXT NOT NULL CHECK (request_type IN (
        'data_export',      -- Art. 20 - Data portability
        'data_access',      -- Art. 15 - Right of access
        'data_rectification', -- Art. 16 - Right to rectification
        'data_deletion',    -- Art. 17 - Right to erasure
        'processing_restriction' -- Art. 18 - Right to restriction
    )),

    -- Legal Verification
    requester_ip TEXT NOT NULL,
    verification_method TEXT DEFAULT 'email' CHECK (verification_method IN (
        'email', 'form', 'phone', 'in_person'
    )),
    identity_verified BOOLEAN DEFAULT FALSE,
    verification_date DATETIME,

    -- Processing
    status TEXT DEFAULT 'pending' CHECK (status IN (
        'pending',      -- Request received
        'verifying',    -- Identity verification in progress
        'processing',   -- Request being processed
        'completed',    -- Request fulfilled
        'rejected',     -- Request rejected (with reason)
        'cancelled'     -- Request cancelled by requester
    )),

    -- Fulfillment
    requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_date DATETIME GENERATED ALWAYS AS (
        datetime(requested_at, '+30 days')  -- GDPR 30-day deadline
    ) STORED,
    fulfilled_at DATETIME,
    response_method TEXT CHECK (response_method IN (
        'email', 'download_link', 'postal_mail', 'secure_portal'
    )),

    -- Data Package (for exports)
    export_file_path TEXT,
    export_file_size INTEGER,
    export_format TEXT DEFAULT 'json' CHECK (export_format IN ('json', 'csv', 'xml', 'pdf')),

    -- Rejection Reason
    rejection_reason TEXT,
    rejection_legal_basis TEXT,

    -- Audit
    processed_by TEXT, -- Staff member who processed
    notes TEXT,

    INDEX idx_data_request_email (email),
    INDEX idx_data_request_status (status),
    INDEX idx_data_request_due (due_date)
);

-- Data retention schedule tracking
CREATE TABLE IF NOT EXISTS data_retention_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    data_type TEXT NOT NULL, -- 'consent', 'subscriber', 'communication', 'analytics'

    -- Retention Policy
    retention_category TEXT NOT NULL CHECK (retention_category IN (
        'legal_obligation',  -- Must keep for legal reasons
        'legitimate_interest', -- Business need to retain
        'consent_based',     -- Based on user consent
        'contractual'        -- Part of contract fulfillment
    )),
    retention_period_days INTEGER NOT NULL,

    -- Lifecycle Tracking
    data_created DATETIME NOT NULL,
    scheduled_deletion DATETIME NOT NULL,
    actual_deletion DATETIME,
    deletion_reason TEXT,

    -- Legal Basis
    legal_basis TEXT NOT NULL,
    policy_reference TEXT,

    INDEX idx_retention_email (email),
    INDEX idx_retention_deletion (scheduled_deletion),
    INDEX idx_retention_type (data_type)
);

-- ============================================================================
-- BREACH NOTIFICATION (GDPR Art. 33-34)
-- ============================================================================

-- Data breach incident log
CREATE TABLE IF NOT EXISTS data_breach_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    incident_id TEXT UNIQUE NOT NULL,

    -- Incident Classification
    breach_type TEXT NOT NULL CHECK (breach_type IN (
        'confidentiality',  -- Unauthorized access/disclosure
        'integrity',       -- Unauthorized alteration
        'availability'     -- Loss of access/destruction
    )),
    severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),

    -- Impact Assessment
    affected_records INTEGER NOT NULL DEFAULT 0,
    affected_data_types TEXT NOT NULL, -- JSON array: ["email", "name", "ip_address"]
    risk_level TEXT CHECK (risk_level IN ('minimal', 'low', 'medium', 'high')),

    -- Timeline
    incident_discovered DATETIME NOT NULL,
    incident_occurred DATETIME, -- Estimated if unknown
    contained_at DATETIME,
    resolved_at DATETIME,

    -- Notifications
    authority_notified BOOLEAN DEFAULT FALSE,
    authority_notification_date DATETIME,
    subjects_notified BOOLEAN DEFAULT FALSE,
    subjects_notification_date DATETIME,

    -- Details
    description TEXT NOT NULL,
    root_cause TEXT,
    remedial_actions TEXT,
    prevention_measures TEXT,

    -- Legal
    requires_authority_notification BOOLEAN DEFAULT TRUE,
    requires_subject_notification BOOLEAN DEFAULT FALSE,
    notification_deadline DATETIME,

    -- Audit
    reported_by TEXT NOT NULL,
    investigated_by TEXT,

    INDEX idx_breach_discovered (incident_discovered),
    INDEX idx_breach_severity (severity)
);

-- ============================================================================
-- AUDIT TRIGGERS (Automatic Logging)
-- ============================================================================

-- Update timestamp trigger for consent_log
CREATE TRIGGER IF NOT EXISTS update_consent_timestamp
AFTER UPDATE ON consent_log
FOR EACH ROW
BEGIN
    UPDATE consent_log SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

-- Automatic suppression list sync when consent withdrawn
CREATE TRIGGER IF NOT EXISTS sync_suppression_on_withdrawal
AFTER UPDATE OF consent_status ON consent_log
FOR EACH ROW
WHEN NEW.consent_status = 'withdrawn'
BEGIN
    INSERT OR IGNORE INTO suppression_list (
        email, suppression_type, reason, suppressed_by
    ) VALUES (
        NEW.email, 'marketing', 'user_request', 'auto_trigger'
    );
END;

-- Data retention enforcement
CREATE TRIGGER IF NOT EXISTS enforce_data_retention
AFTER INSERT ON consent_log
FOR EACH ROW
BEGIN
    INSERT INTO data_retention_log (
        email, data_type, retention_category, retention_period_days,
        data_created, scheduled_deletion, legal_basis
    ) VALUES (
        NEW.email, 'consent', 'legal_obligation', NEW.retention_period,
        NEW.timestamp, datetime(NEW.timestamp, '+' || NEW.retention_period || ' days'),
        NEW.legal_basis
    );
END;

-- ============================================================================
-- VIEWS FOR REPORTING
-- ============================================================================

-- Active subscribers view (for easy querying)
CREATE VIEW IF NOT EXISTS active_subscribers AS
SELECT DISTINCT
    cl.email,
    cl.form_id,
    cl.consent_type,
    cl.confirmed_at,
    cl.utm_source,
    cl.utm_campaign,
    cp.newsletter,
    cp.frequency,
    cp.language
FROM consent_log cl
LEFT JOIN communication_preferences cp ON cl.email = cp.email
WHERE cl.consent_status = 'confirmed'
  AND cl.email NOT IN (SELECT email FROM suppression_list WHERE suppression_type IN ('all', 'marketing'))
ORDER BY cl.confirmed_at DESC;

-- Compliance reporting view
CREATE VIEW IF NOT EXISTS gdpr_compliance_report AS
SELECT
    date(timestamp) as consent_date,
    COUNT(*) as total_consents,
    COUNT(CASE WHEN consent_status = 'confirmed' THEN 1 END) as confirmed_consents,
    COUNT(CASE WHEN consent_status = 'withdrawn' THEN 1 END) as withdrawn_consents,
    COUNT(CASE WHEN consent_type = 'double_opt_in' THEN 1 END) as double_opt_ins,
    AVG(CASE WHEN confirmed_at IS NOT NULL
        THEN (julianday(confirmed_at) - julianday(timestamp)) * 24 * 60
        END) as avg_confirmation_time_minutes
FROM consent_log
GROUP BY date(timestamp)
ORDER BY consent_date DESC;

-- ============================================================================
-- SAMPLE DATA FOR TESTING
-- ============================================================================

-- Insert sample consent records (for development/testing)
-- Remove in production!
/*
INSERT INTO consent_log (
    email, form_id, consent_type, consent_status, ip_address, user_agent,
    source_url, utm_campaign, checkbox_state, policy_version
) VALUES
(
    'test@example.com', 2, 'double_opt_in', 'confirmed', '192.168.1.100',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    'https://zokratiq.com/labs', 'newsletter_signup',
    '{"marketing": true, "terms": true, "privacy": true}', '2025-09-23'
);
*/