# Nginx Configuration Guardrails

## ⚠️ CRITICAL: Prevent Configuration Regression

### What Caused the Issues:
1. **Multiple conflicting server blocks** in sites-enabled/
2. **Incorrect Next.js basePath** setting in next.config.js
3. **Wrong nginx root directory** serving from wrong path

### Current CANONICAL Configuration:
- **ONLY ONE nginx site enabled:** `zokratiq-canonical`
- **Next.js basePath:** REMOVED (no basePath setting)
- **Nginx root:** `/var/www/html/zokratiq.com/out` (static export)

### Rules to Never Break:

#### 1. Only ONE nginx site configuration
```bash
# Check enabled sites - should only show zokratiq-canonical
ls /etc/nginx/sites-enabled/
```

#### 2. Next.js config must NOT have basePath
```javascript
// next.config.js - NEVER add basePath back
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  // basePath: '/zokratiq',  <-- NEVER ADD THIS BACK
  images: {
    unoptimized: true,
  },
}
```

#### 3. Build process checklist
```bash
# Before any nginx changes:
sudo nginx -t                           # Test syntax
ls /etc/nginx/sites-enabled/            # Verify only zokratiq-canonical
curl -I https://zokratiq.com            # Test HTTPS works
curl -s https://zokratiq.com | grep -o '/_next/static[^"]*\.css'  # CSS URLs correct (no /zokratiq/)
```

### Emergency Recovery:
If site breaks, run:
```bash
# 1. Disable all conflicting sites
sudo unlink /etc/nginx/sites-enabled/default
sudo unlink /etc/nginx/sites-enabled/zokratiq.com
sudo unlink /etc/nginx/sites-enabled/nxrb

# 2. Verify only canonical site
ls /etc/nginx/sites-enabled/  # Should only show zokratiq-canonical

# 3. Test and reload
sudo nginx -t && sudo systemctl reload nginx
```

### File Ownership Rules:
```bash
# All static export files must be owned by www-data
sudo chown -R www-data:www-data /var/www/html/zokratiq.com/out/
```

### Testing Checklist:
- [ ] HTTPS redirect works: `curl -I http://zokratiq.com`
- [ ] CSS loads: `curl -I https://zokratiq.com/_next/static/css/[hash].css`  
- [ ] Misfits OS page works: `curl -I https://zokratiq.com/resources/misfits-os/`
- [ ] No /zokratiq/ in URLs: `curl -s https://zokratiq.com | grep -v '/zokratiq/'`

---

**Last successful configuration:** $(date)
**By:** Claude Code Assistant