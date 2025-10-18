type ResendOTPProps = {
    countdown: number
    isResending: boolean
    onResend: () => void
}

export function ResendOTP({ countdown, isResending, onResend }: ResendOTPProps) {
    return (
        <div className="text-center mb-6">
            {countdown > 0 ? (
                <p className="text-sm text-[#2c2d3a]/70">
                    Resend OTP in <span className="font-semibold">{countdown}s</span>
                </p>
            ) : (
                <button
                    type="button"
                    onClick={onResend}
                    disabled={isResending}
                    className="text-[#e54b4b] hover:text-[#c43a3a] text-sm font-medium underline disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    aria-label={isResending ? "Resending OTP..." : "Resend OTP"}
                >
                    {isResending ? "Resending..." : "Resend OTP"}
                </button>
            )}
        </div>
    )
}