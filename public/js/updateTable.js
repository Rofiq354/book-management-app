// Books Content
const tdBookTitle = document.querySelectorAll("#booksTable .tableTdTitle");
const tdBookStock = document.querySelectorAll("#booksTable .tableTdStock");
// const tdBookAuthorName = document.querySelectorAll(
//   "#booksTable .tableTdAuthorName"
// );

// Author Contnt
const tdAuthorName = document.querySelectorAll("#authorsTable .tableTdName");

function toggleDetail(id) {
  const box = document.getElementById("detail-" + id);
  const arrow = document.getElementById("arrow-" + id);

  if (box.style.maxHeight === "0px" || box.style.maxHeight === "") {
    box.style.maxHeight = "500px"; // expand
    arrow.textContent = "▲";
  } else {
    box.style.maxHeight = "0px"; // collapse
    arrow.textContent = "▼";
  }
}

const dblClicked = (tdElement, tdElementName, type, urlPath) => {
  tdElement.forEach((td) => {
    td.addEventListener("dblclick", function (e) {
      e.preventDefault();
      const tr = td.parentElement;

      const originalValue = td.textContent.trim();

      const inpEl = document.createElement("input");
      inpEl.type = "text";
      inpEl.value = originalValue;
      inpEl.name = tdElementName;
      inpEl.className = "border-none rounded text-center py-0.5";

      // width sesuai panjang teks
      const length = inpEl.value.length || 1;
      inpEl.style.width = `${length + 1}ch`;

      td.replaceChildren(inpEl);

      inpEl.focus();
      inpEl.setSelectionRange(length, length);

      inpEl.addEventListener("input", () => {
        inpEl.style.width = `${inpEl.value.length + 1}ch`;
      });

      // ============================
      //  CLICK OUTSIDE HANDLER
      // ============================
      function handleClickOutside(e) {
        if (e.target === inpEl) return;
        // td.textContent = inpEl.value.trim();
        submitValue(urlPath);
        document.removeEventListener("click", handleClickOutside);
      }

      // Tunggu sedikit supaya klik double tidak langsung men-trigger outside
      setTimeout(() => {
        document.addEventListener("click", handleClickOutside);
      }, 10);

      // =====================================================
      // 2) ENTER KEY → SAVE
      // =====================================================
      inpEl.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          //   console.log(inpEl.value);
          submitValue(urlPath);
          document.removeEventListener("click", handleClickOutside);
        }
      });

      function submitValue(urlPath) {
        const newValue = inpEl.value.trim();
        const id = tr.dataset.id;

        td.textContent = newValue;

        let data = "";

        if (urlPath === "updateTitleBook") {
          data = { id, title: newValue };
        }

        if (urlPath === "updateStockBook") {
          data = { id, stock: newValue };
        }

        if (urlPath === "updateNameAuthor") {
          data = { id, name: newValue };
        }

        fetch(`/${type}/${urlPath}-${id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    });
  });
};

if (tdBookTitle) dblClicked(tdBookTitle, "title", "books", "updateTitleBook");
if (tdBookStock) dblClicked(tdBookStock, "stock", "books", "updateStockBook");
// if (tdAuthorName) dblClicked(tdAuthorName, "updateAuthorBook");

if (tdAuthorName)
  dblClicked(tdAuthorName, "authorName", "authors", "updateNameAuthor");
