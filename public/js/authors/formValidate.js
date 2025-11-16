function validateForm() {
  let titleInput = document.getElementById("title");
  let stockInput = document.getElementById("stock");
  let authorIdSelect = document.getElementById("authorId");

  let titleValue = titleInput.value.trim();
  let stockValue = stockInput.value;
  let authorIdValue = authorIdSelect.value;

  let titleError = document.getElementById("titleError");
  let stockError = document.getElementById("stockError");
  let authorIdError = document.getElementById("authorIdError");

  let titlePattern = /^[a-zA-Z0-9\s]+$/;
  let isValid = true; // Flag untuk melacak validitas keseluruhan

  titleError.textContent = "";
  stockError.textContent = "";
  authorIdError.textContent = "";

  // --- Lakukan Pengecekan ---

  if (titleValue === "" || titleValue === null) {
    titleError.textContent = "Judul buku tidak boleh kosong.";
    isValid = false;
  } else if (!titlePattern.test(titleValue)) {
    titleError.textContent =
      "Judul buku hanya boleh berisi huruf, angka dan spasi.";
    isValid = false;
  }

  if (
    stockValue === "" ||
    stockValue === null ||
    isNaN(stockValue) ||
    parseInt(stockValue) <= 0
  ) {
    stockError.textContent =
      "Stock harus berupa angka positif dan tidak boleh kosong.";
    isValid = false;
  }

  if (authorIdValue === "" || authorIdValue === null) {
    authorIdError.textContent = "Pilih penulis.";
    isValid = false;
  }

  if (isValid) {
    return true; // Mengizinkan form terkirim
  } else {
    if (titleError.textContent !== "") titleInput.focus();
    else if (stockError.textContent !== "") stockInput.focus();
    else if (authorIdError.textContent !== "") authorIdSelect.focus();

    return false; // Mencegah form terkirim
  }
}
