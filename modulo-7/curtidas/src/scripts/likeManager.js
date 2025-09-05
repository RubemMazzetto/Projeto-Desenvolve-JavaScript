const LIKERS_KEY = "likers";

const loadLikers = () => {
  const stored = localStorage.getItem(LIKERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

const saveLikers = (likers) => {
  localStorage.setItem(LIKERS_KEY, JSON.stringify(likers));
};

const formatLikesMessage = (likers) => {
  if (likers.length === 0) {
    return "Ninguém curtiu";
  } else if (likers.length === 1) {
    return `${likers[0]} curtiu`;
  } else if (likers.length === 2) {
    return `${likers[0]} e ${likers[1]} curtiram`;
  } else {
    return `${likers[0]}, ${likers[1]} e mais ${likers.length - 2} pessoas curtiram`;
  }
};

const addLike = (name, likers) => {
  if (!name.trim()) {
    alert("O nome não pode estar vazio");
    return false;
  }

  if (likers.some(liker => liker.toLowerCase() === name.toLowerCase())) {
    alert("Este nome já curtiu!");
    return false;
  }

  likers.push(name);
  saveLikers(likers);
  updateLikesDisplay(likers);
  return true;
};

const clearLikes = (likers) => {
  likers.length = 0;
  localStorage.removeItem(LIKERS_KEY);
  updateLikesDisplay(likers);
};

const updateLikesDisplay = (likers) => {
  const likesDisplay = document.getElementById("likesDisplay");
  likesDisplay.textContent = formatLikesMessage(likers);
};

document.addEventListener("DOMContentLoaded", () => {
  const likers = loadLikers();
  const nameInput = document.getElementById("nameInput");
  const likeButton = document.getElementById("likeButton");
  const clearButton = document.getElementById("clearButton");

  updateLikesDisplay(likers);

  likeButton.addEventListener("click", () => {
    if (addLike(nameInput.value, likers)) {
      nameInput.value = "";
    }
  });

  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && addLike(nameInput.value, likers)) {
      nameInput.value = "";
    }
  });

  clearButton.addEventListener("click", () => {
    clearLikes(likers);
  });
});