# Email Automation Testing & Quality Assurance Plan

**Generated:** 2025-09-23
**Scope:** Complete email automation system testing
**Timeline:** 5-7 days before production launch

---

## Test Environment Setup

### Seed Test Accounts

**Primary Test Accounts:**
```
qa-en@zokratiq.com         (English, Gmail)
qa-nl@zokratiq.com         (Dutch, Gmail)
qa-outlook@zokratiq.com    (Outlook.com)
qa-yahoo@zokratiq.com      (Yahoo Mail)
qa-apple@zokratiq.com      (iCloud Mail)
qa-corporate@zokratiq.com  (Corporate email)
```

**Device-Specific Test Accounts:**
```
qa-ios@zokratiq.com        (iOS Mail app testing)
qa-android@zokratiq.com    (Android Gmail app)
qa-desktop@zokratiq.com    (Desktop clients)
```

**Edge Case Test Accounts:**
```
qa-plus+test@zokratiq.com  (Plus addressing)
qa.dots@zokratiq.com       (Dot addressing)
qa-long-email-address-for-testing@zokratiq.com (Length testing)
```

---

## Test Matrix Overview

| Test Category | Priority | Estimated Time | Pass Criteria |
|---------------|----------|----------------|---------------|
| Form Functionality | High | 2 days | 100% pass |
| Email Delivery | High | 1 day | 95% success |
| DOI Process | High | 1 day | 98% success |
| Unsubscribe | High | 0.5 days | 100% pass |
| GDPR Compliance | High | 1 day | 100% pass |
| Email Rendering | Medium | 1 day | 90% acceptable |
| Automation Flows | High | 2 days | 95% success |
| Analytics Tracking | Medium | 0.5 days | 90% events |
| **TOTAL** | | **7 days** | **>95% overall** |

---

## 1. Form Functionality Testing

### 1.1 Form Submission Tests

**Test Cases:**

| Test ID | Form | Scenario | Expected Result |
|---------|------|----------|----------------|
| F001 | Newsletter (form_id=2) | Valid email submission | DOI email sent immediately |
| F002 | Contact (form_id=1) | Complete form with all fields | User receipt + admin notification |
| F003 | Misfits OS (form_id=4) | Lead magnet download | Blueprint delivery email |
| F004 | Talent Intake (form_id=5) | B2B inquiry form | Confirmation + admin alert |
| F005 | All forms | Invalid email format | Validation error displayed |
| F006 | All forms | Missing required fields | Field-specific error messages |
| F007 | All forms | Duplicate submission | Graceful handling (no double emails) |
| F008 | All forms | Very long text inputs | Proper truncation/validation |

**Validation Rules Testing:**

```javascript
// Test script for form validation
const formTests = [
  {
    form_id: 2,
    test_data: {
      email: 'invalid-email',
      expected: 'validation_error'
    }
  },
  {
    form_id: 1,
    test_data: {
      email: 'test@example.com',
      name: '', // Required field empty
      expected: 'missing_required_field'
    }
  },
  {
    form_id: 4,
    test_data: {
      email: 'test@example.com',
      company: 'A'.repeat(1000), // Very long input
      expected: 'input_too_long'
    }
  }
];

// Automated test runner
async function runFormValidationTests() {
  for (const test of formTests) {
    const response = await submitForm(test.form_id, test.test_data);
    assert.equal(response.status, test.expected);
  }
}
```

### 1.2 Cross-Browser Testing

**Browsers to Test:**
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile Safari (iOS)
- Chrome Mobile (Android)

**Test Scenarios:**
- Form display and styling
- JavaScript functionality
- Form submission process
- Error handling display
- Success message display

---

## 2. Email Delivery Testing

### 2.1 Provider Delivery Tests

**Route 1 (Custom + Resend):**

| Test ID | Email Type | Template | Provider | Expected Delivery Time |
|---------|------------|----------|----------|----------------------|
| D001 | Transactional | Contact receipt | Resend | < 30 seconds |
| D002 | DOI | Newsletter confirmation | Resend | < 30 seconds |
| D003 | Marketing | Welcome sequence | Resend | < 2 minutes |
| D004 | Leadmagnet | Blueprint delivery | Resend | < 1 minute |

