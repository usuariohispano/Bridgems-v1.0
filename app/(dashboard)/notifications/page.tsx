
import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { getNotifications } from "@/lib/data"
import { NotificationCard } from "@/components/notifications/notification-card"

export const revalidate = 0

export default async function NotificationsPage() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) redirect('/login')

    const notifications = await getNotifications(user.id)

    return (
        <div className="container mx-auto py-10 px-4 max-w-2xl">
            <h1 className="text-2xl font-bold text-[#403D39] mb-6">Notificaciones</h1>

            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                {notifications.map((notif: any) => (
                    <NotificationCard key={notif.id} notification={notif} />
                ))}

                {notifications.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No tienes notificaciones nuevas.
                    </div>
                )}
            </div>
        </div>
    )
}
