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

## Headshot

The About section loads `assets/img/headshot.jpg`, a 960×1200 (4:5) crop.

To change the photo:
1. Save the new original as `assets/src/headshot-original.jpg`.
2. Run `python tools/build_images.py`. It crops a 4:5 portrait around `FACE_X`, the face's horizontal position from 0 to 1, which is set near the top of the headshot block.
3. Commit and push.

You can also save any 4:5 JPG directly over `assets/img/headshot.jpg`.

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

### Things I've done (LinkedIn highlights)

Highlights are defined in `assets/js/posts-data.js`, one card per event or achievement, newest first. Posts about the same event share one card: a start and its wrap-up, a win and the coverage of that win, or courses toward one certificate. Each card shows a cover photo. Clicking it opens a lightbox with every photo, a verbatim quote from each source post, a short summary, and links.

```js
{
  key: "fico",               // photo set: assets/posts/photos/post-fico-card.webp, post-fico-1..N.webp
  photos: 6,                 // number of photos in that set
  posts: ["04", "03"],       // source post numbers (reference only)
  alt: "What the cover photo shows",
  pos: "50% 40%",            // optional focus point for the cropped 4:3 card
  fit: "contain", bg: "#fff",// optional, for logos and badges (shown whole on a colour)
  featured: true,            // show in the default "Featured" filter
  cats: ["career"],          // award | research | project | career | community | cert
  title: "Short headline",
  quotes: ["Exact line from the first post.", "Exact line from the follow-up."],
  summary: "One or two neutral sentences.",
  url: "",                   // direct LinkedIn link; "" falls back to the activity feed
  links: [{ label: "Devpost", href: "https://..." }]
}
```

**Photos:** each card's photos are listed in `ORDER` in `tools/build_post_photos.py`, using the same `key`, with the cover first. An entry is either `("NN", k)`, meaning `image_0k.jpg` from post NN's folder in `LinkedIn_SS/Original_Posts`, or a file path in the repo. The Google Cybersecurity badge is stored at `assets/src/certs/google-cybersecurity-badge.png`, taken from the verified Credly badge. Rebuild with:

```bash
python tools/build_post_photos.py "C:/Users/evans/Desktop/LinkedIn_SS/Original_Posts"
```

**Cards without photos** (currently only "Continuing CS at Delaware State") use `screenshot: { img, w, h }` in place of `key` and `photos`. They need `assets/posts/post-NN.webp` and a 452 px-tall `post-NN-thumb.webp` top crop:

```bash
python -c "from PIL import Image; im=Image.open('shot.png').convert('RGB'); im.save('assets/posts/post-28.webp','WEBP',quality=82,method=6); im.crop((0,0,im.width,min(im.height,452))).save('assets/posts/post-28-thumb.webp','WEBP',quality=80,method=6)"
```

No post URLs were available, so every card currently links to the LinkedIn activity feed. To link a card directly, paste a post's URL into its `url` field (on LinkedIn: **⋯ → Copy link to post**).

### Regenerating media

- `assets/src/` holds the original Higgsfield renders: the poster, section art, texture, and `hero_raw.mp4`. The deployed site doesn't use them; the workflow excludes them.
- `python tools/build_images.py` rebuilds the poster sizes, section art, grain tile, OG image, icons, and the headshot crop.
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
