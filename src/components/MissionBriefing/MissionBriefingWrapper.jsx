"use client";

export default function MissionBriefingWrapper({ children }) {
  return (
    <section
      id="mission-briefing"
      style={{
        position: "relative",
        minHeight: "200vh", // about + achievements
        overflow: "hidden",
      }}
    >
      {children}
    </section>
  );
}
