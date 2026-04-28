const elm_nav = document.querySelector("#nav");
const list_link = elm_nav.querySelectorAll("a");

list_link.forEach((link) => {
  link.addEventListener("click", () => {
    list_link.forEach((link_all) => link_all.classList.remove("active"));
    link.classList.add("active");
  });
});
