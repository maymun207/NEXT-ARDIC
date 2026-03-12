"""
============================================================================
get_color.py — Image Corner Color Extractor
============================================================================

Extracts the dominant background color from an image by averaging the
RGB values of its four corner pixels. Useful for matching HTML/CSS
background colors to image edges for seamless visual integration.

Dependencies:
    pip install Pillow

Usage:
    python scripts/design/get_color.py

    Or import in another script:
        from get_color import get_corner_color
        hex_color = get_corner_color("/path/to/image.png")

Output:
    Prints a hex color string, e.g. #1a1a2e

============================================================================
"""

from PIL import Image


def get_corner_color(image_path: str) -> str:
    """
    Extract the average color of an image's four corners.

    Reads the pixel color at each corner (top-left, top-right,
    bottom-left, bottom-right), averages the RGB channels, and
    returns a hex color string.

    Args:
        image_path: Absolute path to the image file.

    Returns:
        A hex color string, e.g. '#1a1a2e'.
    """
    img = Image.open(image_path).convert('RGB')
    width, height = img.size

    # Get colors of the four corners
    corners = [
        img.getpixel((0, 0)),
        img.getpixel((width - 1, 0)),
        img.getpixel((0, height - 1)),
        img.getpixel((width - 1, height - 1))
    ]

    # Average the colors across all four corners
    avg_color = tuple(sum(col) // 4 for col in zip(*corners))
    return '#{:02x}{:02x}{:02x}'.format(*avg_color)


if __name__ == "__main__":
    # Default path — update to match your local image location
    path = "public/images/journey-flow-v3.png"
    print(get_corner_color(path))
