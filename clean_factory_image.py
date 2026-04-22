from PIL import Image, ImageDraw

img_path = 'public/images/tech-map/digital_factory_page_1.png'
out_path = 'public/images/tech-map/factory_clean.png'

print(f"Processing {img_path}...")
try:
    img = Image.open(img_path)
    w, h = img.size
    print(f"Original size: {w}x{h}")
    
    draw = ImageDraw.Draw(img)
    # The text is in the top left. We will draw a white rectangle over it.
    # Adjusting coordinates to cover the top 25% of height and left 60% of width.
    # The 3D factory line goes from bottom-left to top-right, so top-left is empty except for text.
    draw.rectangle([0, 0, int(w * 0.6), int(h * 0.25)], fill="white")
    
    img.save(out_path)
    print(f"Saved cleaned image to {out_path}")
except Exception as e:
    print(f"Error: {e}")
