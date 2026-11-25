# MyPortfolio

A modern, single-page Full Stack & AI Developer portfolio built with plain HTML, CSS, and Vanilla JavaScript. It showcases web applications, full-stack systems, computer vision AI projects, collections, certificates, and social links with smooth interactions, light/dark themes, and responsive design.

## Features

- Theme toggle with light/dark modes and `prefers-color-scheme` fallback
- Smooth in-page scrolling and active section highlighting (including footer)
- Responsive mobile navigation drawer with accessible ARIA attributes
- Project filtering across Web Apps, Full Stack, and AI Projects
- 3D hover tilt and IntersectionObserver-driven reveal animations
- Scroll progress indicator
- Collections, certificates, YouTube channel, and direct email contact

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
├─ favicon.svg
├─ README.md
└─ images: cscc.png, facebook.png, github.jpg, instagram.png,
           kaggle.png, linkedin.png, youtube.png
```

## Getting Started

- Open `index.html` directly in a browser
- Optional: serve locally with Python (`python -m http.server 8000`) and open `http://localhost:8000/`

## Deployment

- GitHub Pages: push the repo and enable Pages on `main` with root as source
- Vercel / Netlify: import the repo with output directory set to root
