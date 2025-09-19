# Zokratiq Article Style Guide
*Reverse-engineered from Tao of Business and Creator Epoch articles*

## Overview
This guide captures the complete style architecture for creating Zokratiq articles that match the established brand aesthetics and content structure. Use this as a prompt foundation for generating new articles.

---

## 1. Document Structure

### HTML Foundation
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- META REQUIREMENTS -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Article Title] | Zokratiq</title>
    <meta name="description" content="[Compelling description matching article theme]">
    
    <!-- SOCIAL SHARING -->
    <meta property="og:type" content="article">
    <meta property="og:url" content="https://zokratiq.com/[article-name].html">
    <meta property="og:title" content="[Article Title]">
    <meta property="og:description" content="[Same as meta description]">
    <meta property="og:image" content="[Hero image URL]">
    
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://zokratiq.com/[article-name].html">
    <meta property="twitter:title" content="[Article Title]">
    <meta property="twitter:description" content="[Same as meta description]">
    
    <!-- CANONICAL & FAVICON -->
    <link rel="canonical" href="https://zokratiq.com/[article-name].html">
    <link rel="icon" type="image/jpeg" href="/zokratiq-logo-new.jpeg">
    
    <!-- FONTS (REQUIRED) -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Crimson+Text:ital,wght@0,400;0,600;1,400;1,600&family=JetBrains+Mono:wght@400&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
```

### Page Layout Structure
```html
<!-- Navigation (Fixed) -->
<nav class="nav">...</nav>

<!-- Hero Section (Full viewport) -->
<section class="hero" id="hero">...</section>

<!-- Main Content (Grid Layout) -->
<main class="main-content">
    <div class="container">
        <!-- Sidebar Navigation (Sticky) -->
        <aside class="sidebar">...</aside>
        
        <!-- Article Content -->
        <article class="article">
            <!-- Introduction Section -->
            <section class="intro" id="intro">...</section>
            
            <!-- Numbered Sections -->
            <section class="section" id="section-1">...</section>
            <!-- ... more sections ... -->
            
            <!-- Related Resources -->
            <section class="related" id="related">...</section>
            
            <!-- CTA Section -->
            <div class="cta">...</div>
        </article>
    </div>
</main>

<!-- Footer -->
<footer class="footer">...</footer>
```

---

## 2. CSS Architecture

### CSS Variables (Required)
```css
:root {
    --primary-teal: #00b3a6;
    --bright-aqua: #4adfd6;
    --base-black: #0c0c0c;
    --deep-charcoal: #141414;
    --soft-white: #f5f7fa;
    --cloud-gray: #c8ccd2;
    --text-primary: #f5f7fa;
    --text-secondary: #c8ccd2;
    --text-muted: #888a8c;
}
```

### Typography System
```css
/* Font Stack */
body {
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.7;
}

/* Heading Hierarchy */
.hero-title {
    font-size: clamp(2.5rem, 5vw, 4rem);
    font-weight: 700;
    background: linear-gradient(135deg, var(--primary-teal), var(--bright-aqua));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    line-height: 1.2;
}

.section-title {
    font-size: 1.8rem;
    font-weight: 700;
    color: var(--text-primary);
    font-family: 'Crimson Text', serif;
}

.section h3 {
    font-size: 1.3rem;
    color: var(--bright-aqua);
    margin: 2rem 0 1rem 0;
    font-weight: 600;
    font-family: 'Crimson Text', serif;
}
```

### Layout Grid System
```css
.container {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 250px 1fr;
    gap: 4rem;
    padding: 4rem 2rem;
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .container {
        grid-template-columns: 1fr;
        padding: 2rem 1rem;
        gap: 2rem;
    }
}
```

---

## 3. Component Library

### Navigation Component
```html
<nav class="nav">
    <div class="nav-container">
        <a href="https://zokratiq.com" class="nav-logo">
            <img src="/zokratiq-logo-new.jpeg" alt="Zokratiq" style="height: 40px; width: auto;">
            <span>Zokratiq</span>
        </a>
        <ul class="nav-links">
            <li><a href="https://zokratiq.com/about">About</a></li>
            <li><a href="https://zokratiq.com/labs">Labs</a></li>
            <li><a href="https://zokratiq.com/misfits">Mis/Fits</a></li>
            <li><a href="https://zokratiq.com/resources">Resources</a></li>
            <li><a href="https://zokratiq.com/work-with-us">Work With Us</a></li>
            <li><a href="https://zokratiq.com/contact">Contact</a></li>
            <li><a href="https://zokratiq.com/reality-scan" class="nav-cta">Reality Scan</a></li>
        </ul>
        <div class="nav-toggle">
            <span></span><span></span><span></span>
        </div>
    </div>
