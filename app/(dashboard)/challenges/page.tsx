
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { getChallenges, getUserChallenges } from "@/lib/data"
import { ChallengeCard } from "@/components/challenges/challenge-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const revalidate = 0

export default async function ChallengesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const allChallenges = await getChallenges()
    const userChallenges = await getUserChallenges(user.id) // Join with challenges info

    // Helper to find progress for a specific challenge
    const getProgress = (challengeId: string) => userChallenges.find(uc => uc.challenge_id === challengeId)

    const activeChallenges = userChallenges.filter(uc => uc.status === 'active').map(uc => uc.challenges)
    const completedChallenges = userChallenges.filter(uc => uc.status === 'completed').map(uc => uc.challenges)

    // Filter out challenges user has already joined/completed for the "Available" tab
    const joinedIds = userChallenges.map(uc => uc.challenge_id)
    const availableChallenges = allChallenges.filter(c => !joinedIds.includes(c.id))

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold text-[#403D39] mb-2">Centro de Entrenamiento</h1>
            <p className="text-gray-500 mb-8">Completa retos para mejorar tu nivel y ganar XP.</p>

            <Tabs defaultValue="available" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="available">Disponibles</TabsTrigger>
                    <TabsTrigger value="active">En Progreso ({activeChallenges.length})</TabsTrigger>
                    <TabsTrigger value="completed">Completados ({completedChallenges.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="available">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {availableChallenges.map(challenge => (
                            <ChallengeCard key={challenge.id} challenge={challenge} />
                        ))}
                        {availableChallenges.length === 0 && (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                ¡Has aceptado todos los retos disponibles! Revisa la pestaña "En Progreso".
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="active">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {activeChallenges.map(challenge => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                userProgress={getProgress(challenge.id)}
                            />
                        ))}
                        {activeChallenges.length === 0 && (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                No tienes retos activos. ¡Ve a "Disponibles" para empezar uno!
                            </div>
                        )}
                    </div>
                </TabsContent>

                <TabsContent value="completed">
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 opacity-75">
                        {completedChallenges.map(challenge => (
                            <ChallengeCard
                                key={challenge.id}
                                challenge={challenge}
                                userProgress={getProgress(challenge.id)}
                            />
                        ))}
                        {completedChallenges.length === 0 && (
                            <div className="col-span-full py-10 text-center text-gray-500">
                                Aún no has completado ningún reto. ¡Tú puedes!
                            </div>
                        )}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
