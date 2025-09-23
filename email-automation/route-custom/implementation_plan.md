# Route 1: Custom Build Implementation Plan

**Stack:** Next.js API + SQLite/PostgreSQL + Resend/Postmark + n8n
**Timeline:** 3-4 weeks
**Difficulty:** Medium-High (Full Engineering Control)

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Form Handlers │────│  Email Queue     │────│  Email Provider │
│   (Next.js API) │    │  (n8n/Database)  │    │  (Resend/Post)  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Consent DB    │    │  Automation      │    │  Webhook        │
│   (Compliance)  │    │  Engine (n8n)    │    │  Handlers       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Implementation Phases

### Phase 1: Core Infrastructure (Week 1)

#### 1.1 Database Migration
**Enhance existing SQLite schema:**

```sql
-- File: /migrations/001_email_automation_core.sql

-- Enhance existing subscribers table
ALTER TABLE subscribers ADD COLUMN first_name TEXT;
ALTER TABLE subscribers ADD COLUMN last_name TEXT;
ALTER TABLE subscribers ADD COLUMN company TEXT;
ALTER TABLE subscribers ADD COLUMN form_id INTEGER;
ALTER TABLE subscribers ADD COLUMN consent_timestamp DATETIME;
ALTER TABLE subscribers ADD COLUMN consent_ip TEXT;
ALTER TABLE subscribers ADD COLUMN consent_user_agent TEXT;
ALTER TABLE subscribers ADD COLUMN consent_policy_version TEXT;
ALTER TABLE subscribers ADD COLUMN unsubscribe_token TEXT UNIQUE;

-- Create comprehensive consent log
CREATE TABLE consent_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    form_id INTEGER NOT NULL,
    consent_type TEXT NOT NULL, -- 'double_opt_in', 'single_opt_in', 'transactional'
    consent_status TEXT DEFAULT 'pending', -- 'pending', 'confirmed', 'withdrawn'
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT NOT NULL,
    user_agent TEXT,
    source_url TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    utm_content TEXT,
    utm_term TEXT,
    policy_version TEXT DEFAULT '2025-09-23',
    checkbox_state TEXT, -- JSON: {"marketing": true, "terms": true}

    INDEX idx_consent_email (email),
    INDEX idx_consent_form (form_id),
    INDEX idx_consent_timestamp (timestamp)
);

-- Email queue for automation
CREATE TABLE email_queue (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    template_name TEXT NOT NULL,
    variables JSON NOT NULL, -- {"first_name": "John", "company": "Acme"}
    scheduled_for DATETIME NOT NULL,
    status TEXT DEFAULT 'pending', -- 'pending', 'sent', 'failed', 'cancelled'
    attempts INTEGER DEFAULT 0,
    last_attempt DATETIME,
    error_message TEXT,
    campaign_id TEXT,
    priority INTEGER DEFAULT 5, -- 1=highest, 10=lowest
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_queue_scheduled (scheduled_for, status),
    INDEX idx_queue_email (email),
    INDEX idx_queue_status (status)
);

-- Automation sequences tracking
CREATE TABLE automation_sequences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    form_id INTEGER NOT NULL,
    sequence_name TEXT NOT NULL,
    current_step INTEGER DEFAULT 0,
    status TEXT DEFAULT 'active', -- 'active', 'paused', 'completed', 'cancelled'
    started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    completed_at DATETIME,

    INDEX idx_automation_email (email),
    INDEX idx_automation_sequence (sequence_name, status)
);
```

#### 1.2 API Route Structure

**File: `/api/forms/[form_id]/submit.js`**

```javascript
// Route: POST /api/forms/[form_id]/submit
import { validateFormData, createConsentRecord, enqueueEmails } from '@/lib/email-automation';
import { logGA4Event } from '@/lib/analytics';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { form_id } = req.query;
    const formData = req.body;
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];

    try {
        // 1. Validate form data against form schema
        const validation = await validateFormData(form_id, formData);
        if (!validation.valid) {
            return res.status(400).json({
                error: 'Validation failed',
                fields: validation.errors
            });
        }

        // 2. Create consent record (GDPR compliance)
        const consentId = await createConsentRecord({
            email: formData.email,
            form_id: parseInt(form_id),
            ip_address: clientIP,
            user_agent: userAgent,
            source_url: req.headers.referer,
            utm_data: extractUTMFromHeaders(req),
            form_data: formData
        });

        // 3. Enqueue email sequence
        const sequenceResult = await enqueueEmails(form_id, formData, consentId);

        // 4. Log analytics event
        await logGA4Event('form_submit', {
            form_id,
            email: formData.email,
            source: req.headers.referer
        });

        // 5. Return success response
        res.status(200).json({
            success: true,
            message: 'Form submitted successfully',
            sequence_id: sequenceResult.sequence_id,
            next_steps: getFormTypeNextSteps(form_id)
        });

    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
```

