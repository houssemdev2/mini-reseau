document.addEventListener("DOMContentLoaded", function () {
  // Fetch JSON
  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      displayPosts(data);
    })
    .catch((error) =>
      console.error("Erreur lors du chargement du JSON:", error)
    );

  // fonction affichage des posts
  function displayPosts(posts) {
    const postFeed = document.getElementById("post-feed");
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // contenu de post
      postElement.innerHTML = `
          <h2>${post.user}</h2>
          <p>${post.text}</p>
          ${post.image ? `<img src="${post.image}" alt="Post image">` : ""}
          <div class="reactions">
            <button class="like-btn">👍 Like (${post.reactions.like})</button>
            <button class="dislike-btn">👎 Dislike (${
              post.reactions.dislike
            })</button>
            <button class="love-btn">❤️ Love (${post.reactions.love})</button>
          </div>
          <div class="comments">
            ${post.comments
              .map(
                (comment) => `
              <p><strong>${comment.user}:</strong> ${comment.text}</p>
            `
              )
              .join("")}
          </div>
        `;

      postFeed.appendChild(postElement);

      // Ajout event listeners pour les reactions
      const likeBtn = postElement.querySelector(".like-btn");
      const dislikeBtn = postElement.querySelector(".dislike-btn");
      const loveBtn = postElement.querySelector(".love-btn");

      likeBtn.addEventListener("click", () =>
        updateReaction(post, "like", likeBtn)
      );
      dislikeBtn.addEventListener("click", () =>
        updateReaction(post, "dislike", dislikeBtn)
      );
      loveBtn.addEventListener("click", () =>
        updateReaction(post, "love", loveBtn)
      );
    });
  }

  // Fonction pour mettre à jour les reactions
  function updateReaction(post, reactionType, button) {
    post.reactions[reactionType]++;
    button.textContent = `${
      reactionType === "like"
        ? "👍 Like"
        : reactionType === "dislike"
        ? "👎 Dislike"
        : "❤️ Love"
    } (${post.reactions[reactionType]})`;
  }
});
