import { Divider } from "./Divider"
import { GoogleSignInButton } from "./GoogleSignInButton"
import { PhoneInput } from "./PhoneInput"
import { PrimaryLoginButton } from "./PrimaryLoginButton"

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
    // error,
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
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000))

            // TODO: Replace with actual API call
            setShowOTP(true)
            setResendCountdown(30)
            setError("")
        } catch (err) {
            setError("Failed to send OTP. Please try again.")
            console.error("Send OTP error:", err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        // Implement Google OAuth flow
        console.log("Google sign in initiated")
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