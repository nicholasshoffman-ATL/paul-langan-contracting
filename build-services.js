/* Generates the individual /services/*.html pages from the data below.
   Run with:  node build-services.js
   Keeps every service page consistent with the shared design system. */

const fs = require("fs");
const path = require("path");

const SERVICES = [
  {
    slug: "renovations",
    nav: "Renovations & Remodeling",
    title: "Renovations & Remodeling",
    tagline: "Kitchens, bathrooms, and whole-home remodels handled start to finish.",
    intro:
      "Whether you're dreaming of a brighter kitchen, a spa-like bathroom, or a full main-floor reimagining, our team manages every phase — design input, demolition, construction, and finishes — so your remodel runs smoothly and finishes beautifully.",
    features: [
      "Kitchen remodels — cabinets, counters, islands & lighting",
      "Bathroom renovations — tile, vanities, showers & fixtures",
      "Whole-home and open-concept transformations",
      "Flooring, drywall, trim, and interior painting",
      "Coordinated plumbing and electrical updates",
      "Permits and inspections handled for you",
    ],
    closing:
      "One team, one point of contact, and a finished space that fits how you actually live.",
  },
  {
    slug: "additions",
    nav: "Additions",
    title: "Home Additions",
    tagline: "Add the square footage your family needs — seamlessly matched to your home.",
    intro:
      "Growing family, home office, sunroom, or in-law suite? We design and build additions that look like they were always part of the house, matching rooflines, materials, and finishes inside and out.",
    features: [
      "Room and second-story additions",
      "Sunrooms, screened porches & outdoor living",
      "In-law suites and bonus rooms",
      "Garage builds and conversions",
      "Foundation, framing, roofing & finishing",
      "Full permitting and structural coordination",
    ],
    closing:
      "More room to live, built to blend right in with your existing home.",
  },
  {
    slug: "painting",
    nav: "Interior & Exterior Painting",
    title: "Interior & Exterior Painting",
    tagline: "Clean lines, durable finishes, and meticulous prep on every surface.",
    intro:
      "Paint is where craftsmanship shows. We prep thoroughly, protect your furnishings and landscaping, and apply premium coatings built to hold up against Lowcountry sun, humidity, and salt air — for interiors and exteriors alike.",
    features: [
      "Interior walls, ceilings, trim & doors",
      "Exterior siding, trim, and soffits",
      "Cabinet and millwork refinishing",
      "Thorough surface prep, patching & priming",
      "Pressure washing and mildew treatment",
      "Premium, weather-rated coatings",
    ],
    closing:
      "A flawless finish that protects your home and lifts its whole look.",
  },
  {
    slug: "cabinets",
    nav: "Custom Cabinets",
    title: "Custom Cabinets",
    tagline: "Brooklyn & Shaker Premier Series cabinetry, built for your space.",
    intro:
      "Cabinets set the tone for a kitchen or bath. We offer our Brooklyn Premier and Shaker Premier Series lines — quality construction and timeless styles — expertly measured and installed for a built-in, custom look.",
    features: [
      "Brooklyn Premier Series cabinetry",
      "Shaker Premier Series cabinetry",
      "Kitchen, bath, and laundry cabinetry",
      "Custom islands, pantries & built-ins",
      "Soft-close doors and drawers",
      "Precise measurement and professional install",
    ],
    closing:
      "Beautiful, functional storage that anchors the whole room.",
  },
  {
    slug: "carpentry",
    nav: "Carpentry",
    title: "Carpentry",
    tagline: "Trim, framing, built-ins, and finish carpentry done right.",
    intro:
      "From rough framing to the finest finish details, our carpenters bring precision to every cut. If it's made of wood, we can build, repair, or restore it — inside your home or out.",
    features: [
      "Custom trim, crown molding & wainscoting",
      "Built-in shelving, benches & mantels",
      "Doors, windows, and hardware installation",
      "Deck, porch, and railing carpentry",
      "Wood rot repair and replacement",
      "Framing for remodels and additions",
    ],
    closing:
      "Skilled carpentry that adds character and lasting value.",
  },
  {
    slug: "concrete",
    nav: "Concrete Work",
    title: "Concrete Work",
    tagline: "Driveways, patios, foundations, and structural concrete.",
    intro:
      "Solid concrete work is the foundation of a lasting project — literally. We form, pour, and finish flatwork and structural concrete built to withstand the Lowcountry's shifting soils and weather.",
    features: [
      "Driveways, walkways & sidewalks",
      "Patios and outdoor slabs",
      "Foundations and footings",
      "Steps, curbs, and retaining structures",
      "Repairs and resurfacing",
      "Proper grading, forms & reinforcement",
    ],
    closing:
      "Durable, level, and finished right the first time.",
  },
  {
    slug: "roofing",
    nav: "Roofing",
    title: "Roofing",
    tagline: "New roofs, repairs, and weatherproofing for Lowcountry conditions.",
    intro:
      "Your roof is your home's first line of defense against Lowcountry storms and sun. We install and repair roofing systems with quality materials and careful workmanship to keep everything below it dry and protected.",
    features: [
      "New roof installation & full replacement",
      "Roof repairs and leak diagnosis",
      "Shingle, metal, and flat roofing",
      "Flashing, vents & weatherproofing",
      "Storm-damage assessment",
      "Gutter and soffit coordination",
    ],
    closing:
      "A watertight roof you don't have to think about.",
  },
  {
    slug: "disinfecting",
    nav: "Disinfecting Service",
    title: "Disinfecting Service",
    tagline: "Professional disinfecting for homes and commercial spaces.",
    intro:
      "Keep your home or business clean and healthy with our professional disinfecting service. We treat high-touch surfaces and shared spaces with effective, responsibly applied products for added peace of mind.",
    features: [
      "Residential and commercial disinfecting",
      "High-touch surface treatment",
      "Post-construction and turnover cleaning",
      "Common areas and shared workspaces",
      "Responsible, effective products",
      "Flexible, scheduled service",
    ],
    closing:
      "A cleaner, healthier space for your family or your team.",
  },
  {
    slug: "commercial",
    nav: "Commercial Services",
    title: "Commercial Services",
    tagline: "Build-outs, renovations, and maintenance for commercial property.",
    intro:
      "We help Lowcountry business owners and property managers keep their spaces sharp and functional — from tenant build-outs and remodels to ongoing repairs and maintenance, completed with minimal disruption to your operation.",
    features: [
      "Tenant improvements & build-outs",
      "Office and retail renovations",
      "Commercial painting & finishes",
      "Repairs and property maintenance",
      "Carpentry, concrete & roofing",
      "Scheduling that works around your business",
    ],
    closing:
      "A dependable contracting partner for your commercial property.",
  },
];

