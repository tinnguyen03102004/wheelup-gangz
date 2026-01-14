/**
 * WHEELUP GANGZ - Loading Screen Controller
 * Handles wheel animation and progress simulation
 * Duration: 4+ seconds
 */

class LoadingController {
    constructor() {
        this.loadingScreen = document.getElementById('loading-screen');
        this.mainContent = document.getElementById('main-content');
        this.wheel = document.querySelector('.wheel');
        this.progressFill = document.querySelector('.progress-fill');
        this.progressText = document.querySelector('.progress-text');

        this.duration = 4500; // 4.5 seconds total loading time
        this.startTime = null;
        this.isComplete = false;

        this.init();
    }

    init() {
        // Start wheel spinning after initial animation
        setTimeout(() => {
            this.wheel.classList.add('spinning');
        }, 1200);

        // Start progress animation
        setTimeout(() => {
            this.startProgress();
        }, 2000);
    }

    startProgress() {
        this.startTime = performance.now();
        this.animateProgress();
    }

    animateProgress() {
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const progressDuration = this.duration - 2000; // Account for initial delay

        // Eased progress calculation
        let progress = Math.min(elapsed / progressDuration, 1);
        progress = this.easeOutQuart(progress);

        // Update UI
        const percentage = Math.floor(progress * 100);
        this.progressFill.style.width = `${percentage}%`;
        this.progressText.textContent = `${percentage}%`;

        if (progress < 1) {
            requestAnimationFrame(() => this.animateProgress());
        } else {
            this.completeLoading();
        }
    }

    easeOutQuart(t) {
        return 1 - Math.pow(1 - t, 4);
    }

    completeLoading() {
        if (this.isComplete) return;
        this.isComplete = true;

        // Add complete state for burst animation
        this.loadingScreen.classList.add('complete');

        // Transition to main content
        setTimeout(() => {
            this.loadingScreen.classList.add('fade-out');
            this.mainContent.classList.remove('hidden');

            // Trigger hero animations
            document.body.classList.add('loaded');

            // Remove loading screen from DOM after transition
            setTimeout(() => {
                this.loadingScreen.style.display = 'none';
            }, 800);
        }, 500);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.loadingController = new LoadingController();
});

// Fallback: Ensure loading completes even if something goes wrong
window.addEventListener('load', () => {
    setTimeout(() => {
        if (window.loadingController && !window.loadingController.isComplete) {
            window.loadingController.completeLoading();
        }
    }, 6000); // Force complete after 6 seconds max
});
