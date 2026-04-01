import SubServicePage from "@/components/sections/SubServicePage";

const DATA = {
  number: "03",
  title: "Integrate The Infrastructure",
  tagline: "Bringing all systems into one unified operation.",
  accent: "#a8d5e2",
  image: "/images/Integrate Infrasturture.jpeg",
  objectFit: "contain" as "contain",
  pillarTitle: "Building the Digital Foundation",
  pillarHref: "/en#digital-foundation",
  whatWeDo: {
    intro: "Core Targets: ERP systems | CRM systems | Production systems | IoT platforms | (Cloud + On-premise environments)",
    items: [
      { heading: "System integration", body: "Unifying independent platforms into a single operations substrate." },
      { heading: "Data synchronization", body: "Ensuring real-time consistency from the factory floor to the enterprise cloud." },
      { heading: "Workflow alignment", body: "Harmonizing operational processes across legacy infrastructure and modern networks." },
      { heading: "Centralized architecture", body: "Creating a single point of control to govern both cloud and on-premise environments." },
    ],
  },
};

export const metadata = {
  title: "Integrate the Infrastructure — ARDICTECH",
  description: "How ARDICTECH integrates industrial infrastructure into a unified intelligence platform.",
};

export default function IntegrateInfrastructurePage() {
  return <SubServicePage data={DATA} />;
}
