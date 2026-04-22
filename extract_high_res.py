import fitz  # PyMuPDF
import os

pdf_path = "docs/The_Industrial_Organism_(2).pdf"
output_dir = "public/images/tech-map"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# The slides we need (0-indexed, so subtract 1 from the slide number)
# Slide 4 -> Index 3
# Slide 5 -> Index 4
# Slide 6 -> Index 5
# Slide 8 -> Index 7
# Slide 9 -> Index 8
# Slide 12 -> Index 11
slides_to_extract = {
    4: 3,
    5: 4,
    6: 5,
    8: 7,
    9: 8,
    12: 11
}

print(f"Opening {pdf_path}...")
try:
    doc = fitz.open(pdf_path)
    
    # 4x zoom is roughly 300 DPI (72 * 4 = 288 DPI)
    zoom_x = 4.0  
    zoom_y = 4.0
    mat = fitz.Matrix(zoom_x, zoom_y)
    
    for slide_num, page_index in slides_to_extract.items():
        print(f"Extracting Slide {slide_num} (Page Index {page_index}) at 4x resolution...")
        page = doc[page_index]
        pix = page.get_pixmap(matrix=mat, alpha=False)
        output_path = os.path.join(output_dir, f"extracted_slide_{slide_num}.png")
        pix.save(output_path)
        print(f"Saved {output_path}")
        
    doc.close()
    print("All requested slides extracted successfully at high resolution!")
except Exception as e:
    print(f"Error: {e}")
