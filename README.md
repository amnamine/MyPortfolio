# MyPortfolio

A simple, modern, single‑page portfolio built with plain HTML, CSS, and JavaScript. It showcases projects, collections, certificates, and social links with smooth interactions, a theme system, and responsive design.

## Features

- Theme toggle with light/dark modes
- Smooth in‑page scrolling and active section highlighting
- Mobile navigation toggle (navbar hidden on mobile)
- Project filtering across categories
- Subtle parallax and card interaction effects
- IntersectionObserver‑driven reveal animations
- Scroll progress indicator
- Certificates and collections sections with external links
- Accessible skip link and ARIA on nav toggle

## Tech Stack

- HTML5 for structure (`index.html`)
- CSS3 with custom properties and responsive layout (`styles.css`)
- Vanilla JavaScript for interactions (`script.js`)

## Project Structure

```
MyPortfolio/
├─ index.html
├─ styles.css
├─ script.js
├─ favicon.svg | fond.jpg
├─ images: angular.png, cscc.png, github.jpg, instagram.png, kaggle.png,
│          linkedin.png, nextjs.png, nuxtjs.png, svelte.png, youtube.png
```

## Getting Started

- Open `index.html` directly in a browser
- Optional: serve locally
  - VS Code Live Server
  - Python: `python -m http.server 8000` then open `http://localhost:8000/`

## Key Components

- Theme system: `script.js:2` sets `data-theme` on `documentElement` and updates the icon
- Scroll progress bar: `script.js:38` updates `#scrollProgress` scale and opacity on scroll
- Smooth scrolling: `script.js:60` intercepts `a[href^="#"]` and calls `scrollIntoView`
- Navbar manager: `script.js:82` highlights active link and manages scroll behavior
- Mobile nav toggle: `script.js:99` toggles `.show` on `#navbar ul` and closes on link click
- Project filter: `script.js:166` filters `.project-card` by `data-tags` and scrolls to sections
- Animation observer: `script.js:225` adds `animate-in` when elements intersect viewport
- Card interactions: `script.js:266` hover tilt and click loading state for buttons
- Contact form: `script.js:325` builds a `mailto:` link and shows a transient success state
- Skill tags animation: `script.js:366` staggered animation delays and hover scaling
- Parallax effects: `script.js:389` requestAnimationFrame‑driven hero motion

## HTML Overview

- Navbar: `index.html:24` contains brand, links, and `#theme-toggle`
- Sections: `#home`, `#about`, `#projects`, `#fullstack-projects`, `#ai-projects-yolo`, `#collections`, `#certificates`, `#youtube-promotion`, `#footer`
- Buttons call `openProject`, `openCollection`, and `openCertificate` (`script.js:463`)

## CSS Overview

- Custom properties define colors, shadows, and gradients: `styles.css:1`
- Fixed glass navbar: `styles.css:113` with content spacing `#main { padding-top: 84px; }` (`styles.css:126`)
- Mobile behavior: navbar hidden and top padding removed at `@media (max-width: 768px)` (`styles.css:149`)
- Responsive grids and typography under media queries (`styles.css:1253` onward)

## Accessibility

- Skip link to main content: `index.html:19`
- ARIA attributes on mobile nav toggle: `index.html:26`
- Contrast managed via theme variables and CSS custom properties

## Performance

- Throttled scroll handler: `script.js:498`
- IntersectionObserver for reveal effects: `script.js:234`
- `requestAnimationFrame` loop for parallax: `script.js:415`
- Preloading hook for critical images: `script.js:509`

## Customization

- Name and hero text: `index.html:47`–`52`
- Social links: `index.html:527`–`550`
- Projects: add or edit `.project-card` entries under sections
- Contact email: update `your-email@example.com` in `script.js:348`
- Theme defaults: change initial theme or variables in `styles.css:1`

## Deployment

- GitHub Pages: push the repo and enable Pages on `main` with root as source
- Vercel/Netlify: import the repo; framework: `Other`, output directory: root

## Notes

- Mobile: the navbar is hidden at `<= 768px` to avoid obscuring content; adjust breakpoint or re‑enable by editing `styles.css` under the mobile media query
- Security: external links open in new tabs with `noopener,noreferrer`
