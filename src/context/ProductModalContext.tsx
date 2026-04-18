"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ProductModalContextValue {
  openProductId: string | null;
  openProduct: (id: string) => void;
  closeProduct: () => void;
}

const ProductModalContext = createContext<ProductModalContextValue>({
  openProductId: null,
  openProduct: () => {},
  closeProduct: () => {},
});

export function ProductModalProvider({ children }: { children: ReactNode }) {
  const [openProductId, setOpenProductId] = useState<string | null>(null);

  const openProduct = useCallback((id: string) => setOpenProductId(id), []);
  const closeProduct = useCallback(() => setOpenProductId(null), []);

  return (
    <ProductModalContext.Provider value={{ openProductId, openProduct, closeProduct }}>
      {children}
    </ProductModalContext.Provider>
  );
}

export function useProductModal() {
  return useContext(ProductModalContext);
}
