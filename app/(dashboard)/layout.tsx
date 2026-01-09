
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    return (
        <div className="min-h-screen bg-[#FFFCF2]">
            {/* Simple Header for MVP */}
            <header className="border-b bg-white shadow-sm">
                <div className="container mx-auto h-16 flex items-center justify-between px-4">
                    <Link href="/" className="font-bold text-xl text-[#EB5E28]">Bridgems</Link>
                    <div className="flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium hover:text-[#EB5E28] transition-colors">Feed</Link>
                        <Link href="/search" className="text-sm font-medium hover:text-[#EB5E28] transition-colors">Buscar</Link>
                        <Link href="/challenges" className="text-sm font-medium hover:text-[#EB5E28] transition-colors">Retos</Link>
                        <Link href="/opportunities" className="text-sm font-medium hover:text-[#EB5E28] transition-colors">Oportunidades</Link>
                        <Link href="/notifications" className="text-sm font-medium hover:text-[#EB5E28] transition-colors">Notificaciones</Link>

                        <Link href={`/profile/${user.id}`} title="Mi Perfil">
                            <div className="h-8 w-8 rounded-full bg-[#EB5E28] flex items-center justify-center text-white font-bold text-xs ring-2 ring-white cursor-pointer">
                                {user.email?.[0].toUpperCase()}
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}
