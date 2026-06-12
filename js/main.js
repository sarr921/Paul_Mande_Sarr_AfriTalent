/* ============================================
   AfriTalent — main.js
   Contient :
     1. Année dynamique (footer)
     2. Navbar qui change au scroll
     3. Compteurs animés (stats)
     4. Animation fade-in au scroll
     5. Filtrage des freelances (freelances.html)
     6. Validation du formulaire (contact.html)
============================================ */


/* ================================================
   1. ANNÉE DYNAMIQUE DANS LE FOOTER
   ================================================ */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}


/* ================================================
   2. NAVBAR — CHANGEMENT DE STYLE AU SCROLL
   ================================================
   La classe "scrolled" est définie dans style.css
   (fond noir + ombre).
   ================================================ */
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


/* ================================================
   3. COMPTEURS ANIMÉS (STATISTIQUES)
   ================================================
   Chaque élément avec data-target="2500" démarre
   à 0 et s'incrémente jusqu'à la valeur cible.
   Le compteur se lance quand la section est visible.
   ================================================ */

/**
 * Anime un compteur de 0 jusqu'à sa valeur cible.
 * @param {HTMLElement} el - L'élément dont le texte change
 * @param {number} target - La valeur finale
 * @param {number} duration - Durée en ms (défaut 2000)
 */
function animateCounter(el, target, duration = 2000) {
  let start = 0;
  const step = Math.ceil(target / (duration / 16)); // ~60fps

  const timer = setInterval(function () {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    // Ajoute "+" devant et formatage des milliers
    el.textContent = '+' + start.toLocaleString('fr-FR');
  }, 16);
}

// On observe tous les éléments avec data-target
const counterElements = document.querySelectorAll('[data-target]');

if (counterElements.length > 0) {
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'));
        animateCounter(el, target);
        counterObserver.unobserve(el); // Ne s'anime qu'une fois
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(function (el) {
    counterObserver.observe(el);
  });
}


/* ================================================
   4. ANIMATION FADE-IN AU SCROLL
   ================================================
   Tous les éléments avec la classe "fade-in"
   deviennent visibles quand ils entrent à l'écran.
   La classe .visible est définie dans style.css.
   ================================================ */
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


/* ================================================
   5. FILTRAGE DES FREELANCES (freelances.html)
   ================================================
   Le <select id="filter"> permet de filtrer
   les cartes selon leur classe CSS (web, design…)
   sans rechargement de page.
   ================================================ */
const filterSelect = document.getElementById('filter');

if (filterSelect) {
  filterSelect.addEventListener('change', function () {
    const value = this.value; // ex: "web", "design", "all"
    const cards = document.querySelectorAll('.freelancer');

    cards.forEach(function (card) {
      if (value === 'all' || card.classList.contains(value)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}


/* ================================================
   6. VALIDATION DU FORMULAIRE (contact.html)
   ================================================
   Vérifie chaque champ avant soumission :
   - Nom / Prénom : non vide
   - Email : format valide (regex)
   - Sujet : sélection requise
   - Message : minimum 20 caractères
   ================================================ */
const contactForm = document.getElementById('contactForm');

if (contactForm) {

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Empêche l'envoi réel

    let isValid = true; // Deviendra false dès qu'un champ est invalide

    // --- Helpers ---
    function showError(fieldId, message) {
      const errEl = document.getElementById(fieldId + 'Error');
      if (errEl) errEl.textContent = message;
      const field = document.getElementById(fieldId);
      if (field) field.classList.add('is-invalid');
    }

    function clearError(fieldId) {
      const errEl = document.getElementById(fieldId + 'Error');
      if (errEl) errEl.textContent = '';
      const field = document.getElementById(fieldId);
      if (field) field.classList.remove('is-invalid');
    }

    // --- Validation NOM ---
    clearError('nom');
    const nom = document.getElementById('nom').value.trim();
    if (nom === '') {
      showError('nom', 'Le nom est obligatoire.');
      isValid = false;
    }

    // --- Validation PRÉNOM ---
    clearError('prenom');
    const prenom = document.getElementById('prenom').value.trim();
    if (prenom === '') {
      showError('prenom', 'Le prénom est obligatoire.');
      isValid = false;
    }

    // --- Validation EMAIL ---
    clearError('email');
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
      showError('email', "L'email est obligatoire.");
      isValid = false;
    } else if (!emailRegex.test(email)) {
      showError('email', 'Veuillez entrer un email valide (ex: nom@domaine.com).');
      isValid = false;
    }

    // --- Validation SUJET ---
    clearError('sujet');
    const sujet = document.getElementById('sujet').value;
    if (sujet === '') {
      showError('sujet', 'Veuillez choisir un sujet.');
      isValid = false;
    }

    // --- Validation MESSAGE ---
    clearError('message');
    const message = document.getElementById('message').value.trim();
    if (message === '') {
      showError('message', 'Le message est obligatoire.');
      isValid = false;
    } else if (message.length < 20) {
      showError('message', 'Le message doit contenir au moins 20 caractères.');
      isValid = false;
    }

    // --- Si tout est valide : afficher le message de succès ---
    if (isValid) {
      const successDiv = document.getElementById('successMessage');
      if (successDiv) {
        successDiv.style.display = 'block';
        successDiv.textContent = ' Merci ' + prenom + ' ! Votre message a bien été envoyé.';
      }

      // Réinitialiser le formulaire après 3 secondes
      setTimeout(function () {
        contactForm.reset();
        if (successDiv) successDiv.style.display = 'none';
      }, 3000);
    }
  });
}