document.addEventListener("DOMContentLoaded", () => {
  let conversationsData = []; // Stocker les conversations après chargement du JSON

  // Charger les conversations depuis le fichier data.json
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      conversationsData = data.conversations; // Stocker localement les données
      renderConversations(conversationsData);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des conversations:", error)
    );
});
