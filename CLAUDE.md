# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static single-page corporate website for 株式会社ALIUS. Three files only — no build step, no package manager, no framework.

- `index.html` — full page structure (nav, hero, about, CEO message, services, careers, contact, footer)
- `styles.css` — all styles
- `script.js` — navbar scroll behavior, hamburger menu, contact form submission via Formspree

## Local Development

Serve with Python's built-in HTTP server:

```bash
python -m http.server 8999 --directory /c/work/hikarukurosaki/ALIUS
```

Then open `http://localhost:8999/`. Screenshots for verification:

```bash
python - <<'EOF'
from playwright.sync_api import sync_playwright
# ... see prior session examples
EOF
```

## Deploying

Push to `https://github.com/yunoland-hikaru/alius` (main branch). Cloudflare Pages auto-deploys on push.

To retrigger a deploy without code changes:

```bash
git commit --allow-empty -m "ci: trigger Cloudflare Pages redeploy"
git push https://github.com/yunoland-hikaru/alius main
```

## Key Design Decisions

- **Colors**: main `#1A3A8F`, accent `#7C3AED`, green `#10B981`
- **Font**: Noto Sans JP via Google Fonts
- **Hero gradient**: `#040b1e → #0D1B4B → #1A3A8F → #5b21b6 → #7C3AED → #059669 → #10B981`
- **Nav logo**: inline SVG with `stroke="currentColor"` — white on hero, switches to dark (`var(--dark)`) when `.scrolled` class is added by JS
- **Mobile menu**: `position: fixed; height: 100vh; background: #040b1e` (solid, no alpha) to prevent backdrop-filter bleedthrough from the scrolled navbar
- **Contact form**: Formspree endpoint `https://formspree.io/f/mpqeryvv`, submitted via `fetch` in `script.js`

## Architecture Notes

The navbar gains `.scrolled` class (via `script.js`) when `window.scrollY > 60`, which switches background to white and logo/link colors to dark. The hamburger menu (`.nav-hamburger`) uses `z-index: 1100` to float above the fullscreen menu overlay (`z-index: 1050`).

Scroll-triggered fade-in uses `IntersectionObserver` targeting `.fade-in` elements; the `visible` class is added once on intersection and the observer disconnects.
