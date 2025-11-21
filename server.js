const app = require("./app");
const port = 3001;

app.listen(port, () => {
  console.log(`App running in http://localhost:${port}`);
});
