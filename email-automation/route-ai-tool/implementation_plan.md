# Route 2: AI Email Tool + n8n Implementation Plan

**Stack:** MailerLite/ConvertKit/Brevo + n8n + Resend (transactional)
**Timeline:** 1-2 weeks
**Difficulty:** Low-Medium (Rapid Deployment)

## Architecture Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Form Handlers │────│   MailerLite     │────│   n8n Mirror   │
│   (Webhooks)    │    │   (Marketing)    │    │   (Local DB)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Resend        │    │   DOI Templates  │    │   Analytics     │
│   (Transactional)│    │   (Marketing)    │    │   (GA4/Local)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## Provider Recommendation: MailerLite

**Why MailerLite:**
- ✅ GDPR compliant (EU-based)
- ✅ Built-in double opt-in
- ✅ Advanced automation builder
- ✅ Reasonable pricing (free up to 1000 subscribers)
- ✅ Good API and webhook support
- ✅ List-Unsubscribe header support

**Alternative:** ConvertKit (if creator-focused features needed)
**Alternative:** Brevo (if transactional + marketing combined)

## Implementation Phases

### Phase 1: MailerLite Setup & Form Migration (Week 1)

#### 1.1 MailerLite Account Configuration

**Account Setup:**
1. Create MailerLite account
2. Verify domain (zokratiq.com)
3. Configure DKIM/SPF records
4. Set up sender authentication

**Groups/Segments Creation:**
```
Groups to Create:
├── Newsletter Subscribers (main list)
├── LinkedIn Audit Leads
├── Misfits OS Leads
├── Talent Inquiry Leads
├── Beta Collective Members
└── Contact Form Inquiries (transactional only)

Segments by Source:
├── Source: Labs Page
├── Source: Resources Page
├── Source: Cracks Newsletter
├── UTM Campaign: [Dynamic]
└── Lead Score: High/Medium/Low
```

#### 1.2 Form Integration Mapping

**Newsletter Forms (Double Opt-in Required):**

```html
<!-- Replace existing forms with MailerLite embeds -->

<!-- Labs Newsletter (form_id=2) -->
<div class="ml-embedded" data-form="abc123"></div>
<script>
  (function(m,a,i,l,e,r){ m['MailerLiteObject']=e;function f(){
    var c={ a:arguments,q:[]};var r=this.push(c);return "number"!=typeof r?r:f.bind(c.q);}
    f.q=f.q||[];m[e]=m[e]||f.bind(f.q);m[e].q=m[e].q||f.q;r=a.createElement(i);
    var _=a.getElementsByTagName(i)[0];r.async=1;r.src=l+'?v'+(~~(new Date().getTime()/1000000));
    _.parentNode.insertBefore(r,_);})(window, document, 'script', 'https://static.mailerlite.com/js/universal.js', 'ml');

  ml('account', '123456');
</script>
```

**Custom Forms (API Integration):**

```javascript
// File: /lib/mailerlite-integration.js
import MailerLite from '@mailerlite/mailerlite-nodejs';

const mailerlite = new MailerLite({
  api_key: process.env.MAILERLITE_API_KEY,
});

export async function subscribeToNewsletter(email, firstName = '', utmData = {}) {
  try {
    const subscriber = await mailerlite.subscribers.createOrUpdate({
      email,
      fields: {
        name: firstName,
        utm_source: utmData.utm_source,
        utm_campaign: utmData.utm_campaign,
        signup_source: 'website'
      },
      groups: ['4567890123'], // Newsletter group ID
      status: 'unconfirmed', // Will trigger DOI
    });

    return { success: true, subscriber_id: subscriber.id };
  } catch (error) {
    console.error('MailerLite subscription error:', error);
    throw error;
  }
}

export async function addLeadMagnetSubscriber(email, leadMagnetType, formData) {
  const groupMapping = {
    'misfits_os': '1234567890',
    'linkedin_audit': '2345678901',
    'talent_inquiry': '3456789012'
  };

  try {
    const subscriber = await mailerlite.subscribers.createOrUpdate({
      email,
      fields: {
        name: formData.name || formData.first_name,
        company: formData.company,
        role: formData.role,
        lead_source: leadMagnetType,
        lead_score: calculateLeadScore(formData)
      },
      groups: [groupMapping[leadMagnetType]],
      status: 'active', // No DOI for lead magnets
    });

    return { success: true, subscriber_id: subscriber.id };
  } catch (error) {
    console.error('MailerLite lead magnet error:', error);
    throw error;
  }
}
```

#### 1.3 Automation Setup in MailerLite

**Newsletter Welcome Sequence:**

