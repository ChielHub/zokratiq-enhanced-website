// Reality Exploration Labs - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for table of contents
    initSmoothScrolling();
    
    // Reading progress indicator
    initReadingProgress();
    
    // Scroll-based animations
    initScrollAnimations();
    
    // Enhanced typography effects
    initTypographyEffects();
});

// Smooth scrolling for internal navigation
function initSmoothScrolling() {
    const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
    
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Update active state in TOC
                updateActiveTocItem(this);
            }
        });
    });
}

function updateActiveTocItem(activeLink) {
    // Remove active class from all links
    document.querySelectorAll('.toc a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    activeLink.classList.add('active');
}

// Reading progress indicator
function initReadingProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--color-red);
        z-index: 1000;
        transition: width 0.3s ease;
    `;
    
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrollTop = window.scrollY;
        const progress = (scrollTop / documentHeight) * 100;
        
        progressBar.style.width = Math.min(progress, 100) + '%';
    });
}

// Scroll-triggered animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Update TOC active state based on visible sections
                const sectionId = entry.target.id;
                if (sectionId) {
                    const tocLink = document.querySelector(`.toc a[href="#${sectionId}"]`);
                    if (tocLink) {
                        updateActiveTocItem(tocLink);
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.add('fade-in-element');
        observer.observe(section);
    });
    
    // Observe special elements
    const specialElements = document.querySelectorAll('.insight-block, .question-block, .faq-item');
    specialElements.forEach(element => {
        element.classList.add('fade-in-element');
        observer.observe(element);
    });
}

// Enhanced typography effects
function initTypographyEffects() {
    // Add subtle hover effects to questions
    const questionBlocks = document.querySelectorAll('.question-block');
    questionBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.borderLeftWidth = '6px';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftWidth = '3px';
        });
    });
    
    // Add emphasis to key phrases on scroll
    const emphasisPhrases = document.querySelectorAll('strong');
    const emphasisObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.color = 'var(--color-red)';
                entry.target.style.transition = 'color 0.5s ease';
            }
        });
    }, { threshold: 0.5 });
    
    emphasisPhrases.forEach(phrase => {
        emphasisObserver.observe(phrase);
    });
}

// Add dynamic styles via JavaScript
function addDynamicStyles() {
    const styles = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .toc a.active {
            color: var(--color-red);
            font-weight: 600;
        }
        
        .question-block {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .insight-block {
            position: relative;
            overflow: hidden;
        }
        
        .insight-block::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 63, 63, 0.1), transparent);
            transition: left 0.8s ease;
        }
        
        .insight-block.animate-in::before {
            left: 100%;
        }
        
        /* Stagger animations */
        .content-section:nth-child(1) .fade-in-element { transition-delay: 0.1s; }
        .content-section:nth-child(2) .fade-in-element { transition-delay: 0.2s; }
        .content-section:nth-child(3) .fade-in-element { transition-delay: 0.3s; }
        .content-section:nth-child(4) .fade-in-element { transition-delay: 0.4s; }
        .content-section:nth-child(5) .fade-in-element { transition-delay: 0.5s; }
        
        .faq-item:nth-child(1) { transition-delay: 0.1s; }
        .faq-item:nth-child(2) { transition-delay: 0.2s; }
        .faq-item:nth-child(3) { transition-delay: 0.3s; }
        .faq-item:nth-child(4) { transition-delay: 0.4s; }
        .faq-item:nth-child(5) { transition-delay: 0.5s; }
        
        /* Mobile enhancements */
        @media (max-width: 768px) {
            .reading-progress {
                height: 2px;
            }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize dynamic styles
addDynamicStyles();

// Accessibility: Skip link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-red);
        color: var(--color-white);
        padding: 8px 12px;
        text-decoration: none;
        border-radius: var(--border-radius);
        z-index: 1000;
        font-weight: 500;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
}

// Initialize accessibility features
addSkipLink();

// Easter egg: Philosophical insights on specific key combinations
let keySequence = [];
const insightSequence = ['r', 'e', 'a', 'l', 'i', 't', 'y'];

document.addEventListener('keydown', function(e) {
    keySequence.push(e.key.toLowerCase());
    
    if (keySequence.length > insightSequence.length) {
        keySequence = keySequence.slice(-insightSequence.length);
    }
    
    if (keySequence.join('') === insightSequence.join('')) {
        showPhilosophicalInsight();
        keySequence = [];
    }
});

function showPhilosophicalInsight() {
    const insights = [
        "The map is not the territory. — Alfred Korzybski",
        "We don't see things as they are, we see them as we are. — Anaïs Nin",
        "The real question is not whether machines think but whether men do. — B.F. Skinner",
        "What we observe is not nature itself, but nature exposed to our method of questioning. — Werner Heisenberg",
        "The eye sees only what the mind is prepared to comprehend. — Robertson Davies"
    ];
    
    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(58, 57, 57, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        animation: fadeIn 0.5s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--color-white);
            padding: 3rem;
            border-radius: var(--border-radius);
            text-align: center;
            max-width: 500px;
            margin: 1rem;
            border-left: 4px solid var(--color-red);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        ">
            <h3 style="color: var(--color-text-title); margin-bottom: 1.5rem;">For the reality explorer...</h3>
            <p style="font-style: italic; color: var(--color-text-dark); margin-bottom: 2rem; font-size: 1.125rem;">${randomInsight}</p>
            <button onclick="this.closest('div').remove()" style="
                background: var(--color-red);
                color: var(--color-white);
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 500;
                transition: var(--transition-smooth);
            " onmouseover="this.style.opacity='0.8'" onmouseout="this.style.opacity='1'">
                Continue exploring
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-remove after 10 seconds
    setTimeout(() => {
        if (document.body.contains(modal)) {
            modal.remove();
        }
    }, 10000);
}