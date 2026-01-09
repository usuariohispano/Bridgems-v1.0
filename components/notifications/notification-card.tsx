'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Bell, Check, Info } from "lucide-react"
import { markAsRead } from "@/app/actions"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"

export function NotificationCard({ notification }: { notification: any }) {
    if (!notification) return null

    const handleClick = async () => {
        if (!notification.is_read) {
            await markAsRead(notification.id)
        }
        // Handle link navigation if needed (future)
    }

    return (
        <div onClick={handleClick} className={cn("cursor-pointer transition-colors hover:bg-gray-50", notification.is_read ? "opacity-60" : "bg-blue-50/50")}>
            <div className="flex items-start gap-4 p-4 border-b">
                <div className={cn("p-2 rounded-full", notification.is_read ? "bg-gray-100 text-gray-500" : "bg-blue-100 text-blue-600")}>
                    <Bell size={20} />
                </div>
                <div className="flex-1">
                    <h4 className={cn("text-sm font-semibold", !notification.is_read && "text-blue-900")}>
                        {notification.title}
                        {!notification.is_read && <span className="ml-2 inline-block w-2 h-2 rounded-full bg-blue-500" />}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                    <span className="text-xs text-gray-400 mt-2 block">
                        {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true, locale: es })}
                    </span>
                </div>
            </div>
        </div>
    )
}
