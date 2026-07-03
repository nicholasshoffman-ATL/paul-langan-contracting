/* Generates wide hero slideshow stills from the original photos.
   Run: node build-hero.js */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "assets", "img", "original");
const OUT = path.join(__dirname, "assets", "img");

const SLIDES = [
  ["20200122_100351.jpg", "hero-1.webp"],   // white marble-island kitchen
  ["20200723_140604.jpg", "hero-2.webp"],   // open kitchen / dining
  ["20200122_104156.jpg", "hero-3.webp"],   // bathroom, round mirrors
  ["20191004_143006.jpg", "hero-4.webp"],   // kitchen island
  ["20200723_135406.jpg", "hero-5.webp"],   // large island
];

(async () => {
  for (const [src, out] of SLIDES) {
    const p = path.join(SRC, src);
    if (!fs.existsSync(p)) { console.warn("MISS " + src); continue; }
    await sharp(p, { failOn: "none" })
      .resize({ width: 1920, height: 1080, fit: "cover", position: "attention", withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(path.join(OUT, out));
    const kb = Math.round(fs.statSync(path.join(OUT, out)).size / 1024);
    console.log(`ok  ${out}  (${kb} KB)`);
  }
  console.log("done");
})();
