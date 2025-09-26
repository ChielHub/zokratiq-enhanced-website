# Zokratiq Site Architecture - Complete Overview

## Directory Structure Analysis

### Two Main Directories
1. **`/var/www/html/zokratiq/`** - Legacy/backup directory
2. **`/var/www/html/zokratiq.com/`** - Active production directory

## Critical Architecture Points

### 1. The /out Directory Configuration

#### CRITICAL NGINX CONFIGURATION
```nginx
# The actual serving configuration
root /var/www/html/zokratiq.com/out;  # NOT /var/www/html/zokratiq.com/
```

**This is the most important architectural detail:**
- Nginx serves from `/var/www/html/zokratiq.com/out/`
- The `/out` directory contains the static exported Next.js site
- Editing files in `/var/www/html/zokratiq.com/` root won't affect the live site
- Must run `npm run build && npm run export` to update live content

### 2. Technology Stack Comparison

#### /var/www/html/zokratiq/ (Legacy)
- **Type**: Mixed static HTML and basic JavaScript
- **Framework**: None (vanilla HTML/CSS/JS)
- **Status**: Backup/archived
- **Purpose**: Original site before Next.js migration

#### /var/www/html/zokratiq.com/ (Active)
- **Type**: Next.js application with static export
- **Framework**: Next.js 14, React 18
- **Status**: Active production
- **Deployment**: Static files in `/out` directory

## JavaScript vs Static Architecture

### 1. Development vs Production

#### Development Environment
```javascript
// Development runs as Node.js application
npm run dev  // Runs on port 3000
- Hot module replacement
- Server-side rendering
- API routes active
- Dynamic content generation
```

#### Production Environment
```javascript
// Production is fully static
npm run build    // Creates optimized build
npm run export   // Generates static HTML in /out
- No Node.js server required
- Pure static HTML/CSS/JS
- Served directly by Nginx
- Pre-rendered at build time
```

### 2. File Structure Mapping

#### Source Structure (Development)
```
/var/www/html/zokratiq.com/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage component
│   ├── about/page.tsx     # About page component
│   └── ...                # Other page components
├── components/            # React components
├── public/               # Static assets
├── styles/               # CSS/Tailwind styles
└── package.json          # Dependencies
```

#### Output Structure (Production)
```
/var/www/html/zokratiq.com/out/
├── index.html            # Pre-rendered homepage
├── about.html            # Pre-rendered about page
├── _next/                # Compiled JavaScript/CSS
│   ├── static/          # Static assets
│   └── chunks/          # Code chunks
└── [other pages].html    # All pre-rendered pages
```

### 3. Build and Export Process

#### Build Pipeline
```bash
# Step 1: Build the Next.js application
npm run build
# - Compiles TypeScript to JavaScript
# - Optimizes React components
# - Generates production bundles
# - Creates .next directory

# Step 2: Export to static HTML
npm run export
# - Pre-renders all pages to HTML
# - Copies static assets
# - Generates /out directory
# - Creates fully static site
```

## Key Differences Between Directories

### 1. /var/www/html/zokratiq/ (Old)

#### Characteristics
- **Static HTML files**: Direct HTML editing
- **No build process**: Changes immediately visible
- **Simple structure**: One HTML file per page
- **Basic JavaScript**: Inline or simple script files
- **CSS**: Traditional stylesheets

#### File Examples
```
index.html         # Direct HTML
about.html         # Direct HTML
styles.css         # Traditional CSS
script.js          # Vanilla JavaScript
```

### 2. /var/www/html/zokratiq.com/ (Current)

#### Characteristics
- **React components**: TSX/JSX files
- **Build required**: Must compile to see changes
- **Complex structure**: Components, pages, APIs
- **Modern JavaScript**: ES6+, TypeScript
- **Tailwind CSS**: Utility-first CSS

#### File Examples
```
app/page.tsx           # React component (source)
out/index.html         # Generated HTML (production)
components/Header.tsx  # Reusable component
styles/globals.css     # Tailwind directives
```

## Content Management Workflow

### 1. Making Content Changes

#### For Static Content (HTML in /out)
```bash
# WRONG - This won't work:
vim /var/www/html/zokratiq.com/out/index.html  # Changes will be overwritten

# RIGHT - Edit source and rebuild:
vim /var/www/html/zokratiq.com/app/page.tsx    # Edit source component
npm run build && npm run export                 # Rebuild and export
```

#### For Dynamic Features (PHP)
```bash
# PHP files work directly (not part of Next.js build)
vim /var/www/html/zokratiq.com/contact.php     # Direct edit works
vim /var/www/html/zokratiq.com/admin-dashboard.php  # Direct edit works
```

### 2. Asset Management

#### Static Assets
```
/public/              # Source location (development)
/out/                 # Deployed location (production)
/out/_next/static/    # Compiled assets
```

#### Image Handling
- Development: Referenced from `/public/`
- Production: Copied to `/out/` during export
- OG Images: Generated separately in `/out/og-images/`

## PHP Integration

### Hybrid Architecture
The site uses a hybrid approach:

#### Static Pages (Next.js)
- Marketing pages
- Content pages
- Blog/essays
- About sections

#### Dynamic Features (PHP)
- Contact forms (`contact.php`)
- Admin dashboard (`admin-dashboard.php`)
- Email automation (`email-automation-dashboard.php`)
- Newsletter signup (`cracks-signup.php`)
- Unsubscribe (`unsubscribe.php`)

