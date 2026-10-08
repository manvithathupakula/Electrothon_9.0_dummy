"use client";

import { FloatingDock } from "@/components/ui/floating-dock";

export default function FloatingNav() {
  const items = [
    {
      title: "Schedule",
      href: "#schedule",
      icon: (
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.25em] text-white transition group-hover:text-[#D58BFF] group-hover:[text-shadow:0_0_10px_#D58BFF]">
          SCHEDULE
        </span>
      ),
    },
    {
      title: "Sponsors",
      href: "#sponsors",
      icon: (
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.25em] text-white transition group-hover:text-[#D58BFF] group-hover:[text-shadow:0_0_10px_#D58BFF]">
          SPONSORS
        </span>
      ),
    },
    {
      title: "Themes",
      href: "#themes",
      icon: (
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.25em] text-white transition group-hover:text-[#D58BFF] group-hover:[text-shadow:0_0_10px_#D58BFF]">
          THEMES
        </span>
      ),
    },
    {
      title: "Prizes",
      href: "#coming-soon",
      icon: (
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.25em] text-white transition group-hover:text-[#D58BFF] group-hover:[text-shadow:0_0_10px_#D58BFF]">
          PRIZES
        </span>
      ),
    },
    {
      title: "FAQs",
      href: "#faqs",
      icon: (
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.25em] text-white transition group-hover:text-[#D58BFF] group-hover:[text-shadow:0_0_10px_#D58BFF]">
          FAQS
        </span>
      ),
    },
    {
      title: "Contact Us",
      href: "#contact",
      icon: (
        <span className="whitespace-nowrap text-[14px] font-semibold tracking-[0.25em] text-white transition group-hover:text-[#D58BFF] group-hover:[text-shadow:0_0_10px_#D58BFF]">
          CONTACT&nbsp;US
        </span>
      ),
    },
  ];

  return (
    <FloatingDock
      items={items}
      desktopClassName="!mx-0 !h-full !gap-[42px] !px-0 !pb-0"
      mobileClassName="mt-3"
    />
  );
}