**File: `/api/unsubscribe/index.js`**

```javascript
// Route: GET/POST /api/unsubscribe
import { validateUnsubscribeToken, suppressUser, sendUnsubscribeConfirmation } from '@/lib/unsubscribe';

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Handle one-click unsubscribe links
        const { token } = req.query;

        try {
            const validation = await validateUnsubscribeToken(token);
            if (!validation.valid) {
                return res.redirect('/unsubscribe/error?reason=invalid_token');
            }

            await suppressUser(validation.email, 'link', req.ip, req.headers['user-agent']);
            return res.redirect('/unsubscribe/success');

        } catch (error) {
            return res.redirect('/unsubscribe/error?reason=system_error');
        }
    }

    if (req.method === 'POST') {
        // Handle form-based unsubscribes
        const { email, reason } = req.body;

        try {
            await suppressUser(email, 'manual', req.ip, req.headers['user-agent'], reason);
            await sendUnsubscribeConfirmation(email);

            return res.status(200).json({
                success: true,
                message: 'Unsubscribed successfully'
            });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to process unsubscribe' });
        }
    }
}
```

### Phase 2: Email Provider Integration (Week 2)

#### 2.1 Provider Setup (Recommended: Resend)

**Environment Variables:**
```bash
# .env.local
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_DOMAIN=zokratiq.com
SMTP_FROM_ADDRESS=hello@zokratiq.com
SMTP_REPLY_TO=team@zokratiq.com
UNSUBSCRIBE_SECRET=your-secret-key-here
DATABASE_URL=file:./api/subscribers.db
```

**File: `/lib/email-provider.js`**

```javascript
import { Resend } from 'resend';
import { compileTemplate } from './mjml-compiler';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
    to,
    templateName,
    variables = {},
    type = 'marketing'
}) {
    try {
        // Compile MJML template
        const { html, text, subject } = await compileTemplate(templateName, variables);

        // Generate unsubscribe token for marketing emails
        const unsubscribeToken = type === 'marketing'
            ? generateUnsubscribeToken(to)
            : null;

        // Prepare email headers
        const headers = type === 'marketing' ? {
            'List-Unsubscribe': `<mailto:unsubscribe@zokratiq.com?subject=unsubscribe>, <https://zokratiq.com/unsubscribe?token=${unsubscribeToken}>`,
            'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click'
        } : {};

        // Add unsubscribe URL to variables
        if (unsubscribeToken) {
            variables.unsubscribe_url = `https://zokratiq.com/unsubscribe?token=${unsubscribeToken}`;
        }

        // Send via Resend
        const result = await resend.emails.send({
            from: process.env.SMTP_FROM_ADDRESS,
            to,
            subject: compileVariables(subject, variables),
            html: compileVariables(html, variables),
            text: compileVariables(text, variables),
            headers,
            tags: [
                { name: 'template', value: templateName },
                { name: 'type', value: type }
            ]
        });

        return { success: true, messageId: result.id };

    } catch (error) {
        console.error('Email send error:', error);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}
```

#### 2.2 MJML Compilation Service

**File: `/lib/mjml-compiler.js`**

```javascript
import mjml from 'mjml';
import fs from 'fs/promises';
import path from 'path';

const templateCache = new Map();

