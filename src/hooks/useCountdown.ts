import { useState, useEffect } from "react"

export function useCountdown(initialSeconds: number) {
    const [countdown, setCountdown] = useState(initialSeconds)

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const startCountdown = (seconds: number) => {
        setCountdown(seconds)
    }

    const resetCountdown = () => {
        setCountdown(0)
    }

    return {
        countdown,
        startCountdown,
        resetCountdown,
        isActive: countdown > 0
    }
}