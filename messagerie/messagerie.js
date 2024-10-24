document.addEventListener("DOMContentLoaded", () => {
  const convoContainer = document.getElementById("convo-container");
  const chatContainer = document.getElementById("chat-container");
  const messagesContainer = document.getElementById("messages-container");
  const activeConvoName = document.getElementById("active-convo-name");
  const newMessage = document.getElementById("new-message");
  const sendButton = document.getElementById("send-button");
  let activeConversationId = null;
  let conversationsData = []; // Stocker les conversations après chargement du JSON

  // Charger les conversations depuis le fichier data.json
  fetch("messagerie.json")
    .then((response) => response.json())
    .then((data) => {
      conversationsData = data.conversations; // Stocker localement les données
      renderConversations(conversationsData);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement des conversations:", error)
    );

  // Afficher les conversations dans le conteneur
  const renderConversations = (conversations) => {
    convoContainer.innerHTML = "";

    conversations.forEach(({ id, name, lastMessage }) => {
      const convoElement = document.createElement("div");
      convoElement.className = "conversation";
      convoElement.innerHTML = `
              <h3>${name}</h3>
              <p>${lastMessage}</p>
              <button class="open-convo-btn" data-id="${id}">Ouvrir</button>
          `;
      convoContainer.appendChild(convoElement);
    });

    // Ajouter l'événement click à tous les boutons d'ouverture de conversation
    const openButtons = document.querySelectorAll(".open-convo-btn");
    openButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const convoId = parseInt(e.target.getAttribute("data-id"));
        openConversation(convoId);
      });
    });
  };

  // Ouvrir une conversation spécifique
  const openConversation = (convoId) => {
    const conversation = conversationsData.find((c) => c.id === convoId);
    if (conversation) {
      activeConversationId = convoId;
      activeConvoName.textContent = conversation.name;
      renderMessages(conversation.messages);
      chatContainer.classList.remove("chat-hidden");
    } else {
      console.error("Conversation non trouvée.");
    }
  };

  // Afficher les messages d'une conversation
  const renderMessages = (messages) => {
    messagesContainer.innerHTML = "";
    messages.forEach(({ timestamp, sender, content }) => {
      const messageElement = document.createElement("div");
      const date = new Date(timestamp);
      messageElement.innerHTML = `<strong>${sender}:</strong> ${content} <em>${date.toLocaleString()}</em>`;
      messagesContainer.appendChild(messageElement);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll vers le bas
  };

  // Envoi d'un nouveau message
  sendButton.addEventListener("click", () => {
    const messageContent = newMessage.value.trim();
    if (messageContent && activeConversationId) {
      const newMessageObj = {
        timestamp: new Date().toISOString(),
        sender: "Moi", // Remplacer par le nom de l'utilisateur actuel
        content: messageContent,
      };

      // Ajouter le message dans la conversation active (localement)
      const conversation = conversationsData.find(
        (c) => c.id === activeConversationId
      );
      if (conversation) {
        conversation.messages.push(newMessageObj); // Ajouter le message à la liste
        renderMessages(conversation.messages); // Re-rendre les messages
        newMessage.value = ""; // Effacer l'input après envoi
      } else {
        console.error("Erreur lors de l'ajout du message à la conversation.");
      }
    } else {
      console.log(
        "Le champ de message est vide ou aucune conversation active."
      );
    }
  });
});
