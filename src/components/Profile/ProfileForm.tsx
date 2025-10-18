"use client"

import { ArrowRight } from "lucide-react"

function Field({ label, placeholder }: { label: string; placeholder: string }) {
    return (
        <label className="block">
            <span className="text-xs text-[#828282]">{label}</span>
            <input
                className="mt-1 w-full rounded-md border bg-white px-3 py-2 text-sm outline-none"
                style={{ borderColor: "#b2bcca" }}
                placeholder={placeholder}
            />
        </label>
    )
}

export default function ProfileForm() {
    return (
        <section
            className="rounded-2xl p-5 md:p-8 lg:p-10"
            style={{
                backgroundColor: "#f9fbff",
                border: "1px solid #e7e7e7",
            }}
        >
            {/* Header with avatar and name */}
            <div className="flex items-center gap-4 md:gap-6">
                <div className="relative w-16 h-16 md:w-20 md:h-20">
                    {/* Outer red ring */}
                    <div
                        className="absolute inset-0 rounded-full"
                        style={{ boxShadow: "0 0 0 4px #e54b4b, inset 0 0 0 4px #ffffff" }}
                    />
                    {/* Avatar placeholder */}
                    <div className="relative w-full h-full rounded-full bg-[#ffbeb9] grid place-items-center text-[#1d1d1d] font-semibold select-none">
                        {"LU"}
                    </div>
                </div>
                <h3 className="text-xl md:text-2xl tracking-wide text-[#2c2d3a]">{"LOREM USER"}</h3>
            </div>

            {/* Your Details */}
            <div className="mt-6 md:mt-8">
                <h4 className="text-lg md:text-xl text-[#2c2d3a] mb-4">{"Your Details"}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="First Name" placeholder="Lorem" />
                    <Field label="Last Name" placeholder="User" />
                    <div className="md:col-span-2">
                        <Field label="Email" placeholder="username@gmail.com" />
                    </div>
                    <div className="md:col-span-2">
                        <Field label="Phone" placeholder="+ 123 456 789 111" />
                    </div>
                </div>
            </div>

            {/* Divider */}
            <hr className="my-6 md:my-8 border-t" style={{ borderColor: "#e7e7e7" }} />

            {/* Change Password */}
            <div>
                <h4 className="text-lg md:text-xl text-[#2c2d3a] mb-4">{"Change Password"}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="New Password" placeholder="New Password" />
                    <Field label="Re-Enter" placeholder="Confirm New Password" />
                    <div className="md:col-span-2">
                        <Field label="New Password" placeholder="New Password" />
                    </div>
                </div>
            </div>

            {/* Continue button */}
            <div className="mt-6">
                <button
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium"
                    style={{
                        backgroundColor: "#ffbeb9",
                        color: "#2c2d3a",
                        border: "2px solid #e54b4b",
                    }}
                >
                    {"Continue Shopping"}
                    <ArrowRight size={16} />
                </button>
            </div>
        </section>
    )
}
