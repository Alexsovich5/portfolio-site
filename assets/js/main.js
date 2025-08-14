// ===== MAIN JAVASCRIPT FILE =====
// Portfolio Website - Main Functionality

class PortfolioApp {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeAnimations();
        this.setupScrollEffects();
        this.setupParallaxEffects();
        this.setup3DCardEffects();
        this.setupTypingEffect();
    }

    setupEventListeners() {
        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            this.handleNavbarScroll();
        });

        // Mobile menu toggle
        const mobileToggle = document.getElementById('mobileToggle');
        const navLinks = document.getElementById('navLinks');
        
        if (mobileToggle && navLinks) {
            mobileToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileToggle.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                }
            });
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                this.smoothScrollTo(anchor.getAttribute('href'));
            });
        });
    }

    handleNavbarScroll() {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    smoothScrollTo(targetId) {
        const target = document.querySelector(targetId);
        const navLinks = document.getElementById('navLinks');
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu if open
            if (navLinks) {
                navLinks.classList.remove('active');
            }
        }
    }

    initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Skill bars animation
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkillBars(entry.target);
                }
            });
        }, observerOptions);

        const skillsSection = document.querySelector('.skills-section');
        if (skillsSection) {
            skillObserver.observe(skillsSection);
        }
    }

    animateSkillBars(container) {
        const progressBars = container.querySelectorAll('.skill-progress');
        progressBars.forEach((bar, index) => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, index * 200); // Stagger animation
        });
    }

    setupScrollEffects() {
        // Add scroll-based effects here
        window.addEventListener('scroll', () => {
            this.handleScrollEffects();
        });
    }

    handleScrollEffects() {
        // Implement scroll-based animations
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    }

    setupParallaxEffects() {
        // Parallax effect for floating orbs
        document.addEventListener('mousemove', (e) => {
            this.handleMouseParallax(e);
        });
    }

    handleMouseParallax(e) {
        const orbs = document.querySelectorAll('.floating-orb');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        orbs.forEach((orb, index) => {
            const speed = (index + 1) * 0.5;
            const xOffset = (x - 0.5) * 100 * speed;
            const yOffset = (y - 0.5) * 100 * speed;
            orb.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
        });
    }

    setup3DCardEffects() {
        const card = document.querySelector('.glass-card');
        if (card) {
            card.addEventListener('mousemove', (e) => {
                this.handle3DCardTilt(e, card);
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        }
    }

    handle3DCardTilt(e, card) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    setupTypingEffect() {
        const greeting = document.querySelector('.hero-greeting');
        if (greeting) {
            this.typeWriter(greeting, greeting.textContent);
        }
    }

    typeWriter(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        setTimeout(type, 500);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PortfolioApp;
}
