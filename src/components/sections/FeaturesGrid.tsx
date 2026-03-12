import {
  Activity,
  Settings,
  ShieldCheck,
  Zap,
  MessageSquare,
  BarChart3,
  Cable,
  Smartphone,
} from "lucide-react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import FeatureCard from "@/components/ui/FeatureCard";

interface FeaturesGridProps {
  dict: Dictionary;
}

const featureIcons = [
  <Activity key="activity" className="h-6 w-6" />,
  <Settings key="settings" className="h-6 w-6" />,
  <ShieldCheck key="shield" className="h-6 w-6" />,
  <Zap key="zap" className="h-6 w-6" />,
  <MessageSquare key="message" className="h-6 w-6" />,
  <BarChart3 key="chart" className="h-6 w-6" />,
  <Cable key="cable" className="h-6 w-6" />,
  <Smartphone key="phone" className="h-6 w-6" />,
];

export default function FeaturesGrid({ dict }: FeaturesGridProps) {
  const { features } = dict;

  return (
    <SectionWrapper id="features">
      <SectionHeading title={features.title} subtitle={features.subtitle} />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {features.items.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            icon={featureIcons[index]}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
