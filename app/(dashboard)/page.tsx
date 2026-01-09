
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { CreatePost } from "@/components/feed/create-post"
import { PostList } from "@/components/feed/post-list"

export const revalidate = 0 // Ensure dynamic data fetching

export default async function DashboardPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) redirect('/login')

    const { data: profile } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single()

    // Check if profile details exist
    let hasProfile = false
    if (profile?.role === 'player') {
        const { data } = await supabase.from('players').select('id').eq('id', user.id).single()
        hasProfile = !!data
    } else if (profile?.role === 'club') {
        const { data } = await supabase.from('clubs').select('id').eq('id', user.id).single()
        hasProfile = !!data
    }

    if (!hasProfile) {
        redirect('/onboarding')
    }

    return (
        <div className="container mx-auto py-10 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Feed Area */}
            <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-[#403D39] mb-6">Feed Principal</h1>
                <CreatePost />
                <PostList />
            </div>

            {/* Sidebar Area (Future) */}
            <div className="hidden lg:block space-y-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h3 className="font-semibold text-lg mb-2">Tendencias</h3>
                    <p className="text-sm text-gray-500">Próximamente: Ranking de jugadores, oportunidades destacadas.</p>
                </div>
            </div>
        </div>
    )
}
