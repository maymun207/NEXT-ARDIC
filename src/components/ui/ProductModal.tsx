"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useProductModal } from "@/context/ProductModalContext";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES
   ───────────────────────────────────────────────────────────────────────────── */

interface Slide {
  title: string;
  subtitle?: string;
  type: "overview" | "features" | "architecture" | "value" | "metrics" | "cta" | "usecase";
  content: string;
  bullets?: string[];
  stats?: { value: string; label: string }[];
  icon?: string;
}

interface ProductData {
  id: string;
  name: string;
  tag: string;
  tagline: string;
  description: string;
  accentColor: string;
  gradientFrom: string;
  gradientTo: string;
  slides: Slide[];
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRODUCT DATA — 9 products × 6-7 slides
   ───────────────────────────────────────────────────────────────────────────── */

const PRODUCTS_DATA: ProductData[] = [
  /* ── 1. ArCloud ── */
  {
    id: "arcloud",
    name: "ArCloud",
    tag: "Cloud Infrastructure",
    tagline: "Geographically distributed, enterprise-grade cloud at the scale of industry.",
    description:
      "ArCloud is ARDICTECH's managed cloud infrastructure layer — purpose-built for industrial workloads that demand availability, sovereignty, and performance at scale. Host entire platform ecosystems, not just applications.",
    accentColor: "#3b82f6",
    gradientFrom: "#050d1a",
    gradientTo: "#0d254a",
    slides: [
      {
        title: "What Is ArCloud?",
        type: "overview",
        icon: "☁",
        content:
          "ArCloud is ARDICTECH's fully managed cloud infrastructure service — designed specifically for industrial and enterprise deployments. Unlike generic cloud providers, ArCloud is optimized for the latency, sovereignty, and compliance demands of manufacturing, logistics, and critical infrastructure sectors.",
        bullets: [
          "Multi-region, geographically distributed infrastructure",
          "Managed hosting for ARDICTECH platforms (IoT-Ignite, ArMES, ArAI)",
          "Enterprise SLA with 99.99% uptime guarantee",
          "Data residency compliance (GDPR, KVKK, local regulations)",
        ],
      },
      {
        title: "Core Infrastructure Capabilities",
        type: "features",
        icon: "⚙",
        content: "ArCloud delivers the full stack of cloud primitives — purpose-tuned for industrial data volumes and security requirements.",
        bullets: [
          "Compute clusters auto-scaling to demand spikes",
          "Industrial-grade blob & time-series storage",
          "Private VPN tunneling to factory floors",
          "Managed Kubernetes orchestration (no ops overhead)",
          "Hybrid cloud — connect on-premise OT networks seamlessly",
          "Zero-trust network architecture as standard",
        ],
      },
      {
        title: "How ArCloud Works",
        type: "architecture",
        icon: "🏗",
        content:
          "ArCloud acts as the backbone layer connecting your edge devices and factory floor to ARDICTECH's intelligent software stack. Data flows securely upward from sensors through edge gateways into ArCloud's processing layer, then outputs to dashboards, AI models, and enterprise applications.",
        bullets: [
          "Edge → ArCloud Gateway → Processing Layer → Applications",
          "Encrypted data in-transit and at-rest (AES-256)",
          "Regional failover ensures continuity during outages",
          "API-first: connect any external system via REST or GraphQL",
        ],
      },
      {
        title: "Industrial Use Cases",
        type: "usecase",
        icon: "🏭",
        content: "ArCloud powers the most demanding industrial scenarios where uptime, data volume, and security are non-negotiable.",
        bullets: [
          "Real-time machine telemetry from 10,000+ IoT sensors",
          "Multi-site manufacturing dashboards with sub-second refresh",
          "Predictive maintenance AI model hosting & inference",
          "Regulatory audit trail storage with blockchain anchoring",
          "Workforce mobility apps served at global edge locations",
        ],
      },
      {
        title: "Business Value",
        type: "value",
        icon: "📈",
        content: "Switching to ArCloud eliminates the hidden costs of DIY cloud management — while delivering measurably better performance for industrial workloads.",
        stats: [
          { value: "60%", label: "Lower cloud ops cost vs. self-managed" },
          { value: "99.99%", label: "Uptime SLA guarantee" },
          { value: "3×", label: "Faster deployment of new platform features" },
          { value: "100%", label: "Data sovereignty & compliance assured" },
        ],
      },
      {
        title: "Security & Compliance",
        type: "features",
        icon: "🔒",
        content: "ArCloud was built from the ground up with security and regulatory compliance as core design principles — not afterthoughts.",
        bullets: [
          "ISO 27001 and SOC 2 Type II certified infrastructure",
          "GDPR & KVKK compliant data processing and storage",
          "End-to-end encryption for all data in motion and at rest",
          "Role-based access with MFA enforced at all layers",
          "Penetration-tested quarterly by independent auditors",
        ],
      },
      {
        title: "Get Started with ArCloud",
        type: "cta",
        icon: "🚀",
        content:
          "Whether you're migrating an existing deployment or starting fresh, our cloud architects will design a topology that fits your compliance requirements, data volumes, and growth trajectory. Book a technical scoping call — typically 45 minutes.",
        bullets: [
          "Free infrastructure assessment included",
          "Migration support with zero-downtime transition",
          "Flexible pricing: reserved, on-demand, or hybrid",
        ],
      },
    ],
  },

  /* ── 2. ARICAAS ── */
  {
    id: "aricaas",
    name: "ARICAAS",
    tag: "Security as a Service",
    tagline: "Identity, Context, Authentication, Authorization and Audit — as a composable service.",
    description:
      "ARICAAS delivers enterprise security as a modular, composable layer that can wrap any existing application or platform. Stop building auth from scratch — consume battle-tested identity infrastructure via API.",
    accentColor: "#f59e0b",
    gradientFrom: "#1a1200",
    gradientTo: "#2e2000",
    slides: [
      {
        title: "What Is ARICAAS?",
        type: "overview",
        icon: "🛡",
        content:
          "ARICAAS stands for Identity, Context, Authentication, Authorization and Audit As A Service. It is ARDICTECH's composable security platform — enabling any application or workflow to consume enterprise-grade identity and access management via clean APIs, without rebuilding security infrastructure from scratch.",
        bullets: [
          "Identity federation: SSO, SAML 2.0, OIDC support",
          "Contextual access decisions (device, location, behavior)",
          "Fine-grained authorization: attribute-based access control (ABAC)",
          "Tamper-proof audit log for every access event",
        ],
      },
      {
        title: "The 5 Pillars of ARICAAS",
        type: "features",
        icon: "5️⃣",
        content: "Each pillar of ARICAAS can be consumed independently or as a unified stack — depending on your security maturity.",
        bullets: [
          "I — Identity: Unified user directory, lifecycle management",
          "C — Context: Risk signals (geo, device posture, behavior)",
          "A — Authentication: MFA, biometrics, passwordless",
          "A — Authorization: RBAC + ABAC policy engine",
          "S — Audit: Immutable, searchable event logs",
        ],
      },
      {
        title: "How It Integrates",
        type: "architecture",
        icon: "⚙",
        content:
          "ARICAAS acts as a security proxy layer in front of your applications. Any service — mobile app, web portal, API endpoint — can delegate its entire authentication and authorization flow to ARICAAS via a single SDK or API call.",
        bullets: [
          "SDK available for iOS, Android, Web, and server-side",
          "Reverse-proxy mode: zero code changes to existing apps",
          "Policy rules defined in a no-code visual editor",
          "Real-time session revocation within 200ms globally",
        ],
      },
      {
        title: "Industrial Security Use Cases",
        type: "usecase",
        icon: "🏭",
        content: "Security in industrial environments has unique requirements — ARICAAS is purpose-built to handle them.",
        bullets: [
          "Factory floor access: operator roles with shift-specific permissions",
          "Remote support: time-limited, scoped access for field engineers",
          "Machine-to-machine authentication for IoT device networks",
          "Executive dashboards: MFA + IP-restricted access",
          "Compliance reporting: one-click GDPR and ISO 27001 audit exports",
        ],
      },
      {
        title: "Zero Trust Architecture",
        type: "features",
        icon: "🔐",
        content: "ARICAAS enforces Zero Trust principles natively — never trusting, always verifying, at every request.",
        bullets: [
          "No implicit trust for any user, device, or network",
          "Continuous verification throughout session lifetime",
          "Micro-segmentation: limit blast radius of any breach",
          "Behavioral anomaly detection triggers re-authentication",
          "Secrets management: API keys and credentials vaulted securely",
        ],
      },
      {
        title: "Business Value",
        type: "metrics",
        icon: "📊",
        content: "Security breaches in industrial environments cost on average $4.7M. ARICAAS dramatically reduces your attack surface and compliance overhead.",
        stats: [
          { value: "90%", label: "Reduction in unauthorized access incidents" },
          { value: "4 hrs", label: "Average integration time per application" },
          { value: "$4.7M", label: "Average cost of industrial breach avoided" },
          { value: "100%", label: "Audit trail coverage across all systems" },
        ],
      },
      {
        title: "Ready to Secure Your Operations?",
        type: "cta",
        icon: "🔑",
        content:
          "Our security architects will assess your current identity posture and map a tailored ARICAAS deployment plan. Implementation typically takes days, not months. Book a security review today.",
        bullets: [
          "Free access policy audit included",
          "Proof-of-concept deployment in 48 hours",
          "Dedicated security engineer throughout onboarding",
        ],
      },
    ],
  },

  /* ── 3. PilarOS & Afex ── */
  {
    id: "pilaros",
    name: "PilarOS & AFEX",
    tag: "Mobile OS & Security",
    tagline: "Turkey's sovereign mobile operating system — built on Android AOSP with enterprise-hardened security.",
    description:
      "PilarOS is a domestically developed mobile OS built on Android AOSP, enhanced by AFEX (Android Framework Extension) — a security framework offering full device sovereignty, deep policy control, and protection from supply chain threats.",
    accentColor: "#1e40af",
    gradientFrom: "#05091a",
    gradientTo: "#0a1540",
    slides: [
      {
        title: "What Is PilarOS?",
        type: "overview",
        icon: "📱",
        content:
          "PilarOS is a domestically engineered mobile operating system built on Android AOSP (Android Open Source Project), developed in Turkey for sovereign use cases. It is designed for government agencies, critical infrastructure operators, and enterprises that cannot risk foreign-controlled OS components on their devices.",
        bullets: [
          "Built on Android AOSP — familiar UX, sovereign control",
          "No Google Play Services dependency",
          "Full source code auditability by the deploying organization",
          "Certified by Turkish national security authorities",
        ],
      },
      {
        title: "AFEX: The Security Framework",
        type: "features",
        icon: "🔰",
        content:
          "AFEX (Android Framework Extension) is ARDICTECH's proprietary security layer that extends stock AOSP with enterprise-hardened capabilities unavailable in standard Android distributions.",
        bullets: [
          "Kernel-level app sandboxing beyond standard Android",
          "Hardware security module (HSM) integration",
          "Silent policy enforcement — users cannot bypass controls",
          "Encrypted inter-process communication (IPC)",
          "Anti-tampering: boot chain verification at every restart",
          "Remote wipe with cryptographic key destruction",
        ],
      },
      {
        title: "Centralized Device Management",
        type: "architecture",
        icon: "🖥",
        content:
          "PilarOS devices are managed through an integrated MDM console — giving IT administrators full visibility and control over every deployed device.",
        bullets: [
          "Zero-touch device enrollment via QR or bulk provisioning",
          "App allowlisting: only approved apps can run",
          "Network policy enforcement: split-tunnel VPN by default",
          "Real-time device health dashboard",
          "Geofencing: automatic policy change based on location",
        ],
      },
      {
        title: "Sovereign Use Case Scenarios",
        type: "usecase",
        icon: "🏛",
        content: "PilarOS / AFEX is deployed wherever digital sovereignty and operational security cannot be compromised.",
        bullets: [
          "Government mobile devices for classified communications",
          "Defense & military field operations",
          "Critical infrastructure control rooms",
          "Customs and border management agencies",
          "Banking field agents handling sensitive customer data",
        ],
      },
      {
        title: "Why Domestic OS Matters",
        type: "value",
        icon: "🌍",
        content:
          "Foreign-controlled operating systems introduce supply chain risk, covert telemetry, and unpredictable update policies. PilarOS eliminates these risks at the foundation level.",
        bullets: [
          "No foreign data collection embedded in the OS",
          "Update policy fully controlled by deploying organization",
          "No dependency on overseas approval processes",
          "Compliant with Turkish national cybersecurity directives",
          "Supports FIPS 140-2 certified cryptographic modules",
        ],
      },
      {
        title: "Key Metrics",
        type: "metrics",
        icon: "📊",
        content: "PilarOS is deployed at scale across Turkish government and enterprise environments.",
        stats: [
          { value: "100%", label: "Device sovereignty — no foreign control" },
          { value: "10K+", label: "Devices managed in active deployments" },
          { value: "0", label: "Known OS-level security breaches" },
          { value: "3 days", label: "Average mass deployment time" },
        ],
      },
      {
        title: "Deploy Sovereign Mobile Devices",
        type: "cta",
        icon: "🚀",
        content:
          "Whether you need to secure 50 or 50,000 devices, our team will configure PilarOS and AFEX to your exact security policies. A proof-of-concept deployment can be running within one week.",
        bullets: [
          "Hardware-agnostic: runs on certified Android devices",
          "Full customization of UI and allowed application set",
          "Training included for IT administrators",
        ],
      },
    ],
  },

  /* ── 4. Blockchain ── */
  {
    id: "blockchain",
    name: "BlockChain",
    tag: "Industrial Integrity",
    tagline: "Immutable audit trails and trustless data integrity for industrial operations.",
    description:
      "ARDICTECH's Blockchain layer provides factory-grade immutability for operational data — anchoring critical production records, supply chain events, and quality certifications to a tamper-proof distributed ledger.",
    accentColor: "#06b6d4",
    gradientFrom: "#031418",
    gradientTo: "#052530",
    slides: [
      {
        title: "What Is Industrial Blockchain?",
        type: "overview",
        icon: "⛓",
        content:
          "ARDICTECH's Blockchain module anchors critical industrial data to a distributed ledger, creating tamper-evident records that cannot be altered retroactively. Unlike cryptocurrency-focused chains, this is purpose-built for operational data integrity — production records, quality certifications, supply chain provenance, and compliance audit trails.",
        bullets: [
          "Permissioned blockchain: private, enterprise-controlled",
          "Anchor any data hash — production records, quality certs, sensor readings",
          "Immutable timestamping of every operational event",
          "Multi-party verification without a centralized authority",
        ],
      },
      {
        title: "Core Capabilities",
        type: "features",
        icon: "🧱",
        content: "The blockchain layer integrates directly with ArMES and IoT-Ignite data pipelines, automatically anchoring key records without manual intervention.",
        bullets: [
          "Automatic anchoring of production batch records",
          "Quality certificate issuance on-chain (verifiable by customers)",
          "Supply chain traceability: origin to delivery",
          "Smart contracts for automated compliance enforcement",
          "Cross-organization data sharing with provenance proof",
          "Hybrid on-chain/off-chain storage for cost efficiency",
        ],
      },
      {
        title: "How It Works",
        type: "architecture",
        icon: "🏗",
        content:
          "Critical data is hashed and anchored at the source — whether a production machine, quality scanner, or enterprise system. The hash, timestamp, and metadata are written to the ledger. The original data stays in fast storage; the chain holds the unforgeable fingerprint.",
        bullets: [
          "SHA-256 hashing at the point of data creation",
          "Block written within 3 seconds of event occurrence",
          "Multi-node consensus across geographically distributed validators",
          "Full audit trail queryable via REST API or visual explorer",
        ],
      },
      {
        title: "Industrial Use Cases",
        type: "usecase",
        icon: "🏭",
        content: "Blockchain integrity transforms trust relationships throughout the industrial value chain.",
        bullets: [
          "Pharmaceutical: batch record integrity for regulatory inspection",
          "Food & beverage: farm-to-fork traceability for recalls",
          "Automotive: parts provenance for warranty and liability",
          "Energy: carbon credit verification and renewable certificates",
          "Defense: supply chain integrity for sensitive components",
        ],
      },
      {
        title: "Compliance & Regulatory Value",
        type: "value",
        icon: "📋",
        content:
          "Regulators and auditors increasingly accept blockchain-anchored records as primary evidence of compliance — reducing audit preparation time from weeks to hours.",
        bullets: [
          "FDA 21 CFR Part 11 electronic records compliance",
          "EU GMP Annex 11 computerized system validation",
          "ISO 9001 quality management record integrity",
          "Carbon footprint reporting with third-party verifiable proof",
          "Customs and import/export documentation anchoring",
        ],
      },
      {
        title: "Business Metrics",
        type: "metrics",
        icon: "📈",
        content: "The ROI of blockchain-anchored data integrity comes from reduced fraud, faster audits, and supply chain dispute resolution.",
        stats: [
          { value: "85%", label: "Reduction in audit preparation time" },
          { value: "100%", label: "Tamper detection — any change is visible" },
          { value: "3 sec", label: "Time to anchor any operational record" },
          { value: "0", label: "Successful data tampering incidents at clients" },
        ],
      },
      {
        title: "Anchor Your Data Today",
        type: "cta",
        icon: "⛓",
        content:
          "We'll identify the 3 most critical data flows in your operation that need immutable integrity, and have a working blockchain anchor pilot running within 2 weeks. No previous blockchain experience required.",
        bullets: [
          "Plug-in integration with existing ArMES or ERP systems",
          "No cryptocurrency or token involvement",
          "Full ownership of your private ledger",
        ],
      },
    ],
  },

  /* ── 5. Modiverse ── */
  {
    id: "modiverse",
    name: "Modiverse",
    tag: "MDM SaaS",
    tagline: "The Ultimate Mobility Device Management Platform for industrial gateways and Android devices.",
    description:
      "Modiverse is a Mobile Device Management (MDM) service centrally controlling robust PilarOS/Android industrial gateways. Manage, secure, and monitor every device — utilizing AFEX for hardware-level control — from a single pane of glass.",
    accentColor: "#8b5cf6",
    gradientFrom: "#0e0920",
    gradientTo: "#1a1040",
    slides: [
      {
        title: "What Is Modiverse?",
        type: "overview",
        icon: "📲",
        content:
          "Modiverse is ARDICTECH's cloud-native MDM (Mobile Device Management) platform. It enables enterprises to enroll, configure, secure, and monitor every corporate mobile device — from a single web console, anywhere in the world. Available in Essential and Premium tiers to match the scale and complexity of any organization.",
        bullets: [
          "Unified management for iOS, Android, and PilarOS devices",
          "Over-the-air (OTA) configuration and app deployment",
          "Remote lock, wipe, and support capabilities",
          "Policy enforcement: WiFi, VPN, camera, app restrictions",
        ],
      },
      {
        title: "Platform Features",
        type: "features",
        icon: "🛠",
        content: "Modiverse delivers the complete MDM feature set required by enterprise IT and operational technology teams.",
        bullets: [
          "Zero-touch enrollment: devices configure themselves out of the box",
          "Application catalog: deploy and update apps silently",
          "Device grouping: push different policies to different teams",
          "Compliance dashboards: see which devices violate policy",
          "Geofencing: trigger actions when devices enter/leave zones",
          "Usage analytics: data, battery, and app consumption reporting",
        ],
      },
      {
        title: "How Modiverse Deploys",
        type: "architecture",
        icon: "⚙",
        content:
          "Modiverse is fully cloud-hosted on ArCloud infrastructure. Devices register via a lightweight agent (or native MDM protocol on iOS) and connect to the management platform securely. No on-premise infrastructure is required.",
        bullets: [
          "Agent-based management for Android (full control)",
          "Native MDM protocol for iOS/iPadOS (Apple DEP/ABM)",
          "PilarOS: deep OS-level integration via AFEX",
          "REST API for integration with IT service management tools",
        ],
      },
      {
        title: "Field & Factory Use Cases",
        type: "usecase",
        icon: "🏭",
        content: "Modiverse is purpose-designed for mobile workforces in demanding industrial and enterprise environments.",
        bullets: [
          "Factory floor operators: rugged device management at scale",
          "Field service engineers: secure remote access to manuals & data",
          "Logistics & warehouse: barcode scanner and handset management",
          "Retail: POS device management across store networks",
          "Executive mobility: premium device security and helpdesk",
        ],
      },
      {
        title: "Security at Every Layer",
        type: "features",
        icon: "🔒",
        content: "Modiverse integrates with ARICAAS to deliver Zero Trust device security across all connected mobile devices and industrial gateways.",
        bullets: [
          "Device health attestation before network access granted",
          "Certificate-based authentication for Wi-Fi and VPN",
          "Containerization: separate personal and corporate data",
          "Jailbreak / root detection with automatic quarantine",
          "Remote wipe with cryptographic key destruction",
        ],
      },
      {
        title: "ROI & Efficiency Gains",
        type: "metrics",
        icon: "📊",
        content: "Modiverse pays for itself rapidly through reduced helpdesk costs, faster device setup, and fewer security incidents.",
        stats: [
          { value: "70%", label: "Reduction in device setup time" },
          { value: "50%", label: "Fewer helpdesk tickets related to device issues" },
          { value: "15 min", label: "Average time to enroll a new device (was 3 hours)" },
          { value: "100%", label: "Device policy compliance visibility" },
        ],
      },
      {
        title: "Mobilize Your Workforce",
        type: "cta",
        icon: "🚀",
        content:
          "Start a 30-day free trial with up to 50 devices. Our onboarding specialists will handle initial enrollment and policy setup — you'll be managing all your gateways within a day.",
        bullets: [
          "30-day free trial — no credit card required",
          "White-glove onboarding included",
          "Essential (up to 500 devices) and Premium (unlimited) tiers",
        ],
      },
    ],
  },

  /* ── 6. IoT-Ignite ── */
  {
    id: "iot-ignite",
    name: "IoT-Ignite",
    tag: "IoT PaaS",
    tagline: "Protocol-agnostic IoT platform with smart edge computing and enterprise-grade connectivity.",
    description:
      "IoT-Ignite is ARDICTECH's PaaS backbone for connecting every machine, sensor, and edge device across the industrial operation. It handles data collection, normalization, and streaming at scale — so AI and analytics layers always have clean, real-time signal.",
    accentColor: "#22c55e",
    gradientFrom: "#031409",
    gradientTo: "#072814",
    slides: [
      {
        title: "What Is IoT-Ignite?",
        type: "overview",
        icon: "🔌",
        content:
          "IoT-Ignite is ARDICTECH's industrial IoT Platform as a Service — the universal connectivity layer that captures data from any sensor, machine, or device on the factory floor and streams it reliably to the broader ARDICTECH ecosystem. It bridges the gap between legacy OT hardware and modern IT data infrastructure.",
        bullets: [
          "Protocol-agnostic: MQTT, OPC-UA, Modbus, REST, and more",
          "Edge computing: process data at the source, not just in the cloud",
          "Secure data streaming with end-to-end encryption",
          "Real-time and batch data pipelines in a single platform",
        ],
      },
      {
        title: "Edge Intelligence",
        type: "features",
        icon: "🧠",
        content: "IoT-Ignite runs edge agents directly on gateways and embedded devices, enabling local processing that reduces latency and bandwidth costs.",
        bullets: [
          "Edge scripting: run logic on-device before sending to cloud",
          "Local alarming: trigger alerts even when network is down",
          "Data buffering: no data loss during connectivity interruptions",
          "Firmware OTA: update edge agent remotely at scale",
          "Edge ML inference: run AI models locally on constrained hardware",
          "Digital twin synchronization: keep cloud state in sync with physical",
        ],
      },
      {
        title: "Connectivity Architecture",
        type: "architecture",
        icon: "🌐",
        content:
          "IoT-Ignite's architecture spans three layers: physical device connectivity, edge processing, and cloud aggregation. Each layer is independently scalable and fault-tolerant.",
        bullets: [
          "Device layer: sensors, PLCs, gateways, controllers",
          "Edge layer: IoT-Ignite agent running on gateway hardware",
          "Cloud layer: distributed message broker at million-message scale",
          "ArCloud integration: native, zero-config connectivity",
        ],
      },
      {
        title: "What You Can Connect",
        type: "usecase",
        icon: "🏭",
        content: "IoT-Ignite connects the full diversity of industrial hardware without custom integration work per device type.",
        bullets: [
          "Temperature, pressure, vibration, and flow sensors",
          "CNC machines, robotic arms, and conveyor systems",
          "Energy meters and smart grid equipment",
          "Barcode scanners, RFID readers, and vision systems",
          "Third-party IoT platforms (AWS IoT, Azure IoT Hub)",
          "Legacy SCADA systems via protocol translation",
        ],
      },
      {
        title: "Data Quality & Governance",
        type: "features",
        icon: "✅",
        content: "Raw IoT data is notoriously noisy. IoT-Ignite applies normalization and quality rules at the edge before data reaches analytics layers.",
        bullets: [
          "Schema validation: enforce data structure at ingestion",
          "Deduplication: eliminate redundant readings",
          "Outlier detection: flag suspicious sensor values automatically",
          "Data lineage: track every reading back to its source device",
          "Retention policies: configurable hot/cold/archive tiering",
        ],
      },
      {
        title: "Scale & Performance",
        type: "metrics",
        icon: "📊",
        content: "IoT-Ignite is tested and deployed at industrial scale — handling millions of messages per day without degradation.",
        stats: [
          { value: "10M+", label: "Messages processed per day" },
          { value: "< 50ms", label: "Edge-to-cloud latency (typical)" },
          { value: "99.9%", label: "Message delivery guarantee" },
          { value: "100+", label: "Device protocols supported out of the box" },
        ],
      },
      {
        title: "Connect Your First Machine Today",
        type: "cta",
        icon: "🔌",
        content:
          "Our IoT architects will identify the highest-value data sources in your operation and have your first devices streaming in 48 hours. Start with 10 devices — scale to 100,000.",
        bullets: [
          "Starter kit includes gateway hardware + IoT-Ignite license",
          "Pre-built connectors for 50+ common industrial devices",
          "24/7 platform monitoring included",
        ],
      },
    ],
  },

  /* ── 7. ArMES ── */
  {
    id: "armes",
    name: "ArMES",
    tag: "MES Platform",
    tagline: "11-module Manufacturing Execution System for total factory floor intelligence and control.",
    description:
      "ArMES is ARDICTECH's flagship Manufacturing Execution System — a tightly integrated suite of 11 modules that contextualize, orchestrate, and optimize every aspect of factory floor operations, from work orders to quality management to energy consumption.",
    accentColor: "#f97316",
    gradientFrom: "#1a0c00",
    gradientTo: "#2e1800",
    slides: [
      {
        title: "What Is ArMES?",
        type: "overview",
        icon: "🏭",
        content:
          "ArMES (ARDICTECH Manufacturing Execution System) is a comprehensive 11-module platform that forms the intelligent heart of the factory floor. It sits between the shop floor machines (connected via IoT-Ignite) and the enterprise systems (ERP, CRM), contextualizing raw operational data into actionable intelligence for production managers, quality teams, and maintenance engineers.",
        bullets: [
          "11 fully integrated modules — select all or start modular",
          "Real-time production tracking and work order management",
          "Quality, maintenance, energy, and workforce modules included",
          "Bi-directional ERP integration (SAP, Oracle, Microsoft Dynamics)",
        ],
      },
      {
        title: "The 11 ArMES Modules",
        type: "features",
        icon: "1️⃣",
        content: "Each module operates independently or as part of the unified ArMES platform — delivering specific value while sharing a common data model.",
        bullets: [
          "Production Management: work orders, routing, scheduling",
          "Quality Management: SPC, inspection plans, non-conformance",
          "Maintenance Management: CMMS, predictive triggers",
          "Energy Management: consumption tracking, optimization",
          "Inventory & Material Management",
          "Workforce Management: shifts, skills, labor tracking",
          "OEE Monitoring: real-time availability, performance, quality",
          "Traceability: full pedigree from raw material to shipped product",
          "Document Management: work instructions, SOPs",
          "Analytics & BI: built-in dashboards and reports",
          "Integration Hub: connectors to ERP, PLM, SCADA systems",
        ],
      },
      {
        title: "OEE Intelligence",
        type: "architecture",
        icon: "📊",
        content:
          "ArMES continuously calculates Overall Equipment Effectiveness (OEE) across every machine and production line — in real time, with automatic root-cause categorization.",
        bullets: [
          "Availability loss: unplanned downtime, changeover, startup",
          "Performance loss: slow cycles, minor stops",
          "Quality loss: scrap, rework, yield variance",
          "Automated downtime reason codes via IoT-Ignite integration",
          "Pareto analysis: surface the top loss categories automatically",
        ],
      },
      {
        title: "Predictive Maintenance Integration",
        type: "usecase",
        icon: "🔧",
        content: "ArMES integrates with ArAI to transform maintenance from reactive to predictive — preventing failures before they cost production time.",
        bullets: [
          "Vibration, temperature, and current signature monitoring",
          "AI model flags anomaly → ArMES creates maintenance work order",
          "Spare parts reservation triggered automatically",
          "Maintenance crew dispatched with full asset history",
          "Mean-time-between-failure (MTBF) improves over time",
        ],
      },
      {
        title: "ERP Integration",
        type: "features",
        icon: "🔗",
        content: "ArMES bridges the gap between shop floor reality and enterprise planning — ensuring ERP data reflects what is actually happening on the line.",
        bullets: [
          "Bi-directional sync of production orders with SAP / Oracle",
          "Real-time goods receipt posting when production completes",
          "Quality inspection results flow to ERP automatically",
          "Inventory consumed on the floor updates ERP immediately",
          "No manual data entry — eliminate transcription errors",
        ],
      },
      {
        title: "Proven Results",
        type: "metrics",
        icon: "📈",
        content: "ArMES deployments consistently deliver measurable gains within the first 90 days of go-live.",
        stats: [
          { value: "25%", label: "OEE improvement in first 90 days" },
          { value: "40%", label: "Reduction in unplanned downtime" },
          { value: "30%", label: "Quality defect rate decrease" },
          { value: "11", label: "Integrated modules in a single platform" },
        ],
      },
      {
        title: "Digitalize Your Factory Floor",
        type: "cta",
        icon: "🚀",
        content:
          "Our manufacturing consultants will run a 2-day workshop on your shop floor to map operational losses and identify the first 2–3 ArMES modules with the fastest ROI. Most clients start with Production Management + OEE and expand from there.",
        bullets: [
          "Factory floor workshop included in kickoff",
          "Modular deployment: add modules over time",
          "Go-live in 8–12 weeks for core modules",
        ],
      },
    ],
  },

  /* ── 8. ArAI ── */
  {
    id: "arai",
    name: "ArAI",
    tag: "Industrial AI",
    tagline: "Advanced reasoning, predictive analytics, and the proprietary data moat that makes your AI competitive.",
    description:
      "ArAI is ARDICTECH's industrial AI engine — delivering machine learning models, predictive analytics, anomaly detection, and recommendation systems purpose-built for manufacturing and operational technology environments.",
    accentColor: "#d946ef",
    gradientFrom: "#1a0520",
    gradientTo: "#2e0a40",
    slides: [
      {
        title: "What Is ArAI?",
        type: "overview",
        icon: "🤖",
        content:
          "ArAI is ARDICTECH's industrial AI platform — a suite of pre-trained and customizable machine learning models, analytics tools, and a semantic reasoning layer designed to turn raw operational data into predictions, insights, and automated decisions. It is the intelligence layer that sits above IoT-Ignite and ArMES.",
        bullets: [
          "Pre-built ML models for predictive maintenance, quality, and energy",
          "Custom model training on your proprietary factory data",
          "Anomaly detection across thousands of time-series signals",
          "Recommendation engine for process parameter optimization",
        ],
      },
      {
        title: "AI Capabilities",
        type: "features",
        icon: "🧠",
        content: "ArAI covers the full spectrum of industrial AI applications — from simple threshold alerting to advanced multi-variate predictive modeling.",
        bullets: [
          "Predictive Maintenance: failure prediction 7–30 days ahead",
          "Quality Prediction: predict defects before they occur",
          "Energy Optimization: reduce consumption without sacrificing output",
          "Process Optimization: find optimal machine parameters automatically",
          "Demand Forecasting: optimize production scheduling",
          "Computer Vision: visual quality inspection at line speed",
        ],
      },
      {
        title: "How ArAI Learns",
        type: "architecture",
        icon: "🔄",
        content:
          "ArAI uses a federated learning architecture — models improve from data across multiple factories while never moving raw data across site boundaries. Your data stays yours; the intelligence accumulates.",
        bullets: [
          "Supervised learning: train on labeled historical failure data",
          "Unsupervised anomaly detection: no labeled data required",
          "Online learning: models update as new data streams in",
          "Explainability layer: every prediction comes with a reason",
          "Federated learning: cross-site model improvement without data sharing",
        ],
      },
      {
        title: "Real-World Applications",
        type: "usecase",
        icon: "🏭",
        content: "ArAI is deployed across diverse industrial sectors — each with unique operational AI challenges.",
        bullets: [
          "Automotive: weld quality prediction, press force optimization",
          "Food & beverage: spoilage prediction, cold chain monitoring",
          "Pharmaceuticals: out-of-spec batch prediction",
          "Energy: transformer failure early warning, grid load balancing",
          "Logistics: predictive vehicle maintenance for logistics operators",
        ],
      },
      {
        title: "The Proprietary Data Moat",
        type: "value",
        icon: "🏆",
        content:
          "ArAI builds you a data moat — a proprietary competitive advantage that compounds over time. The longer ArAI runs on your data, the more accurate it becomes, and the harder it is for competitors to replicate.",
        bullets: [
          "Models trained on your specific machines and processes",
          "Institutional knowledge captured from senior operators",
          "Continuous improvement loop: better predictions every month",
          "Your models are yours — full IP ownership",
          "Competitor cannot buy or replicate your operational intelligence",
        ],
      },
      {
        title: "ArAI Performance Benchmarks",
        type: "metrics",
        icon: "📊",
        content: "ArAI's industrial models consistently outperform generic AI solutions because they are trained on manufacturing-specific data with domain-expert-curated features.",
        stats: [
          { value: "92%", label: "Failure prediction accuracy (typical)" },
          { value: "7–30", label: "Days average warning before failure" },
          { value: "35%", label: "Energy consumption reduction at optimized sites" },
          { value: "60%", label: "Reduction in quality escapes after deployment" },
        ],
      },
      {
        title: "Activate Your Industrial AI",
        type: "cta",
        icon: "🤖",
        content:
          "Our AI scientists will run a 3-day data discovery workshop to identify the highest-value prediction use cases in your operation. We'll have a working proof-of-concept model running on your historical data within 4 weeks.",
        bullets: [
          "No data science team required on your side",
          "Start with existing historical data — no new sensors needed",
          "Pay-per-prediction pricing available for MVPs",
        ],
      },
    ],
  },

  /* ── 9. CWF ── */
  {
    id: "cwf",
    name: "CWF: Data Intelligence",
    tag: "Conversational UI",
    tagline: "Chat With Your Factory. Natural language insights from your production floor — in seconds.",
    description:
      "CWF (Chat With Your Factory) is ARDICTECH's conversational intelligence layer — enabling operators, managers, and executives to query their entire factory's data using plain language. If your factory could speak, what would it say?",
    accentColor: "#14b8a6",
    gradientFrom: "#031814",
    gradientTo: "#072c28",
    slides: [
      {
        title: "What Is CWF?",
        type: "overview",
        icon: "💬",
        content:
          "CWF (Chat With Your Factory) is ARDICTECH's natural language interface for industrial data — powered by ARDY, the AI assistant built on ArAI's reasoning engine. Instead of navigating complex dashboards, users simply ask questions in plain language and receive instant, accurate answers drawn from live operational data.",
        bullets: [
          "Natural language queries to all factory data sources",
          "Powered by ARDY — ARDICTECH's industrial AI assistant",
          "Available via web, mobile app, and WhatsApp",
          "Real-time answers — no waiting for end-of-shift reports",
        ],
      },
      {
        title: "What You Can Ask",
        type: "features",
        icon: "🗣",
        content: "CWF understands the full context of your factory — machines, shifts, products, KPIs, and alerts — and responds in natural language.",
        bullets: [
          "\"What's our OEE on Line 3 today?\"",
          "\"Which machine has the most downtime this week?\"",
          "\"Show me quality reject rates for Product X in October\"",
          "\"Alert me if energy consumption on Compressor 7 spikes\"",
          "\"Compare shift A vs shift B performance this month\"",
          "\"What are the top 3 causes of unplanned stops today?\"",
        ],
      },
      {
        title: "How CWF Works",
        type: "architecture",
        icon: "⚙",
        content:
          "CWF combines a large language model (LLM) with a factory-specific knowledge layer (the CWF Truth Layer) built from your ArMES and IoT-Ignite data. Queries are parsed, enriched with factory context, and resolved against live or historical data.",
        bullets: [
          "Natural language → intent classification → data query",
          "CWF Truth Layer: your factory's terminology, KPIs, and structure",
          "Real-time data via IoT-Ignite streaming APIs",
          "Historical analysis via ArMES data warehouse",
          "Federated query: pulls from multiple data sources simultaneously",
        ],
      },
      {
        title: "Channels & Accessibility",
        type: "usecase",
        icon: "📡",
        content: "CWF meets workers where they are — on the shop floor via mobile, in the boardroom via dashboard, or on-the-go via WhatsApp.",
        bullets: [
          "Web dashboard: full analytics with chart export",
          "Mobile app (iOS + Android): factory data in your pocket",
          "WhatsApp integration: ask ARDY from a shift manager's phone",
          "Voice interface: hands-free query on the factory floor",
          "Proactive push: ARDY sends alerts before you even ask",
        ],
      },
      {
        title: "Democratizing Factory Intelligence",
        type: "value",
        icon: "🌐",
        content:
          "Today, factory intelligence is locked inside dashboards only data analysts can navigate. CWF changes this — every operator, supervisor, and executive can access the data they need, in the format they understand.",
        bullets: [
          "Operators: instant status checks without leaving the line",
          "Supervisors: shift handover insights in 60 seconds",
          "Maintenance: find failure history without helpdesk tickets",
          "Executives: live KPIs without weekly report compilation",
          "Any language: ARDY translates queries and responses",
        ],
      },
      {
        title: "CWF Impact Metrics",
        type: "metrics",
        icon: "📊",
        content: "CWF measurably reduces the time between question and answer — and between answer and action.",
        stats: [
          { value: "< 3 sec", label: "Average response time to any factory query" },
          { value: "80%", label: "Reduction in report compilation time" },
          { value: "5×", label: "Increase in data-driven decisions at shift level" },
          { value: "100%", label: "Factory data accessible to any authorized user" },
        ],
      },
      {
        title: "Let Your Factory Speak",
        type: "cta",
        icon: "💬",
        content:
          "We'll connect CWF to your existing ArMES or IoT-Ignite data in as little as 5 business days. Your team will be asking ARDY questions about the factory on day one. Book a live demo and see CWF answer questions about a real factory in real time.",
        bullets: [
          "Live demo: watch ARDY answer real factory questions",
          "5-day integration for existing ARDICTECH platform users",
          "WhatsApp pilot available immediately",
        ],
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   ICONS per slide type
   ───────────────────────────────────────────────────────────────────────────── */

// Theme colors are now derived strictly from the product's accentColor

/* ─────────────────────────────────────────────────────────────────────────────
   CAROUSEL COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

function PresentationCarousel({ slides, accentColor, productId }: { slides: Slide[]; accentColor: string; productId?: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const [hoveredSlide, setHoveredSlide] = useState<number | null>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const goTo = (idx: number) => {
    setDirection(idx > current ? 1 : -1);
    setCurrent(idx);
  };
  const prev = () => goTo(Math.max(0, current - 1));
  const next = () => goTo(Math.min(slides.length - 1, current + 1));

  const slide = slides[current];
  const typeColor = accentColor;

  const getImagePath = (idx: number = current) => {
    if (!productId) return undefined;
    
    if (productId === "arcloud") {
      if (idx === 2) return `/images/products/arcloud_chip_to_cloud/slide_10.jpg`;
      const arcloudMap = [1, 2, 5, 8, 7, 12, 14];
      return `/images/products/arcloud/slide_${arcloudMap[Math.min(idx, arcloudMap.length - 1)]}.jpg`;
    }
    
    if (productId === "arai") {
      const araiMap = [1, 2, 4, 6, 8, 11, 15];
      return `/images/products/arai_placeholder/slide_${araiMap[Math.min(idx, araiMap.length - 1)]}.jpg`;
    }
    
    if (productId === "armes") {
      const armesMap = [1, 2, 4, 6, 8, 11, 13];
      return `/images/products/armes_illuminated/slide_${armesMap[Math.min(idx, armesMap.length - 1)]}.jpg`;
    }

    if (productId === "cwf") {
      const cwfMap = [1, 3, 5, 7, 9, 12, 14];
      return `/images/products/cwf/slide_${cwfMap[Math.min(idx, cwfMap.length - 1)]}.png`;
    }

    if (productId === "pilaros") return `/images/products/pilaros/slide_${idx + 1}.png`;
    if (productId === "modiverse") return `/images/products/modiverse/slide_${idx + 1}.png`;
    if (productId === "iot-ignite") return `/images/products/iot_ignite/slide_${idx + 1}.png`;
    return undefined;
  };
  const imagePath = getImagePath(current);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (expandedIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setExpandedIndex(i => i !== null ? Math.min(slides.length - 1, i + 1) : null);
      if (e.key === "ArrowLeft")  setExpandedIndex(i => i !== null ? Math.max(0, i - 1) : null);
      if (e.key === "Escape")     setExpandedIndex(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [expandedIndex, slides.length]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Slide counter */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}
        >
          Presentation · Slide {current + 1} of {slides.length}
        </span>
        <div style={{ display: "flex", gap: "0.4rem" }}>
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === current ? accentColor : "rgba(255,255,255,0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s",
                padding: 0,
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main slide card */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0, x: direction * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction * -40 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid rgba(255,255,255,0.08)`,
            borderRadius: "20px",
            padding: "2rem",
            position: "relative",
            overflow: "hidden",
            minHeight: "300px",
          }}
        >
          {/* Accent corner glow */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "200px",
              height: "200px",
              background: `radial-gradient(circle at 0% 0%, ${typeColor}18 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "3px",
              height: "100%",
              background: typeColor,
              opacity: 0.6,
            }}
          />

          {/* Slide type badge */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: typeColor,
                background: `${typeColor}18`,
                padding: "0.25rem 0.7rem",
                borderRadius: "100px",
                border: `1px solid ${typeColor}40`,
              }}
            >
              {slide.type}
            </span>
          </div>

          {/* Title */}
          <h3
            style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: "clamp(1.3rem, 2vw, 1.8rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "0.6rem",
              lineHeight: 1.2,
            }}
          >
            {slide.title}
          </h3>
          {/* Subtitle */}
          {slide.subtitle && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "rgba(255,255,255,0.6)",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              {slide.subtitle}
            </p>
          )}

          <div style={{ display: "flex", flexDirection: imagePath ? "row" : "column", gap: "2rem", alignItems: "stretch", marginTop: "0.5rem" }}>
            {imagePath && (
              <div 
                style={{ 
                  position: "relative", 
                  width: "55%", 
                  flexShrink: 0,
                  minHeight: "340px",
                  borderRadius: "16px", 
                  overflow: "hidden", 
                  border: `1px solid ${typeColor}30`,
                  background: "rgba(0,0,0,0.5)",
                  boxShadow: "inset 0 0 20px rgba(0,0,0,0.5)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "zoom-in"
                }}
                onClick={() => setExpandedIndex(current)}
              >
                <img 
                  src={imagePath} 
                  alt={slide.title} 
                  style={{ width: "100%", height: "100%", objectFit: "contain", objectPosition: "center", padding: "1rem" }}
                  onError={(e) => { 
                    e.currentTarget.style.display = 'none'; 
                    if (e.currentTarget.parentElement) {
                      e.currentTarget.parentElement.style.display = 'none';
                    }
                  }}
                />
                {/* Expand overlay button */}
                <div style={{ position: "absolute", bottom: "1rem", right: "1rem", background: "rgba(0,0,0,0.6)", borderRadius: "8px", padding: "0.5rem", border: `1px solid ${typeColor}40`, display: "flex", alignItems: "center", gap: "0.4rem", color: "#fff", fontSize: "0.75rem", fontFamily: "'Inter', sans-serif", backdropFilter: "blur(4px)", pointerEvents: "none" }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
                    Expand
                </div>
              </div>
            )}

            <div style={{ flex: 1, display: "flex", flexDirection: "column", maxHeight: imagePath ? "380px" : "auto", overflowY: "auto", paddingRight: "0.5rem" }}>
              {/* Content */}
              <p
                style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              marginBottom: slide.bullets || slide.stats ? "1.5rem" : 0,
            }}
          >
            {slide.content}
          </p>

          {/* Bullets */}
          {slide.bullets && (
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              {slide.bullets.map((b, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(255,255,255,0.75)",
                    lineHeight: 1.5,
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: typeColor,
                      flexShrink: 0,
                      marginTop: "0.45rem",
                    }}
                  />
                  {b}
                </li>
              ))}
            </ul>
          )}

          {/* Stats grid */}
          {slide.stats && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem",
                marginTop: "0.5rem",
              }}
            >
              {slide.stats.map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "12px",
                    padding: "1rem",
                    border: `1px solid ${typeColor}25`,
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'DM Serif Display', serif",
                      fontSize: "1.8rem",
                      fontWeight: 700,
                      color: typeColor,
                      lineHeight: 1,
                      marginBottom: "0.3rem",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.3,
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Thumbnail strip */}
      <div
        style={{
          display: "flex",
          gap: "0.6rem",
          overflowX: "auto",
          paddingBottom: "0.25rem",
        }}
      >
        {slides.map((s, i) => {
          const isActive = i === current;
          const isHovered = hoveredSlide === i;
          const tc = accentColor;
          
          let thumbPath: string | undefined = undefined;
          if (productId === "arcloud") {
            if (i === 2) {
              thumbPath = `/images/products/arcloud_chip_to_cloud/slide_10.jpg`;
            } else {
              const arcloudMap = [1, 2, 5, 8, 7, 12, 14];
              thumbPath = `/images/products/arcloud/slide_${arcloudMap[Math.min(i, arcloudMap.length - 1)]}.jpg`;
            }
          } else if (productId === "arai") {
            const araiMap = [1, 2, 4, 6, 8, 11, 15];
            thumbPath = `/images/products/arai_placeholder/slide_${araiMap[Math.min(i, araiMap.length - 1)]}.jpg`;
          } else if (productId === "armes") {
            const armesMap = [1, 2, 4, 6, 8, 11, 13];
            thumbPath = `/images/products/armes_illuminated/slide_${armesMap[Math.min(i, armesMap.length - 1)]}.jpg`;
          } else if (productId === "cwf") {
            const cwfMap = [1, 3, 5, 7, 9, 12, 14];
            thumbPath = `/images/products/cwf/slide_${cwfMap[Math.min(i, cwfMap.length - 1)]}.png`;
          } else if (productId === "pilaros") thumbPath = `/images/products/pilaros/slide_${i + 1}.png`;
          else if (productId === "modiverse") thumbPath = `/images/products/modiverse/slide_${i + 1}.png`;
          else if (productId === "iot-ignite") thumbPath = `/images/products/iot_ignite/slide_${i + 1}.png`;

          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              onMouseEnter={() => setHoveredSlide(i)}
              onMouseLeave={() => setHoveredSlide(null)}
              style={{
                flexShrink: 0,
                width: isHovered ? "150px" : "130px",
                background: isActive
                  ? `linear-gradient(135deg, ${tc}22, ${tc}10)`
                  : isHovered
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${isActive ? tc + "60" : "rgba(255,255,255,0.07)"}`,
                borderRadius: "12px",
                padding: thumbPath ? "0.4rem" : "0.75rem",
                cursor: "pointer",
                transition: "all 0.25s ease",
                transform: isHovered && !isActive ? "translateY(-3px) scale(1.04)" : "none",
                boxShadow: isHovered ? `0 8px 24px ${tc}20` : "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
              }}
              aria-label={`Jump to slide: ${s.title}`}
            >
              {thumbPath ? (
                <div style={{ width: "100%", height: "54px", marginBottom: "0.5rem", borderRadius: "6px", overflow: "hidden", background: "#050505", border: `1px solid ${isActive ? tc + "40" : "rgba(255,255,255,0.05)"}` }}>
                  <img src={thumbPath} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }} />
                </div>
              ) : (
                <div style={{ fontSize: "1.1rem", marginBottom: "0.4rem" }}>{s.icon}</div>
              )}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: isActive ? tc : "rgba(255,255,255,0.4)",
                  lineHeight: 1.3,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "100%",
                  textAlign: "center"
                }}
              >
                {s.title}
              </div>
            </button>
          );
        })}
      </div>

      {/* Arrow navigation */}
      <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
        <button
          onClick={prev}
          disabled={current === 0}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
            background: current === 0 ? "transparent" : "rgba(255,255,255,0.06)",
            color: current === 0 ? "rgba(255,255,255,0.2)" : "#fff",
            cursor: current === 0 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            fontSize: "1.1rem",
          }}
          onMouseEnter={(e) => {
            if (current !== 0) e.currentTarget.style.background = `rgba(255,255,255,0.12)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = current === 0 ? "transparent" : "rgba(255,255,255,0.06)";
          }}
          aria-label="Previous slide"
        >
          ←
        </button>
        <button
          onClick={next}
          disabled={current === slides.length - 1}
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            border: `1px solid ${current < slides.length - 1 ? accentColor + "60" : "rgba(255,255,255,0.1)"}`,
            background: current < slides.length - 1 ? `${accentColor}22` : "transparent",
            color: current < slides.length - 1 ? accentColor : "rgba(255,255,255,0.2)",
            cursor: current === slides.length - 1 ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            fontSize: "1.1rem",
          }}
          onMouseEnter={(e) => {
            if (current < slides.length - 1) e.currentTarget.style.background = `${accentColor}40`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = current < slides.length - 1 ? `${accentColor}22` : "transparent";
          }}
          aria-label="Next slide"
        >
          →
        </button>
      </div>

      {/* FULLSCREEN SLIDE LIGHTBOX — navigable */}
      <AnimatePresence>
        {expandedIndex !== null && (() => {
          const expImg = getImagePath(expandedIndex);
          const hasPrev = expandedIndex > 0;
          const hasNext = expandedIndex < slides.length - 1;
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedIndex(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 99999,
                background: "rgba(0,0,0,0.95)",
                backdropFilter: "blur(10px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "2rem",
                cursor: "zoom-out",
              }}
            >
              {/* Image */}
              <AnimatePresence mode="wait" initial={false}>
                <motion.img
                  key={expandedIndex}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  src={expImg}
                  alt={`Slide ${expandedIndex + 1}`}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    maxWidth: "88vw",
                    maxHeight: "82vh",
                    objectFit: "contain",
                    borderRadius: "12px",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                    cursor: "default",
                  }}
                />
              </AnimatePresence>

              {/* Close */}
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedIndex(null); }}
                style={{
                  position: "absolute", top: "1.5rem", right: "1.5rem",
                  background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff", width: "44px", height: "44px", borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", fontSize: "1.1rem",
                }}
              >✕</button>

              {/* Slide counter */}
              <div style={{
                position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)",
                display: "flex", alignItems: "center", gap: "1rem",
              }}>
                {/* Prev arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); if (hasPrev) setExpandedIndex(i => i !== null ? i - 1 : i); }}
                  disabled={!hasPrev}
                  style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    border: `1px solid ${hasPrev ? accentColor + "80" : "rgba(255,255,255,0.1)"}`,
                    background: hasPrev ? `${accentColor}22` : "transparent",
                    color: hasPrev ? accentColor : "rgba(255,255,255,0.2)",
                    cursor: hasPrev ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", transition: "all 0.2s",
                  }}
                  aria-label="Previous slide"
                >←</button>

                {/* Dot indicators */}
                <div style={{ display: "flex", gap: "0.35rem", alignItems: "center" }}>
                  {slides.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setExpandedIndex(i); }}
                      style={{
                        width: i === expandedIndex ? "20px" : "7px",
                        height: "7px", borderRadius: "4px", border: "none", padding: 0,
                        background: i === expandedIndex ? accentColor : "rgba(255,255,255,0.25)",
                        cursor: "pointer", transition: "all 0.25s",
                      }}
                      aria-label={`Slide ${i + 1}`}
                    />
                  ))}
                </div>

                {/* Next arrow */}
                <button
                  onClick={(e) => { e.stopPropagation(); if (hasNext) setExpandedIndex(i => i !== null ? i + 1 : i); }}
                  disabled={!hasNext}
                  style={{
                    width: "44px", height: "44px", borderRadius: "50%",
                    border: `1px solid ${hasNext ? accentColor + "80" : "rgba(255,255,255,0.1)"}`,
                    background: hasNext ? `${accentColor}22` : "transparent",
                    color: hasNext ? accentColor : "rgba(255,255,255,0.2)",
                    cursor: hasNext ? "pointer" : "not-allowed",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.1rem", transition: "all 0.2s",
                  }}
                  aria-label="Next slide"
                >→</button>
              </div>

              {/* Slide title */}
              <div style={{
                position: "absolute", top: "1.5rem", left: "50%", transform: "translateX(-50%)",
                color: "rgba(255,255,255,0.7)", fontFamily: "'Inter', sans-serif",
                fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.1em",
                background: "rgba(0,0,0,0.4)", backdropFilter: "blur(4px)",
                padding: "0.4rem 1rem", borderRadius: "999px",
                border: `1px solid ${accentColor}30`, color: accentColor,
                whiteSpace: "nowrap",
              }}>
                {slides[expandedIndex]?.title} &nbsp;·&nbsp; {expandedIndex + 1} / {slides.length}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN MODAL COMPONENT
   ───────────────────────────────────────────────────────────────────────────── */

