# 🔥 CRITICAL REMINDER: Newsletter Integration Checklist

## Always Remember This When Creating Newsletter Forms!

We often have the UI styling issue where custom Tailwind classes don't work because the basePath is set incorrectly in Next.js config. **ALWAYS check and remove basePath if not needed.**

But more importantly:

### EMAIL INTEGRATION REQUIREMENTS

When creating any newsletter signup form, you MUST:

1. **Database Integration**: Add subscribers to the existing SQLite database at `/var/www/html/zokratiq.com/api/subscribers.db`

2. **Admin Dashboard**: Ensure signups appear in the admin dashboard at `https://zokratiq.com/admin-dashboard.php`

3. **Email Service**: Add the email template to the email service at `https://zokratiq.com/email-service.php`

4. **Notifications**:
   - Send confirmation email to subscriber
   - Send notification to `hello@zokratiq.com` when someone signs up

5. **Email Service Provider**: We use a custom email system (check if MailerLite integration exists)

### INTEGRATION STEPS:

1. **Update PHP endpoint** to use the existing database structure
2. **Add email template** to the email_templates table
3. **Set up email automation** using the existing email service
4. **Test email delivery** both ways (to subscriber and admin)
5. **Verify dashboard integration** shows new signups

### DATABASE TABLES TO USE:
- `subscribers` - main subscriber table
- `email_templates` - for email templates
- `email_campaigns` - for managing email sequences

### EXISTING EMAIL SETUP:
- From email: `hello@zokratiq.com` (or `signal@zokratiq.com` for newsletters)
- Database: `/var/www/html/zokratiq.com/api/subscribers.db`
- Admin: `https://zokratiq.com/admin-dashboard.php`
- Email Service: `https://zokratiq.com/email-service.php`

## COPY THIS TO YOUR PROMPT NEXT TIME:
"When creating newsletter signups, integrate with existing email system: database at `/var/www/html/zokratiq.com/api/subscribers.db`, admin dashboard, email service at `/email-service.php`, send emails from `hello@zokratiq.com`, and notify admin of signups."