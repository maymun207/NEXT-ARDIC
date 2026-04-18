"use client";

import { ProductModalProvider } from "@/context/ProductModalContext";
import ProductModal from "@/components/ui/ProductModal";
import type { ReactNode } from "react";

export default function ProductModalWrapper({ children }: { children: ReactNode }) {
  return (
    <ProductModalProvider>
      {children}
      <ProductModal />
    </ProductModalProvider>
  );
}
