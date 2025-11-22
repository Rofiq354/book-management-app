const objBooks = ({ title, stock, authors }) => {
  return {
    id: Date.now(),
    title,
    authors,
    stock: Number(stock),
    createdAt: new Date(),
  };
};

const objAuthors = ({ name }) => {
  return {
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
};

module.exports = {
  objBooks,
  objAuthors,
};
