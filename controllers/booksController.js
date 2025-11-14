const {
  loadBooks,
  loadAuthors,
  loadData,
  objBooks,
  saveBooks,
  findBook,
  updateBookData,
} = require("../utils");
const Seo = require("../utils/dataSeo");

exports.index = (req, res) => {
  try {
    const seo = Seo(req);
    // const books = loadBooks();
    const authors = loadAuthors();
    const datas = loadData();

    const qAuthor = req.query.author;
    const qStock = req.query.stock;

    let result = datas;

    if (!qAuthor) {
      result;
    } else {
      result = datas.filter((b) => b.authorName === qAuthor);
    }

    if (qStock === "up") {
      result = result.sort((a, b) => b.stock - a.stock);
    } else if (qStock === "down") {
      result = result.sort((a, b) => a.stock - b.stock);
    }

    res.render("books/index", {
      title: seo.documentTitle,
      datas: result,
      filterAuthor: qAuthor,
      authors,
      book: "",
      page: "books",
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

    const qAuthor = req.query.author;
    const qStock = req.query.stock;

    let result = datas;

    if (!qAuthor) {
      result;
    } else {
      result = datas.filter((b) => b.authorName === qAuthor);
    }

    if (qStock === "up") {
      result = result.sort((a, b) => b.stock - a.stock);
    } else if (qStock === "down") {
      result = result.sort((a, b) => a.stock - b.stock);
    }

    const book = books.find((b) => b.id == req.params.id);

    res.render("books/index", {
      title: seo.documentTitle,
      datas: result,
      filterAuthor: qAuthor,
      authors,
      book,
      page: "books",
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.updatedBook = (req, res) => {
  try {
    const { books, book, bookIndex } = findBook(req.params.id);

    if (bookIndex === -1) throw new Error("Buku tidak ditemukan");

    const newBook = updateBookData(book, {
      title: req.body.title,
      stock: Number(req.body.stock),
      authorId: Number(req.body.authorId),
    });

    books[bookIndex] = newBook;

    saveBooks(books);

    res.redirect("/books");
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTitleBook = (req, res) => {
  try {
    const { books, book } = findBook(req.body.id);
    const { title } = req.body;

    book.title = title;

    saveBooks(books);
    res.json({ message: "Book title updated!" });
    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};

exports.updateStockBook = (req, res) => {
  try {
    const { books, book } = findBook(req.body.id);
    const { stock } = req.body;

    book.stock = stock;

    saveBooks(books);
    res.json({ message: "Book Stock updated!" });
    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteBook = (req, res) => {
  try {
    const { books, bookIndex } = findBook(req.params.id);
    if (bookIndex === -1) throw new Error("Buku tidak ditemukan");

    books.splice(bookIndex, 1);

    saveBooks(books);

    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};
