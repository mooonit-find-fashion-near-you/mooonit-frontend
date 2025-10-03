"use client"

import { useRef, useCallback } from "react"

type OTPInputProps = {
    length?: number
    value?: string
    onChange?: (val: string) => void
    ariaLabel?: string
    disabled?: boolean
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
        if (!nextChar && v !== "") return;

        let updated: string;
        if (!nextChar) {
            updated = value.substring(0, i) + value.substring(i + 1)
        } else {
            updated = setCharAt(value, i, nextChar)
        }

        onChange?.(updated)

        if (nextChar && i < length - 1) {
            setTimeout(() => inputsRef.current[i + 1]?.focus(), 10)
        }
    }, [value, onChange, length, disabled])

    const handleKeyDown = useCallback((i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (disabled) return;

        if (e.key === "Backspace") {
            e.preventDefault()
            if (value[i] === undefined && i > 0) {
                inputsRef.current[i - 1]?.focus()
            } else {
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