/**
 * WHEELUP GANGZ - Smooth Scroll Enhancement
 * Buttery smooth scrolling experience for DESKTOP ONLY
 * Mobile uses native scroll for better touch responsiveness
 */

(function () {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('⚡ Smooth scroll disabled - respecting reduced motion preference');
        return;
    }

    // Detect mobile/touch devices
    const isMobile = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
            window.innerWidth < 768 ||
            ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0);
    };

    // Skip smooth scroll on mobile - use native scroll
    if (isMobile()) {
        console.log('📱 Mobile detected - using native scroll for better touch response');

        // Still enable smooth anchor scrolling on mobile
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);

                    if (targetElement) {
                        const navbarHeight = document.querySelector('.navbar-3d')?.offsetHeight || 80;
                        const targetPosition = targetElement.offsetTop - navbarHeight - 20;

                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        });

        return; // Exit - don't initialize custom smooth scroll
    }

    // Desktop-only smooth scroll implementation
    class SmoothScroll {
        constructor(options = {}) {
            this.targetScrollY = window.scrollY;
            this.currentScrollY = window.scrollY;
            this.ease = options.ease || 0.08;
            this.isScrolling = false;
            this.animationFrame = null;

            this.init();
        }

        init() {
            document.body.style.height = '';

            // Only wheel events for desktop
            window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });

            // Keyboard navigation
            window.addEventListener('keydown', this.onKeydown.bind(this));

            this.startAnimation();
        }

        onWheel(e) {
            e.preventDefault();

            const delta = e.deltaY;
            const multiplier = e.deltaMode === 1 ? 20 : 1;

            this.targetScrollY += delta * multiplier * 0.6;
            this.targetScrollY = Math.max(0, Math.min(this.targetScrollY, this.getMaxScroll()));

            this.startAnimation();
        }

        onKeydown(e) {
            const keys = {
                ArrowUp: -100,
                ArrowDown: 100,
                PageUp: -window.innerHeight * 0.8,
                PageDown: window.innerHeight * 0.8,
                Home: -this.currentScrollY,
                End: this.getMaxScroll() - this.currentScrollY,
                ' ': e.shiftKey ? -window.innerHeight * 0.8 : window.innerHeight * 0.8
            };

            if (keys[e.key] !== undefined) {
                e.preventDefault();
                this.targetScrollY += keys[e.key];
                this.targetScrollY = Math.max(0, Math.min(this.targetScrollY, this.getMaxScroll()));
                this.startAnimation();
            }
        }

        getMaxScroll() {
            return document.documentElement.scrollHeight - window.innerHeight;
        }

        startAnimation() {
            if (!this.isScrolling) {
                this.isScrolling = true;
                this.animate();
            }
        }

        animate() {
            const diff = this.targetScrollY - this.currentScrollY;

            this.currentScrollY += diff * this.ease;

            window.scrollTo(0, this.currentScrollY);

            if (Math.abs(diff) > 0.5) {
                this.animationFrame = requestAnimationFrame(this.animate.bind(this));
            } else {
                this.currentScrollY = this.targetScrollY;
                window.scrollTo(0, this.currentScrollY);
                this.isScrolling = false;
            }
        }

        scrollTo(target, offset = 0) {
            let targetPosition = 0;

            if (typeof target === 'number') {
                targetPosition = target;
            } else if (typeof target === 'string') {
                const element = document.querySelector(target);
                if (element) {
                    targetPosition = element.offsetTop - offset;
                }
            } else if (target instanceof Element) {
                targetPosition = target.offsetTop - offset;
            }

            this.targetScrollY = Math.max(0, Math.min(targetPosition, this.getMaxScroll()));
            this.startAnimation();
        }

        destroy() {
            if (this.animationFrame) {
                cancelAnimationFrame(this.animationFrame);
            }
            this.isScrolling = false;
        }
    }

    // Initialize for desktop only
    function init() {
        const smoothScroll = new SmoothScroll({
            ease: 0.075
        });

        window.smoothScroll = smoothScroll;

        // Override anchor link behavior
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar-3d')?.offsetHeight || 80;
                    smoothScroll.scrollTo(targetElement, navbarHeight + 20);
                }
            });
        });

        console.log('🧈 Smooth scroll initialized (Desktop only)');
    }

    // Initialize after DOM and loading screen
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1000));
    } else {
        setTimeout(init, 1000);
    }

})();

