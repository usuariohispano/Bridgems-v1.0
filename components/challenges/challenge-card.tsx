'use client'

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { joinChallenge, completeChallenge } from "@/app/actions"
import { useState } from "react"
import { Loader2, CheckCircle, Trophy } from "lucide-react"
import { cn } from "@/lib/utils"

export function ChallengeCard({ challenge, userProgress }: { challenge: any, userProgress?: any }) {
    const [loading, setLoading] = useState(false)
    const status = userProgress?.status // 'active' | 'completed' | undefined

    async function handleJoin() {
        setLoading(true)
        await joinChallenge(challenge.id)
        setLoading(false)
    }

    async function handleComplete() {
        setLoading(true)
        await completeChallenge(challenge.id, challenge.xp_reward)
        setLoading(false)
    }

    const difficultyColor = {
        'Beginner': 'bg-green-100 text-green-800',
        'Intermediate': 'bg-yellow-100 text-yellow-800',
        'Advanced': 'bg-orange-100 text-orange-800',
        'Elite': 'bg-red-100 text-red-800'
    }[challenge.difficulty as string] || 'bg-gray-100'

    return (
        <Card className={cn("flex flex-col h-full", status === 'completed' ? "border-green-500 bg-green-50/50" : "")}>
            <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                    <Badge variant="outline" className={difficultyColor}>{challenge.difficulty}</Badge>
                    <div className="flex items-center text-[#EB5E28] font-bold text-sm">
                        <Trophy size={14} className="mr-1" />
                        {challenge.xp_reward} XP
                    </div>
                </div>
                <CardTitle className="mt-2 text-lg">{challenge.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
                <p className="text-sm text-gray-600">{challenge.description}</p>
                <div className="mt-2 text-xs text-gray-400 font-medium uppercase tracking-wider">
                    {challenge.category}
                </div>
            </CardContent>
            <CardFooter>
                {!status && (
                    <Button onClick={handleJoin} disabled={loading} className="w-full bg-[#403D39]">
                        {loading ? <Loader2 className="animate-spin" /> : "Empezar Reto"}
                    </Button>
                )}

                {status === 'active' && (
                    <Button onClick={handleComplete} disabled={loading} className="w-full bg-[#EB5E28] hover:bg-[#EB5E28]/90">
                        {loading ? <Loader2 className="animate-spin" /> : "Marcar Completado"}
                    </Button>
                )}

                {status === 'completed' && (
                    <Button disabled className="w-full bg-green-600 text-white opacity-100">
                        <CheckCircle className="mr-2 h-4 w-4" /> Completado
                    </Button>
                )}
            </CardFooter>
        </Card>
    )
}
