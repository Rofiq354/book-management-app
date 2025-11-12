const modal = document.getElementById("openDeleteModal");

const openDeleteModal = (id, title) => {
  modal.style.display = "block";
  const bookTitleName = document.getElementById("bookTitle");
  bookTitleName.textContent = title;

  const formEl = document.querySelector("#openDeleteModal form");
  formEl.action = `/books/delete-${id}`;
};

const closeDeleteModal = () => {
  modal.style.display = "none";
};