**Route 2 (MailerLite + Resend):**

| Test ID | Email Type | Template | Provider | Expected Delivery Time |
|---------|------------|----------|----------|----------------------|
| D005 | DOI | Newsletter confirmation | MailerLite | < 2 minutes |
| D006 | Marketing | Welcome sequence | MailerLite | < 5 minutes |
| D007 | Transactional | Contact receipt | Resend | < 30 seconds |
| D008 | Leadmagnet | Blueprint delivery | Resend | < 1 minute |

**Delivery Test Script:**

```bash
#!/bin/bash
# delivery_test.sh

# Array of test emails and expected templates
test_cases=(
  "qa-gmail@zokratiq.com:newsletter_signup:zokratiq_doi"
  "qa-outlook@zokratiq.com:contact_form:zokratiq_contact_receipt"
  "qa-yahoo@zokratiq.com:misfits_os:zokratiq_misfits_delivery"
)

for test_case in "${test_cases[@]}"; do
  IFS=':' read -r email form template <<< "$test_case"

  echo "Testing: $email via $form expecting $template"

  # Submit form
  curl -X POST https://zokratiq.com/api/forms/submit \
    -d "email=$email&form_id=$form" \
    -d "test_mode=true"

  # Wait and check delivery
  sleep 60

  # Verify email received (pseudo-code)
  check_email_received "$email" "$template"
done
```

### 2.2 Deliverability Testing

**Email Client Matrix:**

| Client | Device | Inbox Placement | Rendering | Links Work |
|--------|--------|----------------|-----------|------------|
| Gmail Web | Desktop | ✓ | ✓ | ✓ |
| Gmail App | iOS | ✓ | ✓ | ✓ |
| Gmail App | Android | ✓ | ✓ | ✓ |
| Outlook Web | Desktop | ✓ | ✓ | ✓ |
| Outlook Desktop | Windows | ✓ | ✓ | ✓ |
| Apple Mail | macOS | ✓ | ✓ | ✓ |
| Apple Mail | iOS | ✓ | ✓ | ✓ |
| Yahoo Web | Desktop | ✓ | ✓ | ✓ |

**Spam Filter Testing:**
- SpamAssassin score < 3.0
- Gmail spam folder check
- Outlook spam folder check
- Authentication checks (SPF/DKIM/DMARC)

---

## 3. Double Opt-In (DOI) Process Testing

### 3.1 DOI Flow Testing

**Complete DOI Journey Test:**

```javascript
// DOI flow test sequence
async function testDOIFlow(email) {
  // Step 1: Submit newsletter form
  const submission = await submitNewsletterForm({
    email: email,
    utm_source: 'test',
    utm_campaign: 'doi_test'
  });

  assert.equal(submission.success, true);

  // Step 2: Wait for DOI email
  await sleep(60000); // 1 minute

  const doiEmail = await checkInbox(email, 'zokratiq_doi');
  assert.notNull(doiEmail);

  // Step 3: Extract confirmation link
  const confirmLink = extractConfirmationLink(doiEmail.html);
  assert.notNull(confirmLink);

  // Step 4: Click confirmation link
  const confirmResponse = await fetch(confirmLink);
  assert.equal(confirmResponse.status, 200);

  // Step 5: Wait for welcome email
  await sleep(120000); // 2 minutes

  const welcomeEmail = await checkInbox(email, 'zokratiq_welcome');
  assert.notNull(welcomeEmail);

  // Step 6: Verify subscriber is confirmed in database
  const subscriber = await querySubscriber(email);
  assert.equal(subscriber.consent_status, 'confirmed');

  return { success: true, time_to_complete: Date.now() - startTime };
}
```

### 3.2 DOI Edge Cases

