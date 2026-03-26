import SubServicePage from "@/components/sections/SubServicePage";

const DATA = {
  number: "02",
  title: "Connect Systems & Assets",
  tagline: "Bridge every machine, protocol, and data stream.",
  accent: "#8ecae6",
  image: "/images/ConnectS.jpeg",
  objectFit: "contain" as "contain",
  pillarTitle: "Building the Digital Foundation",
  pillarHref: "/en/services/building-foundation",
  whatWeDo: {
    intro: "IoT connectivity | API integrations | Real-time data streaming | Device-to-cloud communication",
    items: [
      {
        heading: "Immediate Action",
        body: "Dynamic business decisions execute locally with zero cloud latency.",
      },
      {
        heading: "Autonomous Control",
        body: "Fully operational rule execution even without cloud connectivity.",
      },
      {
        heading: "Resource Efficiency",
        body: "Bandwidth constraints eliminated via local data distillation.",
      },
    ],
  },
  products: [
    {
      name: "IoT-Ignite",
      description:
        "IoT-Ignite shifts intelligence from the distant cloud to the localized edge, transforming hardware service building into a process as streamlined as app creation. Enterprise-grade IoT connectivity platform enabling robust API integrations, real-time data streaming, and seamless device-to-cloud communication.",
      website: "www.iot-ignite.com",
      presentationHref: "#", // replace with presentation file link when ready
      accent: "#8ecae6",
    },
    {
      name: "ArCloud",
      description: "Hyper-cloud of ARDICTECH",
      accent: "#7ab8f5",
    },
  ],
};

export const metadata = {
  title: "Connect Systems & Assets — ARDICTECH",
  description: "How ARDICTECH connects every asset — OT, IT, and everything in between.",
};

export default function ConnectSystemsPage() {
  return <SubServicePage data={DATA} />;
}
