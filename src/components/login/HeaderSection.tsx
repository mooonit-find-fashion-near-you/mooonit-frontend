import { cn } from "@/lib/utils"

type HeaderSectionProps = {
    showOTP: boolean
    phoneNumber: string
}

export function HeaderSection({ showOTP, phoneNumber }: HeaderSectionProps) {
    return (
        <header className="text-center mb-6 md:mb-8">
            <h1 className={cn("font-[TOPLUXURY] text-[#2c2d3a] text-3xl md:text-5xl leading-tight")}>
                {showOTP ? "Enter OTP" : "Two Step Verification"}
            </h1>
            <p className="mt-4 text-sm md:text-base text-[#2c2d3a]/70">
                {showOTP
                    ? `Enter the code sent to +91 ${phoneNumber}`
                    : "Complete Details to signup and Start using "
                }
                {!showOTP && <span className="text-[#e54b4b]">Mooonit</span>}
            </p>
        </header>
    )
}