"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "./ui/select";
import Image from "next/image";

const Navbar = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState("all");

    // explicitly type event handler (for form/button/input)
    const handleSearchSubmit = (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
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
                            <Image src="/images/logo.svg" alt="Mooonit Logo" width={120} height={40} />
                        </figure>

                        {/* Desktop Search Bar - Hidden on mobile */}
                        <div className="hidden lg:flex relative flex-1 items-center mx-8">
                            <div className="flex items-center flex-1 border border-gray-300 rounded-l">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                                    className="w-full pl-4 pr-6 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                />
                                <div className="border-l border-gray-400 py-3"></div>
                                <div className="h-full flex items-center">
                                    <Select
                                        onValueChange={(val: string) => setCategory(val)}
                                        defaultValue="all"
                                    >
                                        <SelectTrigger className="w-32 text-gray-500 h-9 rounded-none py-5 focus:ring-0 border-none">
                                            <SelectValue placeholder="Category" />
                                        </SelectTrigger>
                                        <SelectContent>
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
                                    type="button"
                                    onClick={handleSearchSubmit}
                                    className="p-2 px-6 text-gray-600 hover:text-gray-900 transition-colors"
                                >
                                    <Search size={18} />
                                </button>
                            </div>
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
                    <div className="lg:hidden pb-4">
                        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden min-w-0">
                            {/* Search Input */}
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit(e)}
                                className="flex-1 min-w-0 pl-3 pr-2 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                            />

                            {/* Separator (hidden on very small screens) */}
                            <div className="border-l border-gray-300 h-6 mx-1 hidden xs:block"></div>

                            {/* Category Select (hide text on very small screens, keep icon/short form) */}
                            <Select onValueChange={(val: string) => setCategory(val)} defaultValue="all">
                                <SelectTrigger className="px-2 py-2 text-gray-500 text-sm border-none focus:ring-0 max-w-[90px] truncate">
                                    <SelectValue placeholder="All" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All <span className="hidden [@media(min-width:325px)]:inline">Category</span></SelectItem>
                                    <SelectItem value="clothes">Clothes</SelectItem>
                                    <SelectItem value="accessories">Accessories</SelectItem>
                                    <SelectItem value="footwear">Footwear</SelectItem>
                                    <SelectItem value="bags">Bags</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Search Button */}
                            <button
                                type="button"
                                onClick={handleSearchSubmit}
                                className="bg-[#FFDC91] border-l border-[#FBBC04] px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0"
                            >
                                <Search size={16} />
                            </button>
                        </div>
                    </div>

                </nav>
            </header>
        </>
    );
};

export default Navbar;
