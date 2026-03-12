"use client";

import type { Locale } from "@/types";

interface FooterQuickLinksProps {
    links: Record<string, string>;
    locale: Locale;
    quickLinksTitle: string;
}

export default function FooterQuickLinks({ links, locale, quickLinksTitle }: FooterQuickLinksProps) {
    const pageRoutes: Record<string, string> = {
        about: `/${locale}/about`,
        platform: `/${locale}`,
        careers: `/${locale}/careers`,
        caseStudies: `/${locale}/case-studies`,
    };

    const handleContactClick = (e: React.MouseEvent) => {
        e.preventDefault();
        window.dispatchEvent(new CustomEvent("open-contact-form"));
    };

    return (
        <div>
            <h3 className="mb-4 text-sm font-semibold text-white">
                {quickLinksTitle}
            </h3>
            <ul className="space-y-3 text-sm">
                {Object.entries(links).map(([key, label]) => {
                    if (key === "contact") {
                        return (
                            <li key={key}>
                                <button
                                    onClick={handleContactClick}
                                    className="transition-colors hover:text-white cursor-pointer text-left"
                                >
                                    {label}
                                </button>
                            </li>
                        );
                    }

                    const href = pageRoutes[key] || `/${locale}#${key}`;
                    return (
                        <li key={key}>
                            <a
                                href={href}
                                className="transition-colors hover:text-white"
                            >
                                {label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
