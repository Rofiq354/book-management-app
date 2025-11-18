const Author = require("../models/authors");
const Book = require("../models/books");
const { objBooks } = require("../utils");
const { Seo } = require("../utils/dataSeo");

exports.index = async (req, res) => {
  try {
    const page = "Books";
    const seo = Seo(req, `| ${page}`);

    const authors = await Author.find();
    const datas = await Book.find().populate("authors");

    const qAuthor = req.query.author;
    const qStock = req.query.stock;

    let result = datas;

    if (!qAuthor) {
      result;
    } else {
      result = datas.filter((b) => b.authors.name === qAuthor);
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
      page,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.addBook = async (req, res) => {
  try {
    await Book.create(objBooks(req.body));

    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};

exports.editBook = async (req, res) => {
  try {
    const seo = Seo(req, "| Edit Book");
    const book = await Book.findOne({ _id: req.params.id });

    const authors = await Author.find();
    const datas = await Book.find().populate("authors");

    const qAuthor = req.query.author;
    const qStock = req.query.stock;

    let result = datas;

    if (!qAuthor) {
      result;
    } else {
      result = datas.filter((b) => b.authors.name === qAuthor);
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
      book,
      page: "Books",
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.updatedBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(
      req.body.id,
      {
        title: req.body.title,
        stock: Number(req.body.stock),
        authors: req.body.authors,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.redirect("/books");
  } catch (error) {
    console.log(error.message);
  }
};

exports.updateTitleBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.body.id, {
      title: req.body.title,
    });

    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};

exports.updateStockBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.body.id, {
      stock: req.body.stock,
    });

    res.json({ message: "Book Stock updated!" });
    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.redirect("/books");
  } catch (error) {
    console.error(error.message);
  }
};
