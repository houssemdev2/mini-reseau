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

  // Function to display posts
  function displayPosts(posts) {
    const postFeed = document.getElementById("post-feed");
    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");

      // Post content
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
    });
  }
});
