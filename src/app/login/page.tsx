"use client"

import { cn } from "@/lib/utils"
import Image from "next/image"
import { useRef, useState, useEffect, useCallback } from "react"

type OTPInputProps = {
    length?: number
    value?: string
    onChange?: (val: string) => void
    ariaLabel?: string
    disabled?: boolean
}

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showOTP, setShowOTP] = useState(false)
    const [otpValue, setOtpValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [resendCountdown, setResendCountdown] = useState(0)
    const [isResending, setIsResending] = useState(false)

    // Countdown timer effect
    useEffect(() => {
        if (resendCountdown > 0) {
            const timer = setTimeout(() => setResendCountdown(resendCountdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [resendCountdown])

    const validatePhoneNumber = (phone: string) => {
        return /^[6-9]\d{9}$/.test(phone) // Indian mobile numbers start with 6-9
    }

    const handleSendOTP = async () => {
        setError("")

        if (!validatePhoneNumber(phoneNumber)) {
            setError("Please enter a valid 10-digit Indian mobile number")
            return
        }

        setIsLoading(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // In production, replace with actual API call
            // const response = await fetch('/api/send-otp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ phone: `+91${phoneNumber}` })
            // })

            // if (!response.ok) throw new Error('Failed to send OTP')

            setShowOTP(true)
            setResendCountdown(30) // 30 seconds countdown
            setError("")
        } catch (err) {
            setError("Failed to send OTP. Please try again.")
            console.error("Send OTP error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleResendOTP = async () => {
        if (resendCountdown > 0 || isResending) return

        setIsResending(true)
        setError("")

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // In production, replace with actual API call
            // const response = await fetch('/api/resend-otp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ phone: `+91${phoneNumber}` })
            // })

            // if (!response.ok) throw new Error('Failed to resend OTP')

            setOtpValue("") // Clear previous OTP
            setResendCountdown(30) // Reset countdown
            setError("")
        } catch (err) {
            setError("Failed to resend OTP. Please try again.")
            console.error("Resend OTP error:", err)
        } finally {
            setIsResending(false)
        }
    }

    const handleVerifyOTP = async () => {
        if (otpValue.length !== 6) {
            setError("Please enter the 6-digit OTP")
            return
        }

        setIsLoading(true)
        setError("")

        try {
            // Simulate API verification
            await new Promise(resolve => setTimeout(resolve, 1500))

            // In production, replace with actual API call
            // const response = await fetch('/api/verify-otp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ 
            //         phone: `+91${phoneNumber}`, 
            //         otp: otpValue 
            //     })
            // })

            // if (!response.ok) throw new Error('Invalid OTP')

            // Handle successful verification
            console.log("OTP verified successfully!")
            // Redirect or show success message
            alert("OTP verified successfully!") // Replace with your success handling

        } catch (err) {
            setError("Invalid OTP. Please try again.")
            console.error("Verify OTP error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        // Implement Google OAuth flow
        console.log("Google sign in initiated")
        // window.location.href = '/api/auth/google' // Example redirect
    }

    return (
        <div className="w-fit mx-auto flex justify-center gap-11 items-start font-[outfit] mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border">
            {/* Left: Image */}
            <figure className="w-md h-[31rem] hidden lg:block">
                <Image
                    src="/images/women-with-bag.jpg"
                    alt="Login Illustration"
                    width={800}
                    height={600}
                    className="w-full h-full object-cover object-[60%] rounded-2xl"
                    priority
                />
            </figure>

            {/* Right: Form */}
            <div className="flex flex-col items-center md:items-stretch min-w-[300px] md:min-w-[400px]">
                <header className="text-center mb-6 md:mb-8">
                    <h1 className="font-[TOPLUXURY] text-[#2c2d3a] text-3xl md:text-5xl leading-tight">
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

                {/* Error Message */}
                {error && (
                    <div
                        className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
                        role="alert"
                        aria-live="polite"
                    >
                        {error}
                    </div>
                )}

                {!showOTP ? (
                    <>
                        {/* Phone input */}
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
                                className="flex items-center gap-2 pr-3 md:pr-6 border-r border-[#adb5bd] rounded"
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
                                aria-invalid={error ? "true" : "false"}
                                disabled={isLoading}
                            />
                        </div>

                        {/* Send OTP Button */}
                        <button
                            type="button"
                            onClick={handleSendOTP}
                            disabled={phoneNumber.length !== 10 || isLoading}
                            className="mt-5 md:mt-6 w-full rounded-full border border-[#e54b4b] bg-[#ffbeb9] h-14 md:h-16 px-6 text-base md:text-lg font-medium text-[#e54b4b] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffafa9] transition-colors"
                            aria-label={isLoading ? "Sending OTP..." : "Send One Time Password"}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#e54b4b] border-t-transparent rounded-full animate-spin" />
                                    <span>Sending...</span>
                                </>
                            ) : (
                                <>
                                    <span>Send One Time Password</span>
                                    <svg
                                        className="size-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m13 5 7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* Divider */}
                        <div className="my-6 md:my-8 flex items-center gap-4">
                            <span className="h-px flex-1 bg-[#2c2d3a]/40" aria-hidden="true" />
                            <span className="text-[#2c2d3a] text-sm md:text-base whitespace-nowrap">Or continue with</span>
                            <span className="h-px flex-1 bg-[#2c2d3a]/40" aria-hidden="true" />
                        </div>

                        {/* Google sign-in */}
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={isLoading}
                            className="w-full rounded-full border border-[#adb5bd] h-14 md:h-16 px-6 flex items-center justify-center gap-3 text-[#2c2d3a] hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Sign in with Google"
                        >
                            <svg width="23" height="23" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M29.3674 12.8919L17.1307 12.8914C16.5903 12.8914 16.1523 13.3293 16.1523 13.8696V17.7787C16.1523 18.319 16.5903 18.757 17.1306 18.757H24.0216C23.267 20.7153 21.8587 22.3552 20.0618 23.3973L23.0001 28.4837C27.7135 25.7578 30.5001 20.9748 30.5001 15.6207C30.5001 14.8583 30.4439 14.3133 30.3316 13.6997C30.2461 13.2334 29.8414 12.8919 29.3674 12.8919Z" fill="#167EE6" />
                                <path d="M15.4994 24.6305C12.1271 24.6305 9.18307 22.7879 7.60191 20.0614L2.51562 22.9931C5.104 27.4791 9.95287 30.5001 15.4994 30.5001C18.2203 30.5001 20.7877 29.7675 22.9994 28.4908V28.4838L20.0611 23.3973C18.717 24.1768 17.1617 24.6305 15.4994 24.6305Z" fill="#12B347" />
                                <path d="M23 28.4907V28.4837L20.0617 23.3972C18.7177 24.1767 17.1625 24.6304 15.5 24.6304V30.5C18.2209 30.5 20.7884 29.7674 23 28.4907Z" fill="#0F993E" />
                                <path d="M6.36957 15.5C6.36957 13.8377 6.8232 12.2826 7.60256 10.9386L2.51627 8.00696C1.23254 10.2117 0.5 12.7721 0.5 15.5C0.5 18.2279 1.23254 20.7883 2.51627 22.993L7.60256 20.0613C6.8232 18.7174 6.36957 17.1622 6.36957 15.5Z" fill="#FFD500" />
                                <path d="M15.4994 6.36957C17.6984 6.36957 19.7184 7.15098 21.2962 8.45076C21.6854 8.77139 22.2511 8.74824 22.6077 8.3917L25.3774 5.62197C25.7819 5.21744 25.7531 4.55527 25.321 4.18039C22.6775 1.88709 19.238 0.5 15.4994 0.5C9.95287 0.5 5.104 3.52092 2.51562 8.00697L7.60191 10.9387C9.18307 8.21211 12.1271 6.36957 15.4994 6.36957Z" fill="#FF4B26" />
                                <path d="M21.2968 8.45076C21.686 8.77139 22.2518 8.74824 22.6083 8.3917L25.378 5.62197C25.7825 5.21744 25.7537 4.55527 25.3216 4.18039C22.6781 1.88703 19.2387 0.5 15.5 0.5V6.36957C17.699 6.36957 19.719 7.15098 21.2968 8.45076Z" fill="#D93F21" />
                            </svg>
                            <span className="text-sm md:text-base">Sign in with Google</span>
                        </button>
                    </>
                ) : (
                    <>
                        {/* OTP Input Section */}
                        <div className="mb-6">
                            <OTPInput
                                length={6}
                                value={otpValue}
                                onChange={setOtpValue}
                                ariaLabel="One-time password"
                                disabled={isLoading}
                            />
                        </div>

                        {/* Resend OTP Section */}
                        <div className="text-center mb-6">
                            {resendCountdown > 0 ? (
                                <p className="text-sm text-[#2c2d3a]/70">
                                    Resend OTP in <span className="font-semibold">{resendCountdown}s</span>
                                </p>
                            ) : (
                                <button
                                    type="button"
                                    onClick={handleResendOTP}
                                    disabled={isResending}
                                    className="text-[#e54b4b] hover:text-[#c43a3a] text-sm font-medium underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    aria-label={isResending ? "Resending OTP..." : "Resend OTP"}
                                >
                                    {isResending ? "Resending..." : "Resend OTP"}
                                </button>
                            )}
                        </div>

                        {/* Verify Button */}
                        <button
                            type="button"
                            onClick={handleVerifyOTP}
                            disabled={otpValue.length !== 6 || isLoading}
                            className="mt-2 w-full rounded-full border border-[#e54b4b] bg-[#ffbeb9] h-14 md:h-16 px-6 text-base md:text-lg font-medium text-[#e54b4b] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#ffafa9] transition-colors"
                            aria-label={isLoading ? "Verifying OTP..." : "Verify OTP"}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-[#e54b4b] border-t-transparent rounded-full animate-spin" />
                                    <span>Verifying...</span>
                                </>
                            ) : (
                                <>
                                    <span>Verify OTP</span>
                                    <svg
                                        className="size-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        aria-hidden="true"
                                    >
                                        <path d="M5 12h14" />
                                        <path d="m13 5 7 7-7 7" />
                                    </svg>
                                </>
                            )}
                        </button>

                        {/* Back to phone input */}
                        <button
                            type="button"
                            onClick={() => {
                                setShowOTP(false)
                                setOtpValue("")
                                setError("")
                                setResendCountdown(0)
                            }}
                            disabled={isLoading}
                            className="mt-4 text-sm text-[#2c2d3a]/70 hover:text-[#2c2d3a] underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Change phone number
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export function OTPInput({ length = 6, value = "", onChange, ariaLabel = "One-time password", disabled = false }: OTPInputProps) {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([])

    const digits = Array.from({ length }, (_, i) => value[i] ?? "")

    const setCharAt = (str: string, index: number, chr: string) => {
        if (index > str.length - 1) return str + chr;
        return str.substring(0, index) + chr + str.substring(index + 1)
    }

    const handleInput = useCallback((i: number, v: string) => {
        if (disabled) return;

        const nextChar = v.replace(/[^0-9]/g, "").slice(-1)
        if (!nextChar && v !== "") return; // Don't update if not a digit and not empty

        let updated: string;
        if (!nextChar) {
            // Handle backspace/delete - remove character at position i
            updated = value.substring(0, i) + value.substring(i + 1)
        } else {
            // Handle digit input
            updated = setCharAt(value, i, nextChar)
        }

        onChange?.(updated)

        // Focus next input if a digit was added
        if (nextChar && i < length - 1) {
            setTimeout(() => inputsRef.current[i + 1]?.focus(), 10)
        }
    }, [value, onChange, length, disabled])

    const handleKeyDown = useCallback((i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === "Backspace") {
            e.preventDefault()
            if (value[i] === undefined && i > 0) {
                // If current position is empty and not first input, focus previous
                inputsRef.current[i - 1]?.focus()
            } else {
                // Clear current position
                const updated = value.substring(0, i) + value.substring(i + 1)
                onChange?.(updated)
                if (i > 0) {
                    setTimeout(() => inputsRef.current[i - 1]?.focus(), 10)
                }
            }
        } else if (e.key === "ArrowLeft" && i > 0) {
            e.preventDefault()
            inputsRef.current[i - 1]?.focus()
        } else if (e.key === "ArrowRight" && i < length - 1) {
            e.preventDefault()
            inputsRef.current[i + 1]?.focus()
        } else if (e.key === "Delete") {
            e.preventDefault()
            const updated = value.substring(0, i) + value.substring(i + 1)
            onChange?.(updated)
        }
    }, [value, onChange, length, disabled])

    const handlePaste = useCallback((e: React.ClipboardEvent) => {
        if (disabled) return;

        e.preventDefault()
        const pastedData = e.clipboardData.getData('text/plain').replace(/[^0-9]/g, "").slice(0, length)
        if (pastedData) {
            onChange?.(pastedData)
            // Focus the last input that will have data or the last input if pasted data is full length
            const focusIndex = Math.min(pastedData.length, length - 1)
            setTimeout(() => inputsRef.current[focusIndex]?.focus(), 10)
        }
    }, [onChange, length, disabled])

    return (
        <div className="flex items-center justify-center gap-3 md:gap-4">
            {digits.map((d, i) => (
                <input
                    key={i}
                    ref={(el) => { if (el) (inputsRef.current[i] = el) }}
                    aria-label={`${ariaLabel} digit ${i + 1}`}
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={d}
                    onChange={(e) => handleInput(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    onPaste={handlePaste}
                    disabled={disabled}
                    className={`
                        w-12 h-12 md:w-16 md:h-16 text-xl md:text-2xl font-semibold
                        text-center rounded-lg md:rounded-xl
                        bg-[#ffdc91] border-2 border-[#fbbc04]
                        outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fbbc04]/50 focus:ring-offset-white
                        placeholder:text-[#2c2d3a]/40
                        transition-all duration-200
                        disabled:opacity-50 disabled:cursor-not-allowed
                        ${d ? 'border-[#f57c00] scale-105' : ''}
                    `}
                    placeholder="_"
                    autoComplete="one-time-code"
                />
            ))}
        </div>
    )
}