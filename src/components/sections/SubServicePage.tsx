"use client";

import Image from "next/image";
import Link from "next/link";

export interface SubServiceProduct {
  name: string;
  description: string;
  website?: string;         // e.g. "www.pilaros.net"
  presentationHref?: string; // link to PDF/presentation — "#" until file is ready
  accent: string;
}

export interface SubServiceData {
  number: string;
  title: string;
  tagline: string;
  accent: string;
  image: string;
  pillarTitle: string;
  pillarHref: string;
  whatWeDo?: {
    intro?: string;
    items?: { heading: string; body: string }[];
  };
  objectFit?: "cover" | "contain"; // optional override for hero image
  products?: SubServiceProduct[];
}

export default function SubServicePage({ data }: { data: SubServiceData }) {
  return (
    <div style={{ background: "#000", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>

      {/* ── HERO IMAGE ──────────────────────────────────────────────────── */}
      <div style={{ position: "relative", height: "70vh" }}>
        <Image
          src={data.image}
          alt={data.title}
          fill
          priority
          style={{ objectFit: data.objectFit || "cover", objectPosition: "center" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              linear-gradient(to right, #000 0%, transparent 35%),
              linear-gradient(to left, #000 0%, transparent 35%),
              linear-gradient(to bottom, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.5) 17%, #0000 37%, #000 100%)
            `,
          }}
        />

        {/* Back button */}
        <div style={{ position: "absolute", top: "5rem", left: "3rem", zIndex: 10 }}>
          <Link
            href={data.pillarHref}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "rgba(255,255,255,0.7)",
              fontSize: "12px",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "999px",
              padding: "0.3rem 0.9rem",
              backdropFilter: "blur(8px)",
              background: "rgba(0,0,0,0.3)",
            }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {data.pillarTitle}
          </Link>
        </div>

        {/* Hero text */}
        <div style={{ position: "absolute", bottom: "2.5rem", left: "3rem", right: "3rem", zIndex: 10 }}>
          <span
            style={{
              display: "inline-block",
              background: `${data.accent}22`,
              border: `1px solid ${data.accent}50`,
              borderRadius: "999px",
              padding: "0.2rem 0.75rem",
              color: data.accent,
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.16em",
              marginBottom: "0.75rem",
            }}
          >
            {data.number}
          </span>
          <h1
            style={{
              color: "#ffffff",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              fontFamily: "'DM Serif Display', serif",
              marginBottom: "0.75rem",
            }}
          >
            {data.title}
          </h1>
          <p style={{ color: data.accent, fontSize: "14px", fontWeight: 600, letterSpacing: "0.06em" }}>
            {data.tagline}
          </p>
        </div>
      </div>

      {/* ── WHAT WE DO ──────────────────────────────────────────────────── */}
      <div style={{ maxWidth: "860px", margin: "0 auto", padding: "5rem 3rem 4rem" }}>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2.5rem" }}>
          <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${data.accent}, transparent)`, borderRadius: "2px" }} />
          <span style={{ color: data.accent, fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em" }}>
            WHAT WE DO
          </span>
        </div>

        {data.whatWeDo?.intro && (
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "3rem" }}>
            {data.whatWeDo.intro}
          </p>
        )}

        {data.whatWeDo?.items && data.whatWeDo.items.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {data.whatWeDo.items.map((item, i) => (
              <div key={i} style={{ borderLeft: `2px solid ${data.accent}40`, paddingLeft: "1.75rem" }}>
                <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 600, fontFamily: "'DM Serif Display', serif", marginBottom: "0.6rem" }}>
                  {item.heading}
                </h3>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "15px", lineHeight: 1.75 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ borderRadius: "12px", border: `1px dashed ${data.accent}30`, padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "14px" }}>
              Content coming soon — this section will explain what ARDICTECH does for{" "}
              <strong style={{ color: data.accent }}>{data.title}</strong>.
            </p>
          </div>
        )}
      </div>

      {/* ── OUR PRODUCTS ────────────────────────────────────────────────── */}
      {data.products && data.products.length > 0 && (
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "0 3rem 6rem" }}>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "3rem", marginBottom: "2.5rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: "36px", height: "2px", background: `linear-gradient(90deg, ${data.accent}, transparent)`, borderRadius: "2px" }} />
              <span style={{ color: data.accent, fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em" }}>
                OUR SECURITY PRODUCTS
              </span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {data.products.map((product, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "2rem",
                  background: `${product.accent}08`,
                  border: `1px solid ${product.accent}25`,
                  borderRadius: "14px",
                  padding: "1.75rem 2rem",
                  flexWrap: "wrap",
                }}
              >
                {/* Product info */}
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3 style={{ color: "#ffffff", fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.35rem", fontFamily: "'DM Serif Display', serif" }}>
                    {product.name}
                  </h3>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.6, marginBottom: "0.6rem" }}>
                    {product.description}
                  </p>
                  {product.website && (
                    <a
                      href={`https://${product.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: product.accent,
                        fontSize: "12px",
                        fontWeight: 600,
                        letterSpacing: "0.06em",
                        textDecoration: "none",
                        borderBottom: `1px solid ${product.accent}50`,
                        paddingBottom: "1px",
                      }}
                    >
                      {product.website} ↗
                    </a>
                  )}
                </div>

                {/* CTA */}
                {product.presentationHref && (
                  <Link
                    href={product.presentationHref}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.5rem",
                      background: `${product.accent}18`,
                      border: `1px solid ${product.accent}60`,
                      borderRadius: "8px",
                      color: product.accent,
                      fontSize: "12px",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {product.name}
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
