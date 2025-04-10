const modal = document.getElementById("flower-modal");
const modalImg = document.getElementById("modal-img");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeModal = document.getElementById("close-modal");
const modalImagesContainer = document.getElementById("modal-images");

// Sélectionne toutes les cartes
const cards = document.querySelectorAll(".card");

modal.style.display = "none";

// Ouvre le modal au clic sur une carte
cards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
    const text = card.getAttribute("data-text");
    const additionalImages = card.getAttribute("data-images");

    modalTitle.textContent = title;
    modalText.textContent = text;

    const mainImage = card.getAttribute("data-image");
    if (mainImage) {
      modalImg.style.display = "block";
      modalImg.src = mainImage;
    } else {
      modalImg.style.display = "none";
    }

    if (additionalImages) {
      const imagesArray = additionalImages.split(",");
      modalImagesContainer.innerHTML = "";
      imagesArray.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl.trim();
        imgElement.alt = title;
        imgElement.classList.add("modal-image");
        modalImagesContainer.appendChild(imgElement);
      });
    }

    modal.style.display = "flex"; // Affiche le modal
  });
});

// Ferme le modal au clic sur la croix
closeModal.addEventListener("click", closeModalFunction);

function closeModalFunction() {
  modal.classList.add("closing"); // Ajoute l'animation de fermeture
  setTimeout(() => {
    modal.style.display = "none"; // Masque le modal après l'animation
    modal.classList.remove("closing"); // Supprime la classe de fermeture
    modalImg.classList.remove("enlarged"); // Réinitialiser l'état agrandi
    modalImagesContainer.querySelectorAll('img').forEach(img => {
      img.classList.remove("enlarged");
      img.classList.remove("shrink");
    });
  }, 500);
}

// Agrandir l'image au clic
modalImagesContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "img") {
    if (e.target.classList.contains("enlarged")) {
      // Réduit l'image si elle est agrandie
      e.target.classList.remove("enlarged");
      e.target.classList.add("shrink"); // Ajoute l'animation de rétrécissement
    } else {
      // Agrandit l'image si elle n'est pas encore agrandie
      const allImages = modalImagesContainer.querySelectorAll("img");
      allImages.forEach(img => img.classList.remove("enlarged"));

      const clickedImage = e.target;
      clickedImage.classList.add("enlarged");  // Applique l'agrandissement
      clickedImage.style.transition = "transform 0.3s ease"; // Transition fluide pour l'agrandissement
    }
  }
  e.stopPropagation(); // Empêche la propagation pour ne pas fermer le modal
});

// Ajoutez un écouteur d'événements pour l'ancrage du lien "À propos"
document.getElementById("about-link").addEventListener("click", function(e) {
  e.preventDefault(); // Empêche le comportement par défaut de # (pas de défilement immédiat)

  // Fait défiler la page jusqu'à l'élément #footer
  const footer = document.getElementById("footer");

  // Utilisation de scrollIntoView pour garantir un défilement fluide
  footer.classList.add("expanded"); // Animation d'agrandissement du footer

  // Affiche le texte du footer avec l'animation d'apparition
  const aboutText = document.getElementById("about-text");
  aboutText.classList.add("visible"); // Applique la classe visible pour afficher le texte

  // Une fois l'animation d'agrandissement terminée, rétrécir le footer
    // Attendre un peu avant de faire défiler vers le bas
    footer.scrollIntoView({
      behavior: "smooth", // Défilement fluide
      block: "end"        // Aligne l'élément en bas du viewport
    });

    // Réduit le footer après l'agrandissement
    footer.classList.remove("expanded");
    footer.classList.add("shrinking");

    // Après un délai, rétrécir le footer
    setTimeout(() => {
      footer.classList.remove("shrinking");
    }, 500); // Durée de l'animation de réduction
 // Temps d'attente avant de faire défiler
});



// Ferme le modal avec l'animation de fermeture au clic sur la croix
closeModal.addEventListener("click", closeModalFunction);

// Fonction pour fermer le modal avec animation
function closeModalFunction() {
  // Ajoute l'animation de fermeture
  modal.classList.add("closing");
  
  // Masquer le modal après l'animation
  setTimeout(() => {
    modal.style.display = "none"; // Masquer le modal
    modal.classList.remove("closing"); // Retirer la classe 'closing' une fois l'animation terminée
    modalImg.classList.remove("enlarged"); // Réinitialiser l'état agrandi
    modalImagesContainer.querySelectorAll('img').forEach(img => {
      img.classList.remove("enlarged");
      img.classList.remove("shrink");
    });
  }, 500); // Temps d'animation pour la fermeture
}

// Événement de fermeture du modal via la touche "Espace"
window.addEventListener("keydown", (e) => {
  if (e.key === " " || e.key === "Spacebar") {
    e.preventDefault(); // Empêche le comportement par défaut de l'espace
    closeModalFunction(); // Appel de la fonction pour fermer le modal
  }
});

// Événement de fermeture via le bouton "close"
closeModal.addEventListener("click", closeModalFunction);

