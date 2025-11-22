require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/homeRoutes.js");
const bookRouter = require("./routes/bookRoutes.js");
const authorRouter = require("./routes/authorRoutes.js");
const errorHandler = require("./middlewares/errorHandler.js");

const app = express();

// Middleware
app.use(cors({ origin: "*" }));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressLayouts);
app.set("layout", "./layouts/main");

// Connect DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/", indexRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

// 404 Handler
app.use((req, res, next) => {
  const err = new Error("Page not found!");
  err.status = 404;
  next(err);
});

// Global Error Handler
app.use(errorHandler);

module.exports = app;
