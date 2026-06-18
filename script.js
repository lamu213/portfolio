document.addEventListener("DOMContentLoaded", () => {

    // ---- Typing animation for subtitle ----
    const subtitleEl = document.getElementById("typing-subtitle");
    const subtitleText = "MBA Candidate & AI Enthusiast";
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        const currentText = subtitleText;

        if (isDeleting) {
            subtitleEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50;
        } else {
            subtitleEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            // Finished typing, pause before deleting
            isDeleting = true;
            typingDelay = 2500;
        } else if (isDeleting && charIndex === 0) {
            // Finished deleting, pause before typing again
            isDeleting = false;
            typingDelay = 600;
        }

        setTimeout(typeEffect, typingDelay);
    }

    // Start typing animation after a short delay
    setTimeout(typeEffect, 800);

    // ---- Scroll reveal ----
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    // ---- Navbar scroll effect ----
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // ---- Smooth scroll for nav links ----
    document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.getAttribute("href");
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
        });
    });

    // Mobile nav links smooth scroll + close
    document.querySelectorAll('.mobile-nav a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const id = link.getAttribute("href");
            document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
            closeMobileMenu();
        });
    });

    // ---- Mobile menu toggle ----
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const mobileNav = document.getElementById("mobile-nav");

    function openMobileMenu() {
        mobileMenuBtn.classList.add("active");
        mobileNav.classList.add("active");
        document.body.style.overflow = "hidden";
    }

    function closeMobileMenu() {
        mobileMenuBtn.classList.remove("active");
        mobileNav.classList.remove("active");
        document.body.style.overflow = "";
    }

    mobileMenuBtn.addEventListener("click", () => {
        if (mobileNav.classList.contains("active")) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu on escape
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileNav.classList.contains("active")) {
            closeMobileMenu();
        }
    });

    // ---- Parrot speech bubble ----
    const parrotContainer = document.getElementById("parrot-container");
    const speechBubble = document.getElementById("speech-bubble");
    const bubbleText = document.getElementById("bubble-text");

    const parrotPhrases = [
        "Hello there! 👋",
        "Squaak! Nice to meet you!",
        "Lamu is awesome! 🦜",
        "Check out my work below!",
        "Polly wants a coffee! ☕",
        "What's your favorite AI tool?",
        "I'm a Senegal parrot!"
    ];

    let phraseIndex = 0;

    function rotatePhrase() {
        phraseIndex = (phraseIndex + 1) % parrotPhrases.length;
        bubbleText.textContent = parrotPhrases[phraseIndex];
    }

    parrotContainer.addEventListener("mouseenter", () => {
        rotatePhrase();
        speechBubble.classList.add("visible");
    });

    parrotContainer.addEventListener("mouseleave", () => {
        speechBubble.classList.remove("visible");
    });

    // Also show bubble periodically when idle
    let bubbleTimeout;
    function showBubblePeriodically() {
        if (!speechBubble.classList.contains("visible")) {
            rotatePhrase();
            speechBubble.classList.add("visible");
            setTimeout(() => {
                speechBubble.classList.remove("visible");
            }, 3000);
        }
        bubbleTimeout = setTimeout(showBubblePeriodically, 12000);
    }

    // Start periodic bubble after 5 seconds
    setTimeout(showBubblePeriodically, 5000);

    // ---- Scroll indicator click ----
    document.querySelector(".scroll-indicator")?.addEventListener("click", () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
    });

    // ---- Contact form (demo) ----
    document.getElementById("contact-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const btn = e.target.querySelector(".btn");
        const orig = btn.textContent;
        btn.textContent = "Message sent!";
        btn.style.pointerEvents = "none";
        setTimeout(() => {
            btn.textContent = orig;
            btn.style.pointerEvents = "";
            e.target.reset();
        }, 2500);
    });
});
