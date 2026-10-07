"""Import LinkedIn post photos into assets/posts/photos as web-ready WebP.

Usage (from the repo root):
    python tools/build_post_photos.py "C:/Users/evans/Desktop/LinkedIn_SS/Original_Posts"

Each post folder in the source is named NN_..., containing image_01.jpg, image_02.jpg, ...
ORDER maps a card key (used as `key` in assets/js/posts-data.js) to the photos for that
card; the first one is the card cover. A card can combine several posts about the same
event. Each entry is one of:
    ("NN", k)        image k from post NN's folder
    "path/to.png"    a file relative to the repo root (e.g. a credential badge in assets/src)

Outputs (the folder is rebuilt from scratch):
    post-KEY-card.webp   cover, max 800 px wide, for the gallery card
    post-KEY-K.webp      every listed photo, max 1400 px on the long edge, for the lightbox
"""
import shutil
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "posts" / "photos"

ORDER = {
    "01": [("01", 1)],
    "02": [("02", 1), ("02", 2)],
    "fico": [("04", 1), ("04", 2), ("04", 3), ("03", 1), ("03", 2), ("03", 3)],  # start + wrap-up
    "05": [("05", 1), ("05", 2), ("05", 3)],
    "06": [("06", 1)],
    "07": [("07", 3), ("07", 1), ("07", 2)],
    "08": [("08", 2), ("08", 1), ("08", 3)],
    "09": [("09", 2), ("09", 1)],
    "10": [("10", 2), ("10", 3), ("10", 4), ("10", 1)],
    "11": [("11", 1), ("11", 2), ("11", 3), ("11", 4)],
    "12": [("12", 1), ("12", 4), ("12", 2), ("12", 3)],
    "13": [("13", 1), ("13", 2), ("13", 3), ("13", 4)],
    "14": [("14", 1), ("14", 2), ("14", 3)],
    "henhacks": [("16", 4), ("16", 3), ("16", 5), ("16", 2), ("16", 1)],  # posts 15 + 16
    "18": [("18", 1)],
    "19": [("19", 1), ("19", 2), ("19", 3)],
    "20": [("20", 1)],
    "21": [("21", 1)],
    "cyber": ["assets/src/certs/google-cybersecurity-badge.png", ("26", 1)],  # posts 22-26
}

# Photos with black letterbox bars to trim (KEY-k).
TRIM = {"19-1"}
# Small logos to centre on a white canvas so the lightbox doesn't stretch them (KEY-k: canvas size).
PAD = {"cyber-2": (900, 600)}


def trim_bars(im, threshold=18):
    mask = im.convert("L").point(lambda v: 255 if v > threshold else 0)
    box = mask.getbbox()
    return im.crop(box) if box else im


def fit(im, max_w=None, max_long=None):
    w, h = im.size
    s = 1.0
    if max_w and w > max_w:
        s = min(s, max_w / w)
    if max_long and max(w, h) > max_long:
        s = min(s, max_long / max(w, h))
    return im if s == 1.0 else im.resize((round(w * s), round(h * s)), Image.LANCZOS)


def load(item, folders):
    path = ROOT / item if isinstance(item, str) else folders[item[0]] / f"image_{item[1]:02d}.jpg"
    im = ImageOps.exif_transpose(Image.open(path))
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (255, 255, 255))
        bg.paste(im, mask=im.getchannel("A"))
        return bg
    return im.convert("RGB")


def main(src):
    folders = {p.name[:2]: p for p in Path(src).iterdir() if p.is_dir()}
    shutil.rmtree(OUT, ignore_errors=True)
    OUT.mkdir(parents=True)
    total = 0
    for key, items in ORDER.items():
        for k, item in enumerate(items, 1):
            im = load(item, folders)
            if f"{key}-{k}" in TRIM:
                im = trim_bars(im)
            if f"{key}-{k}" in PAD:
                canvas = Image.new("RGB", PAD[f"{key}-{k}"], (255, 255, 255))
                canvas.paste(im, ((canvas.width - im.width) // 2, (canvas.height - im.height) // 2))
                im = canvas
            dst = OUT / f"post-{key}-{k}.webp"
            fit(im, max_long=1400).save(dst, "WEBP", quality=80, method=6)
            total += dst.stat().st_size
            if k == 1:
                card = OUT / f"post-{key}-card.webp"
                fit(im, max_w=800).save(card, "WEBP", quality=76, method=6)
                total += card.stat().st_size
        print(f"{key:9s} {len(items)} photo(s)")
    print(f"total {total // 1024} KB")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\evans\Desktop\LinkedIn_SS\Original_Posts")
