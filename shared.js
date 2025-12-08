
document.addEventListener("DOMContentLoaded", () => {
  if (typeof currentPage !== "string") return;

  document.querySelectorAll(".nav-item").forEach(item => {
    if (item.dataset.page === currentPage) {
      item.classList.add("active");
    }
  });
});


// LEFT SIDEBAR ACTIVE HIGHLIGHT
// CSS me .left-list li.left-active already styled hai

  // LEFT SIDEBAR ACTIVE LINK HIGHLIGHT
  (function () {
    // current file name, e.g. "index.html" / "wrongs.html"
    var currentFile = location.pathname.split("/").pop().toLowerCase();
    if (!currentFile) currentFile = "index.html";

    // saare left sidebar links loop karo
    var links = document.querySelectorAll(".left-sidebar .left-list a.left-link");
    links.forEach(function (a) {
      var href = (a.getAttribute("href") || "").split("/").pop().toLowerCase();
      if (!href || href === "#") return;

      if (href === currentFile) {
        var li = a.closest("li");
        if (li) li.classList.add("active");
      }
    });
  })();