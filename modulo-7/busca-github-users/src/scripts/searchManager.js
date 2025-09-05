const searchUsers = async (query) => {
  if (!query.trim()) {
    alert("O campo de busca não pode estar vazio");
    return;
  }

  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = '<p class="text-gray-500">Carregando...</p>';

  try {
    const response = await fetch(`https://api.github.com/search/users?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Erro na API: ${response.status}`);
    }
    const data = await response.json();

    resultsDiv.innerHTML = "";
    if (data.total_count === 0) {
      resultsDiv.innerHTML = '<p class="text-red-500">Não foram encontrados usuários para esta pesquisa</p>';
    } else {
      const ul = document.createElement("ul");
      ul.className = "space-y-2";
      data.items.forEach(user => {
        const li = document.createElement("li");
        li.className = "flex items-center p-2 bg-gray-50 rounded-lg";
        li.innerHTML = `
          <img src="${user.avatar_url}" alt="${user.login}" class="w-10 h-10 rounded-full mr-2">
          <a href="${user.html_url}" target="_blank" class="text-blue-500 hover:underline">${user.login}</a>
        `;
        ul.appendChild(li);
      });
      resultsDiv.appendChild(ul);
    }
  } catch (error) {
    resultsDiv.innerHTML = `<p class="text-red-500">Erro ao buscar usuários: ${error.message}</p>`;
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", () => {
    searchUsers(searchInput.value);
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      searchUsers(searchInput.value);
    }
  });
});