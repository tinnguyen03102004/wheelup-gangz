/**
 * WHEELUP GANGZ - Scroll Animations
 * Enhanced by UI/UX Pro Max Skill
 * 
 * Features:
 * - Intersection Observer for performant scroll detection
 * - Fade-in animations on scroll
 * - Parallax effects
 * - Respects prefers-reduced-motion
 */

(function () {
    'use strict';

    // =============================================
    // CONFIGURATION
    // =============================================

    const CONFIG = {
        // Animation durations (ms)
        fadeInDuration: 600,
        staggerDelay: 100,

        // Intersection Observer thresholds
        observerThreshold: 0.15,
        observerRootMargin: '0px 0px -50px 0px',

        // Parallax settings
        parallaxIntensity: 0.3,

        // CSS classes
        classes: {
            hidden: 'scroll-hidden',
            visible: 'scroll-visible',
            fadeUp: 'scroll-fade-up',
            fadeLeft: 'scroll-fade-left',
            fadeRight: 'scroll-fade-right',
            scaleIn: 'scroll-scale-in',
            parallax: 'scroll-parallax'
        }
    };

    // =============================================
    // REDUCED MOTION CHECK (Accessibility)
    // =============================================

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('🎭 Reduced motion enabled - animations disabled');
        document.documentElement.classList.add('reduced-motion');
    }

    // =============================================
    // INTERSECTION OBSERVER SETUP
    // =============================================

    const observerOptions = {
        root: null,
        rootMargin: CONFIG.observerRootMargin,
        threshold: CONFIG.observerThreshold
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on index
                const delay = entry.target.dataset.scrollDelay ||
                    (index * CONFIG.staggerDelay);

                setTimeout(() => {
                    entry.target.classList.add(CONFIG.classes.visible);
                    entry.target.classList.remove(CONFIG.classes.hidden);
                }, delay);

                // Unobserve after animation (one-time only)
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // =============================================
    // PARALLAX EFFECT
    // =============================================

    let ticking = false;
    const parallaxElements = [];

    function updateParallax() {
        if (prefersReducedMotion) return;

        const scrollY = window.pageYOffset;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.dataset.parallaxSpeed) || CONFIG.parallaxIntensity;
            const rect = el.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (inView) {
                const yPos = -(scrollY * speed);
                el.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });

        ticking = false;
    }

    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // =============================================
    // SCROLL PROGRESS INDICATOR
    // =============================================

    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;

        const progressBar = document.querySelector('.scroll-progress-bar');
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }
    }

    // =============================================
    // NAVBAR SCROLL EFFECT
    // =============================================

    let lastScrollY = 0;

    function updateNavbar() {
        const navbar = document.querySelector('.navbar-3d');
        if (!navbar) return;

        const scrollY = window.pageYOffset;

        // Add/remove scrolled class
        if (scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction (optional)
        // if (scrollY > lastScrollY && scrollY > 500) {
        //     navbar.classList.add('hidden');
        // } else {
        //     navbar.classList.remove('hidden');
        // }

        lastScrollY = scrollY;
    }

    // =============================================
    // SECTION REVEAL ANIMATIONS
    // =============================================

    function setupSectionAnimations() {
        // About section content
        const aboutContent = document.querySelector('.about-content-3d');
        if (aboutContent) {
            aboutContent.classList.add(CONFIG.classes.hidden, CONFIG.classes.fadeUp);
            scrollObserver.observe(aboutContent);
        }

        // About paragraphs with stagger
        const aboutParagraphs = document.querySelectorAll('.about-content-3d p');
        aboutParagraphs.forEach((p, index) => {
            p.classList.add(CONFIG.classes.hidden, CONFIG.classes.fadeUp);
            p.dataset.scrollDelay = (index + 1) * 150;
            scrollObserver.observe(p);
        });

        // Gallery section
        const galleryHint = document.querySelector('.gallery-3d-hint');
        if (galleryHint) {
            galleryHint.classList.add(CONFIG.classes.hidden, CONFIG.classes.fadeUp);
            scrollObserver.observe(galleryHint);
        }

        // Contact section
        const socialLinks = document.querySelectorAll('.social-link-3d');
        socialLinks.forEach((link, index) => {
            link.classList.add(CONFIG.classes.hidden, CONFIG.classes.scaleIn);
            link.dataset.scrollDelay = index * 100;
            scrollObserver.observe(link);
        });

        // Section titles
        const sectionTitles = document.querySelectorAll('.section-title-3d');
        sectionTitles.forEach(title => {
            title.classList.add(CONFIG.classes.hidden, CONFIG.classes.fadeUp);
            scrollObserver.observe(title);
        });

        // Title underlines
        const titleUnderlines = document.querySelectorAll('.title-underline');
        titleUnderlines.forEach(underline => {
            underline.classList.add(CONFIG.classes.hidden, 'scroll-width-expand');
            underline.dataset.scrollDelay = 200;
            scrollObserver.observe(underline);
        });

        // Glass panels
        const glassPanels = document.querySelectorAll('.glass-panel');
        glassPanels.forEach(panel => {
            panel.classList.add(CONFIG.classes.hidden, CONFIG.classes.scaleIn);
            scrollObserver.observe(panel);
        });
    }

    // =============================================
    // PARALLAX ELEMENTS SETUP
    // =============================================

    function setupParallax() {
        if (prefersReducedMotion) return;

        // Add parallax to decorative elements
        const triangles = document.querySelectorAll('.floating-shapes .triangle');
        triangles.forEach((el, index) => {
            el.classList.add(CONFIG.classes.parallax);
            el.dataset.parallaxSpeed = (0.1 + (index * 0.05)).toFixed(2);
            parallaxElements.push(el);
        });

        // Parallax for scroll indicator
        const scrollIndicator = document.querySelector('.scroll-indicator-3d');
        if (scrollIndicator) {
            scrollIndicator.dataset.parallaxSpeed = '0.5';
            parallaxElements.push(scrollIndicator);
        }
    }

    // =============================================
    // MOBILE MENU HANDLER
    // =============================================

    function setupMobileMenu() {
        const menuBtn = document.querySelector('.nav-menu-btn');
        const navLinks = document.querySelector('.nav-links');

        if (!menuBtn || !navLinks) return;

        menuBtn.addEventListener('click', () => {
            const isOpen = menuBtn.classList.toggle('active');
            navLinks.classList.toggle('mobile-open');

            // Prevent scrolling when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';

            // Interaction feedback
            if (isOpen && window.i18n) {
                console.log('📱 Mobile menu opened');
            }
        });

        // Close menu on resize if switching to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && menuBtn.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('mobile-open');
                document.body.style.overflow = '';
            }
        });
    }

    // =============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // =============================================

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Close mobile menu if open
                    const menuBtn = document.querySelector('.nav-menu-btn');
                    const navLinks = document.querySelector('.nav-links');
                    if (menuBtn && menuBtn.classList.contains('active')) {
                        menuBtn.classList.remove('active');
                        navLinks.classList.remove('mobile-open');
                        document.body.style.overflow = '';
                    }

                    const navbarHeight = document.querySelector('.navbar-3d')?.offsetHeight || 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: prefersReducedMotion ? 'auto' : 'smooth'
                    });
                }
            });
        });
    }

    // =============================================
    // SCROLL-TRIGGERED COUNTER ANIMATION
    // =============================================

    function animateCounter(element, target, duration = 2000) {
        if (prefersReducedMotion) {
            element.textContent = target;
            return;
        }

        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic

            const current = Math.floor(start + (target - start) * easeProgress);
            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // =============================================
    // TEXT REVEAL ANIMATION (Character by character)
    // =============================================

    function revealText(element, delay = 30) {
        if (prefersReducedMotion) return;

        const text = element.textContent;
        element.textContent = '';
        element.style.opacity = '1';

        text.split('').forEach((char, index) => {
            setTimeout(() => {
                element.textContent += char;
            }, delay * index);
        });
    }

    // =============================================
    // MASTER SCROLL HANDLER
    // =============================================

    function onMasterScroll() {
        updateScrollProgress();
        updateNavbar();
        onScroll(); // Parallax
    }

    // =============================================
    // INITIALIZATION
    // =============================================

    function init() {
        // Wait for DOM and main content to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setup);
        } else {
            setup();
        }
    }

    function setup() {
        // Wait a bit for Three.js and loading screen
        setTimeout(() => {
            console.log('🎬 Scroll animations and Navbar UI initialized');

            // Setup elements
            setupSectionAnimations();
            setupParallax();
            setupSmoothScroll();
            setupMobileMenu();

            // Add scroll listener
            window.addEventListener('scroll', onMasterScroll, { passive: true });

            // Initial calls
            updateNavbar();
            updateScrollProgress();

        }, 500); // Wait for loading screen to finish
    }

    // Start initialization
    init();

    // =============================================
    // EXPOSE API (Optional)
    // =============================================

    window.ScrollAnimations = {
        animateCounter,
        revealText,
        refresh: setupSectionAnimations
    };

})();
