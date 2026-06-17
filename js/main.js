/* 1. ANNÉE DYNAMIQUE */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

/* 2. NAVBAR AU SCROLL */
const navbar = document.querySelector('.navbar');

if (navbar) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
/* 3. COMPTEURS ANIMÉS */

function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16));

  const timer = setInterval(function () {
    start += step;

    if (start >= target) {
      start = target;
      clearInterval(timer);
    }

    el.textContent = '+' + start.toLocaleString('fr-FR');
  }, 16);
}

const counterElements = document.querySelectorAll('[data-target]');

if (counterElements.length > 0) {
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });
}

/* 4. FADE IN */

const fadeElements = document.querySelectorAll('.fade-in');

if (fadeElements.length > 0) {
  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeElements.forEach(function (el) {
    fadeObserver.observe(el);
  });
}