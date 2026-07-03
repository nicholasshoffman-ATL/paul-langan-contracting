/* =========================================================================
   Paul Langan Contracting & Painting — shared site logic
   Injects the header + footer on every page and wires up interactions.
   ========================================================================= */

const SITE = {
  name: "Paul Langan Contracting & Painting",
  phone: "843-686-4572",
  phoneHref: "tel:+18436864572",
  email: "paullangan@outlook.com",
  address: "130 Matthews Drive, Suite C, Hilton Head Island, SC 29926",
  area: "Hilton Head Island & Bluffton, SC",
  facebook: "https://www.facebook.com/paullangancontracting/",
  instagram: "https://www.instagram.com/langancontractinghhi/",
  founded: 1989,
};

const SERVICES = [
  { slug: "renovations",  title: "Renovations & Remodeling", img: "svc-renovations.webp", blurb: "Kitchens, baths, and whole-home remodels managed from first sketch to final walkthrough." },
  { slug: "additions",    title: "Additions",                img: "svc-additions.webp",   blurb: "Room and second-story additions that blend right in with your existing home." },
  { slug: "painting",     title: "Interior & Exterior Painting", img: "svc-painting.webp", blurb: "Careful prep and durable finishes built to hold up to Lowcountry sun and salt air." },
  { slug: "cabinets",     title: "Custom Cabinets",          img: "svc-cabinets.webp",    blurb: "Brooklyn and Shaker Premier Series cabinetry, measured and installed for your space." },
  { slug: "carpentry",    title: "Carpentry",                img: "svc-carpentry.webp",   blurb: "Trim, built-ins, doors, decks, and wood-rot repair handled by skilled carpenters." },
  { slug: "concrete",     title: "Concrete Work",            img: "svc-concrete.webp",    blurb: "Driveways, patios, walkways, and foundations formed and finished to last." },
  { slug: "roofing",      title: "Roofing",                  img: "svc-roofing.webp",     blurb: "New roofs, repairs, and weatherproofing for the Lowcountry's storms and heat." },
  { slug: "disinfecting", title: "Disinfecting Service",     img: "svc-disinfecting.webp",blurb: "Professional disinfecting for homes, offices, and shared commercial spaces." },
  { slug: "commercial",   title: "Commercial Services",      img: "svc-commercial.webp",  blurb: "Build-outs, renovations, and maintenance for Lowcountry commercial property." },
];

/* Renders the photo service cards used on the home + services pages. */
function serviceCardsHTML() {
  return SERVICES.map(s => `
    <a class="service-card" href="${DEPTH}services/${s.slug}.html">
      <span class="service-card__media">
        <img src="${DEPTH}assets/img/${s.img}" alt="${s.title}" loading="lazy" />
      </span>
      <span class="service-card__body">
        <h3>${s.title}</h3>
        <p>${s.blurb}</p>
        <span class="card__link">Learn more &rarr;</span>
      </span>
    </a>`).join("");
}

/* Resolve relative paths whether we're at root or inside /services/ */
const DEPTH = location.pathname.replace(/\/+$/, "/").includes("/services/") ? "../" : "";
const url = (p) => DEPTH + p;
const svc = (slug) => DEPTH + "services/" + slug + ".html";

function buildHeader() {
  const dd = SERVICES.map(s => `<a href="${svc(s.slug)}">${s.title}</a>`).join("");
  return `
  <div class="topbar">
    <div class="wrap">
      <div class="topbar__meta">
        <span>Serving ${SITE.area}</span>
        <span class="topbar__sep">&middot;</span>
        <a href="${SITE.phoneHref}">${SITE.phone}</a>
        <span class="topbar__sep">&middot;</span>
        <a href="mailto:${SITE.email}">${SITE.email}</a>
      </div>
      <div class="topbar__social">
        <a href="${SITE.facebook}" target="_blank" rel="noopener">Facebook</a>
        <a href="${SITE.instagram}" target="_blank" rel="noopener">Instagram</a>
      </div>
    </div>
  </div>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="${url('index.html')}" aria-label="Paul Langan Contracting & Painting — home">
        <img class="brand__logo" src="${url('assets/img/logo.png')}" srcset="${url('assets/img/logo.png')} 1x, ${url('assets/img/logo@2x.png')} 2x" alt="Paul Langan Contracting & Painting" width="150" height="90" />
      </a>
      <nav class="nav" id="nav">
        <a href="${url('index.html')}" data-nav="home">Home</a>
        <a href="${url('about.html')}" data-nav="about">About</a>
        <div class="nav__item">
          <a href="${url('services.html')}" data-nav="services">Services <span class="nav__toggle-caret">▾</span></a>
          <div class="nav__menu">${dd}</div>
        </div>
        <a href="${url('projects.html')}" data-nav="projects">Projects</a>
        <a href="${url('reviews.html')}" data-nav="reviews">Reviews</a>
        <a href="${url('contact.html')}" data-nav="contact">Contact</a>
      </nav>
      <div class="header__cta">
        <span class="header__phone">${SITE.phone}</span>
        <a class="btn btn--primary" href="${url('contact.html')}">Free Estimate</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>`;
}

