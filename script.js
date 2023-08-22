// Particle System
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Check for boundaries and reverse speed for "bounce" effect
        if (this.x < 0 || this.x > canvas.width) {
            this.speedX *= -1;
        }

        if (this.y < 0 || this.y > canvas.height) {
            this.speedY *= -1;
        }
    }

    draw() {
        ctx.fillStyle = "#666";  // Darker color for particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function handleParticles() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const opacity = 50 - distance / 100;  // Adjust opacity based on distance

            if (distance < 100) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(85, 85, 85, ${opacity})`;  // Use calculated opacity
                ctx.lineWidth = 0.2;
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// Spawn particles randomly and move around freely
function initParticles() {
    for (let i = 0; i < 100; i++) {  // Adjust number for more/less particles
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


const phrases = ["Coding...", "Creating...", "Innovating...", "Designing...", "Building..."];
let i = 0;
let j = 0;
let isDeleting = false;

function loop() {
    if (isDeleting) {
        if (j > 0) {
            j--;
            setTimeout(loop, 100);
        } else {
            isDeleting = false;
            i = (i + 1) % phrases.length;
            setTimeout(loop, 500);
        }
    } else {
        if (j < phrases[i].length) {
            j++;
            setTimeout(loop, 200);
        } else {
            isDeleting = true;
            setTimeout(loop, 1000);
        }
    }
    document.querySelector(".typing-text").textContent = phrases[i].substr(0, j);
}

loop();