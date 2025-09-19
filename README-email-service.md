# Zokratiq Email Service

A lightweight, Mailchimp-like email service integrated with the Zokratiq admin dashboard.

## Features

✅ **Subscriber Management** - Manages existing newsletter subscribers  
✅ **Email Templates** - Import and manage The Signal template  
✅ **Campaign Creation** - Create and send email campaigns  
✅ **Test Emails** - Send test emails before campaign launch  
✅ **Queue Processing** - Bulk email sending with queue management  
✅ **Admin Integration** - Seamlessly integrated with existing dashboard  

## Setup Instructions

1. **Run the setup script** (one-time setup):
   ```
   Visit: https://zokratiq.com/setup-email-service.php
   ```

2. **Set up the email queue processor** (optional for bulk sending):
   ```bash
   # Add to crontab to process emails every minute
   crontab -e
   
   # Add this line:
   * * * * * /usr/bin/php /var/www/html/zokratiq.com/email-queue-processor.php >> /var/log/email-queue.log 2>&1
   ```

3. **Access the email service**:
   ```
   Visit: https://zokratiq.com/email-service.php
   ```

## File Structure

```
/var/www/html/zokratiq.com/
├── email-service.php              # Main email service interface
├── email-sender.php               # Email sending logic
├── email-service-schema.sql       # Database schema
├── setup-email-service.php        # One-time setup script
├── email-queue-processor.php      # Queue processing script
├── admin-dashboard.php            # Updated dashboard (with email service link)
└── api/subscribers.db             # SQLite database (existing + new tables)
```

## Database Tables

- **email_templates** - Stores email templates (HTML/text)
- **email_campaigns** - Campaign management and tracking
- **email_sends** - Individual email send tracking
- **email_settings** - Service configuration

## Usage Workflow

1. **Load Template**: Import The Signal template from the template files
2. **Create Campaign**: Set up a new email campaign using the template
3. **Send Test**: Send a test email to verify everything looks correct
4. **Queue Campaign**: Queue the campaign for bulk sending to all subscribers
5. **Monitor Progress**: Track send status and statistics

## Email Sending Options

### Test Emails
- Send immediately via PHP mail()
- Perfect for testing before bulk send

### Bulk Campaigns
- Queued processing for reliability
- Batch sending to avoid server overload
- Automatic retry for failed sends

## Merge Tags Available

- `{{campaign_id}}` - Unique campaign identifier
- `{{subscriber_email}}` - Recipient email address
- `{{unsubscribe_url}}` - Unsubscribe link
- `{{view_in_browser_url}}` - View in browser link
- `{{manage_prefs_url}}` - Manage preferences link
- `{{year}}` - Current year
- `{{sender_address_line_1}}` - Sender address info

## Technical Notes

### Email Sending
- Currently uses PHP's built-in `mail()` function
- Can be easily extended with PHPMailer, SendGrid, or other services
- Supports both HTML and plain text versions

### Database
- Uses SQLite for simplicity and portability
- All data stored in existing `subscribers.db`
- Automatic schema migrations on first run

### Security
- Admin authentication required
- SQL injection protection via prepared statements
- Input sanitization and validation

## Extending the Service

### Adding SMTP Support
Replace the `mailSend()` method in `email-sender.php` with PHPMailer or similar.

### Adding More Templates
Templates can be added directly to the database or via the admin interface.

### Custom Merge Tags
Add custom merge tags in the `processTemplate()` method in `email-sender.php`.

## Troubleshooting

### Emails Not Sending
1. Check PHP mail configuration: `php -m | grep mail`
2. Verify server can send emails: `echo "Test" | mail -s "Test" your-email@domain.com`
3. Check queue processor logs: `tail -f /var/log/email-queue.log`

### Database Issues
1. Check database permissions: `ls -la /var/www/html/zokratiq.com/api/subscribers.db`
2. Verify SQLite installation: `sqlite3 --version`
3. Re-run setup: Visit `setup-email-service.php` again

### Template Issues
1. Verify template files exist in `/var/www/html/zokratiq.com/out/`
2. Check file permissions
3. Re-import template via "Load The Signal Template" button

## Support

For issues or questions, check the admin dashboard logs or contact the development team.