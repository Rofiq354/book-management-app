const Author = require("../models/Author");
const Book = require("../models/Book");
const { objAuthors } = require("../utils");

exports.getAllAuthors = async () => {
  const authors = await Author.find();
  return authors;
};

exports.getDataAuthors = async (query) => {
  let qBookTotal = query.bookTotal;
  let qDate = query.date;

  let bookTotalQuery = null;
  let dateQuery = null;

  if (qBookTotal === "down") bookTotalQuery = { totalBooks: 1 };
  if (qBookTotal === "up") bookTotalQuery = { totalBooks: -1 };

  if (qDate === "oldest") dateQuery = { createdAt: 1 };
  if (qDate === "newest") dateQuery = { createdAt: -1 };

  // FILTERING BY DATE RANGE
  // if (query.start && query.end) {
  //   dateQuery.createdAt = {
  //     $gte: new Date(query.start),
  //     $lte: new Date(query.end),
  //   };
  // } else if (query.start) {
  //   dateQuery.createdAt = { $gte: new Date(query.start) };
  // } else if (query.end) {
  //   dateQuery.createdAt = { $lte: new Date(query.end) };
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

  return authors;
};

exports.createAuthor = async (data) => {
  const newAuthor = await Author.create(objAuthors(data));
  return newAuthor;
};

exports.getAuthorById = async (id) => {
  const author = await Author.findOne({ _id: id });
  if (!author) throw new Error("Author not found!");
  return author;
};

exports.updateAuthor = async (id, data) => {
  const updated = await Author.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
  if (!updated) throw new Error("Author not found!");
  return updated;
};

exports.deleteAuthor = async (id) => {
  const author = await Author.findById(id);
  const book = await Book.deleteMany({ authors: author });
  const deleted = await Author.findByIdAndDelete(author);

  if (!deleted) throw new Error("Author not found!");

  return book && deleted;
};
