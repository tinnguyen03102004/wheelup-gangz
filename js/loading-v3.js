/**
 * WHEELUP GANGZ - Loading Controller V3
 * Advanced animation sequence with detailed progress stages
 */

class LoadingControllerV3 {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainContent = document.getElementById('main-content');
        this.progressFill = document.querySelector('.progress-fill-v3');
        this.progressGlow = document.querySelector('.progress-glow-v3');
        this.progressEdge = document.querySelector('.progress-edge.right');
        this.stageText = document.querySelector('.stage-text');
        this.progressPercent = document.querySelector('.progress-percent-v3');
        this.flashOverlay = document.querySelector('.flash-overlay');

        this.isComplete = false;
        this.currentStage = 0;

        // Animation timeline - each stage has duration and text
        this.stages = [
            { duration: 800, text: 'INITIALIZING SYSTEM', progress: 0 },
            { duration: 1200, text: 'LOADING ASSETS', progress: 15 },
            { duration: 1500, text: 'BUILDING WHEEL', progress: 30 },
            { duration: 1200, text: 'ASSEMBLING SPOKES', progress: 50 },
            { duration: 1000, text: 'MOUNTING GEAR', progress: 65 },
            { duration: 800, text: 'CALIBRATING', progress: 80 },
            { duration: 600, text: 'FINAL CHECKS', progress: 92 },
            { duration: 400, text: 'READY TO RIDE', progress: 100 }
        ];

        this.totalDuration = this.stages.reduce((sum, s) => sum + s.duration, 0);

        this.init();
    }

    init() {
        // Start the loading sequence after initial animations
        setTimeout(() => {
            this.runStages();
        }, 3500); // Wait for image reveal and initial effects
    }

    async runStages() {
        const totalDuration = this.stages.reduce((sum, s) => sum + s.duration, 0);
        let startTime = performance.now();

        // Start stages updates
        this.updateStageTexts();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / totalDuration, 1);

            // Linear progress for stable speed
            const currentProgress = progress * 100;

            this.progressFill.style.width = `${currentProgress}%`;
            this.progressGlow.style.width = `${currentProgress}%`;
            if (this.progressEdge) {
                this.progressEdge.style.left = `calc(${currentProgress}% - 3px)`;
            }
            this.progressPercent.textContent = `${Math.floor(currentProgress)}%`;

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    this.completeLoading();
                }, 500);
            }
        };

        requestAnimationFrame(animate);
    }

    async updateStageTexts() {
        for (let i = 0; i < this.stages.length; i++) {
            if (this.isComplete) break;
            const stage = this.stages[i];
            await this.updateStageText(stage.text);
            await new Promise(r => setTimeout(r, stage.duration));
        }
    }

    updateStageText(text) {
        return new Promise(resolve => {
            if (this.stageText.textContent === text) return resolve();
            this.stageText.style.opacity = '0';
            this.stageText.style.transform = 'translateY(10px)';

            setTimeout(() => {
                this.stageText.textContent = text;
                this.stageText.style.opacity = '1';
                this.stageText.style.transform = 'translateY(0)';
                resolve();
            }, 300);
        });
    }

    // Smooth easing function - easeInOutQuart for ultra-smooth animation
    easeInOutQuart(t) {
        return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
    }

    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }

    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;

        // Trigger particle burst
        if (window.particleSystem) {
            window.particleSystem.burst();
        }

        // Flash effect
        this.flashOverlay.classList.add('flash');

        // Add complete class for CSS animations
        this.loadingScreen.classList.add('complete');

        // Transition to main content
        setTimeout(() => {
            // Stop particles
            if (window.particleSystem) {
                setTimeout(() => {
                    window.particleSystem.stop();
                }, 500);
            }

            this.loadingScreen.classList.add('fade-out');
            this.mainContent.classList.remove('hidden');

            // Trigger hero animations
            document.body.classList.add('loaded');

            // Remove loading screen
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 1200);
        }, 600);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.loadingController = new LoadingControllerV3();
});

// Force complete fallback
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.loadingController && !window.loadingController.isComplete) {
            console.log('Force completing loading...');
            window.loadingController.completeLoading();
        }
    }, 15000); // Force after 15 seconds
});

// Add skip functionality on click (optional)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && window.loadingController && !window.loadingController.isComplete) {
        window.loadingController.completeLoading();
    }
});