export async function compileTemplate(templateName, variables = {}) {
    // Check cache first
    if (templateCache.has(templateName)) {
        const cached = templateCache.get(templateName);
        return {
            html: compileVariables(cached.html, variables),
            text: compileVariables(cached.text, variables),
            subject: compileVariables(cached.subject, variables)
        };
    }

    try {
        // Read MJML template
        const mjmlPath = path.join(process.cwd(), 'out/emails', `${templateName}.mjml`);
        const mjmlContent = await fs.readFile(mjmlPath, 'utf8');

        // Extract subject from MJML title
        const titleMatch = mjmlContent.match(/<mj-title>(.*?)<\/mj-title>/);
        const subject = titleMatch ? titleMatch[1] : 'Email from Zokratiq';

        // Compile MJML to HTML
        const mjmlResult = mjml(mjmlContent, {
            fonts: {
                'Inter': 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap'
            }
        });

        if (mjmlResult.errors.length > 0) {
            console.error('MJML compilation errors:', mjmlResult.errors);
        }

        // Generate plain text version
        const textContent = htmlToText(mjmlResult.html);

        // Cache compiled template
        const compiled = {
            html: mjmlResult.html,
            text: textContent,
            subject
        };
        templateCache.set(templateName, compiled);

        return compiled;

    } catch (error) {
        console.error(`Template compilation error for ${templateName}:`, error);
        throw new Error(`Failed to compile template: ${templateName}`);
    }
}

function compileVariables(content, variables) {
    return content.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return variables[key] || match;
    });
}

function htmlToText(html) {
    // Basic HTML to text conversion
    return html
        .replace(/<[^>]*>/g, '')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/\s+/g, ' ')
        .trim();
}
```

### Phase 3: n8n Automation Engine (Week 3)

#### 3.1 n8n Workflow Setup

**Workflow: Email Queue Processor**

```json
{
  "name": "Zokratiq Email Queue Processor",
  "nodes": [
    {
      "parameters": {
        "cron": "*/5 * * * *",
        "triggerAtStartup": true
      },
      "name": "Every 5 minutes",
      "type": "n8n-nodes-base.cron"
    },
    {
      "parameters": {
        "operation": "executeQuery",
        "query": "SELECT * FROM email_queue WHERE status = 'pending' AND scheduled_for <= datetime('now') ORDER BY priority ASC, scheduled_for ASC LIMIT 50"
      },
      "name": "Get Pending Emails",
      "type": "n8n-nodes-base.sqlite"
    },
    {
      "parameters": {
        "conditions": {
          "number": [
            {
              "value1": "={{$json.id}}",
              "operation": "isNotEmpty"
            }
          ]
        }
      },
      "name": "Has Emails to Send?",
      "type": "n8n-nodes-base.if"
    },
    {
      "parameters": {
        "url": "https://zokratiq.com/api/emails/send-queued",
        "options": {
          "headers": {
            "Authorization": "Bearer {{$env.INTERNAL_API_TOKEN}}"
          }
        },
        "jsonParameters": true,
        "bodyParametersJson": "={{$json}}"
      },
      "name": "Send Email",
      "type": "n8n-nodes-base.httpRequest"
    }
  ],
  "connections": {
    "Every 5 minutes": {
      "main": [["Get Pending Emails"]]
    },
    "Get Pending Emails": {
      "main": [["Has Emails to Send?"]]
    },
    "Has Emails to Send?": {
      "main": [["Send Email"], []]
    }
  }
}
```

#### 3.2 Drip Sequence Handler

**File: `/api/emails/enqueue-sequence.js`**

```javascript
export default async function handler(req, res) {
    const { form_id, email, variables } = req.body;

    try {
        // Get automation sequence for form
        const sequence = await getAutomationSequence(form_id);
        if (!sequence) {
            throw new Error(`No automation sequence found for form_id: ${form_id}`);
        }

        // Create sequence tracking record
        const sequenceId = await createSequenceRecord(email, form_id, sequence.name);

        // Enqueue all emails in sequence
        for (const step of sequence.steps) {
            const scheduledFor = calculateScheduleTime(step.delay);

            await enqueueEmail({
                email,
                template_name: step.template,
                variables: { ...variables, sequence_id: sequenceId },
                scheduled_for: scheduledFor,
                campaign_id: `${form_id}_${step.id}`,
                priority: step.priority || 5
            });
        }

        res.status(200).json({
            success: true,
            sequence_id: sequenceId,
            emails_queued: sequence.steps.length
        });

    } catch (error) {
        console.error('Sequence enqueue error:', error);
        res.status(500).json({ error: 'Failed to enqueue email sequence' });
    }
}

