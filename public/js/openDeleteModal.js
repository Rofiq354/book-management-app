const modal = document.getElementById("openDeleteModal");

const openDeleteModal = (id, form, title) => {
  modal.classList.remove("hidden");
  const textTitleName = document.getElementById("textTitle");
  textTitleName.textContent = title;

  const formEl = document.querySelector("#openDeleteModal form");

  if (form === "books") formEl.action = `/books/delete-${id}`;
  if (form === "authors") formEl.action = `/authors/delete-${id}`;
};

const closeDeleteModal = () => {
  modal.classList.add("hidden");
};
