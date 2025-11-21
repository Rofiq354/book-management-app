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

// const indexRouter = require("./routes/homeRoutes.js");
const bookRouter = require("./routes/bookRoutes.js");
const authorRouter = require("./routes/authorRoutes.js");

// app.use("/", indexRouter);
app.use("/books", bookRouter);
app.use("/authors", authorRouter);

// function listRouterRoutes(prefix, router) {
//   router.stack.forEach((layer) => {
//     if (layer.route) {
//       const route = layer.route;
//       const methods = Object.keys(route.methods)
//         .map((m) => m.toUpperCase())
//         .join(", ");

//       console.log(`${methods} ${prefix}${route.path}`);
//     }
//   });
// }

// listRouterRoutes("/authors", authorRouter);

module.exports = app;
