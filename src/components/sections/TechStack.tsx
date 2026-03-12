// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
import { Layers, Database, Brain, Monitor, ArrowRight } from "lucide-react";
import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface TechStackProps {
  dict: Dictionary;
}

const layerIcons = [
  <Layers key="layers" className="h-6 w-6" />,
  <Database key="database" className="h-6 w-6" />,
  <Brain key="brain" className="h-6 w-6" />,
  <Monitor key="monitor" className="h-6 w-6" />,
];

const layerColors = [
  "border-l-accent",
  "border-l-primary",
  "border-l-secondary",
  "border-l-primary-light",
];

export default function TechStack({ dict }: TechStackProps) {
  const { techStack } = dict;

  return (
    <SectionWrapper id="technology" className="bg-black">
      <SectionHeading
        title={techStack.title}
        subtitle={techStack.subtitle}
        light
      />

      {/* Architecture layers */}
      <div className="mt-12 space-y-4">
        {techStack.layers.map((layer, index) => (
          <div
            key={layer.name}
            className={`rounded-2xl border border-neutral-800 bg-neutral-900/40 p-8 transition-all duration-300 hover:border-accent/30`}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-6">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent/5 text-accent border border-accent/20">
                  {layerIcons[index]}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-1">
                    {layer.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-400 max-w-xl">
                    {layer.description}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 lg:justify-end">
                {layer.technologies.map((tech) => (
                  <Badge key={tech} variant="default">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Certifications */}
      <div className="mt-16 text-center">
        <div className="mb-6 flex flex-wrap justify-center gap-4">
          {techStack.certifications.map((cert) => (
            <Badge key={cert} variant="accent">
              {cert}
            </Badge>
          ))}
        </div>
        <Button variant="primary" size="lg" href="#">
          {techStack.cta}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </SectionWrapper>
  );
}
