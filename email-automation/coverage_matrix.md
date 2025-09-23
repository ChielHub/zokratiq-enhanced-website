# Email Automation Coverage Matrix

Generated: 2025-09-23
Domain: zokratiq.com

## Form → Flow Coverage Overview

| Form ID | Type | Pages | Existing Flow? | DOI? | Status | Next Action |
|---------|------|-------|----------------|------|--------|-------------|
| 1 | contact_general | 1 | ✅ | ❌ | ⚠️ needs_standardization | Enhance contact.php with user confirmation |
| 2 | newsletter_optin | 3 | ✅ | ❌ | ⚠️ needs_doi_compliance | Enable DOI + unify newsletter handlers |
| 3 | download_leadmagnet | 1 | ❌ | ❌ | ❓ missing | Create LinkedIn audit delivery flow |
| 4 | download_leadmagnet | 1 | ✅ | ❌ | ✅ active | Bind to existing Misfits OS flow |
| 5 | intake_booking | 1 | ❌ | ❌ | ❓ missing | Create talent intake booking flow |
| 6 | tool_usage | 1 | ❌ | N/A | ❓ missing | Add minimal backend logging |
| 7 | assessment_tool | 2 | ❌ | N/A | ❓ missing | Add minimal backend logging |
| 8 | community_signup | 1 | ❌ | ❌ | ❓ missing | Create beta collective application flow |

## Legend
- ✅ = Properly bound/configured
- ⚠️ = Exists but needs improvement
- ❓ = Missing automation (orphan form)
- ❌ = Not enabled/configured
- N/A = Not applicable

## Priority Actions Required

### High Priority (Legal/Compliance)
1. **Enable DOI for Newsletter Forms (form_id=2)** - GDPR compliance required
2. **Implement Unsubscribe System** - Legal requirement for all marketing emails
3. **Add Consent Logging** - IP, timestamp, user agent tracking

### Medium Priority (User Experience)
4. **Standardize Contact Form (form_id=1)** - Add user confirmation emails
5. **Create LinkedIn Audit Flow (form_id=3)** - High-value lead magnet missing automation
6. **Build Talent Intake Flow (form_id=5)** - B2B sales pipeline critical

### Low Priority (Enhancement)
7. **Add Tool Usage Logging (form_id=6,7)** - Analytics and lead scoring
8. **Create Community Flow (form_id=8)** - Beta collective nurture sequence

## Existing Flows Status

### Active Flows
- **Signal Newsletter**: ✅ Active database system, ❌ Missing DOI
- **Misfits OS Leadmagnet**: ✅ Active with lead scoring, ❌ Missing drip sequence
- **General Contact**: ⚠️ Basic handler exists, missing user confirmation

### Missing Flows (Orphan Forms)
- LinkedIn Audit Delivery (form_id=3)
- Talent Intake Booking (form_id=5)
- Tool Usage Logging (form_id=6,7)
- Community Signup (form_id=8)

## Compliance Gaps Identified

### GDPR/EU Requirements
- [ ] Double opt-in for newsletter subscriptions
- [ ] Consent timestamp + IP logging
- [ ] User agent and source URL tracking
- [ ] Policy version references
- [ ] One-click unsubscribe headers
- [ ] Data retention policies

### Email Deliverability
- [ ] SPF/DKIM/DMARC configuration
- [ ] Transactional vs marketing email separation
- [ ] Bounce/complaint handling
- [ ] List hygiene automation

### User Experience
- [ ] Consistent confirmation messaging
- [ ] Mobile-optimized templates
- [ ] Multi-language support (EN/NL)
- [ ] Preference center implementation