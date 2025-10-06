<script>
/*
  Minimal HTML include loader
  Usage: <div data-include="components/header.html"></div>
         <div data-include="components/head.html" data-title="WEB115 — Home"></div>
*/
(async function () {
  const nodes = document.querySelectorAll("[data-include]");
  for (const el of nodes) {
    const url = el.getAttribute("data-include");
    try {
      const res = await fetch(url, { cache: "no-store" });
      let html = await res.text();

      // simple {{title}} replacement if provided
      const title = el.dataset.title || "";
      html = html.replaceAll("{{title}}", title);

      // inject and mark current page in nav if possible
      el.outerHTML = html;

    } catch (e) {
      el.innerHTML = `<!-- include failed: ${url} -->`;
      console.error("Include error:", url, e);
    }
  }

  // After includes are in, set aria-current on nav link that matches the page
  const path = location.pathname.split("/").pop() || "index.html";
  document
    .querySelectorAll('nav[aria-label="Main"] a')
    .forEach(a => {
      if (a.getAttribute("href") === path) a.setAttribute("aria-current", "page");
    });
})();
</script>
