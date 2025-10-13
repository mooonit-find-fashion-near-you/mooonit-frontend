// TODO: # AXIOS IMPLEMENTATION

import { OTPInput } from "./OTPInput"
import { PrimaryLoginButton } from "./PrimaryLoginButton"
import { ResendOTP } from "./ResendOTP"

type OTPFormProps = {
    phoneNumber: string
    otpValue: string
    setOtpValue: (otp: string) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    error: string
    setError: (error: string) => void
    resendCountdown: number
    setResendCountdown: (countdown: number) => void
    isResending: boolean
    setIsResending: (resending: boolean) => void
    onBack: () => void
    onSuccessfulVerification: () => void
}

export function OTPForm({
    // phoneNumber,
    otpValue,
    setOtpValue,
    isLoading,
    setIsLoading,
    // error,
    setError,
    resendCountdown,
    setResendCountdown,
    isResending,
    setIsResending,
    onBack,
    onSuccessfulVerification,
}: OTPFormProps) {
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

            // TODO: Replace with actual API call
            // const response = await fetch('/api/verify-otp', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ 
            //     phone: `+91${phoneNumber}`, 
            //     otp: otpValue 
            //   })
            // })

            // if (!response.ok) throw new Error('Invalid OTP')

            // Call the success handler which will show gender popup
            onSuccessfulVerification()
        } catch (err) {
            setError("Invalid OTP. Please try again.")
            console.error("Verify OTP error:", err)
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

            // TODO: Replace with actual API call
            setOtpValue("")
            setResendCountdown(30)
            setError("")
        } catch (err) {
            setError("Failed to resend OTP. Please try again.")
            console.error("Resend OTP error:", err)
        } finally {
            setIsResending(false)
        }
    }

    return (
        <>
            <div className="mb-6">
                <OTPInput
                    length={6}
                    value={otpValue}
                    onChange={setOtpValue}
                    ariaLabel="One-time password"
                    disabled={isLoading}
                />
            </div>

            <ResendOTP
                countdown={resendCountdown}
                isResending={isResending}
                onResend={handleResendOTP}
            />

            <PrimaryLoginButton
                onClick={handleVerifyOTP}
                disabled={otpValue.length !== 6 || isLoading}
                isLoading={isLoading}
                loadingText="Verifying..."
                className="mt-2"
            >
                Verify OTP
            </PrimaryLoginButton>

            <button
                type="button"
                onClick={onBack}
                disabled={isLoading}
                className="mt-4 text-sm text-[#2c2d3a]/70 hover:text-[#2c2d3a] underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
                Change phone number
            </button>
        </>
    )
}