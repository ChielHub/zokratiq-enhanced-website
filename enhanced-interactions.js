// Enhanced interactions for Zokratiq landing page
(function() {
    'use strict';
    
    // Smooth scroll for anchor links
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
    
    // Enhanced hover effects for cards
    document.querySelectorAll('.group').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Button hover animations
    document.querySelectorAll('button, .inline-flex').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // SVG line drawing animation simulation
    document.querySelectorAll('svg path, svg line, svg circle, svg polyline').forEach(element => {
        const parent = element.closest('.group, .hover\\:text-bright-aqua, [class*="hover"]');
        if (parent) {
            parent.addEventListener('mouseenter', function() {
                element.style.strokeDasharray = '1000';
                element.style.strokeDashoffset = '1000';
                element.style.animation = 'drawSVG 0.3s ease-in-out forwards';
            });
        }
    });
    
    // Add CSS animation for SVG drawing
    const style = document.createElement('style');
    style.textContent = `
        @keyframes drawSVG {
            to {
                stroke-dashoffset: 0;
            }
        }
        
        /* Enhanced grain animation */
        .grain-overlay {
            animation: grain 8s steps(10) infinite, grainShift 12s ease-in-out infinite alternate;
        }
        
        @keyframes grainShift {
            0% { opacity: 0.03; }
            100% { opacity: 0.06; }
        }
        
        /* Subtle parallax for hero background */
        .shader-canvas {
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Enhanced focus states */
        .focus-ring:focus {
            box-shadow: 0 0 0 2px rgba(0, 179, 166, 0.5);
            outline: none;
        }
        
        /* Improved text gradient animation */
        .bg-clip-text {
            background-size: 200% 200%;
            animation: textGradient 3s ease infinite;
        }
        
        @keyframes textGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            }
        });
    }, observerOptions);
    
    // Observe sections for animations (but don't hide them initially)
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add subtle mouse parallax to hero
    const hero = document.querySelector('.relative.min-h-\\[90vh\\]');
    if (hero) {
        hero.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const canvas = this.querySelector('.shader-canvas');
            if (canvas) {
                const moveX = (x - 0.5) * 20;
                const moveY = (y - 0.5) * 20;
                canvas.style.transform = `translate(${moveX}px, ${moveY}px)`;
                canvas.style.transition = 'transform 0.1s ease-out';
            }
        });
        
        hero.addEventListener('mouseleave', function() {
            const canvas = this.querySelector('.shader-canvas');
            if (canvas) {
                canvas.style.transform = 'translate(0, 0)';
                canvas.style.transition = 'transform 0.3s ease-out';
            }
        });
    }
    
})();