# GA4 Event Tracking for Zokratiq Email Automation

**Generated:** 2025-09-23
**Measurement ID:** G-XXXXXXXXXX (to be configured)
**Implementation:** Enhanced Ecommerce + Custom Events

## Event Categories Overview

### Form & Lead Generation Events
### Email Campaign Events
### User Journey Events
### Conversion Events

---

## 1. Form & Lead Generation Events

### form_view
**Trigger:** When a form is displayed to user
**Purpose:** Track form visibility and engagement funnel
```javascript
gtag('event', 'form_view', {
  'form_id': 'newsletter_signup',
  'form_type': 'newsletter_optin',
  'page_location': 'https://zokratiq.com/labs',
  'utm_source': 'direct',
  'utm_campaign': 'labs_page'
});
```

### form_start
**Trigger:** User starts filling out a form (first field interaction)
**Purpose:** Measure form engagement vs abandonment
```javascript
gtag('event', 'form_start', {
  'form_id': 'misfits_os_leadmagnet',
  'form_type': 'download_leadmagnet',
  'field_name': 'email',
  'page_location': window.location.href
});
```

### form_submit
**Trigger:** Form submission attempt (before validation)
**Purpose:** Track submission attempts vs successes
```javascript
gtag('event', 'form_submit', {
  'form_id': 'contact_general',
  'form_type': 'contact_general',
  'email': 'user@example.com', // hashed for privacy
  'company': 'Acme Inc',
  'utm_source': 'google',
  'utm_campaign': 'brand_search'
});
```

### form_success
**Trigger:** Successful form submission (after validation/processing)
**Purpose:** Conversion tracking and attribution
```javascript
gtag('event', 'form_success', {
  'form_id': 'newsletter_signup',
  'form_type': 'newsletter_optin',
  'email_hash': 'sha256_hash_of_email',
  'lead_score': 25,
  'sequence_id': 'newsletter_welcome_sequence'
});
```

### form_error
**Trigger:** Form validation errors or submission failures
**Purpose:** Identify friction points and technical issues
```javascript
gtag('event', 'form_error', {
  'form_id': 'talent_intake',
  'form_type': 'intake_booking',
  'error_type': 'validation_error',
  'error_field': 'email',
  'error_message': 'Invalid email format'
});
```

---

## 2. Email Campaign Events

### email_sent
**Trigger:** When an email is successfully sent
**Purpose:** Track email delivery and campaign volume
```javascript
gtag('event', 'email_sent', {
  'campaign_id': 'newsletter_welcome_001',
  'email_template': 'zokratiq_welcome',
  'email_type': 'marketing',
  'recipient_segment': 'new_subscribers',
  'automation_sequence': 'newsletter_onboarding',
  'provider': 'mailerlite'
});
```

### doi_sent
**Trigger:** Double opt-in confirmation email sent
**Purpose:** Track DOI campaign performance
```javascript
gtag('event', 'doi_sent', {
  'form_id': 'newsletter_signup',
  'email_hash': 'sha256_hash',
  'utm_source': 'labs_page',
  'utm_campaign': 'newsletter_signup'
});
```

### doi_confirmed
**Trigger:** User clicks DOI confirmation link
**Purpose:** Measure DOI conversion rates
```javascript
gtag('event', 'doi_confirmed', {
  'form_id': 'newsletter_signup',
  'email_hash': 'sha256_hash',
  'confirmation_time_minutes': 15, // Time between sent and confirmed
  'device_type': 'mobile',
  'email_client': 'gmail_app'
});
```

### email_opened
**Trigger:** Email opened (if tracking enabled)
**Purpose:** Engagement measurement
```javascript
gtag('event', 'email_opened', {
  'campaign_id': 'newsletter_welcome_001',
  'email_template': 'zokratiq_welcome',
  'recipient_segment': 'new_subscribers',
  'open_time_hours': 2.5, // Hours after send
  'device_type': 'desktop'
});
```

### email_clicked
**Trigger:** Link clicked in email
**Purpose:** Track email engagement and CTA performance
```javascript
gtag('event', 'email_clicked', {
  'campaign_id': 'newsletter_welcome_001',
  'email_template': 'zokratiq_welcome',
  'link_url': 'https://zokratiq.com/misfits',
  'link_text': 'Book Discovery Call',
  'link_position': 'primary_cta',
  'recipient_segment': 'new_subscribers'
});
```

---

## 3. User Journey Events

