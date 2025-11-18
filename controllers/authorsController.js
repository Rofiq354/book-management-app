const Author = require("../models/authors");
const Book = require("../models/books");
const { objAuthors } = require("../utils");
const { Seo } = require("../utils/dataSeo");

exports.index = async (req, res) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| ${page}`);

    const authors = await Author.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "authors",
          as: "books",
        },
      },
      {
        $addFields: {
          totalBooks: { $size: "$books" },
        },
      },
      {
        $project: {
          books: 0, // hapus array buku agar tidak berat
        },
      },
    ]);

    let qBookTotal = req.query.bookTotal;
    let qDate = req.query.date;
    let result = authors;

    if (qBookTotal === "down") {
      result = result.sort((a, b) => a.totalBooks - b.totalBooks);
    } else if (qBookTotal === "up") {
      result = result.sort((a, b) => b.totalBooks - a.totalBooks);
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

exports.addData = async (req, res) => {
  try {
    await Author.create(objAuthors(req.body));

    res.redirect("/authors");
  } catch (error) {
    console.error(error.message);
  }
};

exports.editData = async (req, res) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| Edit ${page}`);
    const authorId = req.params.id;
    let qBookTotal = req.query.bookTotal;
    let qDate = req.query.date;

    const authors = await Author.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "authors",
          as: "books",
        },
      },
      {
        $addFields: {
          totalBooks: { $size: "$books" },
        },
      },
      {
        $project: {
          books: 0, // hapus array buku agar tidak berat
        },
      },
    ]);
    const author = await Author.findOne({ _id: authorId });

    let result = authors;

    if (qBookTotal === "down") {
      result = result.sort((a, b) => a.totalBooks - b.totalBooks);
    } else if (qBookTotal === "up") {
      result = result.sort((a, b) => b.totalBooks - a.totalBooks);
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
      author,
    });
  } catch (error) {
    console.error(error.message);
  }
};

exports.updatedData = async (req, res) => {
  try {
    await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.redirect("/authors");
  } catch (err) {
    console.error(err.message);
  }
};

exports.updateNameAuthor = async (req, res) => {
  try {
    await Author.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.authorName,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.redirect("/authors");
  } catch (error) {
    console.error(error.message);
  }
};

exports.deleteData = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id);
    await Book.findOneAndDelete({ authors: author });
    await Author.findByIdAndDelete(author);

    res.redirect("/authors");
  } catch (error) {
    console.error(error.message);
  }
};
