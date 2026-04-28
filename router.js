const pages_path = "./pages";
const home = "/home";

const pageContainer = document.getElementById("page");

function linkCss(path) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = path;
  link.dataset.page_asset = "true";
  document.head.appendChild(link);
}

let js_cleanups = [];

function track(fn) {
  js_cleanups.push(fn);
}

function CleanJs() {
  js_cleanups.forEach((fn) => {
    try {
      fn();
    } catch (e) {
      console.error(e);
    }
  });
  js_cleanups = [];
}

function parseFiles(content) {
  return (
    content
      ?.split(",")
      .map((f) => f.trim())
      .filter(Boolean) || []
  );
}

function addEvent(target, type, handler, options) {
  target.addEventListener(type, handler, options);

  track(() => {
    target.removeEventListener(type, handler, options);
  });
}

function setTrackedInterval(fn, ms) {
  const id = setInterval(fn, ms);

  track(() => clearInterval(id));

  return id;
}

function setTrackedTimeout(fn, ms) {
  const id = setTimeout(fn, ms);

  track(() => clearTimeout(id));

  return id;
}

function trackObserver(observer) {
  track(() => observer.disconnect());
  return observer;
}

window.Js = {
  addEvent,
  setTrackedInterval,
  setTrackedTimeout,
  trackObserver,
  track,
};

async function load_route() {
  CleanJs();

  document.querySelectorAll("[data-page_asset]").forEach((elm) => elm.remove());

  let route = location.hash.slice(1) || "/";
  if (route == "/") {
    route = home;
  }

  const directory = pages_path + route + "/";
  const html_file = directory + "page.html";

  const html = await fetch(html_file).then((response) => response.text());
  pageContainer.innerHTML = html;

  const title_meta = pageContainer.querySelector('meta[name="title"]');
  if (title_meta?.content) {
    document.title = title_meta.content;
  }

  const css_meta = pageContainer.querySelector('meta[name="css"]');
  const css_files = parseFiles(css_meta?.content);

  css_files.forEach((file) => {
    linkCss(directory + file);
  });

  const js_meta = pageContainer.querySelector('meta[name="js"]');
  const js_files = parseFiles(js_meta?.content);

  for (const file of js_files) {
    const module = await import(directory + file);
    module?.run?.();
  }
}

window.addEventListener("hashchange", load_route);
window.addEventListener("load", load_route);
