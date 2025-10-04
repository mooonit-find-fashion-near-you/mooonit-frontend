"use client";

import { Search, ShoppingCart, User } from "lucide-react";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Extracted SearchForm component to reduce duplication
interface SearchFormProps {
    searchQuery: string;
    onSearchQueryChange: (value: string) => void;
    category: string;
    onCategoryChange: (value: string) => void;
    onSearch: (query: string, category: string) => void;
    variant: "desktop" | "mobile";
}

const SearchForm = ({
    searchQuery,
    onSearchQueryChange,
    category,
    onCategoryChange,
    onSearch,
    variant,
}: SearchFormProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery, category);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSearch(searchQuery, category);
        }
    };

    const isDesktop = variant === "desktop";

    if (isDesktop) {
        return (
            <div className="hidden lg:flex relative flex-1 items-center mx-8">
                <form onSubmit={handleSubmit} className="flex w-full">
                    <div className="flex items-center flex-1 border border-gray-300 rounded-l">
                        <input
                            type="search"
                            placeholder="Search products..."
                            value={searchQuery}
                            onChange={(e) => onSearchQueryChange(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="w-full pl-4 pr-6 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none font-[outfit]"
                            aria-label="Search products"
                            autoComplete="off"
                        />
                        <div className="border-l border-gray-400 py-3" aria-hidden="true"></div>
                        <div className="h-full flex items-center font-[outfit]">
                            <Select onValueChange={onCategoryChange} defaultValue={category}>
                                <SelectTrigger
                                    className="w-32 text-gray-500 h-9 rounded-none cursor-pointer py-5 focus:ring-0 border-none font-[outfit]"
                                    aria-label="Search category"
                                >
                                    <SelectValue placeholder="Category" />
                                </SelectTrigger>
                                <SelectContent className="font-[outfit]">
                                    <SelectItem className="cursor-pointer" value="all">All Category</SelectItem>
                                    <SelectItem className="cursor-pointer" value="women">Women</SelectItem>
                                    <SelectItem className="cursor-pointer" value="footwear">Footwear</SelectItem>
                                    <SelectItem className="cursor-pointer" value="accessories">Accessories</SelectItem>
                                    <SelectItem className="cursor-pointer" value="bags">Bags</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="bg-[#FFDC91] cursor-pointer border-[#FBBC04] border rounded-r-lg p-2 px-6 text-gray-600 hover:text-gray-900 transition-colors"
                        aria-label="Submit search"
                    >
                        <Search size={18} />
                    </button>
                </form>
            </div>
        );
    }

    // Mobile variant
    return (
        <div className="lg:hidden pb-4">
            <form onSubmit={handleSubmit}>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden min-w-0">
                    <input
                        type="search"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 min-w-0 pl-3 pr-2 py-2 text-sm outline-none focus:ring-2 focus:ring-yellow-400"
                        aria-label="Search products"
                        autoComplete="off"
                    />
                    <div className="border-l border-gray-300 h-6 mx-1 hidden xs:block" aria-hidden="true"></div>
                    <Select onValueChange={onCategoryChange} defaultValue={category}>
                        <SelectTrigger
                            className="px-2 py-2 text-gray-500 text-sm border-none focus:ring-0 max-w-[90px] truncate"
                            aria-label="Search category"
                        >
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
                    <button
                        type="submit"
                        className="bg-[#FFDC91] border-l border-[#FBBC04] px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors shrink-0"
                        aria-label="Submit search"
                    >
                        <Search size={16} />
                    </button>
                </div>
            </form>
        </div>
    );
};

const Navbar: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [category, setCategory] = useState<string>("all");
    const router = useRouter();

    // Real search implementation with navigation
    const handleSearch = (query: string, searchCategory: string) => {
        if (!query.trim()) return;

        // Navigate to search results page
        router.push(`/search?q=${encodeURIComponent(query)}&category=${searchCategory}`);

        // Optional: Add analytics tracking here
        // trackSearchEvent(query, searchCategory);
    };

    return (
        <header
            id="header"
            className="bg-white shadow-lg shadow-[#FFBEB980] z-50 relative top-0"
        >
            <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Header Row */}
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <figure>
                        <Link href="/">
                            <Image src="/images/logo.svg" alt="Mooonit Logo" width={120} height={40} />
                        </Link>
                    </figure>

                    {/* Desktop Search Bar */}
                    <SearchForm
                        searchQuery={searchQuery}
                        onSearchQueryChange={setSearchQuery}
                        category={category}
                        onCategoryChange={setCategory}
                        onSearch={handleSearch}
                        variant="desktop"
                    />

                    {/* Header Icons */}
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <Link href="/account" aria-label="Account">
                            <button className="cursor-pointer p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <User size={19} />
                            </button>
                        </Link>
                        <Link href="/cart" aria-label="Shopping cart">
                            <button className="cursor-pointer relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <ShoppingCart size={19} />
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    0
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Search Bar */}
                <SearchForm
                    searchQuery={searchQuery}
                    onSearchQueryChange={setSearchQuery}
                    category={category}
                    onCategoryChange={setCategory}
                    onSearch={handleSearch}
                    variant="mobile"
                />
            </nav>
        </header>
    );
};

export default Navbar;