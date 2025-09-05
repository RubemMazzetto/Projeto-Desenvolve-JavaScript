const POSTS_KEY = "social_posts";

const loadPosts = () => {
  const stored = localStorage.getItem(POSTS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const savePosts = (posts) => {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
};

const fetchCatImage = async () => {
  try {
    const response = await fetch("https://api.thecatapi.com/v1/images/search");
    if (!response.ok) {
      throw new Error("Erro ao buscar imagem de gatinho");
    }
    const data = await response.json();
    return data[0].url;
  } catch (error) {
    console.error(error);
    return "https://via.placeholder.com/300x200?text=Gatinho+Indisponível";
  }
};

const addPost = async (username, text, posts) => {
  if (!username.trim() || !text.trim()) {
    alert("Nome de usuário e texto da postagem são obrigatórios");
    return false;
  }

  const date = new Date().toISOString();
  const catImage = await fetchCatImage();
  const avatar = `https://api.dicebear.com/9.x/identicon/svg?seed=${encodeURIComponent(username)}`;

  posts.unshift({ date, username, avatar, text, image: catImage, likes: 0 });
  savePosts(posts);
  renderFeed(posts);
  return true;
};

const incrementLikes = (index, posts) => {
  posts[index].likes += 1;
  savePosts(posts);
  renderFeed(posts);
};

const renderFeed = (posts) => {
  const feedDiv = document.getElementById("feed");
  feedDiv.innerHTML = "";

  posts.forEach((post, index) => {
    const postDiv = document.createElement("div");
    postDiv.className = "bg-white p-4 rounded-lg shadow-md";
    postDiv.innerHTML = `
      <div class="flex items-start space-x-3">
        <img src="${post.avatar}" alt="${post.username}" class="w-10 h-10 rounded-full">
        <div class="flex-1">
          <p class="font-bold">${post.username}</p>
          <p class="text-gray-600 text-sm">${new Date(post.date).toLocaleString()}</p>
          <p class="mt-2">${post.text}</p>
          <img src="${post.image}" alt="Gatinho" class="mt-2 w-full h-48 object-cover rounded-lg">
          <div class="mt-2 flex items-center">
            <button
              class="like-button bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
              data-index="${index}"
            >
              Curtir (${post.likes})
            </button>
          </div>
        </div>
      </div>
    `;
    feedDiv.appendChild(postDiv);
  });

  document.querySelectorAll(".like-button").forEach(button => {
    button.addEventListener("click", () => {
      const index = parseInt(button.dataset.index);
      incrementLikes(index, posts);
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const posts = loadPosts();
  const usernameInput = document.getElementById("usernameInput");
  const postInput = document.getElementById("postInput");
  const postButton = document.getElementById("postButton");

  renderFeed(posts);

  postButton.addEventListener("click", async () => {
    if (await addPost(usernameInput.value, postInput.value, posts)) {
      usernameInput.value = "";
      postInput.value = "";
    }
  });

  postInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (await addPost(usernameInput.value, postInput.value, posts)) {
        usernameInput.value = "";
        postInput.value = "";
      }
    }
  });
});