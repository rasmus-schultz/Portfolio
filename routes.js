const routes = {
  "/": "./pages/home",
  "/cv": "./pages/cv",
  "/about": "./pages/about",
};

function clear_page() {
  document.querySelectorAll("[data-page-asset]").forEach((elm) => elm.remove());
}

function loadCSS(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  link.dataset.pageAsset = "true";
  document.head.appendChild(link);
}

let current_module = null;

async function router() {
  const path = location.hash.slice(1) || "/";
  const file = routes[path];

  const app = document.getElementById("app");

  if (!file) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  clear_page();

  const html = await fetch(file + "/page.html").then((r) => r.text());
  app.innerHTML = html;

  loadCSS(file + "/page.css");

  current_module = await import(file + "/page.js");

  if (current_module?.title) {
    document.title = current_module.title;
  }

  if (current_module?.run) {
    current_module.run();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
