import sys
from PIL import Image
import numpy as np

def find_offset():
    try:
        im1 = Image.open('public/images/DigF1.jpeg').convert('L')
        im2 = Image.open('public/images/DigF2.jpeg').convert('L')
        
        arr1 = np.array(im1)
        arr2 = np.array(im2)
        
        h1, w1 = arr1.shape
        h2, w2 = arr2.shape
        
        scale = 0.1
        # Use simple near neighbor to avoid shape calculation rounding issues
        im1_sm = im1.resize((int(w1 * scale), int(h1 * scale)), Image.Resampling.NEAREST)
        im2_sm = im2.resize((int(w2 * scale), int(h2 * scale)), Image.Resampling.NEAREST)
        
        a1 = np.array(im1_sm).astype(float)
        a2 = np.array(im2_sm).astype(float)
        
        patch_h = int(a1.shape[0] * 0.4)
        patch_w = int(a1.shape[1] * 0.4)
        
        cy1, cx1 = a1.shape[0]//2, a1.shape[1]//2
        # Ensure patch is exactly patch_h by patch_w
        patch = a1[cy1-patch_h//2:cy1-patch_h//2+patch_h, cx1-patch_w//2:cx1-patch_w//2+patch_w]
        
        best_diff = float('inf')
        best_dy, best_dx = 0, 0
        
        for y in range(0, a2.shape[0] - patch_h, 2):
            for x in range(0, a2.shape[1] - patch_w, 2):
                window = a2[y:y+patch_h, x:x+patch_w]
                if window.shape == patch.shape:
                    diff = np.mean(np.abs(window - patch))
                    if diff < best_diff:
                        best_diff = diff
                        best_dy = y
                        best_dx = x
                        
        cy2 = best_dy + patch_h//2
        cx2 = best_dx + patch_w//2
        
        dy_sm = cy1 - cy2
        dx_sm = cx1 - cx2
        
        dy = dy_sm / scale
        dx = dx_sm / scale
        
        print(f"ALIGN_DX: {dx}")
        print(f"ALIGN_DY: {dy}")
        
    except Exception as e:
        print(f"ERROR: {e}")

if __name__ == '__main__':
    find_offset()
