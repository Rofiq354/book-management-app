document.getElementById("bookTotalUp").addEventListener("click", function (e) {
  e.preventDefault();
  const params = new URLSearchParams(window.location.search);
  params.delete("date");

  params.set("bookTotal", "up");
  window.location.search = params.toString();
});
document
  .getElementById("bookTotalDown")
  .addEventListener("click", function (e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);
    params.delete("date");

    params.set("bookTotal", "down");
    window.location.search = params.toString();
  });

document
  .getElementById("filterByDate")
  .addEventListener("change", function (e) {
    e.preventDefault();
    const params = new URLSearchParams(window.location.search);

    if (this.value === "oldest") {
      params.delete("bookTotal");
      params.set("date", "oldest");
    } else if (this.value === "newest") {
      params.delete("bookTotal");
      params.set("date", "newest");
    }
    window.location.search = params.toString();
  });

document.getElementById("reloadFilter").addEventListener("click", function () {
  window.location = "/authors";
});

const filterBookTotal = document.getElementById("filterBookTotal");
if (filterBookTotal) {
  filterBookTotal.addEventListener("change", function (e) {
    e.preventDefault();
    const data = this.value;
    const params = new URLSearchParams(window.location.search);

    if (data === "highest") {
      params.set("bookTotal", "up");
    } else if (data === "lowest") {
      params.set("bookTotal", "down");
    }
    window.location.search = params.toString();
  });
}