### leadmagnet_download
**Trigger:** Lead magnet successfully delivered
**Purpose:** Track lead magnet conversion and attribution
```javascript
gtag('event', 'leadmagnet_download', {
  'asset_name': 'Misfits OS Blueprint',
  'asset_type': 'pdf_guide',
  'lead_source': 'misfits_os_landing',
  'company': 'Acme Inc',
  'role': 'founder-ceo',
  'lead_score': 85,
  'value': 25 // Assigned lead value
});
```

### unsubscribe
**Trigger:** User unsubscribes from emails
**Purpose:** Track churn and unsubscribe reasons
```javascript
gtag('event', 'unsubscribe', {
  'unsubscribe_method': 'one_click',
  'email_hash': 'sha256_hash',
  'trigger_campaign': 'newsletter_week_5',
  'reason_category': 'too_frequent',
  'subscriber_age_days': 35
});
```

### resubscribe
**Trigger:** Previously unsubscribed user resubscribes
**Purpose:** Track re-engagement success
```javascript
gtag('event', 'resubscribe', {
  'email_hash': 'sha256_hash',
  'resubscribe_source': 'website_form',
  'unsubscribed_days_ago': 120,
  'previous_unsubscribe_reason': 'too_frequent'
});
```

### whatsapp_click
**Trigger:** WhatsApp contact link clicked
**Purpose:** Track preferred communication channels
```javascript
gtag('event', 'whatsapp_click', {
  'source_location': 'email_footer',
  'email_campaign': 'newsletter_welcome_001',
  'device_type': 'mobile'
});
```

### phone_click
**Trigger:** Phone number link clicked
**Purpose:** Track phone call intent
```javascript
gtag('event', 'phone_click', {
  'source_location': 'contact_confirmation',
  'phone_number': '+31612345678',
  'device_type': 'mobile'
});
```

---

## 4. Tool Usage Events

### linkedin_extraction
**Trigger:** LinkedIn profile extraction tool used
**Purpose:** Track tool engagement and user behavior
```javascript
gtag('event', 'linkedin_extraction', {
  'tool_name': 'linkedin_optimizer',
  'profile_url': 'https://linkedin.com/in/username',
  'extraction_success': true,
  'processing_time_ms': 2500
});
```

### assessment_completed
**Trigger:** Weirdness or cognitive assessment completed
**Purpose:** Track assessment engagement
```javascript
gtag('event', 'assessment_completed', {
  'assessment_type': 'weirdness_assessment',
  'completion_time_minutes': 3.5,
  'score_range': '70-80', // Anonymized score range
  'questions_answered': 7
});
```

---

## 5. Conversion & Business Events

### consultation_booked
**Trigger:** Discovery call or consultation booked
**Purpose:** Track high-intent conversion events
```javascript
gtag('event', 'consultation_booked', {
  'booking_source': 'email_campaign',
  'campaign_id': 'book_discovery_001',
  'lead_source': 'newsletter',
  'company_size': 'startup',
  'urgency_level': 'high',
  'value': 500 // Estimated opportunity value
});
```

### lead_qualified
**Trigger:** Lead reaches qualification threshold
**Purpose:** Sales funnel measurement
```javascript
gtag('event', 'lead_qualified', {
  'lead_score': 85,
  'qualification_criteria': 'mql_threshold',
  'lead_source': 'misfits_os_download',
  'company': 'Acme Inc',
  'estimated_value': 25000
});
```

### proposal_sent
**Trigger:** Project proposal sent to lead
**Purpose:** Sales pipeline tracking
```javascript
gtag('event', 'proposal_sent', {
  'proposal_type': 'organizational_design',
  'proposal_value': 50000,
  'lead_source': 'newsletter',
  'lead_age_days': 45
});
```

### project_won
**Trigger:** Project/deal closed-won
**Purpose:** Revenue attribution and ROI calculation
```javascript
gtag('event', 'purchase', { // Use GA4 recommended event
  'transaction_id': 'ORG_2025_001',
  'value': 75000,
  'currency': 'EUR',
  'items': [{
    'item_id': 'organizational_design',
    'item_name': 'Organizational Design Project',
    'category': 'consulting',
    'quantity': 1,
    'price': 75000
  }],
  'lead_source': 'newsletter',
  'attribution_campaign': 'newsletter_nurture',
  'lead_age_days': 120
});
```

---

## Implementation Code

### Base Tracking Setup

```html
<!-- Global Site Tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-XXXXXXXXXX', {
    // Enhanced ecommerce
    'send_page_view': true,
    'enhanced_conversions': true,

    // Custom parameters
    'custom_map': {
      'custom_parameter_1': 'form_id',
      'custom_parameter_2': 'email_template',
      'custom_parameter_3': 'lead_score'
    }
  });
</script>
```

### Form Tracking Helper Function

