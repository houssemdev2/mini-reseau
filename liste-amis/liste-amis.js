document.addEventListener("DOMContentLoaded", () => {
  const amisList = document.getElementById("amis-list");
  const searchInput = document.getElementById("search-input");

  let amisData = []; // Initialisation des données

  // Charger les amis depuis le fichier data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      amisData = data.amis; // Stocker les amis dans amisData
      renderAmisList(amisData); // Afficher la liste des amis
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des amis:", error)
    );

  // Fonction pour afficher la liste des amis
  const renderAmisList = (amis) => {
    amisList.innerHTML = ""; // Réinitialiser la liste avant de la remplir
    amis.forEach((ami) => {
      const amiItem = document.createElement("li");
      amiItem.className = "ami-item";
      amiItem.innerHTML = `
                <span class="ami-name">${ami.name}</span>
                <div class="ami-actions">
                    <button onclick="removeFriend(${ami.id})">Supprimer</button>
                </div>
            `;
      amisList.appendChild(amiItem);
    });
  };

  // Fonction de recherche
  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredAmis = amisData.filter((ami) =>
      ami.name.toLowerCase().includes(searchValue)
    );
    renderAmisList(filteredAmis);
  });

  // Fonction pour supprimer un ami
  window.removeFriend = (id) => {
    amisData = amisData.filter((ami) => ami.id !== id);
    renderAmisList(amisData);
    console.log(`Ami avec ID ${id} supprimé`);
  };
});
