"use client";

import { useState, useEffect } from "react";
import SectionButton from "../SectionButton";
import { useCategories } from "@/hooks/useCategories";

const CATEGORY_ID_TO_SECTION: Record<string, string> = {
  "women_root": "Women",
  "men_root": "Men",
  "footwear_root": "Footwear",
  "accessories_root": "Accessories",
  "bags_root": "Bags",
};

const SECTION_ORDER = [
  "women_root",
  "men_root",
  "footwear_root",
  "accessories_root",
  "bags_root",
];

export default function SectionTabs({ onSelect }: { onSelect: (section: string) => void }) {
  const [active, setActive] = useState("Women");
  const { categories, loading } = useCategories();

  const sections = SECTION_ORDER.map(categoryId => {
    const category = categories.find(cat => cat.categoryId === categoryId);
    return category ? CATEGORY_ID_TO_SECTION[categoryId] : null;
  }).filter(Boolean) as string[];

  const handleSelect = (section: string) => {
    setActive(section);
    onSelect(section);
  };

  useEffect(() => {
    if (sections.length > 0 && !active) {
      setActive(sections[0]);
      onSelect(sections[0]);
    }
  }, [sections, active, onSelect]);

  if (loading) {
    // 💡 Responsive Skeleton Loader
    return (
      <section id="sections" className="py-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center justify-start sm:justify-center gap-x-3 min-w-max">
          {[1, 2, 3, 4, 5].map(i => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 rounded-full animate-pulse"
            >
              {/* Avatar skeleton */}
              <div className="rounded-full bg-gray-200 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />

              {/* Label skeleton */}
              <div className="bg-gray-200 rounded-full h-8 sm:h-10 md:h-12 w-20 sm:w-28 md:w-36" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="sections" className="py-4 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-start sm:justify-center gap-x-3 min-w-max">
        {sections.map(sec => (
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