```javascript
// File: /lib/analytics.js
export function trackFormEvent(eventName, formData, additionalData = {}) {
  const eventData = {
    'form_id': formData.form_id,
    'form_type': formData.form_type,
    'page_location': window.location.href,
    'page_title': document.title,
    'utm_source': getURLParameter('utm_source'),
    'utm_medium': getURLParameter('utm_medium'),
    'utm_campaign': getURLParameter('utm_campaign'),
    ...additionalData
  };

  // Hash email for privacy
  if (formData.email) {
    eventData.email_hash = hashEmail(formData.email);
  }

  gtag('event', eventName, eventData);
}

// Usage in form handlers
trackFormEvent('form_submit', {
  form_id: 'newsletter_signup',
  form_type: 'newsletter_optin',
  email: 'user@example.com'
}, {
  lead_score: 25
});
```

### Email Event Tracking (Server-Side)

```javascript
// File: /api/analytics/email-event.js
export default async function handler(req, res) {
  const { event_name, email_data } = req.body;

  // Send to GA4 via Measurement Protocol
  const measurementId = 'G-XXXXXXXXXX';
  const apiSecret = process.env.GA4_API_SECRET;

  const payload = {
    'client_id': generateClientId(email_data.email),
    'events': [{
      'name': event_name,
      'params': {
        'campaign_id': email_data.campaign_id,
        'email_template': email_data.template,
        'provider': email_data.provider,
        'timestamp_micros': Date.now() * 1000
      }
    }]
  };

  try {
    await fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${measurementId}&api_secret=${apiSecret}`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to track event' });
  }
}
```

## Custom Dimensions & Metrics

### Recommended Custom Dimensions
1. **form_id** - Specific form identifier
2. **email_template** - Email template used
3. **lead_score** - Calculated lead score
4. **company_size** - Small/Medium/Large/Enterprise
5. **industry** - Industry vertical
6. **lead_source** - Original lead source
7. **automation_sequence** - Which sequence the user is in
8. **subscriber_segment** - High/Medium/Low engagement

### Calculated Metrics
- **Email-to-Lead Conversion Rate** - `form_success / email_sent`
- **DOI Conversion Rate** - `doi_confirmed / doi_sent`
- **Lead Quality Score** - Based on form completion and engagement
- **Revenue Per Email** - `project_won.value / email_sent`
- **Unsubscribe Rate** - `unsubscribe / email_sent`

## Reporting Dashboard Queries

### Attribution Report
```sql
-- Example BigQuery/GA4 query
SELECT
  utm_source,
  utm_campaign,
  COUNT(DISTINCT user_pseudo_id) as users,
  COUNTIF(event_name = 'form_submit') as form_submissions,
  COUNTIF(event_name = 'leadmagnet_download') as downloads,
  COUNTIF(event_name = 'consultation_booked') as bookings,
  SUM(CASE WHEN event_name = 'purchase' THEN CAST(value AS NUMERIC) END) as revenue
FROM `your-project.analytics_XXXXXXXXXX.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20250923' AND '20251023'
  AND event_name IN ('form_submit', 'leadmagnet_download', 'consultation_booked', 'purchase')
GROUP BY utm_source, utm_campaign
ORDER BY revenue DESC;
```

### Email Performance Report
```sql
SELECT
  email_template,
  COUNTIF(event_name = 'email_sent') as sent,
  COUNTIF(event_name = 'email_opened') as opened,
  COUNTIF(event_name = 'email_clicked') as clicked,
  COUNTIF(event_name = 'unsubscribe') as unsubscribed,
  SAFE_DIVIDE(COUNTIF(event_name = 'email_opened'), COUNTIF(event_name = 'email_sent')) * 100 as open_rate,
  SAFE_DIVIDE(COUNTIF(event_name = 'email_clicked'), COUNTIF(event_name = 'email_opened')) * 100 as click_rate
FROM `your-project.analytics_XXXXXXXXXX.events_*`
WHERE _TABLE_SUFFIX BETWEEN '20250923' AND '20251023'
  AND event_name IN ('email_sent', 'email_opened', 'email_clicked', 'unsubscribe')
GROUP BY email_template
ORDER BY sent DESC;
```

## Privacy Considerations

### Data Minimization
- Hash email addresses before sending to GA4
- Use anonymized lead scores (ranges vs exact values)
- Avoid sending PII (names, phone numbers, addresses)

### Consent Management
- Only track users who have consented to analytics cookies
- Respect "Do Not Track" browser settings
- Provide opt-out mechanisms in privacy policy

### Data Retention
- Set GA4 data retention to 14 months (maximum for free)
- Regularly audit tracked parameters for compliance
- Document tracking purposes for GDPR Article 30