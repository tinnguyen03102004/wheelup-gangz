/**
 * WHEELUP GANGZ - Particle System
 * Creates floating particles around the wheel assembly
 */

class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.isActive = true;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        this.init();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
    }

    init() {
        // Create initial particles
        for (let i = 0; i < 50; i++) {
            this.createParticle();
        }

        this.animate();
    }

    createParticle() {
        const angle = Math.random() * Math.PI * 2;
        const radius = 150 + Math.random() * 200;

        this.particles.push({
            x: this.centerX + Math.cos(angle) * radius,
            y: this.centerY + Math.sin(angle) * radius,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.5 + 0.1,
            fadeSpeed: Math.random() * 0.01 + 0.005,
            growing: Math.random() > 0.5
        });
    }

    updateParticle(particle) {
        // Movement
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Subtle attraction to center
        const dx = this.centerX - particle.x;
        const dy = this.centerY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 300) {
            particle.speedX += dx * 0.00005;
            particle.speedY += dy * 0.00005;
        }

        // Opacity pulsing
        if (particle.growing) {
            particle.opacity += particle.fadeSpeed;
            if (particle.opacity >= 0.6) particle.growing = false;
        } else {
            particle.opacity -= particle.fadeSpeed;
            if (particle.opacity <= 0.1) particle.growing = true;
        }

        // Respawn if too far
        if (dist > 400) {
            const angle = Math.random() * Math.PI * 2;
            const radius = 150 + Math.random() * 50;
            particle.x = this.centerX + Math.cos(angle) * radius;
            particle.y = this.centerY + Math.sin(angle) * radius;
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        this.ctx.fill();

        // Glow effect
        if (particle.size > 1) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.2})`;
            this.ctx.fill();
        }
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });

        // Occasionally add new particles
        if (Math.random() < 0.05 && this.particles.length < 80) {
            this.createParticle();
        }

        requestAnimationFrame(() => this.animate());
    }

    burst() {
        // Create burst effect
        for (let i = 0; i < 30; i++) {
            const angle = (i / 30) * Math.PI * 2;
            const speed = 3 + Math.random() * 5;

            this.particles.push({
                x: this.centerX,
                y: this.centerY,
                size: Math.random() * 3 + 1,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                opacity: 1,
                fadeSpeed: 0.02,
                growing: false,
                isBurst: true
            });
        }
    }

    stop() {
        this.isActive = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystem('particle-canvas');
});
