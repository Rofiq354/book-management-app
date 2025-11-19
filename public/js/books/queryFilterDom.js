document.getElementById("filterAuthor").addEventListener("change", function () {
  const optEl = this.options[this.selectedIndex];
  const data = optEl.textContent.trim();

  const params = new URLSearchParams(window.location.search);

  if (this.value === "all") {
    params.delete("author");
  } else {
    params.set("author", data);
  }
  window.location.search = params.toString();
});

document.getElementById("stockUp").addEventListener("click", function (e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);

  params.set("stock", "up");
  window.location.search = params.toString();
});
document.getElementById("stockDown").addEventListener("click", function (e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);

  params.set("stock", "down");
  window.location.search = params.toString();
});

document.getElementById("reloadFilter").addEventListener("click", function () {
  window.location = "/books";
});

const filterStock = document.getElementById("filterStock");
if (filterStock) {
  filterStock.addEventListener("change", function (e) {
    e.preventDefault();
    const data = this.value;
    const params = new URLSearchParams(window.location.search);

    if (data === "highest") {
      params.set("stock", "up");
    } else if (data === "lowest") {
      params.set("stock", "down");
    }
    window.location.search = params.toString();
  });
}