| Test ID | Scenario | Expected Behavior |
|---------|----------|------------------|
| DOI001 | Expired confirmation token | Show error, offer new DOI |
| DOI002 | Invalid confirmation token | Show error with support contact |
| DOI003 | Already confirmed email | Show "already subscribed" message |
| DOI004 | Multiple DOI clicks | Only confirm once, show status |
| DOI005 | DOI from different IP | Accept confirmation |
| DOI006 | DOI after 24 hours | Should still work (no expiry) |

---

## 4. Unsubscribe System Testing

### 4.1 Unsubscribe Methods Testing

**One-Click Unsubscribe (List-Unsubscribe Header):**

```javascript
// Test one-click unsubscribe
async function testOneClickUnsubscribe(email) {
  // Send marketing email
  await sendMarketingEmail(email, 'zokratiq_welcome');

  // Simulate List-Unsubscribe-Post request
  const response = await fetch('https://zokratiq.com/api/unsubscribe/one-click', {
    method: 'POST',
    headers: {
      'List-Unsubscribe': 'One-Click',
      'Authorization': `Bearer ${generateUnsubscribeToken(email)}`
    }
  });

  assert.equal(response.status, 200);

  // Verify suppression
  const suppressed = await checkSuppressionList(email);
  assert.equal(suppressed, true);

  // Verify confirmation email sent
  const confirmEmail = await checkInbox(email, 'unsubscribe_confirmation');
  assert.notNull(confirmEmail);
}
```

**Link-Based Unsubscribe:**

| Test ID | Method | Token Validity | Expected Result |
|---------|--------|----------------|----------------|
| U001 | Valid link click | Valid token | Immediate unsubscribe |
| U002 | Expired token | 15+ days old | Show manual form |
| U003 | Invalid token | Malformed | Show error + manual form |
| U004 | Missing token | No token param | Show manual form |
| U005 | Double unsubscribe | Valid, already unsubscribed | Show status message |

### 4.2 Suppression List Testing

**Cross-System Suppression:**

```javascript
// Test suppression across all systems
async function testGlobalSuppression(email) {
  // Unsubscribe user
  await unsubscribeUser(email);

  // Wait for sync
  await sleep(30000);

  // Test Route 1: Direct email send attempt
  const directResult = await attemptEmailSend(email, 'zokratiq_newsletter');
  assert.equal(directResult.suppressed, true);

  // Test Route 2: MailerLite send attempt
  const mailerliteResult = await attemptMailerLiteSend(email);
  assert.equal(mailerliteResult.suppressed, true);

  // Verify in all suppression lists
  const localSuppressed = await checkLocalSuppressionList(email);
  const mailerliteSuppressed = await checkMailerLiteSuppressionList(email);

  assert.equal(localSuppressed && mailerliteSuppressed, true);
}
```

---

## 5. GDPR Compliance Testing

### 5.1 Consent Logging

**Consent Record Verification:**

```javascript
async function testConsentLogging(formSubmission) {
  // Submit form with tracking
  const response = await submitForm(formSubmission.form_id, formSubmission.data, {
    'X-Forwarded-For': '192.168.1.100',
    'User-Agent': 'Mozilla/5.0 Test Browser'
  });

  // Verify consent record created
  const consentRecord = await queryConsentLog(formSubmission.data.email);

  assert.notNull(consentRecord);
  assert.equal(consentRecord.ip_address, '192.168.1.100');
  assert.equal(consentRecord.consent_type, 'double_opt_in');
  assert.equal(consentRecord.policy_version, '2025-09-23');
  assert.notNull(consentRecord.timestamp);
  assert.notNull(consentRecord.source_url);
}
```

### 5.2 Data Subject Rights

**Right to Data Export:**

```javascript
async function testDataExport(email) {
  // Request data export
  const exportRequest = await requestDataExport(email);
  assert.equal(exportRequest.status, 'pending');

  // Process export (automated or manual)
  await processDataExportRequest(exportRequest.id);

  // Verify export file created
  const exportData = await downloadDataExport(exportRequest.id);

  // Validate export contents
  assert.notNull(exportData.consent_log);
  assert.notNull(exportData.email_history);
  assert.notNull(exportData.unsubscribe_events);

  // Verify no PII exposure in logs
  assert.equal(exportData.includes_sensitive_data, false);
}
```

