import { addBook, removeBook, updateBookQuantity, listBooks } from "./src/bookInventory.js";

try {
  addBook("Clean Code", "Robert C. Martin", 10);
  addBook("JavaScript: The Good Parts", "Douglas Crockford", 5);
  addBook("The Pragmatic Programmer", "Andrew Hunt", 8);

  console.log("\nLivros no estoque:");
  listBooks();

  updateBookQuantity("Clean Code", 15);
  console.log("\nApós atualizar quantidade de Clean Code:");
  listBooks();

  removeBook("JavaScript: The Good Parts");
  console.log("\nApós remover JavaScript: The Good Parts:");
  listBooks();

  addBook("Clean Code", "Outro Autor", 5);
} catch (error) {
  console.error(`Erro: ${error.message}`);
}