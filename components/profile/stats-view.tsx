
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StatsView({ player }: { player: any }) {
    if (!player) return null

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Atributos Físicos</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Altura</span>
                        <span className="font-semibold">{player.height} cm</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Peso</span>
                        <span className="font-semibold">{player.weight} kg</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Pie Dominante</span>
                        <span className="font-semibold capitalize">{player.dominant_foot === 'both' ? 'Ambidextro' : player.dominant_foot}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                        <span className="text-gray-500">Edad</span>
                        <span className="font-semibold">
                            {new Date().getFullYear() - new Date(player.birth_date).getFullYear()} años
                        </span>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Análisis PPS (Simulado)</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                        <p className="text-gray-400 text-sm text-center px-4">
                            Gráfico Radar de Habilidades<br />(Disponible próximamente)
                        </p>
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
                        <div>
                            <div className="font-bold text-[#EB5E28]">Técnica</div>
                            <div className="text-gray-500">75</div>
                        </div>
                        <div>
                            <div className="font-bold text-[#EB5E28]">Físico</div>
                            <div className="text-gray-500">82</div>
                        </div>
                        <div>
                            <div className="font-bold text-[#EB5E28]">Mental</div>
                            <div className="text-gray-500">68</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
