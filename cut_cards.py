#!/usr/bin/env python3
"""
cut_cards.py
============
Removes the white/light-gray backgrounds from the glass card JPEGs
and saves them as transparent PNGs ready for use in the web page.

Method: border-seeded flood-fill.
  - Seeds pixels from every edge of the image.
  - Any pixel that is "near white" AND reachable from the border
    (without crossing the glass card edge) is made transparent.
  - A small feather pass blends the cut edge for a smooth result.
"""

from pathlib import Path
from collections import deque
import numpy as np
from PIL import Image, ImageFilter

# ── Config ─────────────────────────────────────────────────────────────────
IMAGE_DIR  = Path("/Users/hulyakahveci/Desktop/NEXT ARDIC/Building ARDIC AGAIN/public/images")
CARDS      = ["IoTcard.jpeg", "AIoTcard.jpeg", "AIcard.jpeg"]
THRESHOLD  = 22    # color distance from border-seed color to classify as background
MIN_BRIGHT = 200   # only seed from pixels brighter than this (to avoid dark glass edges)
FEATHER    = 1     # radius of edge-smoothing blur (pixels)

# ── Core functions ──────────────────────────────────────────────────────────

def flood_fill_mask(rgb: np.ndarray, threshold: int, min_bright: int) -> np.ndarray:
    """
    BFS flood-fill from every border pixel that is 'near white'.
    Returns a boolean mask of background pixels.
    """
    h, w = rgb.shape[:2]
    visited = np.zeros((h, w), dtype=bool)
    bg_mask = np.zeros((h, w), dtype=bool)
    queue   = deque()

    # Seed from all four edges
    border_coords = (
        [(0, x) for x in range(w)]          # top row
      + [(h-1, x) for x in range(w)]        # bottom row
      + [(y, 0) for y in range(1, h-1)]     # left col
      + [(y, w-1) for y in range(1, h-1)]   # right col
    )

    for y, x in border_coords:
        if visited[y, x]:
            continue
        pixel = rgb[y, x].astype(int)
        if pixel.min() >= min_bright:        # must be a light pixel to be background
            queue.append((y, x))
            visited[y, x] = True
            bg_mask[y, x] = True

    # 4-directional BFS
    while queue:
        y, x = queue.popleft()
        ref = rgb[y, x].astype(int)
        for dy, dx in [(-1,0),(1,0),(0,-1),(0,1)]:
            ny, nx = y+dy, x+dx
            if ny < 0 or ny >= h or nx < 0 or nx >= w:
                continue
            if visited[ny, nx]:
                continue
            visited[ny, nx] = True
            neighbor = rgb[ny, nx].astype(int)
            # Accept if close to current pixel AND bright enough
            if np.max(np.abs(neighbor - ref)) < threshold and neighbor.min() >= min_bright - 20:
                bg_mask[ny, nx] = True
                queue.append((ny, nx))

    return bg_mask


def feather_alpha(alpha: np.ndarray, radius: int) -> np.ndarray:
    """Slightly blur the alpha channel to smooth the cut edge."""
    img_a = Image.fromarray(alpha)
    img_a = img_a.filter(ImageFilter.GaussianBlur(radius=radius))
    return np.array(img_a)


def process_card(input_path: Path, output_path: Path) -> None:
    print(f"  Processing  {input_path.name} …", end=" ", flush=True)

    img  = Image.open(input_path).convert("RGBA")
    arr  = np.array(img)
    rgb  = arr[:, :, :3]

    bg   = flood_fill_mask(rgb, THRESHOLD, MIN_BRIGHT)

    # Build alpha: 0 = transparent (background), 255 = opaque (card)
    alpha = np.where(bg, np.uint8(0), np.uint8(255))

    if FEATHER > 0:
        alpha = feather_alpha(alpha, FEATHER)

    arr[:, :, 3] = alpha
    Image.fromarray(arr).save(output_path, "PNG")
    print(f"→  {output_path.name}  ✓")


# ── Run ─────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    print("\n🔪  Glass card background removal\n")
    for card in CARDS:
        inp = IMAGE_DIR / card
        out = IMAGE_DIR / card.replace(".jpeg", "_transparent.png")
        process_card(inp, out)
    print("\n✅  Done. Transparent PNGs saved to public/images/\n")
