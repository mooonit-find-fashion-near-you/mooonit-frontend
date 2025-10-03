"use client"

import { LeftImageSection } from "@/components/login/LeftImageSection"
import { useState } from "react"
import { ErrorMessage } from "./ErrorMessage"
import { HeaderSection } from "./HeaderSection"
import { LoginForm } from "./LoginForm"
import { OTPForm } from "./OTPForm"

export default function Login() {
    const [phoneNumber, setPhoneNumber] = useState("")
    const [showOTP, setShowOTP] = useState(false)
    const [otpValue, setOtpValue] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [resendCountdown, setResendCountdown] = useState(0)
    const [isResending, setIsResending] = useState(false)

    const resetOTPState = () => {
        setShowOTP(false)
        setOtpValue("")
        setError("")
        setResendCountdown(0)
    }

    return (
        <div className="w-fit mx-auto flex justify-center gap-11 items-start font-[outfit] mt-12 bg-white p-8 md:p-12 rounded-3xl shadow-lg border">
            <LeftImageSection />

            <div className="flex flex-col items-center md:items-stretch min-w-[300px] md:min-w-[400px]">
                <HeaderSection showOTP={showOTP} phoneNumber={phoneNumber} />

                <ErrorMessage error={error} />

                {!showOTP ? (
                    <LoginForm
                        phoneNumber={phoneNumber}
                        setPhoneNumber={setPhoneNumber}
                        error={error}
                        setError={setError}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        setShowOTP={setShowOTP}
                        setResendCountdown={setResendCountdown}
                    />
                ) : (
                    <OTPForm
                        phoneNumber={phoneNumber}
                        otpValue={otpValue}
                        setOtpValue={setOtpValue}
                        isLoading={isLoading}
                        setIsLoading={setIsLoading}
                        error={error}
                        setError={setError}
                        resendCountdown={resendCountdown}
                        setResendCountdown={setResendCountdown}
                        isResending={isResending}
                        setIsResending={setIsResending}
                        onBack={resetOTPState}
                    />
                )}
            </div>
        </div>
    )
}