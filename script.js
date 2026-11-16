
/* =========================================
   E-COMMERCE PRESENTATION
   Scroll Progress + Navigation + Animations
========================================= */

(() => {
  const progressBar = document.getElementById("progressBar");

  const navLinks = [
    ...document.querySelectorAll(".topbar nav a")
  ];

  const sections = [
    ...document.querySelectorAll("main section[id]")
  ];

  // 1. Scroll Progress Bar
  function updateProgress() {
    if (!progressBar) return;

    const scrollable =
      document.documentElement.scrollHeight -
      window.innerHeight;

    const progress =
      scrollable > 0
        ? (window.scrollY / scrollable) * 100
        : 0;

    progressBar.style.width =
      `${Math.min(100, Math.max(0, progress))}%`;
  }

  // 2. Active Navigation Link
  function updateActiveLink() {
    let currentId = sections[0]?.id;

    const marker =
      window.scrollY + window.innerHeight * 0.32;

    sections.forEach((section) => {
      if (section.offsetTop <= marker) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      const isActive =
        link.getAttribute("href") === `#${currentId}`;

      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  // 3. Scroll Events
  function handleScroll() {
    updateProgress();
    updateActiveLink();
  }

  window.addEventListener("scroll", handleScroll, {
    passive: true
  });

  window.addEventListener("resize", handleScroll);

  handleScroll();

  // 4. Reveal Animations
  const revealTargets = document.querySelectorAll(
    ".info-card, .challenge-card, .social-grid article, .solution-list article, .legal-points article, .example-note"
  );

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (
    "IntersectionObserver" in window &&
    !reducedMotion
  ) {
    revealTargets.forEach((element) => {
      element.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");

            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealTargets.forEach((element) => {
      observer.observe(element);
    });
  }
})();
