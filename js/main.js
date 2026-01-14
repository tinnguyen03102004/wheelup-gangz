/**
 * WHEELUP GANGZ - Main JavaScript
 * Handles interactions and animations for main content
 */

class WheelupGangz {
    constructor() {
        this.navbar = document.querySelector('.navbar-3d');
        this.menuBtn = document.querySelector('.nav-menu-btn');
        this.navLinks = document.querySelector('.nav-links');
        this.sections = document.querySelectorAll('.section-3d');
        this.galleryItems = document.querySelectorAll('.gallery-item');

        this.lastScrollY = 0;
        this.isMenuOpen = false;

        this.init();
    }

    init() {
        this.setupNavbar();
        this.setupSmoothScroll();
        this.setupScrollAnimations();
        this.setupGalleryHover();
    }

    // Navbar scroll behavior
    setupNavbar() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            // Add background when scrolled
            if (currentScrollY > 100) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide on scroll down, show on scroll up
            if (currentScrollY > this.lastScrollY && currentScrollY > 200) {
                this.navbar.classList.add('hidden');
            } else {
                this.navbar.classList.remove('hidden');
            }

            this.lastScrollY = currentScrollY;
        });

        // Mobile menu toggle
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => {
                this.toggleMenu();
            });
        }
    }

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen;
        this.menuBtn.classList.toggle('active');
        this.navLinks.classList.toggle('mobile-open');
        document.body.classList.toggle('menu-open');
    }

    // Smooth scroll for anchor links
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();

                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                    if (this.isMenuOpen) {
                        this.toggleMenu();
                    }

                    // Scroll to target
                    const navHeight = this.navbar.offsetHeight;
                    const targetPosition = targetElement.offsetTop - navHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Intersection Observer for scroll animations
    setupScrollAnimations() {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections
        this.sections.forEach(section => {
            section.classList.add('animate-on-scroll');
            observer.observe(section);
        });
    }

    // Gallery hover effects
    setupGalleryHover() {
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('mouseenter', () => {
                this.galleryItems.forEach((otherItem, otherIndex) => {
                    if (otherIndex !== index) {
                        otherItem.classList.add('dimmed');
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                this.galleryItems.forEach(otherItem => {
                    otherItem.classList.remove('dimmed');
                });
            });
        });
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for loading to complete before initializing main functionality
    const checkLoaded = setInterval(() => {
        if (document.body.classList.contains('loaded')) {
            clearInterval(checkLoaded);
            window.wheelupGangz = new WheelupGangz();
        }
    }, 100);

    // Fallback: Initialize after max wait time
    setTimeout(() => {
        if (!window.wheelupGangz) {
            window.wheelupGangz = new WheelupGangz();
        }
    }, 7000);
});

// Console branding
console.log(`
%c WHEELUP GANGZ %c Urban Cycling Culture 
`,
    'background: #D4AF37; color: #0A0A0A; font-weight: bold; padding: 5px 10px; border-radius: 3px 0 0 3px;',
    'background: #1A1A1A; color: #FFFFFF; padding: 5px 10px; border-radius: 0 3px 3px 0;'
);
