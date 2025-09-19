# Route Validation System

## Overview

Automated validation system to prevent broken links and ensure all referenced routes have corresponding Next.js pages.

## How It Works

### 1. Automated Scanning
- Scans all TypeScript/TSX files in `components/` and `app/` directories  
- Extracts internal links from `href="..."` attributes
- Excludes external links, emails, phone numbers, and anchors

### 2. Route Validation
- Checks if each internal link has a corresponding Next.js page
- Validates against `app/` directory structure using Next.js App Router conventions
- Reports missing pages with their source locations

### 3. Build Integration
- **Automatic**: Runs before every build (`npm run build`)
- **Manual**: Run validation anytime with `npm run validate:routes`
- **Pre-commit**: Prevents builds with broken links

## Usage

### Manual Validation
```bash
npm run validate:routes
```

### Automatic During Build
```bash
npm run build  # Automatically runs validation first
```

## Example Output

### ✅ Success Case
```
🔍 Starting route validation...

Found 12 unique internal links to validate

✅ /
✅ /about
✅ /labs  
✅ /resources
✅ /resources/tao-jones-index

============================================================
ℹ️  VALIDATION SUMMARY:
============================================================
✅ Valid routes: 12
❌ Invalid routes: 0
ℹ️  Total routes checked: 12

🎉 All routes are valid!
```

### ❌ Error Case
```
🔍 Starting route validation...

Found 8 unique internal links to validate

✅ /
✅ /about
❌ /resources/missing-page (referenced in: ./components/sections/Resources.tsx)
❌ /broken-link (referenced in: ./app/page.tsx)

============================================================
🚨 BROKEN LINKS DETECTED:
============================================================
/resources/missing-page
  Referenced in: ./components/sections/Resources.tsx

/broken-link  
  Referenced in: ./app/page.tsx

💡 Fix by creating Next.js pages:
  mkdir -p app/resources/missing-page && touch app/resources/missing-page/page.tsx
  mkdir -p app/broken-link && touch app/broken-link/page.tsx
```

## File Structure

```
scripts/
  validate-routes.js     # Main validation script

app/
  page.tsx              # Root route: /
  about/
    page.tsx            # Route: /about  
  resources/
    page.tsx            # Route: /resources
    tao-jones-index/
      page.tsx          # Route: /resources/tao-jones-index
  not-found.tsx         # Custom 404 page
```

## Prevention Rules

### ✅ DO
- Create Next.js pages for all internal links before referencing them
- Use relative paths for internal navigation: `/about`, `/resources`
- Run `npm run validate:routes` before committing changes
- Check validation output during build process

### ❌ DON'T  
- Link to static HTML files without creating Next.js pages
- Create navigation links before corresponding pages exist
- Skip validation when build fails
- Create orphaned static files in public directory

## Integration Points

### Package.json Scripts
```json
{
  "scripts": {
    "build": "npm run validate:routes && next build",
    "validate:routes": "node scripts/validate-routes.js", 
    "prebuild": "npm run validate:routes"
  }
}
```

### Build Process
1. `npm run build` triggered
2. `prebuild` runs `validate:routes` automatically  
3. If validation fails → Build stops with error
4. If validation passes → Next.js build proceeds
5. Deploy only occurs with valid routes

## Troubleshooting

### Common Issues

**"No internal links found"**
- Check that files exist in `components/` and `app/` directories
- Verify TSX/TypeScript file extensions are correct

**"Permission denied"**  
- Make script executable: `chmod +x scripts/validate-routes.js`

**"Route should exist but validation fails"**
- Check file naming: Must be `page.tsx` or `page.ts`
- Verify directory structure matches Next.js App Router conventions
- Ensure no typos in file paths

### Manual Override
To temporarily bypass validation during development:
```bash
# Skip validation (not recommended for production)
next build

# Or fix the validation script if needed
```

## Future Enhancements

- [ ] Support for dynamic routes `[slug]`
- [ ] Integration with TypeScript for type-safe routing
- [ ] GitHub Actions integration for CI/CD
- [ ] Link checking for external URLs
- [ ] Performance optimization for large codebases

---

**Last Updated**: September 2025  
**Version**: 1.0.0