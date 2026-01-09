import { AIAnalysisBadge } from "@/components/feed/ai-analysis-badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDistanceToNow } from "date-fns"
import { es } from "date-fns/locale"
import { PPSBadge } from "@/components/pps/pps-badge"

export function PostCard({ post }: { post: any }) {
    const user = post.users
    const userRole = user.role === 'club' ? 'Club' : 'Jugador'
    const displayName = post.clubs?.name || post.users?.full_name || 'Usuario'
    const extraInfo = post.players?.position ? `• ${post.players.position}` : ''
    const ppsScore = post.players?.pps_score

    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
                <div className="relative">
                    <Avatar>
                        <AvatarImage src={user.avatar_url || ''} />
                        <AvatarFallback>{displayName[0]}</AvatarFallback>
                    </Avatar>
                    {user.role === 'player' && ppsScore > 0 && (
                        <div className="absolute -bottom-1 -right-1 transform scale-75">
                            <PPSBadge score={ppsScore} />
                        </div>
                    )}
                </div>
                <div className="flex flex-col">
                    <span className="font-semibold text-sm">
                        {displayName} <span className="text-xs text-gray-500 font-normal">({userRole} {extraInfo})</span>
                    </span>
                    <span className="text-xs text-gray-400">
                        {formatDistanceToNow(new Date(post.created_at), { addSuffix: true, locale: es })}
                    </span>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-2">
                <p className="whitespace-pre-wrap text-sm text-[#252422]">{post.content}</p>

                {post.media_urls && post.media_urls.length > 0 && (
                    <div className="mt-4 grid gap-2 grid-cols-2">
                        {post.media_urls.map((url: string, idx: number) => (
                            <img key={idx} src={url} alt="Post media" className="rounded-md w-full object-cover h-48 bg-gray-100" />
                        ))}
                    </div>
                )}

                <AIAnalysisBadge analysis={post.analysis} />
            </CardContent>
        </Card>
    )
}
