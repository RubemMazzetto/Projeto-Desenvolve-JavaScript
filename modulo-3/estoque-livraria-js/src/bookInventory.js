let books = [];

const addBook = (title, author, quantity) => {
  if (!title || !author || quantity < 0) {
    throw new Error("Título, autor e quantidade válida são obrigatórios");
  }

  const exists = books.some(book => book.title.toLowerCase() === title.toLowerCase());
  if (exists) {
    throw new Error(`O livro "${title}" já existe no estoque`);
  }

  books.push({ title, author, quantity });
  return { title, author, quantity };
};

const removeBook = (title) => {
  if (!title) {
    throw new Error("Título é obrigatório");
  }

  const initialLength = books.length;
  books = books.filter(book => book.title.toLowerCase() !== title.toLowerCase());

  if (books.length === initialLength) {
    throw new Error(`Livro "${title}" não encontrado no estoque`);
  }
};

const updateBookQuantity = (title, newQuantity) => {
  if (!title || newQuantity < 0) {
    throw new Error("Título e quantidade válida são obrigatórios");
  }

  const book = books.find(book => book.title.toLowerCase() === title.toLowerCase());
  if (!book) {
    throw new Error(`Livro "${title}" não encontrado no estoque`);
  }

  book.quantity = newQuantity;
  return book;
};

const listBooks = () => {
  if (books.length === 0) {
    console.log("O estoque está vazio");
    return [];
  }

  books.forEach(book => {
    console.log(`Título: ${book.title}, Autor: ${book.author}, Quantidade: ${book.quantity}`);
  });
  return books;
};

export { addBook, removeBook, updateBookQuantity, listBooks };