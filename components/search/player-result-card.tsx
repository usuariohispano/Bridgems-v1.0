
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { PPSBadge } from "@/components/pps/pps-badge"
import Link from "next/link"

export function PlayerResultCard({ player }: { player: any }) {
    const user = player.users

    return (
        <Link href={`/profile/${player.id}`}>
            <Card className="hover:border-[#EB5E28] transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user?.avatar_url || ''} />
                        <AvatarFallback>{user?.full_name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <h3 className="font-semibold text-[#403D39]">{user?.full_name || 'Usuario'}</h3>
                        <p className="text-sm text-gray-500 capitalize">{player.position?.replace('_', ' ')}</p>
                        <p className="text-xs text-gray-400">{player.location}</p>
                    </div>
                    <div>
                        <PPSBadge score={player.pps_score} />
                    </div>
                </CardContent>
            </Card>
        </Link>
    )
}
