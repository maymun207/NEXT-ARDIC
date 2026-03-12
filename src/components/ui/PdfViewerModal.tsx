"use client";

import { useState, useEffect, useCallback } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface PdfViewerModalProps {
    isOpen: boolean;
    onClose: () => void;
    pdfUrl: string;
}

export default function PdfViewerModal({ isOpen, onClose, pdfUrl }: PdfViewerModalProps) {
    const [numPages, setNumPages] = useState<number>(0);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [renderedPageNumber, setRenderedPageNumber] = useState<number | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>(800);

    // The new page is loading if it differs from the rendered one
    const isNewPageLoading = renderedPageNumber !== null && renderedPageNumber !== pageNumber;

    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);
        setPageNumber(1);
        setRenderedPageNumber(null);
    }

    const goToPrevPage = useCallback(() => {
        setPageNumber((prev) => Math.max(prev - 1, 1));
    }, []);

    const goToNextPage = useCallback(() => {
        setPageNumber((prev) => Math.min(prev + 1, numPages));
    }, [numPages]);

    // Keyboard navigation
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") goToPrevPage();
            else if (e.key === "ArrowRight") goToNextPage();
            else if (e.key === "Escape") onClose();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, goToPrevPage, goToNextPage, onClose]);

    // Responsive width
    useEffect(() => {
        if (!isOpen) return;

        const updateWidth = () => {
            const maxWidth = Math.min(window.innerWidth * 0.85, 1100);
            setContainerWidth(maxWidth);
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [isOpen]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={onClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md animate-[fadeIn_0.3s_ease-out]" />

            {/* Modal Content */}
            <div
                className="relative z-10 flex flex-col items-center gap-6 animate-[scaleIn_0.3s_ease-out]"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute -top-2 -right-2 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white/70 backdrop-blur-sm transition-all hover:bg-white/10 hover:text-white hover:border-white/40 cursor-pointer"
                    aria-label="Close PDF viewer"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* PDF Page Container */}
                <div
                    className="overflow-hidden rounded-xl border border-white/10 bg-neutral-900 shadow-[0_0_80px_rgba(0,0,0,0.6)] relative"
                    style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                    <Document
                        file={pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={
                            <div className="flex h-[60vh] items-center justify-center bg-neutral-900" style={{ width: containerWidth }}>
                                <div className="flex flex-col items-center gap-4">
                                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                                    <p className="text-sm text-neutral-400">Loading document…</p>
                                </div>
                            </div>
                        }
                        error={
                            <div className="flex h-[60vh] items-center justify-center bg-neutral-900" style={{ width: containerWidth }}>
                                <p className="text-sm text-red-400">Failed to load PDF.</p>
                            </div>
                        }
                    >
                        {/*
                          Double-buffer technique:
                          1. Always render the OLD page visibly (it stays on screen)
                          2. Render the NEW page off-screen (opacity:0, pointer-events:none)
                          3. When new page fires onRenderSuccess, swap renderedPageNumber
                          4. Old page disappears, new page becomes visible — zero flash
                        */}

                        {/* OLD page: stays visible while new one loads */}
                        {isNewPageLoading && (
                            <div className="relative z-10">
                                <Page
                                    key={`visible-${renderedPageNumber}`}
                                    pageNumber={renderedPageNumber}
                                    width={containerWidth}
                                    renderTextLayer={false}
                                    renderAnnotationLayer={false}
                                />
                            </div>
                        )}

                        {/* NEW page: hidden until fully rendered */}
                        <div
                            style={{
                                position: isNewPageLoading ? 'absolute' : 'relative',
                                top: 0,
                                left: 0,
                                opacity: isNewPageLoading ? 0 : 1,
                                pointerEvents: isNewPageLoading ? 'none' : 'auto',
                                zIndex: isNewPageLoading ? -1 : 10,
                            }}
                        >
                            <Page
                                key={`target-${pageNumber}`}
                                pageNumber={pageNumber}
                                width={containerWidth}
                                renderTextLayer={true}
                                renderAnnotationLayer={true}
                                onRenderSuccess={() => setRenderedPageNumber(pageNumber)}
                            />
                        </div>
                    </Document>
                </div>

                {/* Navigation Bar */}
                <div className="flex items-center gap-6 rounded-full border border-white/10 bg-black/80 px-6 py-3 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    {/* Prev Button */}
                    <button
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/15 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        aria-label="Previous page"
                    >
                        <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page Counter */}
                    <div className="flex items-center gap-2 select-none">
                        <span className="text-lg font-bold text-white tabular-nums">{pageNumber}</span>
                        <span className="text-sm text-neutral-500">/</span>
                        <span className="text-lg font-bold text-neutral-400 tabular-nums">{numPages}</span>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all hover:bg-white/15 hover:border-white/30 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                        aria-label="Next page"
                    >
                        <ChevronRight className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Keyframe animations */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        /* Force react-pdf internals to use dark bg — prevents white flash */
        .react-pdf__Page {
          background: #171717 !important;
        }
        .react-pdf__Page__canvas {
          background: #171717 !important;
        }
        .react-pdf__Document {
          background: #171717 !important;
        }
      `}</style>
        </div>
    );
}
