document.addEventListener("DOMContentLoaded", () => {
  const submenuLinks = document.querySelectorAll(".nav-item > a");
  const prevButton = document.querySelector(".carousel-control.prev");
  const nextButton = document.querySelector(".carousel-control.next");
  const carousel = document.querySelector(".carousel");
  const items = document.querySelectorAll(".carousel-item");
  let index = 0;
  const intervalTime = 3000;

  //************************* Accordion ************************

  // Une boucle forEach pour gérer les événements pour les liens d'accordéon
  submenuLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      const submenu = this.nextElementSibling;

      // Ferme tous les sous-menus sauf celui cliqué
      const allSubmenus = document.querySelectorAll(".submenu");
      allSubmenus.forEach((menu) => {
        if (menu !== submenu) {
          menu.classList.remove("active");
        }
      });

      // Bascule le sous-menu cliqué
      submenu.classList.toggle("active");
    });
  });

  // Pour fermer le sous-menu en cliquant en dehors
  document.addEventListener("click", function (event) {
    const isClickInside = event.target.closest(".nav-item");
    if (!isClickInside) {
      const allSubmenus = document.querySelectorAll(".submenu");
      allSubmenus.forEach((submenu) => {
        submenu.classList.remove("active");
      });
    }
  });

  //************************* Carousel ************************

  // Fonction pour mettre à jour le carousel
  const updateCarousel = () => {
    carousel.style.transform = `translateX(${-index * 100}%)`;
  };

  // Fonction pour montrer le slide suivant
  const showNextSlide = () => {
    index = index < items.length - 1 ? index + 1 : 0;
    updateCarousel();
  };

  // Fonction pour montrer le slide précédent
  const showPrevSlide = () => {
    index = index > 0 ? index - 1 : items.length - 1;
    updateCarousel();
  };

  // Fonction pour réinitialiser l'intervalle de lecture automatique
  const resetInterval = () => {
    clearInterval(autoPlay);
    autoPlay = setInterval(showNextSlide, intervalTime);
  };

  // Gérer les événements pour les boutons de carousel
  if (prevButton) {
    prevButton.addEventListener("click", () => {
      showPrevSlide();
      resetInterval();
    });
  }

  if (nextButton) {
    nextButton.addEventListener("click", () => {
      showNextSlide();
      resetInterval();
    });
  }

  // Lecture automatique
  let autoPlay = setInterval(showNextSlide, intervalTime);

  // Arrêter la lecture automatique au survol de la souris
  carousel.addEventListener("mouseenter", () => {
    clearInterval(autoPlay);
  });

  // Reprendre la lecture automatique lorsque la souris quitte le carousel
  carousel.addEventListener("mouseleave", () => {
    autoPlay = setInterval(showNextSlide, intervalTime);
  });
});
