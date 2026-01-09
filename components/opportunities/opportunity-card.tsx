'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { applyToOpportunity } from "@/app/actions"
import { MapPin, Calendar, Briefcase, CheckCircle } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

export function OpportunityCard({ opportunity, userRole, userId }: { opportunity: any, userRole: string, userId: string }) {
    const [hasApplied, setHasApplied] = useState(false) // Optimistic state ideally, but simple local state for now
    const [loading, setLoading] = useState(false)

    async function handleApply() {
        if (hasApplied) return
        setLoading(true)
        const res = await applyToOpportunity(opportunity.id)
        if (res.success || res.error === 'Already applied') {
            setHasApplied(true)
        }
        setLoading(false)
    }

    const isOwner = userRole === 'club' && opportunity.club_id === userId
    const canApply = userRole === 'player'

    // Determine badge color based on type
    const typeColors: { [key: string]: string } = {
        'trial': 'bg-blue-100 text-blue-800',
        'contract': 'bg-green-100 text-green-800',
        'academy': 'bg-purple-100 text-purple-800',
        'other': 'bg-gray-100 text-gray-800'
    }

    const typeLabel: { [key: string]: string } = {
        'trial': 'Prueba',
        'contract': 'Contrato',
        'academy': 'Academia',
        'other': 'Otro'
    }

    return (
        <Card className="hover:border-[#EB5E28]/50 transition-colors">
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-xl text-[#403D39]">{opportunity.title}</CardTitle>
                        <CardDescription className="font-semibold text-[#EB5E28]">{opportunity.clubs?.name}</CardDescription>
                    </div>
                    <span className={cn("px-2 py-1 rounded-full text-xs font-medium", typeColors[opportunity.type] || typeColors['other'])}>
                        {typeLabel[opportunity.type] || 'Evento'}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {opportunity.location}
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={16} />
                        Límite: {new Date(opportunity.deadline).toLocaleDateString()}
                    </div>
                </div>
                <p className="text-sm text-[#252422] line-clamp-3">{opportunity.description}</p>
            </CardContent>
            <CardFooter>
                {canApply && (
                    <Button
                        onClick={handleApply}
                        disabled={loading || hasApplied}
                        className={cn("w-full sm:w-auto", hasApplied ? "bg-green-600" : "bg-[#403D39]")}
                    >
                        {hasApplied ? <><CheckCircle size={16} className="mr-2" /> Aplicado</> : "Aplicar Ahora"}
                    </Button>
                )}
                {isOwner && (
                    <Button variant="outline" className="w-full sm:w-auto">
                        Ver Aplicaciones
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
