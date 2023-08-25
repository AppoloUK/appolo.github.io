const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const backgroundMusic = document.getElementById("backgroundMusic");
const toggleAudioButton = document.getElementById("toggleAudio");
const audioIcon = toggleAudioButton.querySelector('i');
const backgroundVideo = document.getElementById("backgroundVideo");
const splashScreen = document.getElementById("splashScreen");
const splashText = document.getElementById("splashText");
const textToType = "Click any key to continue";

// Hide splash screen on click/tap
function hideSplashScreen() {
    splashScreen.style.display = "none"; // or splashScreen.classList.add('none');
    backgroundVideo.play();
    backgroundMusic.play();
    document.removeEventListener('click', hideSplashScreen);
}

// Play the music and video on the first user interaction
document.addEventListener('click', hideSplashScreen, { once: true });


// Play the music on the first user interaction
document.addEventListener('click', function() {
    backgroundVideo.play();
    backgroundMusic.play();
}, { once: true });

toggleAudioButton.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        audioIcon.className = "fas fa-volume-up"; // Update icon to volume up
    } else {
        backgroundMusic.pause();
        audioIcon.className = "fas fa-volume-mute"; // Update icon to mute
    }
});


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


// Particle System
// ... [Keep the existing particle system code]

// Typewriter Effect
const phrases = ["Coding...", "Creating...", "Innovating...", "Designing...", "Building..."];
const typingText = document.querySelector(".typing-text");
let i = 0;
let j = 0;
let isDeleting = false;
let currentPhrase = "";

function typeLoop() {
    if (isDeleting) {
        if (j > 0) {
            j--;
            typingText.textContent = currentPhrase.substr(0, j);
            setTimeout(typeLoop, 100);
        } else {
            isDeleting = false;
            i = (i + 1) % phrases.length;
            currentPhrase = phrases[i];  // Update the phrase after deleting
            setTimeout(typeLoop, 500);
        }
    } else {
        if (j < currentPhrase.length) {
            j++;
            typingText.textContent = currentPhrase.substr(0, j);
            setTimeout(typeLoop, 200);
        } else {
            isDeleting = true;
            setTimeout(typeLoop, 1000);
        }
    }
}

function displayUKTime() {
    const ukOptions = {
        timeZone: "Europe/London",
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    };

    const ukTime = new Intl.DateTimeFormat('en-GB', ukOptions).format(new Date());
    document.getElementById('uk-time').textContent = ukTime;

    setTimeout(displayUKTime, 1000); // Update every second
}

displayUKTime();  // Call the function to start the clock

function startTyping() {
    currentPhrase = phrases[i];
    typeLoop();
}

// Start typing when page loads
window.onload = startTyping;