**Right to Deletion:**

```javascript
async function testDataDeletion(email) {
  // Request complete data deletion
  const deletionRequest = await requestDataDeletion(email);
  assert.equal(deletionRequest.status, 'pending');

  // Process deletion
  await processDataDeletionRequest(deletionRequest.id);

  // Verify all data removed
  const consentRecords = await queryConsentLog(email);
  const subscriberRecords = await querySubscribers(email);
  const emailHistory = await queryEmailHistory(email);

  assert.equal(consentRecords.length, 0);
  assert.equal(subscriberRecords.length, 0);
  assert.equal(emailHistory.length, 0);

  // Verify suppression list entry remains (legal requirement)
  const suppressionRecord = await checkSuppressionList(email);
  assert.notNull(suppressionRecord);
  assert.equal(suppressionRecord.reason, 'data_deletion_request');
}
```

---

## 6. Email Rendering Testing

### 6.1 Template Rendering

**MJML Template Compilation:**

```javascript
async function testTemplateCompilation() {
  const templates = [
    'zokratiq_doi',
    'zokratiq_welcome',
    'zokratiq_contact_user_receipt',
    'zokratiq_misfits_os_delivery',
    'zokratiq_book_discovery'
  ];

  for (const template of templates) {
    // Test compilation
    const compiled = await compileTemplate(template, {
      first_name: 'Test User',
      company: 'Test Company',
      unsubscribe_url: 'https://test.example.com/unsub'
    });

    // Verify HTML output
    assert.notNull(compiled.html);
    assert.includes(compiled.html, 'Test User');
    assert.includes(compiled.html, 'Test Company');

    // Verify text output
    assert.notNull(compiled.text);

    // Verify no template variables remain
    assert.notIncludes(compiled.html, '{{');
    assert.notIncludes(compiled.text, '{{');
  }
}
```

### 6.2 Cross-Client Rendering

**Visual Regression Testing:**

| Template | Gmail Web | Outlook 365 | Apple Mail | Mobile Gmail | Pass/Fail |
|----------|-----------|-------------|------------|--------------|-----------|
| DOI | ✓ | ✓ | ✓ | ✓ | Pass |
| Welcome | ✓ | ⚠️ | ✓ | ✓ | Pass (minor) |
| Contact Receipt | ✓ | ✓ | ✓ | ✓ | Pass |
| Misfits OS | ✓ | ✓ | ✓ | ❌ | Fail |
| Book Discovery | ✓ | ✓ | ✓ | ✓ | Pass |

**Dark Mode Testing:**

```javascript
// Test dark mode compatibility
const darkModeTests = [
  {
    client: 'apple_mail_dark',
    template: 'zokratiq_welcome',
    critical_elements: ['logo', 'primary_cta', 'footer_links']
  }
];

async function testDarkModeRendering() {
  for (const test of darkModeTests) {
    const screenshot = await captureEmailScreenshot(
      test.template,
      test.client
    );

    // Verify contrast ratios
    const contrastResults = await analyzeContrast(
      screenshot,
      test.critical_elements
    );

    for (const element of test.critical_elements) {
      assert.greaterThan(contrastResults[element].ratio, 4.5);
    }
  }
}
```

---

## 7. Automation Flow Testing

### 7.1 Sequence Testing

**Newsletter Welcome Sequence:**

