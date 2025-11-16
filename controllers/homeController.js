const { loadBooks, loadAuthors } = require("../utils");
const { Seo } = require("../utils/dataSeo");

exports.index = (req, res) => {
  try {
    const page = "";
    const seo = Seo(req, page);
    const books = loadBooks();
    let authors = loadAuthors();

    const topBook = books.length
      ? books.reduce((a, b) => (a.stock > b.stock ? a : b))
      : null;

    authors = authors.map((a) => {
      return { ...a, bookCount: books.filter((b) => b.authorId === a.id) };
    });

    authors.sort((a, b) => b.id - a.id);

    console.log(authors);

    res.render("index", {
      data: "Halo",
      title: seo.documentTitle,
      page,
      books,
      authors,
      topBook,
    });
  } catch (error) {
    console.error(error.message);
  }
};
