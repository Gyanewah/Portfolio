"""Make responsive AVIF + WebP copies of the site's photos (uses Pillow, no npm deps).

Run:  npm run images
Originals in /images are never modified. Output goes to /public/images/...

To add a gallery photo: put it in /images, add a line to GALLERY below,
run `npm run images`, then add an entry to src/data/gallery.js with the same name.
"""
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
WA = "images/WhatsApp Image 2026-11-25 at "
SS = "images/Screenshot 2026-11-26 "

# (source, output folder, output name, widths, crop ratio w/h or None, focus point (x, y) 0..1)
JOBS = [
    # Hero (Feature 1)
    ("images/my_profile.jpg", "public/images/hero", "josephine", [640, 960, 1280, 1920], None, None),
    # About cartoon (Feature 5): 4:5
    ("images/Colored-Pencil African Builders Portrait.png", "public/images/about", "cartoon", [480, 800], 4 / 5, (0.56, 0.5)),
    # Project covers (Selected work cards): 16:10
    ("images/misslibrary.png", "public/images/work", "miss-library", [800, 1280, 1920], 16 / 10, (0.5, 0.5)),
    (SS + "124053.png", "public/images/work", "choir", [800, 1280], 16 / 10, (0.28, 0.5)),
    (SS + "121856.png", "public/images/work", "contact-app", [600], 16 / 10, (0.5, 0.4)),
]

# Case-study screenshots: never cropped. (source, project slug, output name)
# Output: public/images/work/<slug>/<name>-<width>.webp/.avif at 800 px and full size.
SCREENSHOTS = [
    (SS + "124053.png", "choir", "voices"),
    (SS + "124030.png", "choir", "playback"),
    (SS + "124145.png", "choir", "bar-editor"),
    (SS + "122051.png", "miss-library", "home"),
    (SS + "122130.png", "miss-library", "books"),
    (SS + "122320.png", "miss-library", "create-book"),
    (SS + "122149.png", "miss-library", "authors"),
    (SS + "122409.png", "miss-library", "author-detail"),
    (SS + "122221.png", "miss-library", "clients"),
    (SS + "122250.png", "miss-library", "about"),
    (SS + "121856.png", "contact-app", "contact-list"),
    (SS + "121738.png", "contact-app", "add-contact"),
    (SS + "121803.png", "contact-app", "edit-contact"),
    (SS + "121832.png", "contact-app", "contact-details"),
]

# Life outside the screen (Feature 3).  (source, name, focus)
# Portrait photos become 4:5 cards (widths 360/720); landscape photos 4:3 cards (widths 480/960).
GALLERY = [
    ("images/Singing.jpeg", "singing", (0.45, 0.3)),
    ("images/Organ.jpeg", "organ", (0.6, 0.4)),
    ("images/book.jpg", "reading", (0.35, 0.5)),
    (WA + "22.58.13.jpeg", "cadet-certificate", (0.3, 0.5)),
    (WA + "22.58.14 (1).jpeg", "round-table", (0.5, 0.5)),
    (WA + "22.58.14.jpeg", "cadet-parade", (0.5, 0.4)),
    (WA + "23.18.31 (1).jpeg", "on-stage", (0.5, 0.4)),
    (WA + "23.18.31 (3).jpeg", "outreach", (0.5, 0.5)),
    (WA + "23.18.31 (4).jpeg", "team-suits", (0.5, 0.5)),
    (WA + "23.18.31.jpeg", "cadet-friends", (0.5, 0.5)),
    (WA + "23.18.32.jpeg", "formal-event", (0.5, 0.45)),
    (WA + "23.18.33 (1).jpeg", "tech-week-team", (0.5, 0.55)),
    (WA + "23.18.33 (2).jpeg", "on-camera", (0.5, 0.5)),
    (WA + "23.18.33 (3).jpeg", "night-friends", (0.5, 0.45)),
    (WA + "23.18.33.jpeg", "tweek-2024", (0.5, 0.65)),
    (WA + "23.26.27 (1).jpeg", "louvre", (0.5, 0.6)),
    (WA + "23.26.27(1).jpeg", "day-out", (0.55, 0.5)),
    (WA + "23.26.27.jpeg", "eiffel-tower", (0.5, 0.5)),
    (WA + "23.35.54(1).jpeg", "presenting", (0.5, 0.4)),
    (WA + "23.35.54(3).jpeg", "big-smile", (0.5, 0.3)),
    (WA + "23.35.54.jpeg", "lakeside", (0.5, 0.5)),
    (WA + "23.35.55(1).jpeg", "audience", (0.5, 0.5)),
    (WA + "23.35.55.jpeg", "speaking", (0.5, 0.45)),
    (WA + "23.36.40(2).jpeg", "group-smiles", (0.5, 0.5)),
    (WA + "23.37.38 (1).jpeg", "award-handshake", (0.5, 0.5)),
    (WA + "23.37.38.jpeg", "coe-awards", (0.5, 0.5)),
    (WA + "23.37.39.jpeg", "workshop", (0.5, 0.5)),
    (WA + "23.38.32.jpeg", "stage-group", (0.5, 0.5)),
]


def crop_to_ratio(im, ratio, focus):
    w, h = im.size
    fx, fy = focus or (0.5, 0.5)
    if w / h > ratio:  # too wide
        nw = round(h * ratio)
        left = min(max(round(w * fx - nw / 2), 0), w - nw)
        return im.crop((left, 0, left + nw, h))
    nh = round(w / ratio)
    top = min(max(round(h * fy - nh / 2), 0), h - nh)
    return im.crop((0, top, w, top + nh))


def make(src, out_dir, name, widths, ratio, focus):
    im = ImageOps.exif_transpose(Image.open(ROOT / src)).convert("RGB")
    if ratio:
        im = crop_to_ratio(im, ratio, focus)
    out = ROOT / out_dir
    out.mkdir(parents=True, exist_ok=True)
    made = []
    for w in widths:
        if w > im.width:
            continue
        h = round(im.height * w / im.width)
        resized = im.resize((w, h), Image.LANCZOS)
        resized.save(out / f"{name}-{w}.avif", quality=55)
        resized.save(out / f"{name}-{w}.webp", quality=78, method=6)
        made.append(w)
    return made


def run():
    for job in JOBS:
        print(job[2], make(*job))
    for src, name, focus in GALLERY:
        with Image.open(ROOT / src) as probe:
            w, h = ImageOps.exif_transpose(probe).size
        if h >= w:
            made = make(src, "public/images/life", name, [360, 720], 4 / 5, focus)
            print(f"{name}: portrait {made}")
        else:
            made = make(src, "public/images/life", name, [480, 960], 4 / 3, focus)
            print(f"{name}: landscape {made}")
    for src, slug, name in SCREENSHOTS:
        with Image.open(ROOT / src) as probe:
            w, h = probe.size
        widths = [800, w] if w > 900 else [w]
        made = make(src, f"public/images/work/{slug}", name, widths, None, None)
        print(f"{slug}/{name}: {w}x{h} {made}")


if __name__ == "__main__":
    run()
