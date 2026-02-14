// Elements
const giftBox = document.getElementById('giftBox');
const giftScreen = document.getElementById('giftScreen');
const messageScreen = document.getElementById('messageScreen');
const musicBtn = document.getElementById('musicBtn');
const confettiBtn = document.getElementById('confettiBtn');
const resetBtn = document.getElementById('resetBtn');
const bgMusic = document.getElementById('bgMusic');
const musicIcon = document.getElementById('musicIcon');
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');

// Set canvas size
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
});

// Music state
let isMusicPlaying = false;

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particle.style.animationDuration = `${10 + Math.random() * 10}s`;
        particlesContainer.appendChild(particle);
    }
}

// Create floating hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('floatingHearts');
    const heartCount = 20;
    const hearts = ['💕', '💖', '💗', '💝', '💘', '❤️', '🌹'];

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.fontSize = `${15 + Math.random() * 20}px`;
        heart.style.animationDelay = `${Math.random() * 10}s`;
        heart.style.animationDuration = `${8 + Math.random() * 6}s`;
        heartsContainer.appendChild(heart);
    }
}

// Gift box click handler
giftBox.addEventListener('click', () => {
    // Add opening animation
    giftBox.classList.add('opening');

    // Wait for animation, then show message
    setTimeout(() => {
        giftScreen.style.display = 'none';
        messageScreen.classList.add('active');
        createConfettiBurst();
    }, 800);
});

// Music button handler
musicBtn.addEventListener('click', () => {
    const musicText = document.getElementById('musicText');
    if (isMusicPlaying) {
        bgMusic.pause();
        musicIcon.className = 'fas fa-music';
        musicText.textContent = 'Bật Nhạc';
        isMusicPlaying = false;
    } else {
        bgMusic.play().catch(err => {
            console.log('Audio play failed:', err);
        });
        musicIcon.className = 'fas fa-volume-xmark';
        musicText.textContent = 'Tắt Nhạc';
        isMusicPlaying = true;
    }
});

// Confetti button handler
confettiBtn.addEventListener('click', () => {
    createConfettiBurst();
});

// Reset button handler
resetBtn.addEventListener('click', () => {
    messageScreen.classList.remove('active');
    giftScreen.style.display = 'block';
    giftBox.classList.remove('opening');

    // Reset music
    if (isMusicPlaying) {
        const musicText = document.getElementById('musicText');
        bgMusic.pause();
        bgMusic.currentTime = 0;
        musicIcon.className = 'fas fa-music';
        musicText.textContent = 'Bật Nhạc';
        isMusicPlaying = false;
    }
});

// Confetti system
class Confetti {
    constructor() {
        this.x = Math.random() * confettiCanvas.width;
        this.y = -10;
        this.size = Math.random() * 8 + 5;
        this.speedY = Math.random() * 3 + 2;
        this.speedX = Math.random() * 2 - 1;
        this.color = this.randomColor();
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.opacity = 1;
    }

    randomColor() {
        const colors = [
            '#ff6b9d', '#ff8dc7', '#ffd700', '#667eea',
            '#764ba2', '#f093fb', '#4facfe', '#00f2fe',
            '#ff1493', '#ff69b4'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.rotation += this.rotationSpeed;

        if (this.y > confettiCanvas.height / 2) {
            this.opacity -= 0.01;
        }
    }

    draw() {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

let confettiParticles = [];
let animationId;

function createConfettiBurst() {
    // Create confetti particles
    for (let i = 0; i < 150; i++) {
        confettiParticles.push(new Confetti());
    }

    // Start animation if not already running
    if (!animationId) {
        animateConfetti();
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

    confettiParticles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        // Remove particles that are off screen or fully transparent
        if (particle.y > confettiCanvas.height || particle.opacity <= 0) {
            confettiParticles.splice(index, 1);
        }
    });

    if (confettiParticles.length > 0) {
        animationId = requestAnimationFrame(animateConfetti);
    } else {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Initialize
createParticles();
createFloatingHearts();

// Replace Font Awesome icons with custom SVG icons
// This should run after DOM is fully loaded
setTimeout(() => {
    if (typeof replaceIcons === 'function') {
        replaceIcons();
    }
}, 100);

// Add touch support for mobile
giftBox.addEventListener('touchstart', (e) => {
    e.preventDefault();
    giftBox.click();
});
