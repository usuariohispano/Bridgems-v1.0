
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { CreateOpportunityForm } from "@/components/opportunities/create-opportunity-form"

export default async function CreateOpportunityPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'club') {
        redirect('/opportunities')
    }

    return (
        <div className="container mx-auto max-w-2xl py-10 px-4">
            <h1 className="text-3xl font-bold text-[#403D39] mb-8">Publicar Oportunidad</h1>
            <CreateOpportunityForm />
        </div>
    )
}
