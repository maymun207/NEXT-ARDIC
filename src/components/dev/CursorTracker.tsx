"use client";

import { useEffect, useState, useRef, useCallback } from "react";

interface CursorPos {
  x: number;
  y: number;
  xPct: number;
  yPct: number;
  clicked: { x: number; y: number } | null;
}

export default function CursorTracker() {
  const [pos, setPos] = useState<CursorPos>({ x: 0, y: 0, xPct: 0, yPct: 0, clicked: null });
  const [visible, setVisible] = useState(true);

  // Panel position — starts bottom-right
  const [panelPos, setPanelPos] = useState({ x: -1, y: -1 }); // -1 = use default bottom/right anchor
  const dragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const panelRef = useRef<HTMLDivElement>(null);

  // Track cursor
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos((p) => ({
        ...p,
        x: e.clientX,
        y: e.clientY,
        xPct: Math.round((e.clientX / window.innerWidth) * 100),
        yPct: Math.round((e.clientY / window.innerHeight) * 100),
      }));

      if (dragging.current) {
        setPanelPos({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      }
    };
    const onUp = () => { dragging.current = false; };
    const onClick = (e: MouseEvent) => {
      if (!dragging.current) {
        setPos((p) => ({ ...p, clicked: { x: e.clientX, y: e.clientY } }));
      }
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("click", onClick);
    };
  }, []);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const rect = panelRef.current?.getBoundingClientRect();
    if (rect) {
      dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      // Lock position on first drag
      if (panelPos.x === -1) {
        setPanelPos({ x: rect.left, y: rect.top });
      }
    }
  }, [panelPos]);

  // Compute style: use free position if dragged, otherwise default anchor
  const posStyle: React.CSSProperties = panelPos.x === -1
    ? { bottom: 16, right: 16 }
    : { top: panelPos.y, left: panelPos.x };

  if (!visible) {
    return (
      <button
        onClick={() => setVisible(true)}
        style={{
          position: "fixed", bottom: 16, right: 16, zIndex: 99999,
          background: "#0f172a", color: "#38bdf8",
          border: "1px solid #38bdf8", borderRadius: 8,
          padding: "4px 10px", fontSize: 11, fontFamily: "monospace",
          cursor: "pointer", opacity: 0.8, pointerEvents: "all",
        }}
      >
        📍 Tracker
      </button>
    );
  }

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        ...posStyle,
        zIndex: 99999,
        background: "rgba(10, 15, 28, 0.93)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(56, 189, 248, 0.3)",
        borderRadius: 12,
        padding: "10px 14px",
        fontFamily: "monospace",
        fontSize: 12,
        color: "#e2e8f0",
        minWidth: 210,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        userSelect: "none",
        pointerEvents: "none",  // pass clicks through to the page by default
      }}
    >
      {/* ── Drag handle (re-enables pointer events just for the header) ── */}
      <div
        onMouseDown={onDragStart}
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          marginBottom: 8, cursor: "grab", pointerEvents: "all",
        }}
      >
        <span style={{ color: "#38bdf8", fontWeight: "bold", fontSize: 11, letterSpacing: 1 }}>
          ⠿ CURSOR TRACKER
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setVisible(false); }}
          style={{
            pointerEvents: "all", background: "none", border: "none",
            color: "#64748b", cursor: "pointer", fontSize: 13, lineHeight: 1,
            paddingLeft: 8,
          }}
          title="Hide"
        >
          ✕
        </button>
      </div>

      {/* Live position */}
      <Row label="X" value={`${pos.x} px`} color="#a78bfa" />
      <Row label="Y" value={`${pos.y} px`} color="#a78bfa" />
      <Row label="X %" value={`${pos.xPct}%`} color="#34d399" />
      <Row label="Y %" value={`${pos.yPct}%`} color="#34d399" />

      <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", margin: "8px 0" }} />

      <div style={{ color: "#64748b", fontSize: 10, marginBottom: 4 }}>LAST CLICK</div>
      {pos.clicked ? (
        <>
          <Row label="X" value={`${pos.clicked.x} px`} color="#fb923c" />
          <Row label="Y" value={`${pos.clicked.y} px`} color="#fb923c" />
        </>
      ) : (
        <div style={{ color: "#475569", fontSize: 11 }}>click anywhere…</div>
      )}
    </div>
  );
}

function Row({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16, lineHeight: "1.8" }}>
      <span style={{ color: "#64748b" }}>{label}</span>
      <span style={{ color, fontWeight: "bold" }}>{value}</span>
    </div>
  );
}