```
Trigger: Subscriber confirms DOI in "Newsletter Subscribers" group
Automation Steps:
1. [Immediate] Send "Welcome to The Signal" email
2. [Wait 2 days] Send "Reality Exploration Guide" email
3. [Wait 3 days] Send "How We Work" email
4. [Wait 3 days] Send "Proof Case Studies" email
5. [Wait 4 days] Send "Book Discovery Call" email

Conditions:
- Stop if subscriber unsubscribes
- Skip if subscriber is in "Customer" tag
```

**Misfits OS Lead Sequence:**

```
Trigger: Added to "Misfits OS Leads" group
Automation Steps:
1. [Immediate] Send "Misfits OS Blueprint Download" email
2. [Wait 4 days] Send "Implementation Tips" email
3. [Wait 6 days] Send "Consultation Offer" email

Conditions:
- Tag with "Misfits OS Downloaded"
- Add lead score based on company size/role
```

### Phase 2: n8n Integration & Data Mirroring (Days 3-5)

#### 2.1 Webhook Processing

**n8n Workflow: MailerLite → Local Database Sync**

```json
{
  "name": "MailerLite Sync to Local DB",
  "nodes": [
    {
      "parameters": {
        "path": "mailerlite-webhook",
        "options": {}
      },
      "name": "MailerLite Webhook",
      "type": "n8n-nodes-base.webhook"
    },
    {
      "parameters": {
        "conditions": {
          "string": [
            {
              "value1": "={{$json.type}}",
              "value2": "subscriber.created"
            }
          ]
        }
      },
      "name": "Is Subscriber Created?",
      "type": "n8n-nodes-base.if"
    },
    {
      "parameters": {
        "operation": "insert",
        "table": "subscribers",
        "columns": "email, first_name, status, source, mailerlite_id, created_at",
        "values": "={{$json.data.email}}, {{$json.data.fields.name}}, {{$json.data.status}}, mailerlite, {{$json.data.id}}, {{$json.data.created_at}}"
      },
      "name": "Insert to Local DB",
      "type": "n8n-nodes-base.sqlite"
    },
    {
      "parameters": {
        "url": "https://zokratiq.com/api/analytics/track-event",
        "jsonParameters": true,
        "bodyParametersJson": {
          "event": "newsletter_signup",
          "email": "={{$json.data.email}}",
          "source": "mailerlite",
          "utm_campaign": "={{$json.data.fields.utm_campaign}}"
        }
      },
      "name": "Track GA4 Event",
      "type": "n8n-nodes-base.httpRequest"
    }
  ]
}
```

#### 2.2 Form Handler Enhancement

**File: `/api/forms/[form_id]/submit-mailerlite.js`**

```javascript
import { subscribeToNewsletter, addLeadMagnetSubscriber } from '@/lib/mailerlite-integration';
import { sendTransactionalEmail } from '@/lib/resend-integration';
import { logConsentEvent } from '@/lib/compliance';

export default async function handler(req, res) {
    const { form_id } = req.query;
    const formData = req.body;

    try {
        // 1. Log consent (GDPR)
        await logConsentEvent({
            email: formData.email,
            form_id: parseInt(form_id),
            ip_address: req.headers['x-forwarded-for'],
            user_agent: req.headers['user-agent'],
            source_url: req.headers.referer,
            consent_type: getConsentType(form_id)
        });

        // 2. Route to appropriate handler
        let result;
        switch (parseInt(form_id)) {
            case 2: // Newsletter signup
                result = await subscribeToNewsletter(
                    formData.email,
                    formData.first_name,
                    extractUTMData(req)
                );
                break;

            case 4: // Misfits OS lead magnet
                result = await addLeadMagnetSubscriber(
                    formData.email,
                    'misfits_os',
                    formData
                );
                // Send immediate transactional email
                await sendTransactionalEmail({
                    to: formData.email,
                    template: 'misfits_os_delivery',
                    variables: formData
                });
                break;

            // ... other form handlers
        }

        // 3. Send admin notification if needed
        if (shouldNotifyAdmin(form_id)) {
            await sendTransactionalEmail({
                to: process.env.OWNER_NOTIFICATION_EMAIL,
                template: 'admin_notify_form_submission',
                variables: { form_id, ...formData }
            });
        }

        res.status(200).json({
            success: true,
            message: getSuccessMessage(form_id),
            mailerlite_id: result.subscriber_id
        });

    } catch (error) {
        console.error('Form submission error:', error);
        res.status(500).json({ error: 'Submission failed' });
    }
}
```

### Phase 3: Transactional Email Setup (Days 4-6)

#### 3.1 Resend Integration for Transactional Emails

