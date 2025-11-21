const fs = require("fs");
const path = require("path");

const folderPath = path.join(__dirname, "../data");
const booksPath = path.join(folderPath, "books.json");
const authorPath = path.join(folderPath, "authors.json");
const bookDescriptions = path.join(folderPath, "bookDescription.json");

if (!fs.existsSync(folderPath)) {
  fs.mkdir(folderPath);
}

if (!fs.existsSync(booksPath)) {
  fs.writeFileSync(booksPath, "[]");
}
if (!fs.existsSync(authorPath)) {
  fs.writeFileSync(authorPath, "[]");
}
if (!fs.existsSync(bookDescriptions)) {
  fs.writeFileSync(bookDescriptions, "[]");
}

const loadBooks = () => {
  const file = fs.readFileSync(booksPath, "utf8");
  return JSON.parse(file);
};
const loadAuthors = () => {
  const file = fs.readFileSync(authorPath, "utf8");
  return JSON.parse(file);
};
const loadBookDescription = () => {
  const file = fs.readFileSync(bookDescriptions, "utf8");
  return JSON.parse(file);
};

// loadBookDescription();

const objBooks = ({ title, stock, authors }) => {
  return {
    id: Date.now(),
    title,
    authors,
    stock: Number(stock),
    createdAt: new Date(),
  };
};

const objAuthors = ({ name }) => {
  return {
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
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
      author: author,
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

const updateAuthorData = (oldData, newData) => {
  const merge = {
    ...oldData,
    ...newData,
    createdAt: oldData.createdAt || new Date(),
    updatedAt: new Date(),
  };

  return merge;
};

const saveBooks = (books) => {
  fs.writeFileSync(booksPath, JSON.stringify(books));
};

const saveAuthors = (authors) => {
  fs.writeFileSync(authorPath, JSON.stringify(authors));
};

module.exports = {
  objBooks,
  objAuthors,
};
