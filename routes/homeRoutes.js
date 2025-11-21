const e = require("express");
const router = e.Router();

const homeController = require("../controllers/homeController");

// Route Homepage
router.get("/", homeController.index);

module.exports = router;
