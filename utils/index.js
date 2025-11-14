const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "../data");
const booksPath = path.join(folderPath, "books.json");
const authorPath = path.join(folderPath, "authors.json");

if (!fs.existsSync(folderPath)) {
  fs.mkdir(folderPath);
}

if (!fs.existsSync(booksPath)) {
  fs.writeFileSync(booksPath, "[]");
}
if (!fs.existsSync(authorPath)) {
  fs.writeFileSync(authorPath, "[]");
}

const loadBooks = () => {
  const file = fs.readFileSync(booksPath, "utf8");
  return JSON.parse(file);
};
const loadAuthors = () => {
  const file = fs.readFileSync(authorPath, "utf8");
  return JSON.parse(file);
};

const objBooks = ({ title, stock, authorId }) => {
  return {
    id: Date.now(),
    title,
    authorId: Number(authorId),
    stock: Number(stock),
    createdAt: new Date(),
  };
};

const loadData = () => {
  const books = loadBooks();
  const authors = loadAuthors();

  const mappingBook = books.map((b) => {
    const author = authors.find((a) => a.id === b.authorId);
    // console.log(b);
    return {
      ...b,
      authorName: author.name,
    };
  });

  return mappingBook;
};

const findBook = (id) => {
  const books = loadBooks();
  const bookId = Number(id);
  const bookIndex = books.findIndex((b) => b.id === bookId);
  const book = books[bookIndex];

  return { books, book, bookIndex };
};

const updateBookData = (oldBook, newData) => {
  const merge = {
    ...oldBook,
    ...newData,
    createdAt: oldBook.createdAt || new Date(),
    updatedAt: new Date(),
  };

  return merge;
};

const saveBooks = (books) => {
  fs.writeFileSync(booksPath, JSON.stringify(books));
};

module.exports = {
  loadBooks,
  loadAuthors,
  loadData,
  objBooks,
  saveBooks,
  findBook,
  updateBookData,
};
