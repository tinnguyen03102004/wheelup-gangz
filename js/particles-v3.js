/**
 * WHEELUP GANGZ - Advanced Particle System V3
 * Creates dynamic sparks, floating particles, and explosion effects
 */

class ParticleSystemV3 {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.sparks = [];
        this.triangles = [];
        this.isActive = true;
        this.phase = 'idle'; // idle, building, exploding

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Delay start to sync with image reveal
        setTimeout(() => {
            this.phase = 'building';
            this.init();
        }, 1000);
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2 - 50; // Offset for wheel position
    }

    init() {
        // Create ambient particles
        for (let i = 0; i < 40; i++) {
            this.createAmbientParticle();
        }

        // Create initial sparks
        setTimeout(() => {
            this.createSparkBurst(8);
        }, 500);

        // Create floating triangle particles
        for (let i = 0; i < 8; i++) {
            this.createTriangleParticle();
        }

        this.animate();
    }

    createAmbientParticle() {
        const angle = Math.random() * Math.PI * 2;
        const radius = 100 + Math.random() * 250;

        this.particles.push({
            x: this.centerX + Math.cos(angle) * radius,
            y: this.centerY + Math.sin(angle) * radius,
            size: Math.random() * 2 + 0.5,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            opacity: 0,
            targetOpacity: Math.random() * 0.4 + 0.1,
            fadeSpeed: Math.random() * 0.005 + 0.002,
            growing: true,
            type: 'ambient'
        });
    }

    createSparkParticle(x, y, angle) {
        const speed = 2 + Math.random() * 4;

        this.sparks.push({
            x: x || this.centerX - 80,
            y: y || this.centerY - 80,
            size: Math.random() * 3 + 1,
            speedX: Math.cos(angle) * speed,
            speedY: Math.sin(angle) * speed,
            opacity: 1,
            decay: 0.02 + Math.random() * 0.02,
            trail: [],
            maxTrail: 8
        });
    }

    createSparkBurst(count) {
        const burstX = this.centerX - 100;
        const burstY = this.centerY - 100;

        for (let i = 0; i < count; i++) {
            const angle = -Math.PI / 4 + (Math.random() - 0.5) * Math.PI / 2;
            this.createSparkParticle(burstX, burstY, angle);
        }
    }

    createTriangleParticle() {
        this.triangles.push({
            x: this.centerX + (Math.random() - 0.5) * 400,
            y: this.centerY + (Math.random() - 0.5) * 400,
            size: 4 + Math.random() * 8,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.02,
            speedX: (Math.random() - 0.5) * 0.2,
            speedY: -0.1 - Math.random() * 0.3,
            opacity: 0,
            targetOpacity: 0.3 + Math.random() * 0.4,
            phase: Math.random() * Math.PI * 2
        });
    }

    updateParticle(particle) {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Fade in/out
        if (particle.growing) {
            particle.opacity += particle.fadeSpeed;
            if (particle.opacity >= particle.targetOpacity) {
                particle.growing = false;
            }
        } else {
            particle.opacity -= particle.fadeSpeed * 0.5;
            if (particle.opacity <= 0.05) {
                particle.growing = true;
                particle.targetOpacity = Math.random() * 0.4 + 0.1;
            }
        }

        // Subtle attraction to center
        const dx = this.centerX - particle.x;
        const dy = this.centerY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 300) {
            particle.speedX += dx * 0.00003;
            particle.speedY += dy * 0.00003;
        }
    }

    updateSpark(spark) {
        // Save trail
        spark.trail.push({ x: spark.x, y: spark.y, opacity: spark.opacity });
        if (spark.trail.length > spark.maxTrail) {
            spark.trail.shift();
        }

        // Movement
        spark.x += spark.speedX;
        spark.y += spark.speedY;

        // Gravity
        spark.speedY += 0.05;

        // Decay
        spark.opacity -= spark.decay;
        spark.size *= 0.98;
    }

    updateTriangle(triangle) {
        triangle.x += triangle.speedX;
        triangle.y += triangle.speedY;
        triangle.rotation += triangle.rotationSpeed;
        triangle.phase += 0.02;

        // Floating motion
        triangle.x += Math.sin(triangle.phase) * 0.3;

        // Fade in
        if (triangle.opacity < triangle.targetOpacity) {
            triangle.opacity += 0.005;
        }

        // Reset if off screen
        if (triangle.y < -50) {
            triangle.y = this.canvas.height + 50;
            triangle.x = this.centerX + (Math.random() - 0.5) * 400;
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
        this.ctx.fill();

        // Glow
        if (particle.size > 1.5) {
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity * 0.15})`;
            this.ctx.fill();
        }
    }

    drawSpark(spark) {
        // Draw trail
        spark.trail.forEach((point, i) => {
            const trailOpacity = (i / spark.trail.length) * spark.opacity * 0.5;
            const trailSize = spark.size * (i / spark.trail.length);

            this.ctx.beginPath();
            this.ctx.arc(point.x, point.y, trailSize, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`;
            this.ctx.fill();
        });

        // Draw spark
        this.ctx.beginPath();
        this.ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${spark.opacity})`;
        this.ctx.fill();

        // Glow
        this.ctx.beginPath();
        this.ctx.arc(spark.x, spark.y, spark.size * 3, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${spark.opacity * 0.3})`;
        this.ctx.fill();
    }

    drawTriangle(triangle) {
        this.ctx.save();
        this.ctx.translate(triangle.x, triangle.y);
        this.ctx.rotate(triangle.rotation);

        this.ctx.beginPath();
        this.ctx.moveTo(0, -triangle.size);
        this.ctx.lineTo(-triangle.size * 0.6, triangle.size * 0.5);
        this.ctx.lineTo(triangle.size * 0.6, triangle.size * 0.5);
        this.ctx.closePath();

        this.ctx.fillStyle = `rgba(255, 255, 255, ${triangle.opacity})`;
        this.ctx.fill();

        this.ctx.restore();
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw ambient particles
        this.particles.forEach(p => {
            this.updateParticle(p);
            this.drawParticle(p);
        });

        // Update and draw sparks
        this.sparks = this.sparks.filter(s => s.opacity > 0);
        this.sparks.forEach(s => {
            this.updateSpark(s);
            this.drawSpark(s);
        });

        // Update and draw triangles
        this.triangles.forEach(t => {
            this.updateTriangle(t);
            this.drawTriangle(t);
        });

        // Occasionally add new sparks
        if (this.phase === 'building' && Math.random() < 0.02) {
            this.createSparkBurst(3);
        }

        // Occasionally add new ambient particles
        if (this.particles.length < 60 && Math.random() < 0.02) {
            this.createAmbientParticle();
        }

        requestAnimationFrame(() => this.animate());
    }

    burst() {
        this.phase = 'exploding';

        // Create massive spark burst
        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            const speed = 5 + Math.random() * 8;

            this.sparks.push({
                x: this.centerX,
                y: this.centerY,
                size: 2 + Math.random() * 4,
                speedX: Math.cos(angle) * speed,
                speedY: Math.sin(angle) * speed,
                opacity: 1,
                decay: 0.015,
                trail: [],
                maxTrail: 12
            });
        }

        // Boost all existing particles outward
        this.particles.forEach(p => {
            const dx = p.x - this.centerX;
            const dy = p.y - this.centerY;
            const dist = Math.sqrt(dx * dx + dy * dy);
            p.speedX += (dx / dist) * 3;
            p.speedY += (dy / dist) * 3;
            p.opacity = 1;
        });
    }

    stop() {
        this.isActive = false;
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.particleSystem = new ParticleSystemV3('particle-canvas');
});
