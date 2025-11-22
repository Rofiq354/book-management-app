const fs = require("fs");
const path = require("path");

// Folder routes
const routesDir = path.join(__dirname, "../routes");

// Loader router
function loadRouter(file) {
  return require(path.join(routesDir, file));
}

// Format output
function formatRow(method, uri, name) {
  return `| ${method.padEnd(7)} | ${uri.padEnd(42)} | ${name.padEnd(25)} |`;
}

function printRoutes(router, prefix, groupName) {
  const border =
    "+---------+--------------------------------------------+---------------------------+";

  console.log(`\n### ${groupName.toUpperCase()} ROUTES`);
  console.log(border);
  console.log(
    "| METHOD  | URI                                        | NAME                      |"
  );
  console.log(border);

  router.stack.forEach((layer) => {
    if (!layer.route) return;

    const route = layer.route;

    const methods = Object.keys(route.methods)
      .map((m) => m.toUpperCase())
      .join(", ");

    const uri = prefix + route.path;

    const name = route.name || "-";

    console.log(formatRow(methods, uri, name));
  });

  console.log(border);
}

// Detect prefix secara otomatis dari nama file
function getPrefix(file) {
  // homeRoutes.js → home
  // bookRoutes.js → book → /books
  // authorRoutes.js → author → /authors

  const base = file.replace(".js", "").replace("Routes", "").toLowerCase();

  if (base === "home") return "/";

  return `/${base}s`;
}

// Main executor
function main() {
  const files = fs
    .readdirSync(routesDir)
    .filter((f) => f.endsWith("Routes.js"));

  console.log("\n====================");
  console.log("   ROUTE LIST");
  console.log("====================");

  files.forEach((file) => {
    const router = loadRouter(file);
    const prefix = getPrefix(file);

    const groupName = file.replace(".js", "");

    printRoutes(router, prefix, groupName);
  });
}

main();