function calculateScheduleTime(delay) {
    const now = new Date();
    const delayMatch = delay.match(/(\d+)([dhm])/);

    if (!delayMatch) return now; // Immediate

    const [, amount, unit] = delayMatch;
    const delayMs = {
        'm': parseInt(amount) * 60 * 1000,         // minutes
        'h': parseInt(amount) * 60 * 60 * 1000,    // hours
        'd': parseInt(amount) * 24 * 60 * 60 * 1000 // days
    }[unit];

    return new Date(now.getTime() + delayMs);
}
```

### Phase 4: Compliance & Monitoring (Week 4)

#### 4.1 GDPR Data Export

**File: `/api/data-export.js`**

```javascript
export default async function handler(req, res) {
    const { email, token } = req.query;

    // Validate request token or require authentication
    const isValid = await validateDataExportRequest(email, token);
    if (!isValid) {
        return res.status(403).json({ error: 'Invalid request' });
    }

    try {
        // Gather all user data
        const userData = await gatherUserData(email);

        // Format as JSON export
        const exportData = {
            email,
            export_date: new Date().toISOString(),
            data: userData,
            retention_policy: 'Data retained for 3 years for legal compliance'
        };

        res.setHeader('Content-Type', 'application/json');
        res.setHeader('Content-Disposition', `attachment; filename="zokratiq-data-${email}.json"`);
        res.status(200).json(exportData);

    } catch (error) {
        res.status(500).json({ error: 'Failed to export data' });
    }
}
```

#### 4.2 Analytics Dashboard

**File: `/components/EmailAnalyticsDashboard.jsx`**

```jsx
import { useState, useEffect } from 'react';
import { LineChart, BarChart } from 'recharts';

export default function EmailAnalyticsDashboard() {
    const [metrics, setMetrics] = useState(null);

    useEffect(() => {
        fetchEmailMetrics();
    }, []);

    const fetchEmailMetrics = async () => {
        const response = await fetch('/api/analytics/email-metrics');
        const data = await response.json();
        setMetrics(data);
    };

    if (!metrics) return <div>Loading...</div>;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
                title="Total Subscribers"
                value={metrics.total_subscribers}
                change={metrics.subscriber_growth}
            />
            <MetricCard
                title="Emails Sent (30d)"
                value={metrics.emails_sent_30d}
                change={metrics.send_volume_change}
            />
            <MetricCard
                title="Average Open Rate"
                value={`${metrics.open_rate}%`}
                change={metrics.open_rate_change}
            />
            <MetricCard
                title="Unsubscribe Rate"
                value={`${metrics.unsubscribe_rate}%`}
                change={metrics.unsub_rate_change}
            />

            <div className="col-span-full">
                <h3 className="text-lg font-semibold mb-4">Form Performance</h3>
                <BarChart
                    width={800}
                    height={300}
                    data={metrics.form_performance}
                >
                    {/* Chart configuration */}
                </BarChart>
            </div>
        </div>
    );
}
```

## Deployment Checklist

### Pre-Deployment
- [ ] Database migrations tested
- [ ] Email templates compiled and validated
- [ ] SMTP/API credentials configured
- [ ] n8n workflows imported and tested
- [ ] Analytics tracking configured

### Security & Compliance
- [ ] Rate limiting implemented
- [ ] CSRF protection enabled
- [ ] Consent logging verified
- [ ] Unsubscribe system tested
- [ ] Data retention policies documented

### Performance
- [ ] Database indices optimized
- [ ] Email queue processing load tested
- [ ] Template compilation caching verified
- [ ] Error handling and logging complete

### Monitoring
- [ ] Email delivery monitoring
- [ ] Queue processing alerts
- [ ] Error rate tracking
- [ ] Compliance audit logging

## Estimated Costs

**Development:** 80-120 hours
**Infrastructure:**
- Resend: $20-100/month (based on volume)
- n8n Cloud: $20-50/month
- Database hosting: $0-25/month (SQLite local, PostgreSQL hosted)

**Total Monthly Operating Cost:** $40-175/month

## Advantages
- ✅ Full control over data and flows
- ✅ Custom business logic implementation
- ✅ No vendor lock-in
- ✅ Unified consent and compliance logging
- ✅ Advanced automation possibilities

## Disadvantages
- ❌ Higher development complexity
- ❌ Ongoing maintenance responsibility
- ❌ Email deliverability management required
- ❌ Longer time to market