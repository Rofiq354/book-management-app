const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: String,
    authors: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "authors",
    },
    stock: Number,
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("books", bookSchema);

module.exports = Book;
