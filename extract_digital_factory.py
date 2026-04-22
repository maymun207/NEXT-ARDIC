import fitz  # PyMuPDF
import os

pdf_path = "docs/Digital FActory image .pdf"
output_dir = "public/images/tech-map"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

print(f"Opening '{pdf_path}'...")
try:
    doc = fitz.open(pdf_path)
    
    # 4x zoom is roughly 300 DPI (72 * 4 = 288 DPI)
    zoom_x = 4.0  
    zoom_y = 4.0
    mat = fitz.Matrix(zoom_x, zoom_y)
    
    # Extract all pages since we don't know exactly what's inside
    for i in range(len(doc)):
        print(f"Extracting Page {i+1} at 4x resolution...")
        page = doc[i]
        pix = page.get_pixmap(matrix=mat, alpha=False)
        output_path = os.path.join(output_dir, f"digital_factory_page_{i+1}.png")
        pix.save(output_path)
        print(f"Saved {output_path}")
        
    doc.close()
    print("All pages extracted successfully!")
except Exception as e:
    print(f"Error: {e}")
