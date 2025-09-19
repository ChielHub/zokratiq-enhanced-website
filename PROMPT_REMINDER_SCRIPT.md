# Newsletter Integration Prompt Reminder

## Copy this into your prompts when creating newsletter forms:

```
IMPORTANT NEWSLETTER INTEGRATION REQUIREMENTS:

When creating newsletter signups, integrate with existing email system:
- Database at `/var/www/html/zokratiq.com/api/subscribers.db`
- Admin dashboard at `/admin-dashboard.php`
- Email service at `/email-service.php`
- Send emails from `hello@zokratiq.com`
- Notify admin of signups
- Add email template to email_templates table
- Ensure UI styling works (check basePath in next.config.js)
- Test both subscriber and admin email notifications

Use existing database tables: subscribers, email_templates, email_campaigns.
```

## What Was Implemented:

✅ **Database Integration**: Signups now go to the existing subscribers table
✅ **Admin Dashboard**: New signups will appear in the admin dashboard
✅ **Email Service**: Email template added to the email service system
✅ **Dual Emails**: Both subscriber welcome email and admin notification sent
✅ **Template Management**: "Cracks in the System Welcome" template now in email service
✅ **UI Styling**: Fixed basePath issue in next.config.js
✅ **Duplicate Prevention**: Handles existing subscribers gracefully

## Email Integration Details:

- **Subscriber Email**: Welcome email with first dispatch content
- **Admin Email**: Notification to hello@zokratiq.com with signup details
- **Template**: "Cracks in the System Welcome" template in database
- **Database**: Properly integrated with existing subscribers table
- **Source Tracking**: UTM source set to "cracks-landing"

The system is now fully integrated and working correctly!