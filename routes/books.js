const e = require("express");
const router = e.Router();

const booksController = require("../controllers/booksController");

router.get("/books", booksController.index);

module.exports = router;