function buildFooter() {
  const cols = SERVICES.slice(0, 6).map(s => `<li><a href="${svc(s.slug)}">${s.title}</a></li>`).join("");
  const year = new Date().getFullYear();
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          <strong>Paul Langan Contracting &amp; Painting</strong>
          <p>Full-service general contracting, remodeling, and painting for the
             Lowcountry since ${SITE.founded}. One trusted team, handled start to finish.</p>
          <div class="footer-social">
            <a href="${SITE.facebook}" target="_blank" rel="noopener" aria-label="Facebook">f</a>
            <a href="${SITE.instagram}" target="_blank" rel="noopener" aria-label="Instagram">◎</a>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <ul class="footer-links">
            <li><a href="${url('about.html')}">About Us</a></li>
            <li><a href="${url('services.html')}">Services</a></li>
            <li><a href="${url('projects.html')}">Projects</a></li>
            <li><a href="${url('reviews.html')}">Reviews</a></li>
            <li><a href="${url('contact.html')}">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Services</h4>
          <ul class="footer-links">${cols}</ul>
        </div>
        <div>
          <h4>Get In Touch</h4>
          <ul class="footer-links">
            <li><a href="${SITE.phoneHref}">${SITE.phone}</a></li>
            <li><a href="mailto:${SITE.email}">${SITE.email}</a></li>
            <li>${SITE.address}</li>
            <li>Serving ${SITE.area}</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <span>&copy; ${SITE.founded}&ndash;${year} Paul Langan Contracting &amp; Painting, Inc. All rights reserved.</span>
        <span>SC Residential Builders License #SC13752 &middot; Licensed &amp; Insured</span>
      </div>
    </div>
  </footer>`;
}

function initNav() {
  const nav = document.getElementById("nav");
  const burger = document.getElementById("hamburger");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open);
      document.body.classList.toggle("body-lock", open);
    });
    // mobile dropdown toggle
    nav.querySelectorAll(".nav__item > a").forEach(a => {
      a.addEventListener("click", (e) => {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          a.parentElement.classList.toggle("open");
        }
      });
    });
  }
  // active link
  const active = document.body.getAttribute("data-page");
  if (active) {
    const link = nav?.querySelector(`[data-nav="${active}"]`);
    if (link) link.classList.add("is-active");
  }
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || !els.length) {
    els.forEach(el => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => io.observe(el));
}

function initForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = form.querySelector(".form-success");
    if (ok) ok.classList.add("show");
    form.reset();
    if (ok) ok.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

function injectFavicon() {
  if (document.querySelector('link[rel="icon"]')) return;
  const link = document.createElement("link");
  link.rel = "icon";
  link.type = "image/png";
  link.href = url("assets/img/favicon.png");
  document.head.appendChild(link);
}

/* Force the hero background video to play — the autoplay attribute alone
   isn't reliably honored (mobile Safari, data-saver, some Chrome states). */
function initHeroVideo() {
  const v = document.querySelector(".hero__video");
  if (!v) return;
  v.muted = true;          // must be a property, not just an attribute, for autoplay
  v.defaultMuted = true;
  v.setAttribute("muted", "");
  v.playsInline = true;

  const tryPlay = () => {
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  tryPlay();
  // Retry once the video is ready, and on the first user interaction / tab focus.
  v.addEventListener("loadeddata", tryPlay, { once: true });
  v.addEventListener("canplay", tryPlay, { once: true });
  document.addEventListener("visibilitychange", () => { if (!document.hidden) tryPlay(); });
  ["pointerdown", "touchstart", "scroll", "keydown"].forEach(ev =>
    window.addEventListener(ev, tryPlay, { once: true, passive: true })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  injectFavicon();
  const h = document.getElementById("site-header");
  const f = document.getElementById("site-footer");
  if (h) h.innerHTML = buildHeader();
  if (f) f.innerHTML = buildFooter();
  initNav();
  initReveal();
  initForm();
  initHeroVideo();
});
