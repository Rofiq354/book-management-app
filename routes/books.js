const e = require("express");
const router = e.Router();

const booksController = require("../controllers/booksController");

router.get("/books", booksController.index);
router.post("/books/add", booksController.addBook);
// router.post("/updated", booksController.updatedBook);

module.exports = router;
