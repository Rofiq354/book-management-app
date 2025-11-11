const { loadBooks, loadAuthors, loadData, objBooks, saveBooks } = require("../utils");
const Seo = require("../utils/dataSeo");

exports.index = (req, res) => {
  try {
    const seo = Seo(req);
    // const books = loadBooks();
    const authors = loadAuthors();
    const datas = loadData();

    res.render("books/index", { title: seo.documentTitle, datas, authors });
  } catch (error) {
    console.error(error.message);
  }
};

exports.addBook = (req, res) => {
  try {
    const books = loadBooks();
    books.push(objBooks(req.body));

    saveBooks(books);

    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};

// exports.updatedBook = (req, res) => {
//   console.log(req.body);
// }