const pageTemplate = (s, prev, next) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${s.title} | Paul Langan Contracting &amp; Painting — Hilton Head &amp; Bluffton, SC</title>
  <meta name="description" content="${s.tagline} Serving Hilton Head Island & Bluffton, SC since 1989. Call 843-686-4572 for a free estimate." />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="../assets/css/style.css?v=8" />
</head>
<body data-page="services">
  <div id="site-header"></div>

  <section class="page-banner">
    <div class="page-banner__media" style="background-image:url('../assets/img/svc-${s.slug}.webp')"></div>
    <div class="wrap">
      <h1>${s.title}</h1>
      <p>${s.tagline}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap split">
      <div class="reveal">
        <span class="eyebrow">${s.title} in Hilton Head &amp; Bluffton</span>
        <h2>${s.closing}</h2>
        <p>${s.intro}</p>
        <a class="btn btn--primary" href="../contact.html" style="margin-top:22px;">Request a Free Estimate</a>
      </div>
      <div class="split__media reveal">
        <img src="../assets/img/svc-${s.slug}.webp" alt="${s.title} by Paul Langan Contracting in Hilton Head &amp; Bluffton" loading="lazy" />
      </div>
    </div>
  </section>

  <section class="section section--mist">
    <div class="wrap">
      <div class="center" style="margin-bottom:40px;">
        <span class="eyebrow reveal">What's included</span>
        <h2 class="reveal">${s.title} Services We Provide</h2>
      </div>
      <div class="split">
        <ul class="checklist reveal" style="margin-top:0;">
          ${s.features.slice(0, Math.ceil(s.features.length / 2)).map((f) => `<li>${f}</li>`).join("\n          ")}
        </ul>
        <ul class="checklist reveal" style="margin-top:0;">
          ${s.features.slice(Math.ceil(s.features.length / 2)).map((f) => `<li>${f}</li>`).join("\n          ")}
        </ul>
      </div>
    </div>
  </section>

  <section class="section section--navy">
    <div class="wrap center">
      <span class="eyebrow reveal">One trusted team</span>
      <h2 class="reveal">Every Trade Under One Roof</h2>
      <p class="lead reveal" style="margin-inline:auto;">Pair your ${s.title.toLowerCase()} with any of our other services and let a single
         team handle it all — permits, trades, and finishes included.</p>
      <div style="margin-top:28px; display:flex; gap:14px; justify-content:center; flex-wrap:wrap;">
        <a class="btn btn--primary reveal" href="../services.html">All Services</a>
        <a class="btn btn--ghost reveal" href="../projects.html">See Our Work</a>
      </div>
    </div>
  </section>

  <section class="section cta-band">
    <div class="wrap center">
      <h2 class="reveal">Let's Talk About Your Project</h2>
      <p class="reveal">Call for a free, no-obligation estimate — we serve all of Hilton Head Island and Bluffton.</p>
      <a class="btn btn--dark btn--lg reveal" href="tel:+18436864572">Call (843) 686-4572</a>
    </div>
  </section>

  <div id="site-footer"></div>
  <script src="../assets/js/main.js?v=8"></script>
</body>
</html>
`;

const outDir = path.join(__dirname, "services");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

SERVICES.forEach((s, i) => {
  const prev = SERVICES[(i - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(i + 1) % SERVICES.length];
  const html = pageTemplate(s, prev, next);
  fs.writeFileSync(path.join(outDir, `${s.slug}.html`), html);
  console.log("wrote services/" + s.slug + ".html");
});

console.log("Done — " + SERVICES.length + " service pages generated.");
