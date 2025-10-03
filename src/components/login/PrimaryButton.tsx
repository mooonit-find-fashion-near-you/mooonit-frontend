import { ReactNode } from "react"

type PrimaryButtonProps = {
    onClick: () => void
    disabled?: boolean
    isLoading?: boolean
    loadingText?: string
    children: ReactNode
    className?: string
}

export function PrimaryButton({
    onClick,
    disabled = false,
    isLoading = false,
    loadingText = "Loading...",
    children,
    className = "",
}: PrimaryButtonProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`w-full cursor-pointer rounded-full border border-[#e54b4b] bg-[#ffbeb9] h-14 md:h-16 px-6 text-base md:text-lg font-medium text-[#e54b4b] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed hover:bg-[#ffafa9] transition-colors ${className}`}
        >
            {isLoading ? (
                <>
                    <div className="w-5 h-5 border-2 border-[#e54b4b] border-t-transparent rounded-full animate-spin" />
                    <span>{loadingText}</span>
                </>
            ) : (
                <>
                    <span>{children}</span>
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
    )
}