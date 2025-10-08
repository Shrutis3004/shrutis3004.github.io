// Hamburger menu toggle
const hamburgerBtn = document.getElementById("hamburgerBtn");
const verticalNav = document.getElementById("verticalNav");
const navOverlay = document.getElementById("navOverlay");

function toggleMenu() {
  hamburgerBtn.classList.toggle("active");
  verticalNav.classList.toggle("active");
  navOverlay.classList.toggle("active");
  document.body.style.overflow = hamburgerBtn.classList.contains("active")
    ? "hidden"
    : "";
}

hamburgerBtn.addEventListener("click", toggleMenu);
navOverlay.addEventListener("click", toggleMenu);

// Close menu when nav link is clicked
const navLinks = document.querySelectorAll(".vertical-nav a");
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (verticalNav.classList.contains("active")) {
      toggleMenu();
    }
  });
});

// Smooth scroll for nav links
document.querySelectorAll('nav a, a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const href = a.getAttribute("href");
    if (!href || href === "#") return;
    // Allow external links
    if (href.startsWith("http") || href.endsWith(".pdf")) return;
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Highlight nav item as you scroll
const sections = Array.from(document.querySelectorAll("main section, header"));
const allNavLinks = Array.from(document.querySelectorAll(".vertical-nav a"));

function onScroll() {
  const y = window.scrollY + window.innerHeight * 0.25;
  let current = sections[0];
  for (const s of sections) {
    if (s.offsetTop <= y) current = s;
  }
  allNavLinks.forEach((a) => a.classList.remove("active"));
  const id = current.id ? "#" + current.id : "#home";
  const match = allNavLinks.find((a) => a.getAttribute("href") === id);
  if (match) match.classList.add("active");
}

window.addEventListener("scroll", onScroll);
onScroll();

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Observe all sections
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.8s ease, transform 0.8s ease";
  observer.observe(section);
});

// Add hover effect to cards
const cards = document.querySelectorAll(".glass, .card-proj");
cards.forEach((card) => {
  card.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)";
  });

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });
});

// Skill pills animation on hover
const skillPills = document.querySelectorAll(".skill-pill");
skillPills.forEach((pill, index) => {
  pill.style.animationDelay = `${index * 0.1}s`;

  pill.addEventListener("mouseenter", function () {
    this.style.animation = "none";
    setTimeout(() => {
      this.style.animation = "";
    }, 10);
  });
});

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    hero.style.opacity = 1 - scrolled / 500;
  }
});

// Add typing effect to main heading (optional)
const mainHeading = document.querySelector("h1.main");
if (mainHeading) {
  const text = mainHeading.textContent;
  mainHeading.textContent = "";
  let i = 0;

  function typeWriter() {
    if (i < text.length) {
      mainHeading.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }

  // Start typing effect after a short delay
  setTimeout(typeWriter, 500);
}

// Download button handler
const downloadBtn = document.querySelectorAll("a[download]");
downloadBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const href = btn.getAttribute("href");
    if (href && href.endsWith(".pdf")) {
      // Basic check - file must be in same folder when running locally
      console.log("Downloading resume...");
    }
  });
});

// Add particle effect on mouse move (subtle)
let particles = [];
const particleCount = 50;

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 3 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.opacity = 1;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.opacity -= 0.02;
  }
}

// Create canvas for particles (optional visual effect)
const canvas = document.createElement("canvas");
canvas.style.position = "fixed";
canvas.style.top = "0";
canvas.style.left = "0";
canvas.style.width = "100%";
canvas.style.height = "100%";
canvas.style.pointerEvents = "none";
canvas.style.zIndex = "0";
document.body.prepend(canvas);

const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("mousemove", (e) => {
  if (particles.length < particleCount) {
    particles.push(new Particle(e.clientX, e.clientY));
  }
});

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((particle, index) => {
    particle.update();

    ctx.fillStyle = `rgba(99, 102, 241, ${particle.opacity})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fill();

    if (particle.opacity <= 0) {
      particles.splice(index, 1);
    }
  });

  requestAnimationFrame(animateParticles);
}

animateParticles();

// Add click ripple effect
document.addEventListener("click", (e) => {
  const ripple = document.createElement("div");
  ripple.style.position = "fixed";
  ripple.style.left = e.clientX + "px";
  ripple.style.top = e.clientY + "px";
  ripple.style.width = "20px";
  ripple.style.height = "20px";
  ripple.style.borderRadius = "50%";
  ripple.style.background = "rgba(99, 102, 241, 0.3)";
  ripple.style.transform = "translate(-50%, -50%) scale(0)";
  ripple.style.animation = "ripple 0.6s ease-out";
  ripple.style.pointerEvents = "none";
  ripple.style.zIndex = "9999";

  document.body.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
});

// Add ripple animation
const style = document.createElement("style");
style.textContent = `
  @keyframes ripple {
    to {
      transform: translate(-50%, -50%) scale(20);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

console.log("Portfolio loaded successfully! 🚀");
