type DividerProps = {
    text: string
}

export function Divider({ text }: DividerProps) {
    return (
        <div className="my-6 md:my-8 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#2c2d3a]/40" aria-hidden="true" />
            <span className="text-[#2c2d3a] text-sm md:text-base whitespace-nowrap">{text}</span>
            <span className="h-px flex-1 bg-[#2c2d3a]/40" aria-hidden="true" />
        </div>
    )
}