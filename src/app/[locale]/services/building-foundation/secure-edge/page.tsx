import SubServicePage from "@/components/sections/SubServicePage";

const DATA = {
  number: "01",
  title: "Secure Edge & Devices",
  tagline: "Trust starts at the physical boundary.",
  accent: "#7ab8f5",
  image: "/images/pilaros image .jpeg",
  pillarTitle: "Building the Digital Foundation",
  pillarHref: "/en/services/building-foundation",
  whatWeDo: {
    intro:
      "We secure every endpoint across your industrial environment — from factory-floor PLCs and IoT sensors to mobile devices and edge gateways. Our approach combines device-level OS security with enterprise-grade management to give you full visibility and control over every connected asset.",
    items: [
      {
        heading: "Device Management (MDM)",
        body: "Centrally enroll, configure, monitor, and wipe every edge device and mobile endpoint — all from a single pane of glass.",
      },
      {
        heading: "Remote Control & Monitoring",
        body: "Real-time visibility and remote access to all devices, with alerts, diagnostics, and over-the-air actions to keep operations running without physical intervention.",
      },
      {
        heading: "Security Policies & Access Control",
        body: "Enforce compliance policies, role-based access, and network segmentation rules at the device level — ensuring only authorized assets reach your production data.",
      },
      {
        heading: "Firmware & Software Updates",
        body: "Schedule and deploy OS updates, app packages, and security patches silently and reliably across thousands of devices simultaneously.",
      },
    ],
  },
  products: [
    {
      name: "PilarOS & AFEX",
      description:
        "An industrial-grade Android OS with the AFEX security engine — providing deep system-level control, encryption, and policy enforcement across edge devices and gateways.",
      website: "www.pilaros.net",
      presentationHref: "#", // replace with presentation file link when ready
      accent: "#7ab8f5",
    },
    {
      name: "Modiverse",
      description:
        "Enterprise Mobile Device Management (MDM) built for industrial scale. Manage, monitor, and secure your entire mobile and IoT device portfolio from a single platform.",
      website: "www.modiverse.com",
      presentationHref: "#", // replace with presentation file link when ready
      accent: "#8ecae6",
    },
  ],
};

export const metadata = {
  title: "Secure Edge & Devices — ARDICTECH",
  description: "How ARDICTECH secures every edge device and endpoint in your IIoT infrastructure with PilarOS, AFEX, and Modiverse.",
};

export default function SecureEdgePage() {
  return <SubServicePage data={DATA} />;
}
