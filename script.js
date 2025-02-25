const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
    body.classList.add(savedTheme);
    if (savedTheme === "dark-mode") {
        themeToggle.checked = true;
    }
}

// Toggle visibility on theme change
themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        body.classList.add("dark-mode");
        body.classList.remove("light-mode");
        localStorage.setItem("theme", "dark-mode");
    } else {
        body.classList.add("light-mode");
        body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light-mode");
    }

    // Trigger visibility update for stars and clouds
    updateThemeElements();
});

function updateThemeElements() {
    const starsContainer = document.getElementById("stars-container");
    const shootingStarsContainer = document.getElementById("shooting-stars-container");
    const clouds = document.querySelectorAll(".cloud");

    if (body.classList.contains("dark-mode")) {
        starsContainer.style.display = "block";
        shootingStarsContainer.style.display = "block";
        clouds.forEach(cloud => cloud.style.display = "none");
    } else {
        starsContainer.style.display = "none";
        shootingStarsContainer.style.display = "none";
        clouds.forEach(cloud => cloud.style.display = "block");
    }
}

// Call it initially to apply on page load
updateThemeElements();

window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.classList.add("shrink");
    } else {
        navbar.classList.remove("shrink");
    }
});

gsap.registerPlugin(ScrollTrigger);

gsap.from(".project-card", {
    scrollTrigger: ".project-card",
    y: 50,
    opacity: 0,
    duration: 1,
    ease: "power2.out",
    stagger: 0.2,
});

gsap.from(".about-section", {
    scrollTrigger: ".about-section",
    x: -100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
});

gsap.from(".contact-section", {
    scrollTrigger: ".contact-section",
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "power2.out",
});

const text = "I build playful, interactive web experiences.";
let i = 0;
const speed = 100;

function typeWriter() {
    if (i < text.length) {
        document.querySelector(".typewriter-text").innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

document.addEventListener("mousemove", (e) => {
    document.querySelectorAll(".floating-element").forEach((element) => {
        const speed = element.getAttribute("data-speed") || 0.05;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        element.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Generate Twinkling Stars
function createStars() {
    const starsContainer = document.getElementById('stars-container');

    for (let i = 0; i < 150; i++) {  // Number of stars
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3; // Random star size

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`; // Random twinkle speed
        star.style.animationDelay = `${Math.random() * 2}s`; // Random start delay

        starsContainer.appendChild(star);
    }
}

// Call the function on page load
window.onload = () => {
    createStars();
    setTimeout(typeWriter, 1000);

};
function createShootingStar() {
    const shootingStar = document.createElement('div');
    shootingStar.classList.add('shooting-star');

    const container = document.getElementById('shooting-stars-container');

    // Random starting position
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight * 0.3; // Restrict within the top 30% for realism

    shootingStar.style.left = `${startX}px`;
    shootingStar.style.top = `${startY}px`;

    container.appendChild(shootingStar);

    // Remove star after animation completes
    setTimeout(() => {
        shootingStar.remove();
    }, 2000); // Matches the animation duration
}

setInterval(() => {
    if (Math.random() > 0.3) {  // Random chance to trigger shooting star
        createShootingStar();
    }
}, 5000);
window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        document.body.classList.add("scrolled");
    } else {
        document.body.classList.remove("scrolled");
    }
});
function createCustomCloud() {
    const cloud = document.createElement("div");
    cloud.classList.add("cloud");

    // Randomize cloud position and speed
    cloud.style.top = `${Math.random() * 50}%`; // Random vertical position within 50% height
    cloud.style.animationDuration = `${40 + Math.random() * 20}s`; // Slower movement
    cloud.style.opacity = 0; // Start fully transparent

    document.getElementById("clouds-container").appendChild(cloud);

    // Remove after full animation
    setTimeout(() => {
        cloud.remove();
    }, 45000); // Matches the animation time
}

// Generate fewer clouds (every 8 seconds)
setInterval(createCustomCloud, 8000);


