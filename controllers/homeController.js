const Author = require("../models/Author");
const Book = require("../models/Book");
const { Seo } = require("../utils/dataSeo");

exports.index = async (req, res, next) => {
  try {
    const page = "";
    const seo = Seo(req, page);
    const books = await Book.find();

    const topBook = await Book.findOne().sort({ stock: -1 });

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
          books: 0,
        },
      },
      {
        $sort: { totalBooks: -1 }, // 🔥 sort by most books
      },
    ]);

    const authorMap = {};
    authors.forEach((a) => {
      authorMap[a._id] = a.name;
    });

    res.render("index", {
      data: "Halo",
      title: seo.documentTitle,
      page,
      books,
      authors,
      authorMap,
      topBook,
    });
  } catch (error) {
    next(error);
  }
};
