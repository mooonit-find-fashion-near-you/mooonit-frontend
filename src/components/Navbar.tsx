"use client";

import { ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { SearchForm } from "./SearchForm";

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  // perform search action (no DOM event required; SearchForm handles preventDefault)
  const handleSearchSubmit = () => {
    // TODO: replace console.log with real search/navigation logic
    console.log("Search query:", searchQuery, "Category:", category);
  };

  return (
    <>
      {/* Header */}
      <header
        id="header"
        className="bg-white shadow-lg shadow-[#FFBEB980] z-50 relative top-0"
      >
        <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Header Row */}
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <figure>
              <Image
                src="/images/logo.svg"
                alt="Mooonit Logo"
                width={120}
                height={40}
              />
            </figure>

            {/* Desktop Search Bar - Hidden on mobile */}
            <div className="hidden lg:flex relative flex-1 items-center mx-8">
              <SearchForm
                searchQuery={searchQuery}
                onSearchQueryChange={(v) => setSearchQuery(v)}
                category={category}
                onCategoryChange={(v) => setCategory(v)}
                onSubmit={handleSearchSubmit}
                className="flex-1 flex items-center"
                submitAriaLabel="Submit search"
              />
            </div>

            {/* Header Icons */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <User size={19} />
              </button>
              <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart size={19} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

          {/* Mobile Search Bar - Shown below header on small screens */}
          {/* Mobile Search Bar using shared component */}
          <div className="lg:hidden pb-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden min-w-0">
              <SearchForm
                searchQuery={searchQuery}
                onSearchQueryChange={(v) => setSearchQuery(v)}
                category={category}
                onCategoryChange={(v) => setCategory(v)}
                onSubmit={handleSearchSubmit}
                className="flex-1 flex items-center"
                submitAriaLabel="Submit mobile search"
              />
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Navbar;
