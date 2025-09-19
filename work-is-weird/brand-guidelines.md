# Work is Weird — Brand Guidelines

*A visual identity system that merges Zokratiq's intellectual playground aesthetic with the philosophical depth of non-normie placement.*

⸻

## Brand Personality

**Core Identity**: Quiet uncanny meets warm minimalism — for philosophers in exile and companies tired of hiring clones.

**Brand Values**:
- Cross-domain synthesis over specialization silos
- Daimonic authenticity over cultural conformity  
- Signal-first depth over resume theater
- Upgraded reality headsets over consensus thinking

⸻

## Color System

### Primary Palette
```
Deep Indigo (Trust)     #1a1f3a
Muted Ochre (Warmth)    #d4a574  
Bone White (Clarity)    #faf9f6
```

### Zokratiq Heritage Colors
```
Accent Red (Energy)     #ff3f3f
Text Dark (Depth)       #3a3939
Title Dark (Authority)  #343333
Pure White (Foundation) #ffffff
```

### Usage Rules
- **Deep Indigo**: Primary headings, philosophical quotes, CTA backgrounds
- **Muted Ochre**: Accent elements, hover states, "weird" highlights
- **Bone White**: Main background, card backgrounds
- **Heritage Red**: High-priority CTAs, urgent actions
- **Dark Grays**: Body text, secondary information

⸻

## Typography

### Font Families
```
Primary: "Open Sans" (Zokratiq heritage)
Accent: "JetBrains Mono" (for philosophical quotes & code)
Serif: "Crimson Text" (for manifestos & daimonic elements)
```

### Type Scale
```
H1: 2.5rem (40px) - Bold (700) - Deep Indigo
H2: 2rem (32px) - Medium (500) - Deep Indigo  
H3: 1.5rem (24px) - Medium (500) - Text Dark
Body: 1rem (16px) - Regular (400) - Text Dark
Small: 0.875rem (14px) - Regular (400) - Text Dark
Micro: 0.75rem (12px) - Regular (400) - #616161
```

### Philosophical Elements
```
Manifesto Quote: Crimson Text, 1.25rem, Italic, Deep Indigo
Daimonic Fit: JetBrains Mono, 0.875rem, Muted Ochre
Signal Bullets: Open Sans, 1rem, with ochre bullet points
```

⸻

## Visual Hierarchy

### Landing Page Structure
1. **Hero Section**: Large serif headline + Open Sans subhead
2. **Problem/Solution**: Balanced text blocks with ochre accents  
3. **Features**: Card grid with symbolic icons
4. **Process Flow**: Timeline with indigo connectors
5. **CTA Sections**: High-contrast buttons with pulse animation

### Content Hierarchy Rules
- **Philosophical depth first**: Lead with meaning, follow with mechanics
- **Signal over noise**: Generous whitespace, focused attention
- **Weird warmth**: Combine analytical precision with human touch

⸻

## Component Library

### Buttons
```css
/* Primary CTA */
background: #1a1f3a
color: #faf9f6
border-radius: 0.25rem
padding: 0.75rem 1.5rem
font-weight: 500
animation: subtle-pulse 2s infinite

/* Secondary CTA */  
background: transparent
border: 2px solid #d4a574
color: #1a1f3a
border-radius: 0.25rem
padding: 0.75rem 1.5rem

/* Accent Action */
background: #ff3f3f (heritage)
color: #ffffff
border-radius: 0.25rem
```

### Cards
```css
/* Talent Profile Card */
background: #faf9f6
border: 1px solid #d4a574
border-radius: 0.5rem
padding: 1.5rem
box-shadow: 0 2px 8px rgba(26, 31, 58, 0.1)

/* Feature Card */
background: #ffffff
border: 1px solid #f0f0f0
border-radius: 0.5rem
padding: 2rem
```

### Forms
```css
/* Input Fields */
border: 2px solid #e0e0e0
border-radius: 0.25rem
padding: 0.75rem
font-family: "Open Sans"
focus-border: #1a1f3a

/* Philosophical Bio Field */
font-family: "Crimson Text"
font-style: italic
min-height: 120px
```

