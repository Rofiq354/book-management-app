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

module.exports = { loadBooks, loadAuthors };
