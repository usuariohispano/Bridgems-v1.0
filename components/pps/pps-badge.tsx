import { formatPPS, getPPSColor } from "@/lib/pps"
import { cn } from "@/lib/utils"

export function PPSBadge({ score, className }: { score: number, className?: string }) {
    if (score === undefined || score === null) return null

    return (
        <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-full text-white font-bold text-xs shadow-sm",
            getPPSColor(score),
            className
        )} title={`PPS Score: ${score}`}>
            {formatPPS(score)}
        </div>
    )
}