function ProductModalInner() {
  const { openProductId, closeProduct } = useProductModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    if (openProductId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProduct();
    };
    if (openProductId) window.addEventListener("keydown", handleEsc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [openProductId, closeProduct]);

  const product = PRODUCTS_DATA.find((p) => p.id === openProductId);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {openProductId && product && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9990,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            overflowY: "auto",
            padding: "2rem 1rem",
          }}
        >
          {/* Blurred backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeProduct}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
            }}
          />

          {/* Modal panel */}
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1150px",
              background: "#020202",
              borderRadius: "28px",
              border: `1px solid ${product.accentColor}25`,
              boxShadow: `0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px ${product.accentColor}15, inset 0 1px 0 rgba(255,255,255,0.05)`,
              overflow: "hidden",
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            {/* Glow orb */}
            <div
              style={{
                position: "absolute",
                top: "-100px",
                right: "-100px",
                width: "400px",
                height: "400px",
                borderRadius: "50%",
                background: `radial-gradient(circle, ${product.accentColor}14 0%, transparent 70%)`,
                pointerEvents: "none",
              }}
            />

            {/* ── HEADER ── */}
            <div
              style={{
                padding: "2rem 2.5rem 1.5rem",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                position: "relative",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.6rem" }}>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: product.accentColor,
                      background: `${product.accentColor}18`,
                      padding: "0.3rem 0.8rem",
                      borderRadius: "100px",
                      border: `1px solid ${product.accentColor}40`,
                    }}
                  >
                    {product.tag}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                    fontWeight: 700,
                    color: "#ffffff",
                    lineHeight: 1.1,
                    margin: "0 0 0.5rem",
                  }}
                >
                  {product.name}
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.95rem",
                    color: product.accentColor,
                    fontWeight: 600,
                    margin: 0,
                    maxWidth: "560px",
                    lineHeight: 1.5,
                  }}
                >
                  {product.tagline}
                </p>
              </div>

              {/* Close button */}
              <button
                onClick={closeProduct}
                style={{
                  flexShrink: 0,
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  border: "1px solid rgba(255,255,255,0.15)",
                  background: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.7)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  fontSize: "1.1rem",
                  marginLeft: "1rem",
                  marginTop: "0.25rem",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.12)";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.7)";
                }}
                aria-label="Close product details"
              >
                ✕
              </button>
            </div>

            {/* ── BODY: description + carousel ── */}
            <div style={{ padding: "2rem 2.5rem 2.5rem" }}>
              {/* Description */}
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.75,
                  marginBottom: "2.5rem",
                  maxWidth: "740px",
                }}
              >
                {product.description}
              </p>

              {/* Divider with label */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.3)",
                    whiteSpace: "nowrap",
                  }}
                >
                  Product Presentation
                </span>
                <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.08)" }} />
              </div>

              {/* Carousel */}
              <PresentationCarousel slides={product.slides} accentColor={product.accentColor} productId={product.id} />

              {/* CTA footer */}
              <div
                style={{
                  marginTop: "2rem",
                  paddingTop: "1.5rem",
                  borderTop: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "0.82rem",
                    color: "rgba(255,255,255,0.35)",
                    margin: 0,
                  }}
                >
                  Press <kbd style={{ background: "rgba(255,255,255,0.08)", padding: "0.1rem 0.4rem", borderRadius: "4px", fontSize: "0.75rem" }}>ESC</kbd> or click outside to close
                </p>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button
                    onClick={closeProduct}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "rgba(255,255,255,0.5)",
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      borderRadius: "100px",
                      padding: "0.6rem 1.4rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                  >
                    Close
                  </button>
                  <a
                    href="#contact"
                    onClick={closeProduct}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: product.gradientFrom,
                      background: product.accentColor,
                      border: "none",
                      borderRadius: "100px",
                      padding: "0.6rem 1.6rem",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textDecoration: "none",
                      display: "inline-block",
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; (e.currentTarget as HTMLElement).style.transform = "scale(1.03)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; (e.currentTarget as HTMLElement).style.transform = "scale(1)"; }}
                  >
                    Book a Demo →
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}

export default function ProductModal() {
  return <ProductModalInner />;
}

export { PRODUCTS_DATA };
