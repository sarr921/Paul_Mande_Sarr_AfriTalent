// ================================
// AFRITALENT - main.js
// ================================

// Année automatique dans le footer
const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}

// ================================
// Défilement fluide
// ================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});

// ================================
// Fermer le menu mobile après clic
// ================================

const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
const navbarCollapse = document.querySelector(".navbar-collapse");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        if (navbarCollapse.classList.contains("show")) {

            const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });

            bsCollapse.hide();
        }

    });

});

// ================================
// Validation formulaire contact
// ================================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const nom = document.getElementById("nom");
        const prenom = document.getElementById("prenom");
        const email = document.getElementById("email");
        const sujet = document.getElementById("sujet");
        const message = document.getElementById("message");

        let valide = true;

        if (nom.value.trim() === "") {
            valide = false;
        }

        if (prenom.value.trim() === "") {
            valide = false;
        }

        if (email.value.trim() === "") {
            valide = false;
        }

        if (sujet.value.trim() === "") {
            valide = false;
        }

        if (message.value.trim() === "") {
            valide = false;
        }

        if (valide) {

            document.getElementById("successMessage").innerHTML = `
                <div class="alert alert-success mt-3">
                    Votre message a été envoyé avec succès !
                </div>
            `;

            contactForm.reset();

        } else {

            document.getElementById("successMessage").innerHTML = `
                <div class="alert alert-danger mt-3">
                    Veuillez remplir tous les champs.
                </div>
            `;
        }

    });

}

// ================================
// Filtre freelances
// ================================

const filter = document.getElementById("filter");

if (filter) {

    filter.addEventListener("change", function () {

        const value = this.value;

        const freelancers = document.querySelectorAll(".freelancer");

        freelancers.forEach(card => {

            if (value === "all") {

                card.style.display = "block";

            } else if (card.classList.contains(value)) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    });

}

// ================================
// Animation simple au chargement
// ================================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = "0.5s";
        document.body.style.opacity = "1";

    }, 100);

});