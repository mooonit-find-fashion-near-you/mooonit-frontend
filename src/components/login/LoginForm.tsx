// components/login/LoginForm.tsx 
import { Divider } from "./Divider"
import { GoogleSignInButton } from "./GoogleSignInButton"
import { PhoneInput } from "./PhoneInput"
import { PrimaryLoginButton } from "./PrimaryLoginButton"
import { authService } from "@/services/authService"

type LoginFormProps = {
    phoneNumber: string
    setPhoneNumber: (phone: string) => void
    error: string
    setError: (error: string) => void
    isLoading: boolean
    setIsLoading: (loading: boolean) => void
    setShowOTP: (show: boolean) => void
    setResendCountdown: (countdown: number) => void
}

export function LoginForm({
    phoneNumber,
    setPhoneNumber,
    setError,
    isLoading,
    setIsLoading,
    setShowOTP,
    setResendCountdown,
}: LoginFormProps) {
    const validatePhoneNumber = (phone: string) => {
        return /^[6-9]\d{9}$/.test(phone)
    }

    const handleSendOTP = async () => {
        setError("")

        if (!validatePhoneNumber(phoneNumber)) {
            setError("Please enter a valid 10-digit Indian mobile number")
            return
        }

        setIsLoading(true)
        try {
            const response = await authService.sendOTP(phoneNumber)

            if (response.success) {
                setShowOTP(true)
                setResendCountdown(30)
                setError("")
            } else {
                setError(response.message || "Failed to send OTP. Please try again.")
            }
        } catch (err: any) {
            const errorMessage = err.response?.data?.message || "Failed to send OTP. Please try again."
            setError(errorMessage)
            console.error("Send OTP error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        // TODO: Implement Google OAuth when backend is ready
        console.log("Google sign in initiated")
        setError("Google sign-in will be available soon!")
    }

    return (
        <>
            <PhoneInput
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                setError={setError}
                isLoading={isLoading}
            />

            <PrimaryLoginButton
                onClick={handleSendOTP}
                disabled={phoneNumber.length !== 10 || isLoading}
                isLoading={isLoading}
                loadingText="Sending..."
                className="mt-5 md:mt-6"
            >
                Send One Time Password
            </PrimaryLoginButton>

            <Divider text="Or continue with" />

            <GoogleSignInButton
                onClick={handleGoogleSignIn}
                disabled={isLoading}
            />
        </>
    )
}