// TODO: # AXIOS IMPLEMENTATION

"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

type GenderOption = "male" | "female" | "other" | "prefer-not-to-say"

type GenderPopupProps = {
    isOpen: boolean
    onClose: () => void
    phoneNumber: string
}

export function GenderPopup({ isOpen, onClose, phoneNumber }: GenderPopupProps) {
    const [selectedGender, setSelectedGender] = useState<GenderOption | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const genderOptions: { value: GenderOption; label: string; icon: string }[] = [
        { value: "male", label: "Male", icon: "♂" },
        { value: "female", label: "Female", icon: "♀" },
        { value: "other", label: "Other", icon: "⚧" },
        { value: "prefer-not-to-say", label: "Prefer not to say", icon: "?" },
    ]

    const handleGenderSelect = (gender: GenderOption) => {
        setSelectedGender(gender)
        setError("")
    }

    const handleSubmit = async () => {
        if (!selectedGender) {
            setError("Please select your gender")
            return
        }

        setIsSubmitting(true)
        setError("")

        try {
            // Simulate API call to save gender
            await new Promise(resolve => setTimeout(resolve, 1000))

            // TODO: Replace with actual API call
            // const response = await fetch('/api/user/gender', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ 
            //     phone: `+91${phoneNumber}`,
            //     gender: selectedGender 
            //   })
            // })

            // if (!response.ok) throw new Error('Failed to save gender')

            console.log(`Gender ${selectedGender} saved for user ${phoneNumber}`)

            // Close popup and redirect or show success
            onClose()
            // You can add redirect here: router.push('/dashboard')
            alert("Profile setup complete! Welcome to Mooonit!")

        } catch (err) {
            setError("Failed to save gender. Please try again.")
            console.error("Save gender error:", err)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-xl max-w-md w-full p-6 md:p-8 animate-in fade-in-90 zoom-in-90">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="w-16 h-16 mx-auto mb-4 bg-[#ffbeb9] rounded-full flex items-center justify-center">
                        <span className="text-2xl">👤</span>
                    </div>
                    <h2 className={cn("font-[TOPLUXURY] text-[#2c2d3a] text-2xl md:text-3xl")}>
                        Complete Your Profile
                    </h2>
                    <p className="mt-2 text-sm text-[#2c2d3a]/70">
                        Help us personalize your experience
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div
                        className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {/* Gender Selection */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-[#2c2d3a] mb-3">
                        Select your gender
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                        {genderOptions.map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleGenderSelect(option.value)}
                                className={cn(
                                    "p-4 rounded-xl cursor-pointer border-2 transition-all duration-200 text-center",
                                    "hover:border-[#e54b4b] hover:bg-[#ffbeb9]/20",
                                    selectedGender === option.value
                                        ? "border-[#e54b4b] bg-[#ffe2e0] text-[#e54b4b] scale-105"
                                        : "border-gray-200 bg-white text-[#2c2d3a]"
                                )}
                            >
                                <div className="text-2xl mb-2">{option.icon}</div>
                                <div className="text-sm font-medium">{option.label}</div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                    <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={!selectedGender || isSubmitting}
                        className="w-full rounded-full border border-[#e54b4b] bg-[#ffe2e0] h-12 px-6 text-base font-medium text-[#e54b4b] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffbeb9] cursor-pointer transition-colors"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-[#e54b4b] border-t-transparent rounded-full animate-spin" />
                                <span>Saving...</span>
                            </>
                        ) : (
                            <span>Complete Profile</span>
                        )}
                    </button>
                </div>

                {/* Note */}
                <p className="text-xs text-center text-[#2c2d3a]/50 mt-4">
                    You can always update this later in your profile settings
                </p>
            </div>
        </div>
    )
}