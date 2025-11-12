const {
  loadBooks,
  loadAuthors,
  loadData,
  objBooks,
  saveBooks,
  findBook,
} = require("../utils");
const Seo = require("../utils/dataSeo");

exports.index = (req, res) => {
  try {
    const seo = Seo(req);
    // const books = loadBooks();
    const authors = loadAuthors();
    const datas = loadData();

    res.render("books/index", {
      title: seo.documentTitle,
      datas,
      authors,
      book: "",
    });
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

exports.editBook = (req, res) => {
  try {
    const seo = Seo(req, "| Edit");
    const books = loadBooks();
    const authors = loadAuthors();
    const datas = loadData();

    const book = books.find((b) => b.id == req.params.id);

    res.render("books/index", {
      title: seo.documentTitle,
      datas,
      authors,
      book,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.updatedBook = (req, res) => {
  try {
    const { books, book, bookIndex } = findBook(req.params.id);

    if (bookIndex === -1) "Daftar buku tidak ditemukan";

    book.title = req.body.title;
    book.stock = Number(req.body.stock);
    book.authorId = Number(req.body.authorId);

    saveBooks(books);

    res.redirect("/books");
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteBook = (req, res) => {
  try {
    const { books, bookIndex } = findBook(req.params.id);
    if (bookIndex === -1) "Daftar buku tidak ditemukan";

    books.splice(bookIndex, 1);

    saveBooks(books);

    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};
