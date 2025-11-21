const Author = require("../models/Author");
const Book = require("../models/Book");
const { objBooks } = require("../utils");

exports.getDataBooks = async (query) => {
  let result = await Book.find().populate("authors");

  const qAuthor = query.author;
  const qStock = query.stock;

  let authorQuery = {};
  let sortQuery = {};

  if (qAuthor) {
    const author = await Author.findOne({ name: qAuthor });

    if (author) {
      authorQuery.authors = author._id;
    }
  }

  if (qStock === "up") sortQuery.stock = -1;
  if (qStock === "down") sortQuery.stock = 1;

  result = await Book.find(authorQuery).sort(sortQuery).populate("authors");

  return result;
};

exports.createBook = async (data) => {
  const newBook = await Book.create(objBooks(data));
  return newBook;
};

exports.getBookById = async (id) => {
  const book = await Book.findOne({ _id: id });
  if (!book) throw new Error("Book not found!");
  return book;
};

exports.updateBook = async (id, data) => {
  const updated = await Book.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Book not found!");
  return updated;
};

exports.deleteBook = async (id) => {
  const deleted = await Book.findByIdAndDelete(id);
  if (!deleted) throw new Error("Book not found!");
  return deleted;
};
