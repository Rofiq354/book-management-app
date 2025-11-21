const e = require("express");
const router = e.Router();

const authorController = require("../controllers/authorController");

// Route Author
router.get("/", authorController.index);
router.post("/add", authorController.addData);
router.get("/edit-:id", authorController.editData);
router.post("/updated-:id", authorController.updatedData);
router.post("/updateNameAuthor-:id", authorController.updateNameAuthor);
router.post("/delete-:id", authorController.deleteData);

module.exports = router;
