type ErrorMessageProps = {
    error: string
}

export function ErrorMessage({ error }: ErrorMessageProps) {
    if (!error) return null

    return (
        <div
            className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm"
            role="alert"
            aria-live="polite"
        >
            {error}
        </div>
    )
}