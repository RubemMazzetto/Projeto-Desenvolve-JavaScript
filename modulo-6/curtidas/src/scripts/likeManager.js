let likers = [];

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

const addLike = (name) => {
  if (!name.trim()) {
    alert("O nome não pode estar vazio");
    return;
  }

  if (likers.some(liker => liker.toLowerCase() === name.toLowerCase())) {
    alert("Este nome já curtiu!");
    return;
  }

  likers.push(name);
  updateLikesDisplay();
};

const updateLikesDisplay = () => {
  const likesDisplay = document.getElementById("likesDisplay");
  likesDisplay.textContent = formatLikesMessage(likers);
};

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const likeButton = document.getElementById("likeButton");

  likeButton.addEventListener("click", () => {
    addLike(nameInput.value);
    nameInput.value = "";
  });

  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addLike(nameInput.value);
      nameInput.value = "";
    }
  });
});