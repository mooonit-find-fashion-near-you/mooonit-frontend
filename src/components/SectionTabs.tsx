"use client";

import { useState } from "react";
import SectionButton from "./SectionButton";

const sections = ["Women", "Men", "Foot Wear", "Accessories"];

export default function SectionTabs({ onSelect }: { onSelect: (section: string) => void }) {
  const [active, setActive] = useState("Women");

  const handleSelect = (section: string) => {
    setActive(section);
    onSelect(section);
  };

  return (
    <section
      id="sections"
      className="flex justify-center items-center gap-x-12 gap-y-6 py-6 flex-wrap px-8"
    >
      {sections.map((sec) => (
        <SectionButton
          key={sec}
          label={sec}
          isActive={active === sec}
          onClick={() => handleSelect(sec)}
        />
      ))}
    </section>
  );
}