</nav>
```

### Hero Section Template
```html
<section class="hero" id="hero">
    <div class="hero-bg">
        <img src="[HERO_IMAGE_URL]" alt="[Alt Text]" loading="lazy">
    </div>
    <div class="hero-content">
        <h1 class="hero-title">[Article Title]</h1>
        <p class="hero-subtitle">[Compelling subtitle]</p>
        
        <div class="hero-meta">
            <div class="hero-meta-item">
                <span>📍</span>
                <span>Part of: [Series/Collection]</span>
            </div>
            <div class="hero-meta-item">
                <span>📌</span>
                <span>#Tag1 #Tag2 #Tag3</span>
            </div>
        </div>
    </div>
</section>
```

### Sidebar Navigation Template
```html
<aside class="sidebar">
    <div class="sidebar-nav">
        <h3 class="sidebar-title">Navigation</h3>
        <ol>
            <li><a href="#intro">[Intro Title]</a></li>
            <li><a href="#section-1">[Section 1 Title]</a></li>
            <li><a href="#section-2">[Section 2 Title]</a></li>
            <!-- Add more sections as needed -->
            <li><a href="#related">Related Resources</a></li>
        </ol>
    </div>
</aside>
```

### Section Header Pattern
```html
<section class="section" id="section-id">
    <div class="section-header">
        <div class="section-number">[Roman Numeral]</div>
        <h2 class="section-title">[Section Title]</h2>
    </div>
    
    <!-- Section content -->
</section>
```

### Text Emphasis Components
```html
<!-- Highlight (teal text) -->
<span class="highlight">emphasized text</span>

<!-- Emphasis (gradient background) -->
<span class="emphasis">special term</span>

<!-- Quote Block -->
<div class="quote">
    "Quote text with <strong>bold elements</strong> for emphasis."
</div>
```

### Table Component
```html
<div class="table-container">
    <table>
        <thead>
            <tr>
                <th>Column 1</th>
                <th>Column 2</th>
                <th>Column 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><strong>Row Item</strong></td>
                <td>Description</td>
                <td>Value</td>
            </tr>
        </tbody>
    </table>
</div>
```

### Stack List Component
```html
<div class="stack-list">
    <div class="stack-item">
        <div class="stack-icon">🔗</div>
        <div class="stack-content">
            <strong>Item Title</strong> → Description of the item with emphasis on key concepts.
        </div>
    </div>
    <!-- Repeat for more items -->
</div>
```

### Playbook Component
```html
<div class="playbook">
    <ol>
        <li><strong>Step Title</strong> → Detailed description with <span class="emphasis">emphasized terms</span> and clear actionable guidance.</li>
        <!-- Add more numbered steps -->
    </ol>
</div>
```

### CTA Section
```html
<div class="cta">
    <h3>[CTA Headline]</h3>
    <p>[Supporting description text]</p>
    <a href="[CTA_URL]" class="cta-button">→ [Button Text]</a>
</div>
```

### Related Resources
```html
<section class="related" id="related">
    <h3>🔗 Related Tools & Articles</h3>
    <a href="[URL]">🔍 [Title] → [Description]</a>
    <a href="[URL]">🌀 [Title] → [Description]</a>
    <a href="[URL]">🔮 [Title] → [Description]</a>
