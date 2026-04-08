// Routes
const routes = {
  "/": "./pages/home",
  "/cv": "./pages/cv",
};

// remove old page assets
function clearPageAssets() {
  document.querySelectorAll("[data-page-asset]").forEach((el) => el.remove());
}

// load css
function loadCSS(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  link.dataset.pageAsset = "true";
  document.head.appendChild(link);
}

let currentModule = null;

async function router() {
  const path = location.hash.slice(1) || "/";
  const file = routes[path];

  const app = document.getElementById("app");

  if (!file) {
    app.innerHTML = "<h1>404</h1>";
    return;
  }

  // 1. unmount previous page
  if (currentModule?.unmount) {
    currentModule.unmount();
  }

  // 2. clear old CSS
  clearPageAssets();

  // 3. load HTML
  const html = await fetch(file + "/page.html").then((r) => r.text());
  app.innerHTML = html;

  // 4. load CSS
  loadCSS(file + "/page.css");

  // 5. load JS module
  currentModule = await import(file + "/page.js");

  // 6. mount new page
  if (currentModule?.mount) {
    currentModule.mount();
  }
}

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
