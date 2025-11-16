const {
  loadAuthors,
  loadBooks,
  objAuthors,
  saveAuthors,
  updateAuthorData,
  updateBookData,
  saveBooks,
} = require("../utils");
const { Seo } = require("../utils/dataSeo");

exports.index = (req, res) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| ${page}`);
    let qBookTotal = req.query.bookTotal;
    let qDate = req.query.date;

    const datas = loadAuthors();
    const books = loadBooks();

    let result = datas.map((author) => {
      const data = books.filter((book) => author.id === book.authorId);
      return {
        ...author,
        books: data,
      };
    });

    if (qBookTotal === "down") {
      result = result.sort((a, b) => a.books.length - b.books.length);
    } else if (qBookTotal === "up") {
      result = result.sort((a, b) => b.books.length - a.books.length);
    }

    if (qDate === "newest") {
      result = result.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (qDate === "oldest") {
      result = result.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    res.render("authors/index", {
      data: "hello world!",
      title: seo.documentTitle,
      page,
      authors: result,
      author: "",
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.addData = (req, res) => {
  try {
    const authors = loadAuthors();
    const author = objAuthors(req.body);

    authors.push(author);

    saveAuthors(authors);

    res.redirect("/authors");
  } catch (error) {
    console.error(error.message);
  }
};

exports.editData = (req, res) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| Edit ${page}`);
    const authorId = Number(req.params.id);
    let qBookTotal = req.query.bookTotal;
    let qDate = req.query.date;

    let authors = loadAuthors();
    const books = loadBooks();

    let result = authors.map((author) => {
      const data = books.filter((book) => author.id === book.authorId);
      return {
        ...author,
        books: data,
      };
    });

    if (qBookTotal === "down") {
      result = result.sort((a, b) => a.books.length - b.books.length);
    } else if (qBookTotal === "up") {
      result = result.sort((a, b) => b.books.length - a.books.length);
    }

    if (qDate === "newest") {
      result = result.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    } else if (qDate === "oldest") {
      result = result.sort((a, b) => {
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
    }

    const author = result.find((a) => a.id === authorId);

    res.render("authors/index", {
      data: "hello world!",
      title: seo.documentTitle,
      page,
      authors: result,
      author,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.updatedData = (req, res) => {
  try {
    const authors = loadAuthors();
    const authorId = Number(req.params.id);
    const authorIndex = authors.findIndex((a) => a.id === authorId);

    if (authorIndex < 0) "Data tidak ditemukan";

    const author = authors[authorIndex];

    const newData = updateAuthorData(author, {
      name: req.body.name,
    });

    authors[authorIndex] = newData;

    saveAuthors(authors);
    res.redirect("/authors");
  } catch (err) {
    console.error(err.message);
  }
};

exports.updateNameAuthor = (req, res) => {
  try {
    const authors = loadAuthors();
    const authorId = Number(req.params.id);
    const authorIndex = authors.findIndex((a) => a.id === authorId);

    if (authorIndex < 0) "Data tidak ditemukan";

    const author = authors[authorIndex];

    const newData = updateAuthorData(author, {
      name: req.body.name,
    });

    authors[authorIndex] = newData;

    saveAuthors(authors);
    res.json({ message: "Book Stock updated!" });
    res.redirect("/authors");
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteData = (req, res) => {
  try {
    const authors = loadAuthors();
    const authorId = Number(req.params.id);
    const authorIndex = authors.findIndex((a) => a.id === authorId);
    if (authorIndex < 0) "Data tidak ditemukan";

    // saveAuthors(authors);

    const books = loadBooks();
    const bookIndex = books.findIndex((b) => b.authorId === authorId);
    if (bookIndex < 0) "Data tidak ditemukan";

    const newDataBook = updateBookData(books[bookIndex], {
      authorId: null,
    });

    books[bookIndex] = newDataBook;

    authors.splice(authorIndex, 1);

    saveAuthors(authors);
    saveBooks(books)

    res.redirect("/authors");
  } catch (error) {
    console.error(error.message);
  }
};
