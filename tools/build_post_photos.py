"""Import LinkedIn post photos into assets/posts/photos as web-ready WebP.

Usage (from the repo root):
    python tools/build_post_photos.py "C:/Users/evans/Desktop/LinkedIn_SS/Original_Posts"

Each post folder in the source is named NN_..., containing image_01.jpg, image_02.jpg, ...
ORDER lists which images to use for each post; the first one is the card cover.
Entries can be an int (image number in that post's folder) or ("NN", k) to borrow
image k from another post's folder.

Outputs:
    post-NN-card.webp   cover, max 800 px wide, for the gallery card
    post-NN-K.webp      every listed photo, max 1400 px on the long edge, for the lightbox
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "assets" / "posts" / "photos"

ORDER = {
    "01": [1],
    "02": [1, 2],
    "03": [1, 2, 3],
    "04": [1, 2, 3],
    "05": [1, 2, 3],
    "06": [1],
    "07": [3, 1, 2],
    "08": [2, 1, 3],
    "09": [2, 1],
    "10": [2, 3, 4, 1],
    "11": [1, 2, 3, 4],
    "12": [1, 4, 2, 3],
    "13": [1, 2, 3, 4],
    "14": [1, 2, 3],
    "15": [("16", 2)],          # own image is a 160 px link thumbnail; same HenHacks team photo
    "16": [4, 3, 5, 2, 1],
    "17": [1],
    "18": [1],
    "19": [1, 2, 3],
    "20": [1],
    "21": [1],
    "26": [1],
}


# Photos with black letterbox bars to trim (post-k).
TRIM = {"19-1"}


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


def main(src):
    src = Path(src)
    folders = {p.name[:2]: p for p in src.iterdir() if p.is_dir()}
    OUT.mkdir(parents=True, exist_ok=True)
    total = 0
    for num, items in ORDER.items():
        for k, item in enumerate(items, 1):
            folder, idx = (folders[item[0]], item[1]) if isinstance(item, tuple) else (folders[num], item)
            im = ImageOps.exif_transpose(Image.open(folder / f"image_{idx:02d}.jpg")).convert("RGB")
            if f"{num}-{k}" in TRIM:
                im = trim_bars(im)
            dst = OUT / f"post-{num}-{k}.webp"
            fit(im, max_long=1400).save(dst, "WEBP", quality=80, method=6)
            total += dst.stat().st_size
            if k == 1:
                card = OUT / f"post-{num}-card.webp"
                fit(im, max_w=800).save(card, "WEBP", quality=76, method=6)
                total += card.stat().st_size
            print(f"post-{num}-{k}.webp  {im.size[0]}x{im.size[1]}")
    print(f"total {total // 1024} KB")


if __name__ == "__main__":
    main(sys.argv[1] if len(sys.argv) > 1 else r"C:\Users\evans\Desktop\LinkedIn_SS\Original_Posts")
