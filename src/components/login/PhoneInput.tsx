import Image from "next/image"

type PhoneInputProps = {
    phoneNumber: string
    setPhoneNumber: (phone: string) => void
    setError: (error: string) => void
    isLoading: boolean
}

export function PhoneInput({ phoneNumber, setPhoneNumber, setError, isLoading }: PhoneInputProps) {
    return (
        <>
            <label className="sr-only" htmlFor="phone">
                Phone Number
            </label>
            <div
                className="flex items-center w-full rounded-md border border-[#adb5bd] px-3 py-2 md:px-4 md:py-3 focus-within:ring-2 focus-within:ring-[#e54b4b]/50 focus-within:border-[#e54b4b] transition-colors"
                role="group"
                aria-label="Phone with country code"
            >
                <button
                    type="button"
                    className="flex items-center gap-2 pr-3 md:pr-6 border-r border-[#adb5bd] focus:outline-none focus:ring-2 focus:ring-[#e54b4b]/50 rounded"
                    aria-label="Country code menu"
                    tabIndex={-1}
                >
                    <Image
                        src="/images/india-flag.png"
                        alt="India Flag"
                        width={20}
                        height={15}
                        className="w-10 h-7 rounded-sm"
                        priority
                    />
                    <span className="text-[#2c2d3a] text-sm md:text-base">+91</span>
                </button>

                <input
                    id="phone"
                    type="tel"
                    inputMode="tel"
                    minLength={10}
                    maxLength={10}
                    required
                    pattern="[6-9]\d{9}"
                    autoComplete="tel"
                    autoCorrect="off"
                    placeholder="Enter your phone number"
                    value={phoneNumber}
                    onChange={(e) => {
                        const value = e.target.value.replace(/[^0-9]/g, "")
                        setPhoneNumber(value)
                        setError("")
                    }}
                    className="w-full bg-transparent outline-none px-3 md:px-4 text-[#2c2d3a] placeholder-[#2c2d3a]/50"
                    aria-label="Phone number"
                    disabled={isLoading}
                />
            </div>
        </>
    )
}