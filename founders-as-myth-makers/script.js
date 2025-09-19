// SEO Blog Generator - Interactive Features

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for table of contents
    initSmoothScrolling();
    
    // Reading progress indicator
    initReadingProgress();
    
    // Scroll-based animations
    initScrollAnimations();
    
    // Interactive service table
    initServiceTableInteractions();
    
    // Copy-to-clipboard for code samples
    initCodeCopyFeatures();
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
    const specialElements = document.querySelectorAll('.service-row, .level-item, .step-item, .faq-item');
    specialElements.forEach(element => {
        element.classList.add('fade-in-element');
        observer.observe(element);
    });
}

// Interactive service table
function initServiceTableInteractions() {
    const serviceRows = document.querySelectorAll('.service-row');
    
    serviceRows.forEach((row, index) => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.borderLeftWidth = '6px';
            this.style.boxShadow = '0 4px 12px rgba(255, 63, 63, 0.15)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.borderLeftWidth = '3px';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.05)';
        });
        
        // Add stagger delay for animations
        row.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Copy-to-clipboard functionality
function initCodeCopyFeatures() {
    const codeElements = document.querySelectorAll('.code-style');
    
    codeElements.forEach(element => {
        // Make code elements interactive
        element.style.cursor = 'pointer';
        element.style.position = 'relative';
        element.title = 'Click to copy';
        
        element.addEventListener('click', function() {
            const text = this.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                // Show feedback
                showCopyFeedback(this);
            }).catch(() => {
                // Fallback for older browsers
                fallbackCopyToClipboard(text);
                showCopyFeedback(this);
            });
        });
    });
}

function fallbackCopyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback copy failed', err);
    }
    
    document.body.removeChild(textArea);
}

function showCopyFeedback(element) {
    const originalBg = element.style.backgroundColor;
    element.style.backgroundColor = 'rgba(255, 63, 63, 0.3)';
    
    const feedback = document.createElement('span');
    feedback.textContent = 'Copied!';
    feedback.style.cssText = `
        position: absolute;
        top: -30px;
        right: 0;
        background: var(--color-red);
        color: var(--color-white);
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 600;
        z-index: 10;
        animation: fadeInOut 2s forwards;
    `;
    
    element.style.position = 'relative';
    element.appendChild(feedback);
    
    setTimeout(() => {
        element.style.backgroundColor = originalBg;
        if (feedback.parentNode) {
            feedback.remove();
        }
    }, 2000);
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
        
        .service-row {
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .level-item,
        .step-item {
            transition: all 0.3s ease;
        }
        
        .level-item:hover,
        .step-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-10px); }
            20% { opacity: 1; transform: translateY(0); }
            80% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(-10px); }
        }
        
        /* Stagger animations */
        .content-section:nth-child(1) .fade-in-element { transition-delay: 0.1s; }
        .content-section:nth-child(2) .fade-in-element { transition-delay: 0.2s; }
        .content-section:nth-child(3) .fade-in-element { transition-delay: 0.3s; }
        .content-section:nth-child(4) .fade-in-element { transition-delay: 0.4s; }
        .content-section:nth-child(5) .fade-in-element { transition-delay: 0.5s; }
        
        .service-row:nth-child(1) { transition-delay: 0.1s; }
        .service-row:nth-child(2) { transition-delay: 0.2s; }
        .service-row:nth-child(3) { transition-delay: 0.3s; }
        .service-row:nth-child(4) { transition-delay: 0.4s; }
        .service-row:nth-child(5) { transition-delay: 0.5s; }
        .service-row:nth-child(6) { transition-delay: 0.6s; }
        .service-row:nth-child(7) { transition-delay: 0.7s; }
        .service-row:nth-child(8) { transition-delay: 0.8s; }
        
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
            
            .service-row {
                transition-delay: 0s !important;
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

// Easter egg: Tom Morgan-style wisdom on specific key sequence
let keySequence = [];
const wisdomSequence = ['c', 'o', 'm', 'p', 'o', 's', 'e'];

document.addEventListener('keydown', function(e) {
    keySequence.push(e.key.toLowerCase());
    
    if (keySequence.length > wisdomSequence.length) {
        keySequence = keySequence.slice(-wisdomSequence.length);
    }
    
    if (keySequence.join('') === wisdomSequence.join('')) {
        showComposerWisdom();
        keySequence = [];
    }
});

function showComposerWisdom() {
    const wisdom = [
        "You are not writing content. You are composing sonic narrative architecture.",
        "The sentence is not a vessel for meaning. It is music itself.",
        "Begin with mystery. End with resonance. Let the middle breathe.",
        "Never try to impress. Transmit truth with rhythm.",
        "You are transmuting flat text into resonance."
    ];
    
    const randomWisdom = wisdom[Math.floor(Math.random() * wisdom.length)];
    
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
            max-width: 600px;
            margin: 1rem;
            border-left: 4px solid var(--color-red);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
        ">
            <h3 style="color: var(--color-text-title); margin-bottom: 1.5rem;">✍️ Composer's Wisdom</h3>
            <p style="font-style: italic; color: var(--color-text-dark); margin-bottom: 2rem; font-size: 1.125rem; line-height: 1.6;">${randomWisdom}</p>
            <button onclick="this.closest('div').remove()" style="
                background: var(--color-red);
                color: var(--color-white);
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: var(--border-radius);
                cursor: pointer;
                font-weight: 800;
                font-size: 0.875rem;
                letter-spacing: 0.025em;
                transition: var(--transition-smooth);
            " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                Continue composing
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