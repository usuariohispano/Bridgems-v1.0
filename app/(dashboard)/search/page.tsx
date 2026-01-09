
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { SearchFilters } from "@/components/search/search-filters"
import { searchPlayers, searchClubs } from "@/lib/data"
import { PlayerResultCard } from "@/components/search/player-result-card"
import { Card, CardContent } from "@/components/ui/card"

export const revalidate = 0

export default async function SearchPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string, type?: string, position?: string, location?: string }>
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const params = await searchParams
    const query = params.q || ''
    const type = params.type || 'players'
    const position = params.position || 'all'
    const location = params.location || ''

    let results = []

    if (type === 'players') {
        results = await searchPlayers(query, { position, location })
    } else if (type === 'clubs') {
        results = await searchClubs(query, location)
    }

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-[#403D39] mb-6">Buscador de Talento</h1>

            <SearchFilters />

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {type === 'players' && results.map((player: any) => (
                    <PlayerResultCard key={player.id} player={player} />
                ))}

                {type === 'clubs' && results.map((club: any) => (
                    <Card key={club.id}>
                        <CardContent className="p-4">
                            <h3 className="font-bold text-lg">{club.name}</h3>
                            <p className="text-sm text-gray-500">{club.location}</p>
                            <p className="text-xs mt-2 text-gray-400">{club.is_verified ? 'Verificado' : ''}</p>
                        </CardContent>
                    </Card>
                ))}

                {results.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No se encontraron resultados con los filtros actuales.
                    </div>
                )}
            </div>
        </div>
    )
}
