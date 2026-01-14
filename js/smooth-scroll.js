/**
 * WHEELUP GANGZ - Smooth Scroll Enhancement
 * Buttery smooth scrolling experience using Lenis
 */

(function () {
    'use strict';

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        console.log('⚡ Smooth scroll disabled - respecting reduced motion preference');
        return;
    }

    // Lenis smooth scroll implementation (lightweight custom version)
    class SmoothScroll {
        constructor(options = {}) {
            this.targetScrollY = window.scrollY;
            this.currentScrollY = window.scrollY;
            this.ease = options.ease || 0.08; // Lower = smoother, higher = snappier
            this.isScrolling = false;
            this.animationFrame = null;

            this.init();
        }

        init() {
            // Virtual scroll container
            document.body.style.height = '';

            // Listen for wheel events
            window.addEventListener('wheel', this.onWheel.bind(this), { passive: false });

            // Listen for touch events (mobile)
            let touchStartY = 0;
            window.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: true });

            window.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const deltaY = touchStartY - touchY;
                this.targetScrollY += deltaY * 0.5;
                this.targetScrollY = Math.max(0, Math.min(this.targetScrollY, this.getMaxScroll()));
                touchStartY = touchY;
                this.startAnimation();
            }, { passive: true });

            // Listen for keyboard navigation
            window.addEventListener('keydown', this.onKeydown.bind(this));

            // Start animation loop
            this.startAnimation();
        }

        onWheel(e) {
            e.preventDefault();

            // Calculate target scroll position
            const delta = e.deltaY;
            const multiplier = e.deltaMode === 1 ? 20 : 1; // Handle line vs pixel scroll

            this.targetScrollY += delta * multiplier * 0.6; // Reduce scroll speed slightly
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
            // Lerp to target
            const diff = this.targetScrollY - this.currentScrollY;

            // Apply easing
            this.currentScrollY += diff * this.ease;

            // Apply scroll
            window.scrollTo(0, this.currentScrollY);

            // Continue animation if not close enough to target
            if (Math.abs(diff) > 0.5) {
                this.animationFrame = requestAnimationFrame(this.animate.bind(this));
            } else {
                this.currentScrollY = this.targetScrollY;
                window.scrollTo(0, this.currentScrollY);
                this.isScrolling = false;
            }
        }

        // Public method to scroll to element
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

    // Wait for page load
    function init() {
        // Initialize smooth scroll
        const smoothScroll = new SmoothScroll({
            ease: 0.075 // Slightly lower for smoother feel
        });

        // Expose to global scope for navigation links
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

        console.log('🧈 Smooth scroll initialized');
    }

    // Initialize after DOM and loading screen
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => setTimeout(init, 1000));
    } else {
        setTimeout(init, 1000);
    }

})();