### PHP Files Location
```
/var/www/html/zokratiq.com/
├── contact.php                    # Contact form handler
├── admin-dashboard.php            # Admin interface
├── email-automation-dashboard.php # Email system
├── automation-engine.php          # Automation logic
├── template-manager.php           # Email templates
└── [other PHP files]              # Various handlers
```

## Database Architecture

### SQLite Databases
Located in `/var/www/html/zokratiq.com/`:
- `zokratiq.db` - Main database
- Email subscribers
- Contact submissions
- Automation rules
- Campaign data

### Database Access
- PHP scripts connect directly
- No ORM layer
- Raw SQL queries
- File-based (SQLite)

## Deployment Workflow

### 1. Development Cycle
```bash
# Local development
cd /var/www/html/zokratiq.com
npm run dev                    # Start dev server

# Make changes to components
vim app/page.tsx              # Edit source files

# Test changes locally
# Browser: http://localhost:3000
```

### 2. Production Deployment
```bash
# Build and export
npm run build                 # Create production build
npm run export               # Generate static files

# Verify output
ls -la out/                  # Check generated files

# Site is now live
# Nginx serves from /out directory
```

### 3. Quick Fixes (PHP only)
```bash
# For PHP files, direct edit works
vim contact.php              # Edit PHP directly
# Changes immediate, no build needed
```

## Performance Considerations

### Static Export Benefits
- **No server processing**: Pure HTML served
- **CDN friendly**: Can cache everything
- **Fast load times**: No server-side rendering
- **Scalable**: Handles high traffic easily
- **Secure**: No server-side vulnerabilities

### Limitations
- **No server-side rendering**: Can't use Next.js SSR features
- **No API routes in production**: Must use separate PHP files
- **Build time for changes**: Can't edit HTML directly
- **Static only**: No dynamic Next.js features

## Troubleshooting Guide

### Common Issues and Solutions

#### 1. Changes Not Appearing
**Problem**: Edited files but site unchanged
**Solution**:
```bash
# Did you edit the source?
vim app/page.tsx  # Edit source, not /out files

# Did you rebuild?
npm run build && npm run export

# Clear Next.js cache if needed
rm -rf .next
npm run build && npm run export
```

#### 2. 404 Errors
**Problem**: Page not found
**Solution**:
```bash
# Check if page exists in /out
ls -la out/page-name.html

# Rebuild if missing
npm run build && npm run export
```

#### 3. PHP Features Not Working
**Problem**: Contact form or admin features broken
**Solution**:
```bash
# PHP files are separate from Next.js
# Check PHP directly
php -l contact.php  # Lint check

# Check permissions
ls -la *.php
```

## Migration History

### Timeline
1. **Original Site**: Static HTML in `/var/www/html/zokratiq/`
2. **Next.js Migration**: Moved to `/var/www/html/zokratiq.com/`
3. **Static Export**: Configured to export to `/out/`
4. **Nginx Update**: Pointed to serve from `/out/`
5. **Hybrid Approach**: Added PHP for dynamic features

### Why This Architecture?

#### Benefits
- **Performance**: Static files are fastest
- **Security**: No Node.js server exposed
- **Simplicity**: Nginx serves static files
- **Flexibility**: PHP for dynamic needs
- **Scalability**: Can handle high traffic

#### Trade-offs
- **Build complexity**: Need to rebuild for changes
- **Development friction**: Can't edit production directly
- **Mixed stack**: PHP + Next.js maintenance
- **No SSR**: Lost Next.js server features

## Best Practices

### 1. Content Updates
- Always edit source files (`.tsx`, `.jsx`)
- Never edit files in `/out/` directly
- Run build + export after changes
- Test locally first with `npm run dev`

### 2. Asset Management
- Place new images in `/public/`
- Reference as `/image.png` in code
- Let build process handle optimization

### 3. PHP Integration
- Keep PHP files separate from Next.js
- Use PHP for forms and dynamic features
- Don't try to mix PHP into Next.js pages

### 4. Backup Strategy
- Backup entire `/var/www/html/zokratiq.com/`
- Include source files, not just `/out/`
- Keep database backups separately

## Directory Comparison Summary

| Aspect | /zokratiq/ (Old) | /zokratiq.com/ (Current) |
|--------|------------------|--------------------------|
| **Technology** | Static HTML | Next.js + React |
| **Build Required** | No | Yes |
| **Served From** | Root directory | /out subdirectory |
| **Edit Method** | Direct HTML edit | Edit source + rebuild |
| **JavaScript** | Vanilla JS | React/TypeScript |
| **CSS** | Traditional CSS | Tailwind CSS |
| **Dynamic Features** | Basic JS | PHP integration |
| **Database** | None | SQLite |
| **Deployment** | Copy files | Build + Export |
| **Development** | Edit in browser | npm run dev |

## Critical Reminders

### ⚠️ Most Important Points
1. **NGINX SERVES FROM `/out/`** - Not from root
2. **MUST REBUILD** after source changes
3. **PHP FILES** work independently
4. **DON'T EDIT** `/out/` files directly
5. **SOURCE FILES** are in `/app/` directory

### 🔧 Quick Commands
```bash
# Development
cd /var/www/html/zokratiq.com
npm run dev

# Production Update
npm run build && npm run export

# Clear cache if issues
rm -rf .next out
npm run build && npm run export

# Check what's being served
ls -la /var/www/html/zokratiq.com/out/
```

## Conclusion

The Zokratiq site architecture represents a modern hybrid approach, combining the benefits of static site generation (Next.js) with dynamic server-side features (PHP). The critical understanding is that Nginx serves from the `/out/` directory, requiring a build process for any content changes. This architecture provides excellent performance and security while maintaining the flexibility for dynamic features through PHP integration.