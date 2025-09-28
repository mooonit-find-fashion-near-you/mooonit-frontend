"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function GetTheApp() {

    const [selectedTab, setSelectedTab] = useState<"email" | "phone">("email")
    const [emailInput, setEmailInput] = useState("")

    return (
        <section id="get-the-app">
            <div className="container mx-auto px-4 py-16 font-[outfit]">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#2c2d3a] mb-4 text-balance">
                        Get Amazing Deals On Our App
                    </h1>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-12 items-center max-w-7xl mx-auto">
                    {/* Left Section - Get App */}
                    <div className="lg:col-span-1">
                        <h2 className="text-3xl md:text-4xl font-bold text-[#2c2d3a] mb-6">Get App</h2>
                        <p className="text-[#808080] text-lg mb-8 leading-relaxed">
                            We will send you a link, open it on your phone to download the app
                        </p>

                        {/* Tab Buttons */}
                        <div className="flex gap-2 mb-6">
                            <Button
                                variant={selectedTab === "email" ? "default" : "outline"}
                                onClick={() => setSelectedTab("email")}
                                className={`px-6 py-2 rounded-lg font-medium ${selectedTab === "email"
                                    ? "bg-[#2c2d3a] text-white hover:bg-[#2c2d3a]/90"
                                    : "bg-white text-[#2c2d3a] border-[#2c2d3a] hover:bg-[#2c2d3a]/5"
                                    }`}
                            >
                                Email
                            </Button>
                            <Button
                                variant={selectedTab === "phone" ? "default" : "outline"}
                                onClick={() => setSelectedTab("phone")}
                                className={`px-6 py-2 rounded-lg font-medium ${selectedTab === "phone"
                                    ? "bg-[#2c2d3a] text-white hover:bg-[#2c2d3a]/90"
                                    : "bg-white text-[#2c2d3a] border-[#2c2d3a] hover:bg-[#2c2d3a]/5"
                                    }`}
                            >
                                Phone
                            </Button>
                        </div>

                        {/* Input and Button */}
                        <div className="flex gap-3">
                            <Input
                                type={selectedTab === "email" ? "email" : "tel"}
                                placeholder={selectedTab === "email" ? "Enter Email Address" : "Enter Phone Number"}
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg text-[#2c2d3a] placeholder:text-[#a6a6a6]"
                            />
                            <Button className="px-8 py-3 bg-[#ffbeb9] hover:bg-[#ffbeb9]/90 text-[#2c2d3a] font-medium rounded-lg">
                                Get Link
                            </Button>
                        </div>
                    </div>

                    {/* Center Section - Phone Mockup */}
                    <figure className="relative justify-center lg:col-span-1 max-lg:hidden">
                        <Image
                            src="/images/phone.png"
                            alt="Mooonit App Interface"
                            width={300}
                            height={600}
                            className="w-[300rem] h-auto lg:col-span-1"
                            priority
                        />
                        <div id="bg-gradient-ball" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[34rem] -z-10 aspect-square rounded-full bg-gradient-to-b from-[#ffeadc] to-[#FEECE000]"></div>
                    </figure>

                    {/* Right Section - QR Code and Download */}
                    <figure className="relative mx-auto">
                        <Image
                            src="/images/qrcode.png"
                            alt="QR Code"
                            width={150}
                            height={150}
                            className="mb-6 w-[23rem] h-auto lg:col-span-1"
                            priority
                        />
                        <Link href="#!" className="">
                            <div className="absolute w-46.5 rounded-md h-14 bottom-6"></div>
                        </Link>
                        <Link href="#!" className="">
                            <div className="absolute w-41 rounded-md h-14 bottom-6 right-0"></div>
                        </Link>
                    </figure>
                </div>
            </div>
        </section>
    );
}