```javascript
async function testNewsletterSequence(email) {
  const startTime = Date.now();

  // Step 1: Subscribe and confirm DOI
  await subscribeAndConfirmDOI(email);

  // Step 2: Welcome email (immediate)
  const welcomeEmail = await waitForEmail(email, 'zokratiq_welcome', 300); // 5 min timeout
  assert.notNull(welcomeEmail);

  // Step 3: Reality exploration email (2 days later)
  // Fast-forward time for testing
  await fastForwardAutomationTime('2d');

  const realityEmail = await waitForEmail(email, 'zokratiq_reality_exploration', 300);
  assert.notNull(realityEmail);

  // Step 4: How we work email (5 days total)
  await fastForwardAutomationTime('3d');

  const howWeWorkEmail = await waitForEmail(email, 'zokratiq_how_we_work', 300);
  assert.notNull(howWeWorkEmail);

  // Step 5: Proof case email (8 days total)
  await fastForwardAutomationTime('3d');

  const proofEmail = await waitForEmail(email, 'zokratiq_proof_case', 300);
  assert.notNull(proofEmail);

  // Step 6: Book discovery email (12 days total)
  await fastForwardAutomationTime('4d');

  const bookingEmail = await waitForEmail(email, 'zokratiq_book_discovery', 300);
  assert.notNull(bookingEmail);

  // Verify sequence completion
  const sequenceRecord = await queryAutomationSequence(email, 'newsletter_welcome');
  assert.equal(sequenceRecord.status, 'completed');

  return {
    success: true,
    total_emails: 5,
    completion_time: Date.now() - startTime
  };
}
```

### 7.2 Flow Interruption Testing

**Unsubscribe During Sequence:**

| Test ID | Scenario | Expected Behavior |
|---------|----------|------------------|
| A001 | Unsubscribe after welcome | Stop all marketing, keep transactional |
| A002 | Unsubscribe mid-sequence | Stop remaining sequence emails |
| A003 | Resubscribe after unsub | Start from beginning or resume? |
| A004 | Sequence pausing | Pause/resume functionality |

---

## 8. Analytics & Tracking Testing

### 8.1 GA4 Event Tracking

**Event Firing Test:**

```javascript
async function testGA4Events() {
  const testEvents = [
    { trigger: 'form_submit', form_id: 'newsletter_signup' },
    { trigger: 'doi_sent', email: 'test@example.com' },
    { trigger: 'doi_confirmed', email: 'test@example.com' },
    { trigger: 'leadmagnet_download', asset: 'misfits_os' },
    { trigger: 'unsubscribe', method: 'one_click' }
  ];

  for (const testEvent of testEvents) {
    // Perform action that should trigger event
    await performAction(testEvent.trigger, testEvent);

    // Wait for GA4 processing
    await sleep(5000);

    // Verify event in GA4 (requires GA4 Reporting API)
    const eventRecorded = await checkGA4Event(testEvent);
    assert.equal(eventRecorded, true);
  }
}
```

### 8.2 Attribution Testing

**UTM Parameter Tracking:**

```javascript
async function testUTMAttribution() {
  const testCases = [
    {
      landing_url: 'https://zokratiq.com/labs?utm_source=google&utm_campaign=brand_search',
      form_id: 'newsletter_signup',
      expected_attribution: {
        utm_source: 'google',
        utm_campaign: 'brand_search'
      }
    }
  ];

  for (const testCase of testCases) {
    // Simulate user journey
    await visitPage(testCase.landing_url);
    await submitForm(testCase.form_id, { email: 'test@example.com' });

    // Check attribution in consent log
    const consentRecord = await queryConsentLog('test@example.com');
    assert.equal(consentRecord.utm_source, testCase.expected_attribution.utm_source);
    assert.equal(consentRecord.utm_campaign, testCase.expected_attribution.utm_campaign);
  }
}
```

---

## 9. Performance & Load Testing

### 9.1 Form Submission Load Test

```javascript
// Load test form submissions
async function loadTestForms() {
  const concurrentUsers = 50;
  const submissionsPerUser = 10;

  const testPromises = [];

  for (let i = 0; i < concurrentUsers; i++) {
    testPromises.push(simulateUserSubmissions(submissionsPerUser));
  }

  const results = await Promise.all(testPromises);

  // Analyze results
  const totalSubmissions = results.length * submissionsPerUser;
  const successfulSubmissions = results.filter(r => r.success).length;
  const averageResponseTime = results.reduce((sum, r) => sum + r.responseTime, 0) / results.length;

  assert.greaterThan(successfulSubmissions / totalSubmissions, 0.95); // 95% success rate
  assert.lessThan(averageResponseTime, 2000); // < 2 seconds
}
```

