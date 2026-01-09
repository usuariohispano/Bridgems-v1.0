'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Search as SearchIcon } from "lucide-react"

export function SearchFilters() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get('q') || '')
    const [position, setPosition] = useState(searchParams.get('position') || 'all')
    const [location, setLocation] = useState(searchParams.get('location') || '')
    const [type, setType] = useState(searchParams.get('type') || 'players') // players | clubs

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (query) params.set('q', query)
        if (type) params.set('type', type)
        if (type === 'players') {
            if (position && position !== 'all') params.set('position', position)
        }
        if (location) params.set('location', location)

        router.push(`/search?${params.toString()}`)
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm space-y-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                    <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Buscar por ubicación..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="players">Jugadores</SelectItem>
                        <SelectItem value="clubs">Clubs</SelectItem>
                    </SelectContent>
                </Select>

                <Button onClick={handleSearch} className="bg-[#EB5E28]">Buscar</Button>
            </div>

            {type === 'players' && (
                <div className="flex gap-4">
                    <Select value={position} onValueChange={setPosition}>
                        <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Posición" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todas las posiciones</SelectItem>
                            <SelectItem value="portero">Portero</SelectItem>
                            <SelectItem value="defensa_central">Defensa Central</SelectItem>
                            <SelectItem value="lateral_izquierdo">Lateral Izquierdo</SelectItem>
                            <SelectItem value="lateral_derecho">Lateral Derecho</SelectItem>
                            <SelectItem value="mediocentro">Mediocentro</SelectItem>
                            <SelectItem value="mediapunta">Mediapunta</SelectItem>
                            <SelectItem value="extremo">Extremo</SelectItem>
                            <SelectItem value="delantero">Delantero</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    )
}