⸻

## Iconography

### Style Guidelines
- **Aesthetic**: Low-detail, symbolic, hand-drawn feel
- **Stroke weight**: 1.5px
- **Color**: Muted ochre (#d4a574) primary, deep indigo accents
- **Size**: 24px standard, 32px for hero elements

### Core Icons
```
🔍 Lens (talent scouting)
🪢 Knot (connections, synthesis)  
🧭 Compass (direction, purpose)
🪜 Broken Ladder (non-traditional paths)
⚖️ Balance (ethos alignment)
🌊 Wave (flow, adaptation)
```

⸻

## Photography & Imagery

### Style Direction
- **Portrait style**: Close, human faces with slight film grain
- **Mood**: Candid, contemplative, not posed or corporate
- **Lighting**: Natural, soft shadows, warm undertones
- **Subjects**: Diverse, intellectually curious individuals
- **Avoid**: Stock corporate imagery, forced smiles, sterile environments

### Image Treatments
```css
/* Profile Images */
border-radius: 50%
filter: sepia(10%) contrast(1.1)
transition: filter 0.3s ease

/* Hero Background */
overlay: linear-gradient(rgba(26, 31, 58, 0.7), rgba(212, 165, 116, 0.3))
blend-mode: multiply
```

⸻

## Layout Patterns

### Grid System
```
Desktop: 12-column grid, 1200px max-width
Tablet: 8-column grid, flexible
Mobile: 4-column grid, 16px margins
```

### Spacing Scale
```
xs: 0.25rem (4px)
sm: 0.5rem (8px)  
md: 1rem (16px)
lg: 1.5rem (24px)
xl: 2rem (32px)
xxl: 3rem (48px)
xxxl: 4rem (64px)
```

### Section Layouts
- **Hero**: Full-width background, centered content, 60vh min-height
- **Features**: 3-column grid (desktop), stacked (mobile)
- **Process**: Horizontal timeline with connecting lines
- **Testimonials**: Centered cards with philosophical quotes

⸻

## Animation & Interactions

### Micro-Interactions
```css
/* CTA Pulse */
@keyframes subtle-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(26, 31, 58, 0.3); }
  50% { box-shadow: 0 0 0 8px rgba(26, 31, 58, 0.1); }
}

/* Hover Transitions */
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)

/* Form Focus */
transform: scale(1.02)
border-color: #d4a574
```

### Page Transitions
- **Smooth scroll**: `scroll-behavior: smooth`
- **Fade-in content**: Intersection Observer with opacity/transform
- **Loading states**: Skeleton screens with ochre accents

⸻

## Voice & Tone Guidelines

### Messaging Principles
- **Philosophical yet practical**: Deep concepts, actionable outcomes
- **Warm intellectualism**: Smart but not condescending  
- **Anti-corporate**: Authentic, human, slightly irreverent
- **Signal-first**: Substance over style, depth over polish

### Copy Style
```
Headlines: Bold, provocative, questions that reframe
Subheads: Explanatory, bridge abstract to concrete
Body: Conversational, precise, metaphor-rich
CTAs: Action-oriented, slightly playful
Microcopy: Helpful, personality-driven
```

⸻

## Implementation Notes

### CSS Custom Properties
```css
:root {
  --color-indigo: #1a1f3a;
  --color-ochre: #d4a574;
  --color-bone: #faf9f6;
  --color-red: #ff3f3f;
  --font-primary: "Open Sans", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-serif: "Crimson Text", serif;
  --border-radius: 0.25rem;
  --shadow-card: 0 2px 8px rgba(26, 31, 58, 0.1);
}
```

### Responsive Breakpoints
```css
/* Mobile */ @media (max-width: 767px)
/* Tablet */ @media (min-width: 768px) and (max-width: 1023px)  
/* Desktop */ @media (min-width: 1024px)
```

### Performance Considerations
- **Font loading**: `font-display: swap` for web fonts
- **Image optimization**: WebP with PNG fallbacks
- **Animation**: `prefers-reduced-motion` respect
- **Color contrast**: WCAG AA compliance (4.5:1 minimum)

⸻