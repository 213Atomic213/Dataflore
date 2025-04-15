const modal = document.getElementById("flower-modal");
const modalTitle = document.getElementById("modal-title");
const modalScientific = document.getElementById("modal-scientific");
const modalImagesContainer = document.getElementById("modal-images");
const modalText = document.getElementById("modal-text");
const modalEtymologie = document.getElementById("modal-etymologie");
const modalSignification = document.getElementById("modal-signification");
const modalFloraison = document.getElementById("modal-floraison");

const closeModal = document.getElementById("close-modal");



		// Changement de theme
const toggle = document.getElementById('themeToggle').querySelector('input');
const icon = document.querySelector('.theme-toggle .icon');
const logo = document.querySelector('img');  // Récupère l'élément logo

toggle.addEventListener('change', () => {
	const isDark = toggle.checked;

	// Basculer entre les classes de mode sombre et clair
	document.body.classList.toggle('dark-mode', isDark);
	document.body.classList.toggle('light-mode', !isDark);

	// Supprimer les animations précédentes pour forcer le redéclenchement
	icon.classList.remove('rotate-left', 'rotate-right');

	// Forcer un reflow pour réinitialiser l'animation (important !)
	void icon.offsetWidth;

	// Appliquer la bonne animation
	icon.classList.add(isDark ? 'rotate-right' : 'rotate-left');

	// Mettre à jour le logo en fonction du mode
	logo.src = isDark ? "icone/logo.png" : "icone/logo.svg";


	// Enregistrer le mode dans localStorage pour qu'il persiste lors des prochaines visites
	localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Appliquer le mode stocké dans localStorage au démarrage
if (localStorage.getItem('theme') === 'dark') {
	document.body.classList.add('dark-mode');
	document.body.classList.remove('light-mode');
	logo.src = "icone/logo.svg";  // Logo pour le mode sombre
	toggle.checked = true;  // S'assurer que le toggle est activé
} else {
	document.body.classList.add('light-mode');
	document.body.classList.remove('dark-mode');
	logo.src = "icone/logo.svg";  // Logo pour le mode clair
	toggle.checked = false;  // S'assurer que le toggle est désactivé
}



		// Barre de recherche
document.addEventListener("DOMContentLoaded", () => {
	const searchInput = document.getElementById("search-input");
	const cards = document.querySelectorAll(".card");
	const noResultMsg = document.getElementById("no-result");

const autocompleteList = document.getElementById("autocomplete-list");
let currentFocus = -1;

searchInput.addEventListener("input", () => {
	const query = normalize(searchInput.value);
	autocompleteList.innerHTML = "";
	currentFocus = -1;

	if (!query) {
		autocompleteList.style.display = "none";
		return;
	}

	const matches = Array.from(cards)
		.map(card => card.getAttribute("data-title") || "")
		.filter(title => normalize(title).includes(query));

	if (matches.length === 0) {
		autocompleteList.style.display = "none";
		return;
	}

	matches.forEach((title, index) => {
		const item = document.createElement("div");
		item.classList.add("autocomplete-item");
		item.textContent = title;

		item.addEventListener("click", () => {
			searchInput.value = title;
			filterCards();
			autocompleteList.innerHTML = "";
			autocompleteList.style.display = "none";
		});

		autocompleteList.appendChild(item);
	});

	autocompleteList.style.display = "block";
});

// Navigation clavier
searchInput.addEventListener("keydown", (e) => {
	const items = autocompleteList.querySelectorAll(".autocomplete-item");

	if (e.key === "Tab"  && !e.shiftKey) {
		currentFocus = (currentFocus + 1) % items.length;
		updateActive(items);
		e.preventDefault();
		
	} else if (e.key === "Tab" && e.shiftKey) {
		currentFocus = (currentFocus - 1 + items.length) % items.length;
		updateActive(items);
		e.preventDefault();
	} else if (e.key === "Enter" && currentFocus > -1) {
		e.preventDefault();
		items[currentFocus].click();
	}
});

function updateActive(items) {
	items.forEach((item, idx) => {
		const isActive = idx === currentFocus;
		item.classList.toggle("active", isActive);

		if (isActive) {
			item.scrollIntoView({ block: "nearest", behavior: "smooth" });
		}
	});
}

// Fermer si on clique ailleurs
document.addEventListener("click", (e) => {
	if (!autocompleteList.contains(e.target) && e.target !== searchInput) {
		autocompleteList.innerHTML = "";
		autocompleteList.style.display = "none";
	}
});

	// Fonction pour enlever accents et normaliser
	const normalize = str =>
	str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();

	// Fonction de debounce
	function debounce(fn, delay) {
		let timeout;
		return (...args) => {
		  clearTimeout(timeout);
		  timeout = setTimeout(() => fn(...args), delay);
		};
	}

const filterCards = () => {
	const query = normalize(searchInput.value); // requête normalisée complète
	let hasMatch = false;

	cards.forEach(card => {
		const titleRaw = card.getAttribute("data-title") || "";
		const titleClean = normalize(titleRaw.replace(/^[^\w\s]+/, "")); // normalise le titre

		// Match exact de la chaîne entière (même avec espaces), quelque part dans le titre
		if (titleClean.includes(query)) {
			card.style.display = "block";
			hasMatch = true;
		} else {
			card.style.display = "none";
		}
	});

	noResultMsg.style.display = hasMatch ? "none" : "block";
};




		// Gestion d'effaçage rapide
const clearBtn = document.getElementById("clear-search");
searchInput.addEventListener("input", () => {
  clearBtn.style.display = searchInput.value.trim() ? "inline" : "none";
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  clearBtn.style.display = "none";
  filterCards();
});

  searchInput.addEventListener("input", debounce(filterCards, 300));
	
});



								// Ouverture du modal au clic sur une carte
// Sélectionne toutes les cartes
const cards = document.querySelectorAll(".card");

modal.style.display = "none";


cards.forEach(card => {
  card.addEventListener("click", () => {
    const title = card.getAttribute("data-title");
	const scientific = card.getAttribute("data-scientific");
	const additionalImages = card.getAttribute("data-images");
	const text = card.getAttribute("data-text");
	const etymologie = card.getAttribute("data-etymologie");
	const signification = card.getAttribute("data-signification");
	const floraison = card.getAttribute("data-floraison");
    

    modalTitle.textContent = title;
    modalText.textContent = text;

	if (scientific) {
		modalScientific.textContent = "(🔬 " + scientific + ")";
	} else {
		modalScientific.textContent = "";
	}

	if (etymologie) {
		modalEtymologie.style.display = "block";
		modalEtymologie.innerHTML = "<h4>Étymologie</h4><p>" + etymologie + "</p>";
	} else {
		modalEtymologie.style.display = "none";
	}

    if (signification) {
      modalSignification.style.display = "block";
      modalSignification.innerHTML = "<h4>Signification</h4><p>" + signification + "</p>";
    } else {
      modalSignification.style.display = "none";
    }

   if (floraison) {
      modalFloraison.style.display = "block";
	  const article = ['a', 'o'].includes(floraison.split(" ")[0].charAt(0).toLowerCase()) ? "D'" : "De ";
      modalFloraison.textContent = "Période de floraison : " + article + floraison.split(" ")[0] + " jusqu'à " + floraison.split(" ")[1] + ".";
    } else {
      modalFloraison.style.display = "none";
    }

    if (additionalImages) {
      const imagesArray = additionalImages.split(",");
      modalImagesContainer.innerHTML = "";
      imagesArray.forEach(imageUrl => {
        const imgElement = document.createElement("img");
        imgElement.src = imageUrl.trim();
        imgElement.alt = title;
        imgElement.classList.add("modal-image");
		document.body.classList.add('modal-open');
        modalImagesContainer.appendChild(imgElement);
      });
    }
	
	

    modal.style.display = "flex"; // Affiche le modal
  });
});


						// Fermeture via le bouton close
closeModal.addEventListener("click", closeModalFunction);

function closeModalFunction() {
  // Ajoute l'animation de fermeture
  modal.classList.add("closing");
  document.body.classList.remove('modal-open');
  
  // Masquer le modal après l'animation
  setTimeout(() => {
    modal.style.display = "none"; // Masquer le modal
    modal.classList.remove("closing"); // Retirer la classe 'closing' une fois l'animation terminée
    modalImagesContainer.querySelectorAll('img').forEach(img => {
      img.classList.remove("enlarged");
      img.classList.remove("shrink");
    });
  }, 500); // Temps d'animation pour la fermeture
}

						// Fermeture du modal via la touche "Espace"
window.addEventListener("keydown", (e) => {
  if ( e.key === "Escape") {
    e.preventDefault(); // Empêche le comportement par défaut de l'espace
    closeModalFunction(); // Appel de la fonction pour fermer le modal
  }
});



 document.addEventListener("DOMContentLoaded", function () {
    const container = document.querySelector(".features");
    const cards = Array.from(container.querySelectorAll(".card"));

    // Trie les cartes en fonction de leur data-title
    cards.sort((a, b) => {
      const titleA = a.getAttribute("data-title").replace(/^[^a-zA-Z]+/, "").toLowerCase();
      const titleB = b.getAttribute("data-title").replace(/^[^a-zA-Z]+/, "").toLowerCase();
      return titleA.localeCompare(titleB);
    });

    // Réinsère les cartes dans le container dans le bon ordre
    cards.forEach(card => container.appendChild(card));
  });



// Gestion du clic sur les images dans le modal
modalImagesContainer.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "img") {
    const clickedImage = e.target;
    const isEnlarged = clickedImage.classList.contains("enlarged");

    // Réinitialise toutes les images
    modalImagesContainer.querySelectorAll("img").forEach(img => {
      img.classList.remove("enlarged");
      img.classList.remove("shrink");
    });

    if (!isEnlarged) {
      // Agrandit l'image si elle ne l'était pas
      clickedImage.classList.add("enlarged");
      clickedImage.style.transition = "transform 0.3s ease";
    } else {
      // Sinon la rétrécit
      clickedImage.classList.add("shrink");
    }

    e.stopPropagation(); // Ne propage pas ce clic plus loin
  }
});

