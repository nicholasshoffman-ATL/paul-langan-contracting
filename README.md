# Paul Langan Contracting & Painting — Website

A fast, responsive, static marketing site for Paul Langan Contracting & Painting, Inc.
(Hilton Head Island & Bluffton, SC). Rebuilt as a clean, modern static site with no
framework and no build step required to run.

## Tech
- Plain **HTML + CSS + vanilla JS** — no framework, no bundler
- Shared header/footer injected by `assets/js/main.js` (single source of truth in `SITE` + `SERVICES`)
- Google Fonts (Inter + Poppins), CSS custom-property design system
- Mobile nav, scroll reveal animations, and a client-side contact form
- Hero background video (`assets/video/hero.mp4` + `.webm`) — a muted, looping
  Ken Burns clip rendered from the company's own project photos via ffmpeg
  (`build-hero-video` recipe); falls back to `hero-poster.jpg` for reduced-motion

## Pages / Tabs
| Tab | File |
|-----|------|
| Home | `index.html` |
| About | `about.html` |
| Services (overview) | `services.html` |
| — Renovations & Remodeling | `services/renovations.html` |
| — Additions | `services/additions.html` |
| — Painting | `services/painting.html` |
| — Custom Cabinets | `services/cabinets.html` |
| — Carpentry | `services/carpentry.html` |
| — Concrete | `services/concrete.html` |
| — Roofing | `services/roofing.html` |
| — Disinfecting | `services/disinfecting.html` |
| — Commercial | `services/commercial.html` |
| Projects | `projects.html` |
| Reviews | `reviews.html` |
| Contact | `contact.html` |
| 404 | `404.html` |

## Local preview
Any static server works, e.g.:

```bash
npx serve .
# or
python -m http.server 8080
```

Then open http://localhost:8080.

## Editing content
- **Business info** (phone, email, address, socials): edit the `SITE` object at the top of `assets/js/main.js`.
- **Service list** (nav dropdown, cards, footer): edit the `SERVICES` array in `assets/js/main.js`.
- **Service page copy**: edit `build-services.js` and re-run `node build-services.js` to regenerate the `services/*.html` pages.
- **Project photos**: drop images in `assets/img/` and swap the placeholder tiles in `projects.html`.
- **Reviews**: replace the sample testimonials in `reviews.html` with real Google/Facebook reviews.

## Deploy — Render (static site)
This repo includes `render.yaml`. To deploy:

1. Push this repo to GitHub.
2. In Render: **New → Static Site** → connect the repo (or **New → Blueprint** to use `render.yaml`).
3. Settings:
   - **Build Command:** *(leave empty)*
   - **Publish Directory:** `.`
4. Deploy. Add the custom domain `paullangancontracting.com` under the service's **Settings → Custom Domains**, then point DNS at Render.

> Note: The contact form is currently client-side only (shows a success message).
> To receive submissions, wire it to a form backend (Formspree, Web3Forms, Basin) or a
> Render service — see the `<form id="contactForm">` in `contact.html`.

## TODO before launch
- [ ] Add real project photos to `assets/img/` and update `projects.html`
- [ ] Replace sample reviews with real ones in `reviews.html`
- [ ] Connect the contact form to a real email/backend
- [ ] Add a logo/favicon
- [ ] Confirm business address & hours
