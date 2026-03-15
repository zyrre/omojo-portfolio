# ArtStation-Style Portfolio on GitHub Pages

## Inspiration (ArtStation style)
- Dark background, minimal UI, images are the star
- Grid/masonry layout of project thumbnails
- Clicking a project shows a vertical scroll of full-width images
- Clean sans-serif typography, minimal text
- Smooth scrolling, subtle hover effects

## Architecture

Single static site — no backend, no build step needed.

```
omojo/
├── index.html          # Main portfolio grid
├── style.css           # All styling
├── script.js           # Lightbox, NDA unlock, smooth scroll
├── images/             # Public portfolio images
│   ├── project1/
│   ├── project2/
│   └── ...
└── nda/                # NDA-protected images (still public files, but hidden behind password gate)
    ├── project-secret/
    └── ...
```

## Key Features

1. **Landing page** — Your name/title, minimal hero, then a grid of project thumbnails
2. **Smooth vertical scroll** — Each "project" section is a full-width vertical gallery you scroll through (like ArtStation project pages)
3. **Dark theme** — Near-black bg (`#1a1a1a`), white text, images pop
4. **NDA-protected section** — URL like `yoursite.com/#nda-projectname`
   - Prompts for a password on visit
   - Password is hardcoded in JS (hashed with SHA-256 so it's not plaintext in source)
   - On correct password, images are revealed (they're base64-encoded or the filenames are derived from the password hash so you can't just guess paths)
   - Simple but effective — not bank-vault security, just enough to keep casual browsers out

## NDA Protection Approach (no backend)

Since GitHub Pages is fully static, true security isn't possible. But here's a practical approach:

- **Option A (simplest):** Images live in the repo with obfuscated folder names (long random strings). The "password" unlocks the path mapping in JS. Someone who reads the source could find them, but nobody casually will.
- **Option B (better):** Use [StatiCrypt](https://github.com/robinmoisson/staticrypt) — it encrypts entire HTML pages client-side with AES. The NDA page is literally encrypted in the HTML file. Without the password, the content is gibberish. This is genuinely secure.

**Recommended: Option B (StatiCrypt)** — it's a one-line CLI command per protected page and gives real encryption.

## Hosting on GitHub Pages

1. Create a GitHub repo (e.g., `yourusername.github.io` or `omojo-portfolio`)
2. Push the static files to `main` branch
3. Enable GitHub Pages in repo Settings → Pages → Source: `main` / `/ (root)`
4. Optional: add a custom domain via CNAME file
5. That's it — free HTTPS, free hosting

## Tech Stack

- **Pure HTML/CSS/JS** — no frameworks, no build tools
- **CSS Grid** for the masonry-ish layout
- **Intersection Observer** for subtle fade-in animations on scroll
- **StatiCrypt** for NDA pages (one-time CLI encryption step)

## Pages/Sections

| Section | Description |
|---------|-------------|
| Hero | Name, title ("Concept Artist" etc), maybe one bg image |
| Gallery grid | Thumbnails in 2-3 column grid, hover shows title |
| Project view | Click thumbnail → smooth scroll to full-width image stack |
| NDA section | Password-gated page(s) for confidential work |
| Footer | Contact links (email, ArtStation, LinkedIn) |