**Why Resend for Transactional:**
- ✅ Better deliverability for transactional emails
- ✅ Real-time sending (no automation delays)
- ✅ Better API for dynamic content
- ✅ Separate reputation from marketing emails

**File: `/lib/resend-integration.js`**

```javascript
import { Resend } from 'resend';
import { compileTemplate } from './mjml-compiler';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTransactionalEmail({
    to,
    template,
    variables = {},
    attachments = []
}) {
    try {
        const { html, text, subject } = await compileTemplate(template, variables);

        const emailData = {
            from: process.env.TRANSACTIONAL_FROM_ADDRESS || 'hello@zokratiq.com',
            to,
            subject,
            html,
            text,
            tags: [
                { name: 'type', value: 'transactional' },
                { name: 'template', value: template }
            ]
        };

        if (attachments.length > 0) {
            emailData.attachments = attachments;
        }

        const result = await resend.emails.send(emailData);

        // Log successful send
        await logEmailEvent({
            email: to,
            template,
            provider: 'resend',
            message_id: result.id,
            status: 'sent'
        });

        return { success: true, messageId: result.id };

    } catch (error) {
        // Log failed send
        await logEmailEvent({
            email: to,
            template,
            provider: 'resend',
            status: 'failed',
            error: error.message
        });

        throw error;
    }
}
```

#### 3.2 Template System Optimization

**Mixed Template Strategy:**
- Marketing emails: MailerLite templates (visual editor)
- Transactional emails: MJML templates (version controlled)

**File: `/lib/template-router.js`**

```javascript
export function getTemplateProvider(templateName) {
    const transactionalTemplates = [
        'contact_user_receipt',
        'contact_admin_notify',
        'leadmagnet_delivery',
        'booking_confirmation',
        'data_export_confirmation'
    ];

    return transactionalTemplates.includes(templateName)
        ? 'resend'
        : 'mailerlite';
}

export async function sendEmail({ to, template, variables, type = 'marketing' }) {
    const provider = type === 'transactional' ? 'resend' : 'mailerlite';

    if (provider === 'resend') {
        return await sendTransactionalEmail({ to, template, variables });
    } else {
        // Trigger MailerLite automation
        return await triggerMailerLiteAutomation({ to, template, variables });
    }
}
```

### Phase 4: Compliance & Monitoring Integration

#### 4.1 Unified Unsubscribe System

**Challenge:** Users might be in both MailerLite and local systems
**Solution:** Master suppression list + bidirectional sync

**File: `/api/unsubscribe/unified.js`**

```javascript
import { suppressInMailerLite } from '@/lib/mailerlite-integration';
import { suppressInLocalDB } from '@/lib/local-suppression';

export default async function handler(req, res) {
    const { token, email, method = 'link' } = req.query;

    try {
        let emailToSuppress;

        if (token) {
            const validation = await validateUnsubscribeToken(token);
            if (!validation.valid) {
                return res.redirect('/unsubscribe/error');
            }
            emailToSuppress = validation.email;
        } else if (email) {
            emailToSuppress = email;
        }

        // 1. Suppress in MailerLite
        await suppressInMailerLite(emailToSuppress);

        // 2. Add to local suppression list
        await suppressInLocalDB(emailToSuppress, method, {
            ip: req.headers['x-forwarded-for'],
            user_agent: req.headers['user-agent'],
            timestamp: new Date()
        });

        // 3. Send confirmation email (transactional)
        await sendTransactionalEmail({
            to: emailToSuppress,
            template: 'unsubscribe_confirmation',
            variables: { email: emailToSuppress }
        });

        res.redirect('/unsubscribe/success');

    } catch (error) {
        console.error('Unified unsubscribe error:', error);
        res.redirect('/unsubscribe/error');
    }
}
```

#### 4.2 Analytics & Reporting Dashboard

**n8n Workflow: Daily Analytics Sync**

```json
{
  "name": "Daily MailerLite Analytics Sync",
  "nodes": [
    {
      "parameters": {
        "cron": "0 9 * * *"
      },
      "name": "Daily at 9 AM",
      "type": "n8n-nodes-base.cron"
    },
    {
      "parameters": {
        "url": "https://api.mailerlite.com/api/v2/stats",
        "options": {
          "headers": {
            "X-MailerLite-ApiKey": "={{$env.MAILERLITE_API_KEY}}"
          }
        }
      },
      "name": "Fetch MailerLite Stats",
      "type": "n8n-nodes-base.httpRequest"
    },
    {
      "parameters": {
        "operation": "insert",
        "table": "daily_email_stats",
        "columns": "date, total_subscribers, emails_sent, open_rate, click_rate, unsubscribe_rate, source",
        "values": "={{new Date().toISOString().split('T')[0]}}, {{$json.subscribers.total}}, {{$json.sent.total}}, {{$json.opened.rate}}, {{$json.clicked.rate}}, {{$json.unsubscribed.rate}}, mailerlite"
      },
      "name": "Store Stats",
      "type": "n8n-nodes-base.sqlite"
    }
  ]
}
```

