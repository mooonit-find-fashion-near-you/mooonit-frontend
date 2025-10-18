"use client"

import type React from "react"

import { UserRound, Package, Book, LogOut, ChevronRight } from "lucide-react"

function Row({
    icon,
    label,
    active = false,
}: {
    icon: React.ReactNode
    label: string
    active?: boolean
}) {
    return (
        <button
            className="w-full flex items-center justify-between px-4 py-4 text-left"
            style={{
                color: active ? "#e54b4b" : "#2c2d3a",
            }}
            aria-current={active ? "page" : undefined}
        >
            <span className="inline-flex items-center gap-3 text-sm">
                <span
                    className="inline-flex items-center justify-center w-6 h-6 rounded-md border"
                    style={{ borderColor: "#e7e7e7", color: active ? "#e54b4b" : "#2c2d3a" }}
                >
                    {icon}
                </span>
                {label}
            </span>
            <ChevronRight size={16} className="text-[#828282]" />
        </button>
    )
}

export default function ProfileSidebar() {
    return (
        <aside className="rounded-2xl bg-[#fefefe] overflow-hidden" style={{ border: "1px solid #e7e7e7" }}>
            <div className="px-6 pt-6 pb-4">
                <h2 className="text-xl font-semibold text-[#2c2d3a]">{"Hello User"}</h2>
                <p className="text-xs text-[#757575] mt-1">{"+ 123 456 789 111"}</p>
            </div>
            <div className="divide-y" style={{ borderColor: "#e7e7e7" }}>
                <Row icon={<UserRound size={16} />} label="My Profile" active />
                <Row icon={<Package size={16} />} label="My Orders" />
                <Row icon={<Book size={16} />} label="Address Book" />
                <Row icon={<LogOut size={16} />} label="Logout" />
            </div>
        </aside>
    )
}
