/* Generates wide hero slideshow images from the original photos.
   Run: node build-hero.js */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "assets", "img", "original");
const OUT = path.join(__dirname, "assets", "img");

// Wide, landscape project photos that work behind the hero overlay.
const SLIDES = [
  ["Langan-Contracting-Sea-Pines-Apr-2022_0890-copy.jpg", "hero-1.webp"],
  ["New-Kitchen-Remodel.png", "hero-2.webp"],
  ["Langan-Leamington20-4866.jpg", "hero-3.webp"],
  ["Kitchen-with-White-Cabinets-1.png", "hero-4.webp"],
];

(async () => {
  for (const [src, out] of SLIDES) {
    const p = path.join(SRC, src);
    if (!fs.existsSync(p)) { console.warn("MISS " + src); continue; }
    await sharp(p)
      .resize({ width: 1920, height: 1080, fit: "cover", position: "attention", withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(path.join(OUT, out));
    const kb = Math.round(fs.statSync(path.join(OUT, out)).size / 1024);
    console.log(`ok  ${out}  (${kb} KB)`);
  }
  console.log("done");
})();
