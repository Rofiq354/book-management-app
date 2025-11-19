const Author = require("../models/authors");
const Book = require("../models/books");
const { objAuthors } = require("../utils");
const { Seo } = require("../utils/dataSeo");

exports.index = async (req, res) => {
  try {
    const page = "Authors";
    const seo = Seo(req, `| ${page}`);
    let qBookTotal = req.query.bookTotal;
    let qDate = req.query.date;

    let bookTotalQuery = null;
    let dateQuery = null;

    if (qBookTotal === "down") bookTotalQuery = { totalBooks: 1 };
    if (qBookTotal === "up") bookTotalQuery = { totalBooks: -1 };

    if (qDate === "oldest") dateQuery = { createdAt: 1 };
    if (qDate === "newest") dateQuery = { createdAt: -1 };

    // FILTERING BY DATE RANGE
    // if (req.query.start && req.query.end) {
    //   dateQuery.createdAt = {
    //     $gte: new Date(req.query.start),
    //     $lte: new Date(req.query.end),
    //   };
    // } else if (req.query.start) {
    //   dateQuery.createdAt = { $gte: new Date(req.query.start) };
    // } else if (req.query.end) {
    //   dateQuery.createdAt = { $lte: new Date(req.query.end) };
    // }

    // FILTER DATE RANGE (opsional)
    // if (Object.keys(dateQuery).length > 0) {
    //   pipeline.push({ $match: dateQuery });
    // }

    const pipeline = [
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
    ];

    if (bookTotalQuery) pipeline.push({ $sort: bookTotalQuery });

    if (dateQuery) pipeline.push({ $sort: dateQuery });

    const authors = await Author.aggregate(pipeline);

    const result = authors;

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

    let bookTotalQuery = null;
    let dateQuery = null;

    if (qBookTotal === "down") bookTotalQuery = { totalBooks: 1 };
    if (qBookTotal === "up") bookTotalQuery = { totalBooks: -1 };

    if (qDate === "oldest") dateQuery = { createdAt: 1 };
    if (qDate === "newest") dateQuery = { createdAt: -1 };

    // FILTERING BY DATE RANGE
    // if (req.query.start && req.query.end) {
    //   dateQuery.createdAt = {
    //     $gte: new Date(req.query.start),
    //     $lte: new Date(req.query.end),
    //   };
    // } else if (req.query.start) {
    //   dateQuery.createdAt = { $gte: new Date(req.query.start) };
    // } else if (req.query.end) {
    //   dateQuery.createdAt = { $lte: new Date(req.query.end) };
    // }

    // FILTER DATE RANGE (opsional)
    // if (Object.keys(dateQuery).length > 0) {
    //   pipeline.push({ $match: dateQuery });
    // }

    const pipeline = [
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
    ];

    if (bookTotalQuery) pipeline.push({ $sort: bookTotalQuery });

    if (dateQuery) pipeline.push({ $sort: dateQuery });

    const authors = await Author.aggregate(pipeline);

    const result = authors;

    const author = await Author.findOne({ _id: authorId });

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
