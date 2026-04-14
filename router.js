// Folder paths
const pages_path = "./pages";
const home = "/home";

// Start variables
const page_container = document.getElementById("page");
let current_module = null;

// Link CSS
function link_css(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  link.dataset.page_asset = "true";
  document.head.appendChild(link);
}

// Router logic
async function load_route() {
  // Remove previous CSS
  document.querySelectorAll("[data-page_asset]").forEach((elm) => elm.remove());

  // Get current URL route
  let route = location.hash.slice(1) || "/";
  if (route == "/") {
    route = home;
  }

  // Get page directory and HTML file
  const directory = pages_path + route + "/";
  const html_file = directory + "page.html";

  // Load HTML
  const html = await fetch(html_file).then((response) => response.text());
  page_container.innerHTML = html;

  // Apply title
  const title_meta = page_container.querySelector('meta[name="page-title"]');
  if (title_meta?.content) {
    document.title = title_meta.content;
  }

  // Apply CSS
  const css_meta = page_container.querySelector('meta[name="page-css"]');
  const css_file = css_meta?.content?.trim();
  if (css_file) {
    link_css(directory + css_file);
  }

  //Apply JS
  const js_meta = page_container.querySelector('meta[name="page-js"]');
  const js_file = js_meta?.content?.trim();
  if (js_file) {
    current_module = await import(directory + js_file);
    if (current_module?.run) {
      current_module.run();
    }
  }
}

// Load route
window.addEventListener("hashchange", load_route);
window.addEventListener("load", load_route);
