
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { RoleSelection } from "@/components/onboarding/role-selection"
import { PlayerForm } from "@/components/onboarding/player-form"
import { ClubForm } from "@/components/onboarding/club-form"

export default async function OnboardingPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    // Fetch updated user profile (with role)
    const { data: profile } = await supabase
        .from('users')
        .select('role, full_name')
        .eq('id', user.id)
        .single()

    // Logic: 
    // 1. If no role -> Show Role Selection
    // 2. If 'player' -> Show Player Form (if not exists)
    // 3. If 'club' -> Show Club Form (if not exists)
    // 4. (Profile existence check is done in layout or actions mostly, but here we show form if not redirected)

    // Double check if profile exists to prevent re-submission (optional but good UX)
    // For MVP we assume if they are here, they need to onboard.

    if (!profile?.role && !profile?.full_name) {
        // Note: role defaults to 'player' in DB but we might want explicit selection logic if we change that default.
        // Current DB schema says: default 'player'.
        // So effectively they are always 'player' initially unless we changed logic.
        // BUT, 'role' column is 'player' default.
        // We might want to let them chose.
        // Actually, if default is player, they skip role selection? 
        // Let's assume we want them to chose. 
        // Update: Schema has `default 'player'`, so they are players start. 
        // If we want choice, we should probably default to null or handle "onboarding_completed" flag.
        // For now, let's assume valid roles are 'player' and 'club'.
        // If they want to change to club, they do it here. 

        // Better approach: Let's assume we use role selection to CONFIRM role.
        return (
            <div className="container mx-auto max-w-2xl py-10">
                <h1 className="text-3xl font-bold mb-6 text-center text-[#403D39]">Bienvenido a Bridgems</h1>
                <p className="text-[#252422] text-center mb-8">Elige cómo quieres participar en la comunidad.</p>
                <RoleSelection />
            </div>
        )
    }

    // If role is set (or confirmed), show form
    // However, since default is player, line 31 is always false for role check.
    // We need a way to know if they *selected* it.
    // Creating a separate 'step' logic is complex.
    // Simplification for MVP: Update Schema to default role null? OR just rely on 'players' table existence.

    // Let's check if 'players' or 'clubs' record exists.

    if (profile?.role === 'player') {
        const { data: player } = await supabase.from('players').select('id').eq('id', user.id).single()
        if (player) redirect('/') // Already has profile

        return (
            <div className="container mx-auto max-w-2xl py-10">
                <PlayerForm />
            </div>
        )
    }

    if (profile?.role === 'club') {
        const { data: club } = await supabase.from('clubs').select('id').eq('id', user.id).single()
        if (club) redirect('/') // Already has profile

        return (
            <div className="container mx-auto max-w-2xl py-10">
                <ClubForm />
            </div>
        )
    }

    // Fallback
    return (
        <div className="container mx-auto max-w-2xl py-10">
            <h1 className="text-3xl font-bold mb-6 text-center text-[#403D39]">Bienvenido a Bridgems</h1>
            <RoleSelection />
        </div>
    )
}
