"use client";

import { useState } from "react";
import SectionButton from "../SectionButton";
import { sections } from "@/data/heroData";

export default function SectionTabs({ onSelect }: { onSelect: (section: string) => void }) {
  const [active, setActive] = useState("Women");

  const handleSelect = (section: string) => {
    setActive(section);
    onSelect(section);
  };

  return (
    <section
      id="sections"
      className="py-4 px-4 overflow-x-auto scrollbar-hide"
    >
      <div className="flex items-center justify-start sm:justify-center gap-x-3 min-w-max">
        {sections.map((sec) => (
          <div key={sec} className="flex-shrink-0">
            <SectionButton
              label={sec}
              isActive={active === sec}
              onClick={() => handleSelect(sec)}
            />
          </div>
        ))}
      </div>
    </section>
  );
}