// Si clic ailleurs dans le modal → rétrécit l’image agrandie (sans fermer le modal)
modal.addEventListener("click", () => {
  const enlargedImg = modalImagesContainer.querySelector("img.enlarged");
  if (enlargedImg) {
    enlargedImg.classList.remove("enlarged");
    enlargedImg.classList.add("shrink");
  }
});


// lien "À propos"
document.getElementById("about-link").addEventListener("click", function(e) {
  e.preventDefault(); // Empêche le comportement par défaut de # (pas de défilement immédiat)

  // Fait défiler la page jusqu'à l'élément #footer
  const footer = document.getElementById("footer");

  // Utilisation de scrollIntoView pour garantir un défilement fluide
  footer.classList.add("expanded"); // Animation d'agrandissement du footer

  // Affiche le texte du footer avec l'animation d'apparition
  const aboutText = document.getElementById("about-text");
  aboutText.classList.add("visible"); // Afficher le texte

    // Attendre un peu avant de faire défiler vers le bas
    footer.scrollIntoView({
      behavior: "smooth", // Défilement fluide
      block: "end"        // Aligne l'élément en bas
    });

    // Réduit le footer après l'agrandissement
    footer.classList.remove("expanded");
    footer.classList.add("shrinking");

    setTimeout(() => {
      footer.classList.remove("shrinking");
    }, 500); // Durée de l'animation de réduction
 // Temps d'attente avant de faire défiler
});



