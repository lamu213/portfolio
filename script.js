document.addEventListener("DOMContentLoaded", () => {

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
    { threshold: 0.15 }
  );

  reveals.forEach((el) => revealObserver.observe(el));

  // ---- Animated counters ----
  const counters = document.querySelectorAll(".stat-num");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, target) {
    let current = 0;
    const step = Math.ceil(target / 40);

    function tick() {
      current += step;
      if (current > target) current = target;
      el.textContent = current + (target > 10 ? "+" : "");
      if (current < target) requestAnimationFrame(tick);
    }

    tick();
  }

  // ---- Smooth scroll for nav links ----
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const id = link.getAttribute("href");
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    });
  });

  // ---- Theme toggle (light/dark) ----
  const toggle = document.querySelector(".theme-toggle");
  let isDark = true;

  toggle?.addEventListener("click", () => {
    isDark = !isDark;
    const root = document.documentElement;

    if (isDark) {
      root.style.setProperty("--bg", "#0a0a0f");
      root.style.setProperty("--bg-card", "#12121a");
      root.style.setProperty("--bg-elevated", "#1a1a28");
      root.style.setProperty("--text", "#e8e8ed");
      root.style.setProperty("--text-muted", "#8888a0");
      root.style.setProperty("--border", "#22223a");
      root.style.setProperty("--nav-bg", "rgba(10, 10, 15, 0.8)");
      toggle.textContent = "\u260C";
    } else {
      root.style.setProperty("--bg", "#f8f8fc");
      root.style.setProperty("--bg-card", "#ffffff");
      root.style.setProperty("--bg-elevated", "#f0f0f8");
      root.style.setProperty("--text", "#1a1a2e");
      root.style.setProperty("--text-muted", "#666680");
      root.style.setProperty("--border", "#e0e0ec");
      root.style.setProperty("--nav-bg", "rgba(248, 248, 252, 0.85)");
      toggle.textContent = "\u263E";
    }
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