</section>
```

---

## 4. Content Guidelines

### Voice & Tone
- **Philosophical yet practical**: Balance deep concepts with actionable insights
- **Confident and authoritative**: Use declarative statements, avoid hedging
- **Metaphysically grounded**: Reference concepts like "daimonic clarity," "signal-craft," "reality architecture"
- **Systems thinking**: Frame ideas in terms of interconnected patterns and structures

### Content Structure Pattern
1. **Hook**: Bold opening statement that challenges conventional thinking
2. **Thesis**: Clear articulation of the core concept or framework
3. **Development**: Systematic exploration through numbered sections
4. **Application**: Practical playbooks or implementation guidance
5. **Integration**: Closing that ties back to larger philosophical framework

### Language Patterns
- Use specialized terminology: "signal-craft," "daimonic," "ontological," "metaphysical infrastructure"
- Employ em-dashes for conceptual connections
- Use arrow notation (→) for logical progressions
- Balance abstract concepts with concrete examples

### Section Naming Conventions
- Use evocative, philosophical titles
- Incorporate colons for subtitle clarification
- Reference time, reality, and consciousness themes
- Examples: "What Time Is It, Really?", "From Creators of Content → Creators of Codexes"

---

## 5. JavaScript Requirements

### Essential JavaScript Components
```javascript
// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active navigation highlighting
const observerOptions = {
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.sidebar-nav a').forEach(link => {
                link.classList.remove('active');
            });
            
            const id = entry.target.getAttribute('id');
            const navLink = document.querySelector(`.sidebar-nav a[href="#${id}"]`);
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section, .intro').forEach((section) => {
    observer.observe(section);
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});
```

---

## 6. Responsive Design Patterns

### Breakpoints
- **Desktop**: Default styles (1200px max-width container)
- **Tablet**: Begins adapting around 768px
- **Mobile**: `@media (max-width: 768px)` for major layout changes

### Mobile Adaptations
- Grid collapses to single column
- Sidebar moves below content (order: 2)
- Font sizes use clamp() for responsive scaling
- Navigation becomes hamburger menu
- Reduced padding and margins
- Simplified table layouts

---

## 7. Footer Template

```html
<footer class="footer">
    <div class="footer-container">
        <div class="footer-grid">
            <div class="footer-section">
                <h4>Services</h4>
                <ul>
                    <li><a href="https://zokratiq.com/labs">Zokratiq Labs</a></li>
                    <li><a href="https://zokratiq.com/misfits">Mis/Fits</a></li>
                    <li><a href="https://zokratiq.com/reality-scan">Reality Scan</a></li>
                    <li><a href="https://zokratiq.com/work-with-us">Work With Us</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Company</h4>
                <ul>
                    <li><a href="https://zokratiq.com/about">About</a></li>
                    <li><a href="https://zokratiq.com/resources">Resources</a></li>
                    <li><a href="https://zokratiq.com/manifesto-for-misfits">Manifesto</a></li>
                    <li><a href="https://zokratiq.com/contact">Contact</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Resources</h4>
                <ul>
                    <li><a href="https://zokratiq.com/resources/tao-of-business">Tao of Business</a></li>
                    <li><a href="https://zokratiq.com/creator-epoch-article.html">Creator Epoch</a></li>
                    <li><a href="https://zokratiq.com/resources">All Resources</a></li>
                </ul>
            </div>
            <div class="footer-section">
                <h4>Connect</h4>
                <ul>
                    <li><a href="https://twitter.com/zokratiq">Twitter</a></li>
                    <li><a href="https://linkedin.com/company/zokratiq">LinkedIn</a></li>
                    <li><a href="https://zokratiq.com/contact">Get in Touch</a></li>
                </ul>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-copyright">
                © 2024 Zokratiq. All rights reserved. Built for the perceptive.
            </div>
            <div class="footer-social">
                <a href="https://twitter.com/zokratiq" aria-label="Twitter">𝕏</a>
                <a href="https://linkedin.com/company/zokratiq" aria-label="LinkedIn">in</a>
            </div>
        </div>
    </div>
</footer>
```

---

## 8. Implementation Checklist

### Pre-Development
- [ ] Define article theme and philosophical framework
- [ ] Source hero image (landscape, philosophical/abstract)
- [ ] Plan section structure (5-7 numbered sections optimal)
- [ ] Identify key terminology and emphasis points

### During Development
- [ ] Implement complete CSS architecture with variables
- [ ] Ensure all typography scales use clamp() functions
- [ ] Add proper semantic HTML structure
- [ ] Implement intersection observer for navigation
- [ ] Test mobile responsiveness across devices

### Post-Development
- [ ] Validate HTML and CSS
- [ ] Test social sharing meta tags
- [ ] Verify smooth scrolling functionality
- [ ] Check navigation highlighting behavior
- [ ] Ensure footer links are current and functional

---

## 9. Prompt Template for AI Generation

When using this guide to generate new articles, use this prompt structure:

```
Create a Zokratiq article following the complete style guide architecture:

**Article Topic**: [Your topic]
**Philosophical Angle**: [Core philosophical framework]
**Target Sections**: [Number of main sections, 5-7 recommended]

**Requirements**:
- Complete HTML document with all required meta tags and CSS
- Hero section with gradient title and philosophical subtitle
- Sidebar navigation with Roman numerals
- 5-7 numbered sections with philosophical depth
- Use Zokratiq voice: confident, systems-thinking, metaphysically grounded
- Include specialized terminology like "daimonic," "signal-craft," "reality architecture"
- Implement all CSS components: emphasis spans, quote blocks, tables, stack lists
- Add practical playbook section with numbered action items
- Include related resources and CTA sections
- Full responsive design with mobile navigation
- Complete JavaScript for smooth scrolling and nav highlighting

**Style Elements to Include**:
- Color system: #00b3a6 primary, #4adfd6 accent, dark theme
- Typography: Open Sans body, Crimson Text headings, Playfair logo
- Interactive elements: hover transitions, focus states, scroll behavior
- Content patterns: hook → thesis → development → application → integration

Generate the complete article following every detail in the style guide.
```

---

*This style guide captures the complete architecture for creating Zokratiq articles that maintain brand consistency and philosophical depth while providing practical implementation guidance.*