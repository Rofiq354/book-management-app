const e = require("express");
const app = e();
const port = 3001;

app.use(e.json());

app.set("view engine", "ejs");
app.use(e.static("public"));
app.use(e.urlencoded({ extended: true }));

const expressLayouts = require("express-ejs-layouts");
app.use(expressLayouts);
app.set("layout", "./layouts/main");

const indexRouter = require("./routes/books");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`App running in http://localhost:${port}`);
});
