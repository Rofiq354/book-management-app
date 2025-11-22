const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);
const Author = mongoose.model("authors", authorSchema);

module.exports = Author;
