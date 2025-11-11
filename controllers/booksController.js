const { loadBooks, loadAuthors } = require("../utils");
const Seo = require("../utils/dataSeo");

exports.index = (req, res) => {
  try {
    const seo = Seo(req);
    const books = loadBooks();
    const authors = loadAuthors();

    res.render("books/index", { title: seo.documentTitle, books, authors });
  } catch (error) {
    console.error(error.message);
  }
};
