const { getAllAuthors } = require("../services/authorService");
const {
  getDataBooks,
  getBookById,
  updateBook,
  deleteBook,
  createBook,
} = require("../services/bookService");
const { Seo } = require("../utils/dataSeo");

exports.index = async (req, res, next) => {
  try {
    const page = "Books";
    const seo = Seo(req, `| ${page}`);

    const authors = await getAllAuthors();
    const result = await getDataBooks(req.query);

    res.render("books/index", {
      title: seo.documentTitle,
      datas: result,
      filterAuthor: req.query.author,
      authors,
      book: "",
      page,
    });
  } catch (error) {
    next(error);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    await createBook(req.body);

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

exports.editBook = async (req, res, next) => {
  try {
    const seo = Seo(req, "| Edit Book");

    const book = await getBookById(req.params.id);
    const authors = await getAllAuthors();
    const result = await getDataBooks(req.query);

    res.render("books/index", {
      title: seo.documentTitle,
      datas: result,
      filterAuthor: req.query.author,
      authors,
      book,
      page: "Books",
    });
  } catch (error) {
    next(error);
  }
};

exports.updatedBook = async (req, res, next) => {
  try {
    await updateBook(req.body.id, {
      title: req.body.title,
      stock: Number(req.body.stock),
      authors: req.body.authors,
    });

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

exports.updateTitleBook = async (req, res, next) => {
  try {
    await updateBook(req.body.id, {
      title: req.body.title,
    });

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

exports.updateStockBook = async (req, res, next) => {
  try {
    await updateBook(req.body.id, {
      stock: Number(req.body.stock),
    });

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};

exports.deleteBook = async (req, res, next) => {
  try {
    await deleteBook(req.params.id);

    res.redirect("/books");
  } catch (error) {
    next(error);
  }
};
