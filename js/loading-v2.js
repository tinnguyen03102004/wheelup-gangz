/**
 * WHEELUP GANGZ - Loading Screen Controller V2
 * Mechanical Assembly Animation with Progress
 * Duration: 5+ seconds
 */

class LoadingControllerV2 {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainContent = document.getElementById('main-content');
        this.gear = document.querySelector('.gear');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressGlow = document.querySelector('.progress-glow');
        this.progressText = document.querySelector('.progress-text');
        this.progressPercent = document.querySelector('.progress-percent');

        this.duration = 5500; // 5.5 seconds total
        this.startTime = null;
        this.isComplete = false;

        this.loadingStages = [
            { percent: 0, text: 'INITIALIZING' },
            { percent: 15, text: 'LOADING ASSETS' },
            { percent: 35, text: 'ASSEMBLING WHEEL' },
            { percent: 55, text: 'CONNECTING SPOKES' },
            { percent: 75, text: 'MOUNTING GEAR' },
            { percent: 90, text: 'FINAL CHECKS' },
            { percent: 100, text: 'READY TO RIDE' }
        ];

        this.init();
    }

    init() {
        // Start gear spinning after assembly
        setTimeout(() => {
            if (this.gear) {
                this.gear.classList.add('spinning');
            }
        }, 3000);

        // Start progress animation
        setTimeout(() => {
            this.startProgress();
        }, 2800);
    }

    startProgress() {
        this.startTime = performance.now();
        this.animateProgress();
    }

    animateProgress() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const progressDuration = this.duration - 2800; // Account for initial delay

        // Calculate progress with easing
        let rawProgress = Math.min(elapsed / progressDuration, 1);
        let progress = this.easeOutExpo(rawProgress);

        // Update percentage display
        const percentage = Math.floor(progress * 100);
        this.progressFill.style.width = `${percentage}%`;
        this.progressGlow.style.width = `${percentage}%`;
        this.progressPercent.textContent = `${percentage}%`;

        // Update stage text
        this.updateStageText(percentage);

        if (rawProgress < 1) {
            requestAnimationFrame(() => this.animateProgress());
        } else {
            this.completeLoading();
        }
    }

    updateStageText(percentage) {
        for (let i = this.loadingStages.length - 1; i >= 0; i--) {
            if (percentage >= this.loadingStages[i].percent) {
                if (this.progressText.textContent !== this.loadingStages[i].text) {
                    this.progressText.style.opacity = '0';
                    setTimeout(() => {
                        this.progressText.textContent = this.loadingStages[i].text;
                        this.progressText.style.opacity = '1';
                    }, 150);
                }
                break;
            }
        }
    }

    easeOutExpo(t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;

        // Trigger burst animations
        this.loadingScreen.classList.add('complete');

        // Trigger particle burst
        if (window.particleSystem) {
            window.particleSystem.burst();
        }

        // Transition to main content
        setTimeout(() => {
            // Stop particles
            if (window.particleSystem) {
                window.particleSystem.stop();
            }

            this.loadingScreen.classList.add('fade-out');
            this.mainContent.classList.remove('hidden');

            // Trigger hero animations
            document.body.classList.add('loaded');

            // Remove loading screen from DOM after transition
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 1000);
        }, 600);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.loadingController = new LoadingControllerV2();
});

// Fallback: Ensure loading completes even if something goes wrong
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.loadingController && !window.loadingController.isComplete) {
            window.loadingController.completeLoading();
        }
    }, 8000); // Force complete after 8 seconds max
});
