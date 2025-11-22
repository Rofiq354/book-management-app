const e = require("express");
const router = e.Router();

const bookController = require("../controllers/bookController");

// Route Books
router.get("/", bookController.index);
router.post("/add", bookController.addBook);
router.get("/edit-:id", bookController.editBook);
router.post("/updated-:id", bookController.updatedBook);
router.post("/updateTitleBook-:id", bookController.updateTitleBook);
router.post("/updateStockBook-:id", bookController.updateStockBook);
router.post("/delete-:id", bookController.deleteBook);

module.exports = router;
