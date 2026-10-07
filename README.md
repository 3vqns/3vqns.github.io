# 3vqns.github.io

Personal portfolio of **Evans Armantrading III**, a Computer Science senior at Delaware State University (Class of 2027) focused on software engineering and AI.

**Live:** https://3vqns.github.io/

It's a single static page (HTML, CSS, and vanilla JS) with no build step, framework, or server-side code, deployed on GitHub Pages by a GitHub Actions workflow.

## Design

- **Identity: "signal."** Ink-black field, bone-white type, and chartreuse (`#d4ff3a`) accents drawn from computer-vision detection boxes. Corner brackets recur as the monogram, image frames, card hovers, and hero annotations.
- **Monogram:** an "E" built from a stem and three bars (E, and the "III"), set inside detection brackets. Source: `favicon.svg` and the `#mark` symbol in `index.html`.
- **Type:** Bricolage Grotesque (display), Geist (body), Geist Mono (labels), all self-hosted variable WOFF2 files under the SIL Open Font License.
- **Imagery:** the hero video, poster still, section art, and grain texture were all generated with Higgsfield. The OG image, icons, and headshot placeholder are composed from those renders by `tools/build_images.py`.
- **Motion:** a transform-only parallax with three hero depths (video, grid, annotations) plus section art, `IntersectionObserver` reveals, and a pause control for the background video. With `prefers-reduced-motion: reduce`, the video never loads or autoplays, parallax is off, and reveals are instant. The video is also skipped when Save-Data is on.

## Run locally

Any static file server works. From the repo root:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly from disk also works.

## Swap in the headshot

The About section loads **one file**: `assets/img/headshot.jpg`.

1. Export your photo as a JPG, ideally a 4:5 portrait at around 800×1000 px. Other sizes are cropped to fit with `object-fit: cover`.
2. Save it over `assets/img/headshot.jpg`, keeping the same name.
3. Commit and push. The site redeploys automatically.

To use a different filename or format such as `.webp`, change the single `src` on the line marked `<!-- HEADSHOT -->` in `index.html`.

## Update content

| What | Where |
| --- | --- |
| Hero line, About bio, quick facts, highlights | `index.html` (`#top`, `#about`) |
| Experience | `index.html`, `#experience` (one `<li class="role">` per role) |
| Projects | `index.html`, `#projects` (one `<article class="project">` per project) |
| Skills | `index.html`, `#skills` |
| Education and honors | `index.html`, `#education` |
| Contact links | `index.html`, `#contact`, plus `sameAs`, `email`, and `telephone` in the JSON-LD `<script>` in `<head>` |
| Résumé PDF | Replace `assets/Evans-Armantrading-III-Resume.pdf` (same name) |
| SEO title, description, and social image | `<head>` of `index.html`; social image is `assets/img/og.jpg` |

### LinkedIn posts

Posts are defined in `assets/js/posts-data.js`, one object per post, newest first:

```js
{
  img: "28",                 // assets/posts/post-28.webp and post-28-thumb.webp
  w: 339, h: 1200,           // full screenshot size in px
  featured: true,            // show in the default "Featured" filter
  cats: ["award", "project"],// award | research | project | career | community | cert
  title: "Short headline",
  excerpt: "Exact opening line from the post.",
  summary: "One or two neutral sentences.",
  url: "https://www.linkedin.com/posts/..."  // direct link; "" falls back to the activity feed
}
```

To add a screenshot, save the PNG and convert it to a WebP plus a 452 px-tall top-crop thumbnail:

```bash
python -c "from PIL import Image; im=Image.open('shot.png').convert('RGB'); im.save('assets/posts/post-28.webp','WEBP',quality=82,method=6); im.crop((0,0,im.width,min(im.height,452))).save('assets/posts/post-28-thumb.webp','WEBP',quality=80,method=6)"
```

The screenshots don't include post URLs, so every post currently links to the LinkedIn activity feed. To link a post directly, paste its URL into that post's `url` field (on LinkedIn: **⋯ → Copy link to post**).

### Regenerating media

- `assets/src/` holds the original Higgsfield renders: the poster, section art, texture, and `hero_raw.mp4`. The deployed site doesn't use them; the workflow excludes them.
- `python tools/build_images.py` rebuilds the poster sizes, section art, grain tile, OG image, icons, and headshot placeholder. Note that it overwrites `headshot.jpg`, so keep your photo somewhere else if you run it.
- `bash tools/encode_video.sh` rebuilds the seamless hero loop as MP4 and WebM at 1080p and 540p. Desktop uses about 370 KB and phones about 110 KB.

## Deployment

`.github/workflows/pages.yml` publishes the site on every push to `main`. It copies the repo minus `assets/src`, `tools`, and this README into an artifact and deploys it with `actions/deploy-pages`. Pages must be set to **Settings → Pages → Source: GitHub Actions**.

All asset paths are relative, so the site also works if the repo is renamed to a project page such as `/evansarmantrading/`. Only the absolute URLs in `<head>`, `sitemap.xml`, and `robots.txt` would need updating.

## Custom domain (optional)

1. Buy a domain, such as `evansarmantrading.com`.
2. At your DNS provider, add **A** records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`, plus a **CNAME** for `www` pointing to `3vqns.github.io`.
3. In the repo, go to **Settings → Pages → Custom domain**, enter the domain, save, and tick **Enforce HTTPS** once the certificate is issued.
4. Replace `https://3vqns.github.io/` with the new domain in `index.html` (canonical, Open Graph, Twitter, JSON-LD), `sitemap.xml`, and `robots.txt`.

## Security

No API keys, tokens, or Higgsfield credentials are stored in this repo, and `.gitignore` blocks `.env` files. The site makes no third-party requests: fonts, images, and video are all served from the repo.
