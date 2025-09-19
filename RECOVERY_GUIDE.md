# Zokratiq Partner-with-us Recovery Guide

## What Was Changed (2025-08-28)
- Modified `/app/partner-with-us/page.tsx` to replace "Coming soon..." with full partner page + contact drawer
- Added comprehensive contact form with organization/independent paths
- Only affects the `/partner-with-us/` route ("Join Us" navigation link)

## Backups Created
- `out_backup_20250828_184736/` - Complete static build backup
- `.next_backup_20250828_184736/` - Next.js build cache backup  
- `app/partner-with-us/page.tsx.original` - Original simple "Coming soon" version

## To Rollback Everything:
```bash
cd /var/www/html/zokratiq

# Restore original simple page
cp app/partner-with-us/page.tsx.original app/partner-with-us/page.tsx

# Restore static build
cp -r out_backup_20250828_184736/* out/

# Rebuild if needed
npm run build
```

## To Keep Changes & Rebuild:
```bash
cd /var/www/html/zokratiq
npm run build
```

## What the New Version Contains:
- Full "Partner With Us" page content (from static partner.html)
- Inline contact drawer triggered by "Start the Conversation" buttons
- Progressive form with Organization vs Independent Ally paths
- All fields from detailed spec including validation
- Form submission simulation + success states

## Files Modified:
- `app/partner-with-us/page.tsx` (only file changed)

## Files NOT Modified:
- All other pages remain unchanged
- Navigation/layout intact
- Static `partner.html` still works separately

## Recovery Commands for New Claude Session:
```bash
# Navigate to project
cd /var/www/html/zokratiq

# Check current state
ls -la *backup*
cat app/partner-with-us/page.tsx | head -5

# If you see 'use client' and imports, new version is active
# If you see simple export function, original version is active

# Build the current version
npm run build
```

## Live Site Impact:
- Current live site: http://168.119.231.9/zokratiq/partner-with-us/ (shows "Coming soon")
- After build: Will show full partner page with contact drawer
- All other pages unaffected: home, about, labs, scan, resources, etc.