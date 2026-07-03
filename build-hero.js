/* Generates wide hero slideshow stills from the original photos.
   Run: node build-hero.js */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "assets", "img", "original");
const OUT = path.join(__dirname, "assets", "img");

/* The exact wide banner images the original site's hero slider rotates through. */
const SLIDES = [
  ["Home-Renovation-Contractor.webp", "hero-1.webp"],  // open kitchen / living
  ["Langan-Contracting_1.webp",       "hero-2.webp"],  // grand curved staircase
  ["IMG952553.jpg",                   "hero-3.webp"],  // white kitchen
  ["Langan-Contracting-Sliders.png",  "hero-4.webp"],  // spa bathroom
  ["unnamed-10.jpg",                  "hero-5.webp"],  // exterior + Langan van
];

(async () => {
  for (const [src, out] of SLIDES) {
    const p = path.join(SRC, src);
    if (!fs.existsSync(p)) { console.warn("MISS " + src); continue; }
    await sharp(p, { failOn: "none" })
      .resize({ width: 1920, fit: "inside", withoutEnlargement: false })
      .webp({ quality: 82 })
      .toFile(path.join(OUT, out));
    const kb = Math.round(fs.statSync(path.join(OUT, out)).size / 1024);
    console.log(`ok  ${out}  (${kb} KB)`);
  }
  console.log("done");
})();
