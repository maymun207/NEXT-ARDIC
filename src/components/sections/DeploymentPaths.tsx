// @ts-nocheck — Legacy CompanyTech-specific component. Not used by the template page.tsx. Kept for reference only.
"use client";

import type { Dictionary } from "@/types";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Image from "next/image";

interface DeploymentPathsProps {
  dict: Dictionary;
}

export default function DeploymentPaths({ dict }: DeploymentPathsProps) {
  const { deploymentModel } = dict;

  return (
    <SectionWrapper
      id="deployment-paths"
      dark
      className="bg-black overflow-hidden"
    >
      <div className="mx-auto max-w-7xl relative">
        <div className="text-center mb-16 lg:mb-24 px-4 relative z-10">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-[1.1] max-w-5xl mx-auto">
            {deploymentModel.pathsTitle}
          </h2>
          <p className="text-accent text-xl font-medium italic">
            {deploymentModel.subtitle}
          </p>
        </div>

        {/* Paths Comparison Grid - Moved and renamed as Path A/B per user request */}
        <div className="relative grid gap-0 md:grid-cols-2 bg-black overflow-hidden mb-8 border-b border-white/5">
          {/* Left Path: Existing Stack */}
          <div className="group p-12 md:p-20 transition-all duration-700 hover:bg-white/1 flex flex-col bg-black border-r border-white/5">
            <div className="relative z-10 flex-1 flex flex-col">
              <span className="inline-block px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 text-accent text-xs font-bold tracking-[0.2em] mb-8 w-fit">
                1. YOL
              </span>

              {/* Path A Image */}
              <div className="relative w-full aspect-4/3 mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                <Image
                  src="/images/deployment/path-a.jpg"
                  alt="Existing Stack Integration"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Grouped Header & Description for Perfect Alignment */}
              <div className="md:min-h-80 flex flex-col">
                <h3 className="md:min-h-20 mb-6 font-heading text-4xl font-bold text-white group-hover:text-accent transition-colors duration-500">
                  {deploymentModel.existingStack.title}
                </h3>
                <p className="mb-12 text-xl leading-relaxed text-neutral-400 font-light max-w-md">
                  {deploymentModel.existingStack.description}
                </p>
              </div>

              <div className="space-y-10 flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="mb-6 font-heading text-sm font-bold tracking-[0.2em] text-accent/80">
                    {deploymentModel.existingStack.subtitle}
                  </h4>
                  <ul className="space-y-5">
                    {deploymentModel.existingStack.features.map(
                      (feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-4 text-neutral-300 group/item"
                        >
                          <div className="h-px w-4 bg-accent/30 group-hover/item:w-8 transition-all duration-500" />
                          <span className="text-lg font-light">{feature}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>

                <div className="pt-10 mt-auto">
                  <p className="text-sm italic text-neutral-500 leading-relaxed max-w-sm">
                    {deploymentModel.existingStack.idealFor}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Path: Clean State */}
          <div className="group p-12 md:p-20 transition-all duration-700 hover:bg-white/1 flex flex-col bg-black">
            <div className="relative z-10 flex-1 flex flex-col">
              <span className="inline-block px-4 py-1.5 rounded-full border border-[#E879F9]/20 bg-[#E879F9]/5 text-[#E879F9] text-xs font-bold tracking-[0.2em] mb-8 w-fit">
                2. YOL
              </span>

              {/* Path B Image */}
              <div className="relative w-full aspect-4/3 mb-8 rounded-2xl overflow-hidden border border-white/10 shadow-lg bg-black/50">
                <Image
                  src="/images/deployment/path-b.jpg"
                  alt="Clean State Implementation"
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Grouped Header & Description for Perfect Alignment */}
              <div className="md:min-h-80 flex flex-col">
                <h3 className="md:min-h-20 mb-6 font-heading text-4xl font-bold text-white group-hover:text-[#E879F9] transition-colors duration-500">
                  {deploymentModel.cleanState.title}
                </h3>
                <p className="mb-12 text-xl leading-relaxed text-neutral-400 font-light max-w-md">
                  {deploymentModel.cleanState.description}
                </p>
              </div>

              <div className="space-y-10 flex-1 flex flex-col">
                <div className="flex-1">
                  <h4 className="mb-6 font-heading text-sm font-bold tracking-[0.2em] text-[#E879F9]">
                    {deploymentModel.cleanState.subtitle}
                  </h4>
                  <ul className="space-y-5">
                    {deploymentModel.cleanState.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-4 text-neutral-300 group/item"
                      >
                        <div className="h-px w-4 bg-secondary/30 group-hover/item:w-8 transition-all duration-500" />
                        <span className="text-lg font-light">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-10 mt-auto">
                  <p className="text-sm italic text-neutral-500 leading-relaxed max-w-sm">
                    {deploymentModel.cleanState.idealFor}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
