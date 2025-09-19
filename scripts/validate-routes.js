#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * Route Validation Script for Zokratiq Next.js App
 * Prevents broken links by validating all referenced routes have corresponding pages
 */

const COLORS = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${COLORS.green}✅ ${msg}${COLORS.reset}`),
  error: (msg) => console.log(`${COLORS.red}❌ ${msg}${COLORS.reset}`),
  warning: (msg) => console.log(`${COLORS.yellow}⚠️  ${msg}${COLORS.reset}`),
  info: (msg) => console.log(`${COLORS.blue}ℹ️  ${msg}${COLORS.reset}`)
};

// Paths to scan for links
const SCAN_PATHS = [
  'components/**/*.tsx',
  'app/**/*.tsx',
  'app/**/*.ts'
];

// Extract internal links from file content
function extractInternalLinks(content, filePath) {
  const links = new Set();
  
  // Match href="/..." or href='/...'
  const hrefRegex = /href=['"]([^'"]*)['"]/g;
  let match;
  
  while ((match = hrefRegex.exec(content)) !== null) {
    const href = match[1];
    
    // Skip external links, anchors, special routes, and file downloads
    if (href.startsWith('http') || 
        href.startsWith('mailto:') || 
        href.startsWith('tel:') ||
        href.startsWith('#') ||
        href.includes('zokratiq.com') ||
        href.includes('168.119.231.9') ||
        href.endsWith('.pdf') ||
        href.endsWith('.html') ||
        href.endsWith('.zip') ||
        href.endsWith('.doc') ||
        href.endsWith('.docx')) {
      continue;
    }
    
    // Clean up the href (remove /zokratiq prefix if present)
    let cleanHref = href.replace(/^\/zokratiq/, '');
    
    // Normalize the path
    if (cleanHref === '') cleanHref = '/';
    if (!cleanHref.startsWith('/')) cleanHref = '/' + cleanHref;
    
    links.add(cleanHref);
  }
  
  return Array.from(links);
}

// Check if a Next.js page exists for the given route
function pageExistsForRoute(route) {
  const appDir = path.join(__dirname, '../app');
  
  // Handle root route
  if (route === '/') {
    return fs.existsSync(path.join(appDir, 'page.tsx')) || 
           fs.existsSync(path.join(appDir, 'page.ts'));
  }
  
  // Remove leading slash and split into segments
  const segments = route.substring(1).split('/').filter(Boolean);
  
  // Try different Next.js routing patterns
  const possiblePaths = [
    // Direct page: /about -> app/about/page.tsx
    path.join(appDir, ...segments, 'page.tsx'),
    path.join(appDir, ...segments, 'page.ts'),
    
    // Dynamic route: /blog/[slug] -> app/blog/[slug]/page.tsx
    ...segments.map((_, i) => 
      path.join(appDir, ...segments.slice(0, i + 1), 'page.tsx')
    ),
    
    // Route group: /(main)/about -> app/(main)/about/page.tsx (less common)
  ];
  
  return possiblePaths.some(p => fs.existsSync(p));
}

// Scan files for links
function scanForLinks() {
  const allLinks = new Set();
  const linkSources = new Map(); // track where each link was found
  const rootDir = path.join(__dirname, '..');
  
  // More direct approach to find files
  function findFiles(dir, extensions = ['.tsx', '.ts']) {
    const files = [];
    
    function walkDir(currentDir) {
      if (currentDir.includes('node_modules') || 
          currentDir.includes('.next') || 
          currentDir.includes('.git')) {
        return;
      }
      
      try {
        const items = fs.readdirSync(currentDir);
        
        items.forEach(item => {
          const fullPath = path.join(currentDir, item);
          const stat = fs.statSync(fullPath);
          
          if (stat.isDirectory()) {
            walkDir(fullPath);
          } else if (stat.isFile() && extensions.some(ext => item.endsWith(ext))) {
            files.push(fullPath);
          }
        });
      } catch (error) {
        // Skip directories we can't read
      }
    }
    
    walkDir(dir);
    return files;
  }
  
  // Scan components and app directories
  const dirsToScan = [
    path.join(rootDir, 'components'),
    path.join(rootDir, 'app')
  ];
  
  dirsToScan.forEach(dir => {
    if (fs.existsSync(dir)) {
      const files = findFiles(dir);
      
      files.forEach(file => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          const links = extractInternalLinks(content, file);
          
          links.forEach(link => {
            allLinks.add(link);
            if (!linkSources.has(link)) {
              linkSources.set(link, []);
            }
            linkSources.get(link).push(path.relative(rootDir, file));
          });
        } catch (error) {
          log.warning(`Could not read file ${file}: ${error.message}`);
        }
      });
    }
  });
  
  return { links: Array.from(allLinks), sources: linkSources };
}

// Main validation function
function validateRoutes() {
  log.info('🔍 Starting route validation...\n');
  
  const { links, sources } = scanForLinks();
  
  if (links.length === 0) {
    log.warning('No internal links found to validate');
    return;
  }
  
  log.info(`Found ${links.length} unique internal links to validate\n`);
  
  const results = {
    valid: [],
    invalid: [],
    total: links.length
  };
  
  links.forEach(link => {
    if (pageExistsForRoute(link)) {
      results.valid.push(link);
      log.success(`${link}`);
    } else {
      results.invalid.push({ route: link, sources: sources.get(link) });
      log.error(`${link} (referenced in: ${sources.get(link).join(', ')})`);
    }
  });
  
  // Summary
  console.log(`\n${'='.repeat(60)}`);
  log.info(`VALIDATION SUMMARY:`);
  console.log(`${'='.repeat(60)}`);
  log.success(`Valid routes: ${results.valid.length}`);
  log.error(`Invalid routes: ${results.invalid.length}`);
  log.info(`Total routes checked: ${results.total}`);
  
  if (results.invalid.length > 0) {
    console.log(`\n${COLORS.red}🚨 BROKEN LINKS DETECTED:${COLORS.reset}`);
    results.invalid.forEach(({ route, sources }) => {
      console.log(`${COLORS.red}${route}${COLORS.reset}`);
      console.log(`  Referenced in: ${sources.join(', ')}\n`);
    });
    
    console.log(`${COLORS.yellow}💡 Fix by creating Next.js pages:${COLORS.reset}`);
    results.invalid.forEach(({ route }) => {
      const segments = route.substring(1).split('/').filter(Boolean);
      const suggestedPath = segments.length > 0 
        ? `app/${segments.join('/')}/page.tsx`
        : 'app/page.tsx';
      console.log(`  mkdir -p app/${segments.join('/')} && touch app/${segments.join('/')}/page.tsx`);
    });
    
    process.exit(1);
  } else {
    log.success('\n🎉 All routes are valid!');
    process.exit(0);
  }
}

// Export for use in other scripts
module.exports = { validateRoutes, pageExistsForRoute, extractInternalLinks };

// Run if called directly
if (require.main === module) {
  validateRoutes();
}