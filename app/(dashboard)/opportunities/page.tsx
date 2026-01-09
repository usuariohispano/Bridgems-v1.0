
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { getOpportunities } from "@/lib/data"
import { OpportunityCard } from "@/components/opportunities/opportunity-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

export const revalidate = 0

export default async function OpportunitiesPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    const opportunities = await getOpportunities()

    return (
        <div className="container mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-[#403D39]">Oportunidades</h1>

                {profile?.role === 'club' && (
                    <Link href="/opportunities/create">
                        <Button className="bg-[#EB5E28] hover:bg-[#EB5E28]/90">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Publicar
                        </Button>
                    </Link>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {opportunities?.map((opp) => (
                    <OpportunityCard
                        key={opp.id}
                        opportunity={opp}
                        userRole={profile?.role || 'player'}
                        userId={user.id}
                    />
                ))}

                {opportunities?.length === 0 && (
                    <div className="col-span-full text-center py-10 text-gray-500">
                        No hay oportunidades activas en este momento.
                    </div>
                )}
            </div>
        </div>
    )
}
