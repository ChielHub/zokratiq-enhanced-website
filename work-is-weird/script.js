// Work is Weird - JavaScript Functionality
// Philosophical placement studio interactions

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    initSmoothScrolling();
    
    // Form handling
    initFormHandling();
    
    // Intersection Observer for fade-in animations
    initScrollAnimations();
    
    // Enhanced form interactions
    initFormEnhancements();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
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
            }
        });
    });
}

// Form submission handling
function initFormHandling() {
    const forms = document.querySelectorAll('.intake-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
    });
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const isSeeker = form.closest('#seeker-form');
    const button = form.querySelector('button[type="submit"]');
    const originalText = button.textContent;
    
    // Show loading state
    button.textContent = 'Sending signal...';
    button.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Show success message
        showFormSuccess(form, isSeeker);
        
        // Reset button
        button.textContent = originalText;
        button.disabled = false;
        
        // Reset form
        form.reset();
    }, 2000);
}

function showFormSuccess(form, isSeeker) {
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = isSeeker 
        ? `
            <h4>Welcome to the weird collective!</h4>
            <p>Your philosophical signal has been received. We'll reach out when we find a role that fits your daimonic essence.</p>
            <p class="daimonic-quote">"The soul never thinks without a picture." — Aristotle</p>
        `
        : `
            <h4>Scout call initiated!</h4>
            <p>Your quest for weird talent has begun. We'll contact you within 48 hours to discuss your role narrative and cultural objectives.</p>
            <p class="daimonic-quote">"We find the person who rewrites the job."</p>
        `;
    
    // Insert success message
    form.parentNode.insertBefore(successMessage, form);
    
    // Hide form temporarily
    form.style.display = 'none';
    
    // Remove success message and show form again after 5 seconds
    setTimeout(() => {
        successMessage.remove();
        form.style.display = 'block';
    }, 5000);
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
            }
        });
    }, observerOptions);
    
    // Observe key sections
    const sectionsToAnimate = document.querySelectorAll(
        '.why-item, .who-card, .feature-card, .flow, .pricing-card, .faq-item'
    );
    
    sectionsToAnimate.forEach(section => {
        section.classList.add('fade-in-element');
        observer.observe(section);
    });
}

// Enhanced form interactions
function initFormEnhancements() {
    // Add floating labels effect
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        // Handle focus/blur for better UX
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value.trim()) {
                this.parentNode.classList.remove('focused');
            }
        });
        
        // Check if already has value on load
        if (input.value.trim()) {
            input.parentNode.classList.add('focused');
        }
    });
    
    // Progressive disclosure for philosophical questions
    const bioTextarea = document.getElementById('seeker-bio');
    const narrativeTextarea = document.getElementById('role-narrative');
    
    if (bioTextarea) {
        bioTextarea.addEventListener('focus', function() {
            showPhilosophicalPrompt(this, 
                "Think beyond your LinkedIn summary. What drives your curiosity? What questions keep you awake?"
            );
        });
    }
    
    if (narrativeTextarea) {
        narrativeTextarea.addEventListener('focus', function() {
            showPhilosophicalPrompt(this,
                "Tell the story of what this role could become. What transformation are you seeking? What new reality would this person help create?"
            );
        });
    }
}

function showPhilosophicalPrompt(element, promptText) {
    // Check if prompt already exists
    if (element.parentNode.querySelector('.philosophical-prompt')) return;
    
    const prompt = document.createElement('div');
    prompt.className = 'philosophical-prompt';
    prompt.textContent = promptText;
    
    element.parentNode.appendChild(prompt);
    
    // Remove prompt when user starts typing
    element.addEventListener('input', function() {
        const existingPrompt = this.parentNode.querySelector('.philosophical-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        }
    }, { once: true });
}

// Add CSS for animations (injected via JavaScript to avoid external dependencies)
function addAnimationStyles() {
    const styles = `
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .form-success {
            background: linear-gradient(135deg, var(--color-bone), var(--color-white));
            border: 2px solid var(--color-ochre);
            border-radius: 0.5rem;
            padding: var(--spacing-xl);
            margin-bottom: var(--spacing-xl);
            text-align: center;
            animation: slideInUp 0.5s ease-out;
        }
        
        .form-success h4 {
            color: var(--color-indigo);
            margin-bottom: var(--spacing-md);
        }
        
        .form-success .daimonic-quote {
            margin-top: var(--spacing-lg);
            font-size: 0.875rem;
        }
        
        .philosophical-prompt {
            font-family: var(--font-serif);
            font-style: italic;
            font-size: 0.875rem;
            color: var(--color-ochre);
            margin-top: var(--spacing-sm);
            padding: var(--spacing-sm);
            background: rgba(212, 165, 116, 0.1);
            border-radius: var(--border-radius);
            animation: fadeInPrompt 0.3s ease-out;
        }
        
        .form-group.focused label {
            color: var(--color-ochre);
            transform: scale(0.95);
        }
        
        @keyframes slideInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes fadeInPrompt {
            from {
                opacity: 0;
                transform: scale(0.95);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        /* Stagger animation delays for grid items */
        .why-item:nth-child(1) { transition-delay: 0.1s; }
        .why-item:nth-child(2) { transition-delay: 0.2s; }
        .why-item:nth-child(3) { transition-delay: 0.3s; }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.15s; }
        .feature-card:nth-child(3) { transition-delay: 0.2s; }
        .feature-card:nth-child(4) { transition-delay: 0.25s; }
        .feature-card:nth-child(5) { transition-delay: 0.3s; }
        .feature-card:nth-child(6) { transition-delay: 0.35s; }
        
        .pricing-card:nth-child(1) { transition-delay: 0.1s; }
        .pricing-card:nth-child(2) { transition-delay: 0.2s; }
        .pricing-card:nth-child(3) { transition-delay: 0.3s; }
        .pricing-card:nth-child(4) { transition-delay: 0.4s; }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

// Initialize animation styles
addAnimationStyles();

// Easter egg: Konami code for philosophical quote
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 
    'KeyB', 'KeyA'
];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode = konamiCode.slice(-konamiSequence.length);
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        showPhilosophicalEasterEgg();
        konamiCode = [];
    }
});

function showPhilosophicalEasterEgg() {
    const quotes = [
        "The unexamined life is not worth living. — Socrates",
        "What we think, we become. — Buddha", 
        "The cave you fear to enter holds the treasure you seek. — Joseph Campbell",
        "We are what we repeatedly do. Excellence, then, is not an act, but a habit. — Aristotle",
        "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes. — Marcel Proust"
    ];
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    
    const modal = document.createElement('div');
    modal.className = 'philosophical-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>For the philosophical wanderer...</h3>
            <p class="daimonic-quote">${randomQuote}</p>
            <button onclick="this.parentNode.parentNode.remove()" class="btn btn-secondary">Continue the journey</button>
        </div>
    `;
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(26, 31, 58, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.5s ease-out;
    `;
    
    const modalContent = modal.querySelector('.modal-content');
    modalContent.style.cssText = `
        background: var(--color-white);
        padding: var(--spacing-xxxl);
        border-radius: 0.5rem;
        text-align: center;
        max-width: 500px;
        margin: var(--spacing-lg);
        box-shadow: var(--shadow-hover);
        animation: slideInUp 0.5s ease-out;
    `;
    
    document.body.appendChild(modal);
}

// Accessibility: Skip to content link
function addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--color-indigo);
        color: var(--color-white);
        padding: 8px;
        text-decoration: none;
        border-radius: var(--border-radius);
        z-index: 1000;
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

// Add skip link for accessibility
addSkipLink();