const modal = document.getElementById("openDeleteModal");

const openDeleteModal = (id, title) => {
  modal.classList.remove("hidden");
  const bookTitleName = document.getElementById("bookTitle");
  bookTitleName.textContent = title;

  const formEl = document.querySelector("#openDeleteModal form");
  formEl.action = `/books/delete-${id}`;
};

const closeDeleteModal = () => {
  modal.classList.add("hidden");
};