## Configuration Files

### Environment Variables

```bash
# .env.local - Route 2 Configuration

# MailerLite (Marketing)
MAILERLITE_API_KEY=ml_xxxxxxxxxxxxxxxxxx
MAILERLITE_GROUP_NEWSLETTER=4567890123
MAILERLITE_GROUP_MISFITS_OS=1234567890
MAILERLITE_GROUP_LINKEDIN_AUDIT=2345678901

# Resend (Transactional)
RESEND_API_KEY=re_xxxxxxxxxxxx
TRANSACTIONAL_FROM_ADDRESS=hello@zokratiq.com
RESEND_WEBHOOK_SECRET=whsec_xxxxxxxxxxxx

# n8n Integration
N8N_WEBHOOK_URL=https://your-n8n.app.n8n.cloud/webhook/mailerlite-sync
INTERNAL_API_TOKEN=your-internal-api-token

# Analytics
GA4_MEASUREMENT_ID=G-XXXXXXXXXX
GA4_API_SECRET=xxxxxxxxxxxx

# Compliance
OWNER_NOTIFICATION_EMAIL=ops@zokratiq.com
UNSUBSCRIBE_SECRET=your-unsubscribe-secret
```

### MailerLite Webhook Configuration

```javascript
// Webhook URLs to configure in MailerLite dashboard
const webhooks = {
  subscriber_created: 'https://zokratiq.com/api/webhooks/mailerlite/subscriber-created',
  subscriber_updated: 'https://zokratiq.com/api/webhooks/mailerlite/subscriber-updated',
  subscriber_unsubscribed: 'https://zokratiq.com/api/webhooks/mailerlite/unsubscribed',
  campaign_sent: 'https://zokratiq.com/api/webhooks/mailerlite/campaign-sent'
};
```

## Deployment Checklist

### MailerLite Setup
- [ ] Account created and verified
- [ ] Domain authentication (SPF/DKIM)
- [ ] Groups and segments created
- [ ] Forms embedded and tested
- [ ] Automation workflows built
- [ ] Templates created and approved
- [ ] Webhooks configured

### n8n Workflows
- [ ] MailerLite sync workflow imported
- [ ] Analytics collection workflow imported
- [ ] Error handling and retry logic tested
- [ ] Webhook endpoints secured

### Resend Integration
- [ ] API key configured
- [ ] Domain verification complete
- [ ] Transactional templates tested
- [ ] Bounce/complaint webhooks configured

### Compliance
- [ ] Unified unsubscribe system tested
- [ ] Consent logging verified
- [ ] Data export functionality working
- [ ] Privacy policy updated

## Cost Breakdown

**MailerLite:**
- Free: 0-1,000 subscribers
- Growing Business: $10/month (up to 2,500 subscribers)
- Advanced: $20/month (up to 5,000 subscribers)

**Resend:**
- Free: 3,000 emails/month
- Pro: $20/month (50,000 emails)

**n8n:**
- Cloud Starter: $20/month (5,000 executions)

**Total Monthly Cost:** $0-60/month (depending on scale)

## Advantages

- ✅ Rapid deployment (1-2 weeks)
- ✅ Professional email deliverability
- ✅ Built-in GDPR compliance
- ✅ Visual automation builder
- ✅ Lower maintenance overhead
- ✅ Advanced analytics included

## Disadvantages

- ❌ Vendor lock-in (MailerLite)
- ❌ Less customization flexibility
- ❌ Multi-system complexity
- ❌ Ongoing subscription costs
- ❌ Limited custom business logic

## Migration Strategy (If Switching Later)

**From AI Tool to Custom Build:**
1. Export all subscriber data from MailerLite
2. Migrate email templates from MailerLite to MJML
3. Recreate automation logic in custom system
4. Gradually transition traffic to new forms
5. Maintain parallel systems during transition

**Data Export Format:**
```json
{
  "subscribers": [
    {
      "email": "user@example.com",
      "fields": {
        "name": "John Doe",
        "company": "Acme Inc"
      },
      "groups": ["Newsletter", "Misfits OS"],
      "tags": ["high_engagement"],
      "subscription_date": "2025-09-23",
      "consent_timestamp": "2025-09-23T10:30:00Z"
    }
  ],
  "campaigns": [...],
  "automations": [...]
}
```