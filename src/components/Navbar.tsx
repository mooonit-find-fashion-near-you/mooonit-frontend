"use client";

import { Search, ShoppingCart, User } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const Navbar = () => {

    const [searchQuery, setSearchQuery] = useState('');
    const [category, setCategory] = useState("all");

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Search query:', searchQuery);
    };

    return (
        <>
            {/* Header */}
            <header id='header' className="bg-white shadow-lg shadow-[#FFBEB980]">
                <nav className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <figure>
                            <Image src="/images/logo.svg" alt="Mooonit Logo" width={120} height={40} />
                        </figure>

                        {/* Search Bar */}
                        <div className="relative flex-1 flex items-center mx-8">
                            <div className="flex items-center flex-1 border border-gray-300 rounded-l">
                                <form onSubmit={handleSearchSubmit} className='w-full'>
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-4 pr-6 py-2 focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none"
                                    />
                                </form>
                                <div className="border-l border-gray-400 py-3"></div>
                                <div className="h-full flex items-center">
                                    <Select onValueChange={(val) => setCategory(val)} defaultValue="all">
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
                                <button className="p-2 px-6 text-gray-600 hover:text-gray-900 transition-colors">
                                    <Search size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Header Icons */}
                        <div className="flex items-center space-x-4">
                            {/* <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                                <Search size={19} />
                            </button> */}
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
                </nav>
            </header >
        </>
    );
}

export default Navbar;