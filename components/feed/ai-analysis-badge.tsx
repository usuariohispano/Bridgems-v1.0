
import { Badge } from "@/components/ui/badge"
import { Sparkles } from "lucide-react"

export function AIAnalysisBadge({ analysis }: { analysis: any }) {
    if (!analysis) return null

    return (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-3 mt-3">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles size={16} className="text-purple-600" />
                <span className="font-bold text-xs text-purple-800 uppercase tracking-widest">Bridgems AI Analysis</span>
            </div>

            <div className="flex gap-4 mb-2">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Velocidad</span>
                    <span className="font-bold text-lg text-gray-800">{analysis.speed}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-xs text-gray-500">Técnica</span>
                    <span className="font-bold text-lg text-gray-800">{analysis.technique}</span>
                </div>
            </div>

            {analysis.summary && (
                <p className="text-xs text-gray-600 italic">"{analysis.summary}"</p>
            )}

            {analysis.tags && (
                <div className="flex gap-1 mt-2">
                    {analysis.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary" className="text-[10px] bg-purple-100 text-purple-700 hover:bg-purple-200">
                            {tag}
                        </Badge>
                    ))}
                </div>
            )}
        </div>
    )
}
