"use client";

import PillNav from "@/components/MainPage/PillNav.js";

const navItems = [
  { label: "Home", href: "#" },          // first item is logo link
  { label: "Schedule", href: "#schedule" },
  { label: "Sponsors", href: "#sponsors" },
  { label: "Themes", href: "#themes" },
{ label: "Challenges", href: "#challenges" },
  { label: "FAQs", href: "#faqs" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <PillNav
      // logo="/logo.png"          // path from /public
      logoAlt="Site Logo"
      items={navItems}
      activeHref="/"            // optional, can be dynamic later
      baseColor="#753AB3"
      pillColor="#4c1a7d"
      hoveredPillTextColor="#fff"
      pillTextColor="#fff"
      initialLoadAnimation={true}
    />
  );
}