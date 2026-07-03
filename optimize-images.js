/* Curates + optimizes the original WordPress images (assets/img/original/)
   into web-sized, purpose-named assets in assets/img/.
   Run: node optimize-images.js   (requires: npm i sharp) */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const SRC = path.join(__dirname, "assets", "img", "original");
const OUT = path.join(__dirname, "assets", "img");

// [ sourceFile, outName, maxWidth, format ]   format: "webp" | "png" | "jpg"
const MAP = [
  // Branding
  ["Untitled-300-x-200-px-5.png", "logo.png", 360, "png"],
  ["Untitled-300-x-200-px-4.png", "logo@2x.png", 600, "png"],
  ["PLC-Favicon.png", "favicon.png", 96, "png"],

  // Hero + about
  ["Langan-Contracting-Sea-Pines-Apr-2022_0890-copy.jpg", "hero.webp", 1900, "webp"],
  ["Langan-Leamington20-4866.jpg", "about.webp", 1200, "webp"],

  // Service feature images (used on service pages + service cards)
  ["New-Kitchen-Remodel.png", "svc-renovations.webp", 1000, "webp"],
  ["Hilton-Head-Room-Additions.jpg", "svc-additions.webp", 1000, "webp"],
  ["Exterior-Painting.png", "svc-painting.webp", 1000, "webp"],
  ["Shaker-Sand-Kitchen.png", "svc-cabinets.webp", 1000, "webp"],
  ["Wood-Floors.png", "svc-carpentry.webp", 1000, "webp"],
  ["Residential-Concrete-Services.jpg", "svc-concrete.webp", 1000, "webp"],
  ["Roofing-Hilton-Head.jpg", "svc-roofing.webp", 1000, "webp"],
  ["langndisinfectad-300x250-1.jpg", "svc-disinfecting.webp", 800, "webp"],
  ["Commercial-Contracting-Services.png", "svc-commercial.webp", 1000, "webp"],

  // Projects gallery
  ["Kitchen-Remodel-After.png", "proj-kitchen-1.webp", 1000, "webp"],
  ["Kitchen-with-White-Cabinets-1.png", "proj-kitchen-2.webp", 1000, "webp"],
  ["Kitchen-Island-1.png", "proj-kitchen-island.webp", 1000, "webp"],
  ["PLC-Sea-Pines-Shower.jpg", "proj-bath-1.webp", 1000, "webp"],
  ["Brooklyn-Midnight-Bathroom.png", "proj-bath-2.webp", 1000, "webp"],
  ["Livingroom-Remodel-After.png", "proj-living.webp", 1000, "webp"],
  ["Kitchen-Cabinet-1.png", "proj-cabinets.webp", 1000, "webp"],
  ["Glass-Door.png", "proj-carpentry.webp", 1000, "webp"],
  ["Commercial-Concrete-Services.jpg", "proj-concrete.webp", 1000, "webp"],

  // Credential badges
  ["south-carolina-residential-builders.jpeg", "badge-sc-builder.png", 220, "png"],
  ["chamber-member-logo.png", "badge-chamber.png", 220, "png"],
  ["HHITownLogo.jpg", "badge-hhi.png", 220, "png"],
  ["TOB-logo.jpg", "badge-bluffton.png", 220, "png"],
  ["BC-LOGO-PNG.png", "badge-beaufort.png", 220, "png"],

  // Trusted-brand / supplier logos
  ["andersen.png", "brand-andersen.png", 240, "png"],
  ["provia.png", "brand-provia.png", 240, "png"],
  ["daltile-logo.png", "brand-daltile.png", 240, "png"],
  ["sherwin-williams-opt.png", "brand-sherwin.png", 240, "png"],
  ["glidden-logo-opt.png", "brand-glidden.png", 240, "png"],
  ["trex-logo-opt.png", "brand-trex.png", 240, "png"],
  ["grayco-opt.png", "brand-grayco.png", 240, "png"],
];

(async () => {
  let ok = 0, miss = 0;
  for (const [srcName, outName, w, fmt] of MAP) {
    const srcPath = path.join(SRC, srcName);
    if (!fs.existsSync(srcPath)) { console.warn("MISS " + srcName); miss++; continue; }
    const outPath = path.join(OUT, outName);
    let img = sharp(srcPath).resize({ width: w, withoutEnlargement: true });
    if (fmt === "webp") img = img.webp({ quality: 82 });
    else if (fmt === "png") img = img.png({ compressionLevel: 9, palette: true });
    else img = img.jpeg({ quality: 84, mozjpeg: true });
    await img.toFile(outPath);
    const kb = Math.round(fs.statSync(outPath).size / 1024);
    console.log(`ok   ${outName}  (${kb} KB)`);
    ok++;
  }
  console.log(`\nDone — ${ok} optimized, ${miss} missing.`);
})();
