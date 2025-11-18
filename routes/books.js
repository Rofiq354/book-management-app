const e = require("express");
const router = e.Router();

const booksController = require("../controllers/booksController");
const homeController = require("../controllers/homeController");
const authorController = require("../controllers/authorsController");

// Route Homepage
router.get("/", homeController.index);

// Route Books
router.get("/books", booksController.index);
router.post("/books/add", booksController.addBook);
router.get("/books/edit-:id", booksController.editBook);
router.post("/books/updated-:id", booksController.updatedBook);
router.post("/books/updateTitleBook-:id", booksController.updateTitleBook);
router.post("/books/updateStockBook-:id", booksController.updateStockBook);
router.post("/books/delete-:id", booksController.deleteBook);

// Route Author
router.get("/authors", authorController.index);
router.post("/authors/add", authorController.addData);
router.get("/authors/edit-:id", authorController.editData);
router.post("/authors/updated-:id", authorController.updatedData);
router.post("/authors/updateNameAuthor-:id", authorController.updateNameAuthor);
router.post("/authors/delete-:id", authorController.deleteData);

module.exports = router;