### 9.2 Email Queue Performance

```javascript
// Test email queue processing speed
async function testEmailQueuePerformance() {
  // Queue 1000 test emails
  const testEmails = Array.from({ length: 1000 }, (_, i) => ({
    email: `test${i}@example.com`,
    template: 'zokratiq_welcome',
    scheduled_for: new Date()
  }));

  const queueStart = Date.now();

  for (const emailData of testEmails) {
    await enqueueEmail(emailData);
  }

  // Wait for queue processing
  let processed = 0;
  while (processed < 1000) {
    await sleep(10000); // Check every 10 seconds
    processed = await countProcessedEmails();
  }

  const queueProcessTime = Date.now() - queueStart;
  const emailsPerMinute = (1000 / queueProcessTime) * 60000;

  // Should process at least 100 emails per minute
  assert.greaterThan(emailsPerMinute, 100);
}
```

---

## 10. Final Integration Testing

### 10.1 End-to-End User Journeys

**High-Value Lead Journey:**

```javascript
async function testHighValueLeadJourney() {
  const leadEmail = 'test-lead@example.com';

  // 1. Newsletter signup
  await submitNewsletterForm(leadEmail);
  await confirmDOI(leadEmail);

  // 2. Download lead magnet
  await downloadMisfitsOS(leadEmail, {
    company: 'Fortune 500 Corp',
    role: 'founder-ceo'
  });

  // 3. Engage with emails
  await simulateEmailEngagement(leadEmail, ['welcome', 'misfits_delivery']);

  // 4. Book consultation
  await bookConsultation(leadEmail);

  // 5. Verify lead scoring and attribution
  const leadRecord = await queryLeadRecord(leadEmail);
  assert.greaterThan(leadRecord.lead_score, 80);
  assert.equal(leadRecord.status, 'consultation_booked');

  // 6. Verify all touchpoints tracked
  const touchpoints = await queryTouchpoints(leadEmail);
  assert.greaterThan(touchpoints.length, 5);
}
```

---

## Test Execution Checklist

### Pre-Test Setup
- [ ] Test environment configured
- [ ] Test accounts created and verified
- [ ] Database seeded with test data
- [ ] Email providers configured with test mode
- [ ] Analytics tracking disabled for test accounts
- [ ] Monitoring dashboards setup

### During Testing
- [ ] Document all test results
- [ ] Screenshot rendering issues
- [ ] Log performance metrics
- [ ] Record error messages
- [ ] Monitor system resources

### Post-Test Analysis
- [ ] Compile test results report
- [ ] Prioritize bugs by severity
- [ ] Verify bug fixes with regression tests
- [ ] Update documentation based on findings
- [ ] Conduct final smoke test
- [ ] Sign-off from stakeholders

### Go/No-Go Criteria

**Must Pass (Blocking Issues):**
- GDPR compliance: 100% pass
- Unsubscribe functionality: 100% pass
- Form submission: 95% success rate
- Email delivery: 95% success rate
- DOI process: 98% success rate

**Should Pass (Minor Issues Acceptable):**
- Email rendering: 90% acceptable across clients
- Analytics tracking: 90% of events firing
- Performance: <2s form response time
- Cross-browser: Works in 95% of target browsers

**Nice to Have:**
- Perfect rendering in all email clients
- 100% analytics accuracy
- Sub-1s response times
- Advanced automation features

### Test Report Template

```markdown
# Email Automation Test Results

## Executive Summary
- Test Period: [Start Date] to [End Date]
- Total Tests: [X] tests executed
- Pass Rate: [X]% overall
- Critical Issues: [X] identified
- Recommendation: GO / NO-GO / GO with conditions

## Detailed Results
[Include detailed results for each test category]

## Bug Report
[List all identified issues with severity ratings]

## Performance Metrics
[Include key performance indicators]

## Recommendations
[Next steps and improvement suggestions]
```