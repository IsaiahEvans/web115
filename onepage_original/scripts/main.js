// mobile menu toggle
const btn = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
if (btn && nav) {
  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(open));
  });
}

// highlight active link as you scroll
const links = Array.from(document.querySelectorAll('.site-nav a'));
const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);

const obs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: 0.01 });

sections.forEach(s => obs.observe(s));
