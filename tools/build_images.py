"""Derive web-ready images from the Higgsfield source renders in assets/src.

Run from the repo root:  python tools/build_images.py
Requires Pillow. Outputs land in assets/img.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "assets" / "src"
OUT = ROOT / "assets" / "img"
FONTS = ROOT / "assets" / "fonts"
OUT.mkdir(parents=True, exist_ok=True)

INK = (7, 9, 12)
BONE = (236, 232, 223)
SIGNAL = (212, 255, 58)
MUTE = (142, 152, 163)


def font(name, size, wght=None, opsz=None):
    f = ImageFont.truetype(str(FONTS / name), size)
    try:
        axes = f.get_variation_axes()
        values = []
        for ax in axes:
            n = ax.get("name", b"")
            n = n.decode() if isinstance(n, bytes) else n
            if n.lower().startswith("weight") and wght:
                values.append(wght)
            elif n.lower().startswith("optical") and opsz:
                values.append(opsz)
            else:
                values.append(ax.get("default", ax["minimum"]))
        f.set_variation_by_axes(values)
    except Exception:
        pass
    return f


def save_webp(im, path, q=80):
    im.save(path, "WEBP", quality=q, method=6)


def resized(im, width):
    h = round(im.height * width / im.width)
    return im.resize((width, h), Image.LANCZOS)


def brackets(draw, box, length, width, color):
    x0, y0, x1, y1 = box
    for (cx, cy, dx, dy) in [(x0, y0, 1, 1), (x1, y0, -1, 1), (x0, y1, 1, -1), (x1, y1, -1, -1)]:
        hx = sorted([cx, cx + dx * length]); hy = sorted([cy, cy + dy * width])
        vx = sorted([cx, cx + dx * width]); vy = sorted([cy, cy + dy * length])
        draw.rectangle([hx[0], hy[0], hx[1], hy[1]], fill=color)
        draw.rectangle([vx[0], vy[0], vx[1], vy[1]], fill=color)


def monogram(draw, x, y, s, color=BONE, accent=SIGNAL, frame=True):
    """E built from a stem and three bars (reads as E and III), inside detection brackets."""
    u = s / 64
    if frame:
        brackets(draw, (x + 4 * u, y + 4 * u, x + 60 * u, y + 60 * u), 12 * u, max(2, round(3 * u)), accent)
    draw.rectangle([x + 20 * u, y + 18 * u, x + 25 * u, y + 46 * u], fill=color)
    for by, bw in [(18, 24), (29.5, 18), (41, 24)]:
        draw.rectangle([x + 20 * u, y + by * u, x + (20 + bw) * u, y + (by + 5) * u], fill=color)


# --- Hero poster (Higgsfield still) -------------------------------------
poster = Image.open(SRC / "poster_raw.png").convert("RGB")
for w in (1920, 1280, 960):
    save_webp(resized(poster, w), OUT / f"hero-poster-{w}.webp", 78)
resized(poster, 1280).save(OUT / "hero-poster-1280.jpg", quality=80, optimize=True, progressive=True)

# --- Section art --------------------------------------------------------
for name in ("projects",):
    im = Image.open(SRC / f"{name}_raw.png").convert("RGB")
    for w in (1600, 800):
        save_webp(resized(im, w), OUT / f"{name}-{w}.webp", 76)

# --- Background grain tile (center crop avoids an artifact in one corner) --
tex = Image.open(SRC / "texture_raw.png").convert("L")
c = tex.crop((768, 768, 1280, 1280))
# Normalise around mid-grey so it can be used as an overlay at low opacity.
lo, hi = c.getextrema()
c = c.point(lambda v: int(96 + (v - lo) * 64 / max(1, hi - lo)))
save_webp(c.convert("RGB"), OUT / "grain.webp", 70)

# --- Headshot: 4:5 crop centred on the face ------------------------------
# Source: assets/src/headshot-original.jpg. FACE_X is the face's horizontal centre (0-1).
FACE_X = 0.478
hs = ImageOps.exif_transpose(Image.open(SRC / "headshot-original.jpg")).convert("RGB")
ch = hs.height if hs.width / hs.height > 0.8 else round(hs.width / 0.8)
cw = round(ch * 0.8)
x0 = min(max(0, round(FACE_X * hs.width - cw / 2)), hs.width - cw)
hs = hs.crop((x0, 0, x0 + cw, ch)).resize((960, 1200), Image.LANCZOS)
hs.save(OUT / "evans-armantrading-iii.jpg", quality=84, optimize=True, progressive=True)

# --- Open Graph image 1200x630 -----------------------------------------
og = poster.resize((1200, 675), Image.LANCZOS).crop((0, 22, 1200, 652))
shade = Image.new("L", (1200, 630))
sd = ImageDraw.Draw(shade)
for x in range(1200):
    sd.line([(x, 0), (x, 630)], fill=int(235 * max(0.0, 1 - x / 820) ** 1.2))
og = Image.composite(Image.new("RGB", og.size, INK), og, shade)
d = ImageDraw.Draw(og)
monogram(d, 72, 64, 72)
display = font("bricolage-grotesque-latin.woff2", 92, wght=760, opsz=96)
d.text((80, 214), "Evans", font=display, fill=BONE)
d.text((80, 312), "Armantrading III", font=display, fill=BONE)
sub = font("geist-latin.woff2", 30, wght=420)
d.text((84, 440), "Software engineering & applied AI", font=sub, fill=BONE)
small = font("geist-mono-latin.woff2", 21, wght=500)
d.text((84, 492), "CS SENIOR · DELAWARE STATE UNIVERSITY · CLASS OF 2027", font=small, fill=MUTE)
d.text((84, 560), "3vqns.github.io", font=small, fill=SIGNAL)
og.save(OUT / "og.jpg", quality=86, optimize=True, progressive=True)

# --- Icons --------------------------------------------------------------
for size, name in [(180, "apple-touch-icon.png"), (192, "icon-192.png"), (512, "icon-512.png"), (32, "favicon-32.png")]:
    ic = Image.new("RGB", (size * 4, size * 4), INK)
    monogram(ImageDraw.Draw(ic), size * 0.3, size * 0.3, size * 3.4)
    ic.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)

for p in sorted(OUT.iterdir()):
    print(f"{p.name:28s} {p.stat().st_size // 1024:5d} KB")
