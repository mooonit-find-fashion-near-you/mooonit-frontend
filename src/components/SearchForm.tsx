"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Search } from "lucide-react";

type Props = {
  searchQuery: string;
  onSearchQueryChange: (v: string) => void;
  category: string;
  onCategoryChange: (v: string) => void;
  onSubmit: () => void;
  className?: string;
  submitAriaLabel?: string;
};

export const SearchForm: React.FC<Props> = ({
  searchQuery,
  onSearchQueryChange,
  category,
  onCategoryChange,
  onSubmit,
  className = "",
  submitAriaLabel = "Submit search",
}) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className={className}
      role="search"
      aria-label="Site search"
    >
      <div className="flex items-center flex-1 border border-gray-300 rounded-l">
        <input
          type="search"
          aria-label="Search"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => onSearchQueryChange(e.target.value)}
          className="w-full pl-4 pr-6 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none font-[outfit]"
        />
        <div className="border-l border-gray-400 py-3" aria-hidden />
        <div className="h-full flex items-center font-[outfit]">
          <Select
            value={category}
            onValueChange={(val: string) => onCategoryChange(val)}
          >
            <SelectTrigger className="w-32 text-gray-500 h-9 rounded-none py-5 focus:ring-0 border-none font-[outfit]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent className="font-[outfit]">
              <SelectItem value="all">All Category</SelectItem>
              <SelectItem value="clothes">Clothes</SelectItem>
              <SelectItem value="accessories">Accessories</SelectItem>
              <SelectItem value="footwear">Footwear</SelectItem>
              <SelectItem value="bags">Bags</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="transform bg-[#FFDC91] border-[#FBBC04] border rounded-r-lg">
        <button
          type="submit"
          className="p-2 px-6 text-gray-600 hover:text-gray-900 transition-colors"
          aria-label={submitAriaLabel}
        >
          <Search size={18} />
        </button>
      </div>
    </form>
  );
};
