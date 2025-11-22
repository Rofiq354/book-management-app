const e = require("express");
const app = e();
require("./utils/db");

app.use(e.json());

app.set("view engine", "ejs");
app.use(e.static("public"));
app.use(e.urlencoded({ extended: true }));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

const indexRouter = require("./routes/homeRoutes.js");
const bookRouter = require("./routes/bookRoutes.js");
const authorRouter = require("./routes/authorRoutes.js");
const errorHandler = require("./middlewares/errorHandler.js");

app.use("/", indexRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

app.use((req, res, next) => {
  const err = new Error("Page not found!");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

module.exports = app;
