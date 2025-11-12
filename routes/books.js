const e = require("express");
const router = e.Router();

const booksController = require("../controllers/booksController");

router.get("/books", booksController.index);
router.post("/books/add", booksController.addBook);
router.get("/books/edit-:id", booksController.editBook);
router.post("/books/updated-:id", booksController.updatedBook);
router.post("/books/delete-:id", booksController.deleteBook);

module.exports = router;
