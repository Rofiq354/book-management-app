const {
  getDataAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
} = require("../services/authorService");
const { Seo } = require("../utils/dataSeo");

exports.index = async (req, res, next) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| ${page}`);

    const authors = await getDataAuthors(req.query);

    res.render("authors/index", {
      data: "hello world!",
      title: seo.documentTitle,
      page,
      authors,
      author: "",
    });
  } catch (error) {
    next(error);
  }
};

exports.addData = async (req, res, next) => {
  try {
    await createAuthor(req.body);

    res.redirect("/authors");
  } catch (error) {
    next(error);
  }
};

exports.editData = async (req, res, next) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| Edit ${page}`);
    const authorId = req.params.id;
    const authors = await getDataAuthors(req.query);

    const author = await getAuthorById(authorId);

    res.render("authors/index", {
      data: "hello world!",
      title: seo.documentTitle,
      page,
      authors,
      author,
    });
  } catch (error) {
    next(error);
  }
};

exports.updatedData = async (req, res, next) => {
  try {
    await updateAuthor(req.params.id, req.body);

    res.redirect("/authors");
  } catch (err) {
    next(err);
  }
};

exports.updateNameAuthor = async (req, res, next) => {
  try {
    await updateAuthor(req.body.id, { name: req.body.authorName });

    res.redirect("/authors");
  } catch (error) {
    next(error);
  }
};

exports.deleteData = async (req, res, next) => {
  try {
    await deleteAuthor(req.params.id);

    res.redirect("/authors");
  } catch (error) {
    next(error);
  }
};
