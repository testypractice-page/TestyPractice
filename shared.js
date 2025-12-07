
document.addEventListener("DOMContentLoaded", () => {
  if (typeof currentPage !== "string") return;

  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add("active");
    }
  });
});
