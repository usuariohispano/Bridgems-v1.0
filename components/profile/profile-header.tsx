
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PPSBadge } from "@/components/pps/pps-badge"
import { MapPin, Link as LinkIcon, Mail } from "lucide-react"

export function ProfileHeader({ profile, isOwnProfile }: { profile: any, isOwnProfile: boolean }) {
    const isPlayer = profile.role === 'player'
    const details = isPlayer ? profile.player : profile.club
    const displayName = isPlayer ? profile.full_name : details?.name
    const ppsScore = isPlayer ? details?.pps_score : null

    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
            {/* Cover Photo Placeholder */}
            <div className="h-32 bg-gradient-to-r from-gray-200 to-gray-300 relative">
                {/* In future: <img src={profile.cover_url} ... /> */}
            </div>

            <div className="px-6 pb-6 relative">
                <div className="flex justify-between items-end -mt-12 mb-4">
                    <div className="relative">
                        <Avatar className="h-24 w-24 border-4 border-white shadow-md">
                            <AvatarImage src={profile.avatar_url || ''} />
                            <AvatarFallback className="text-2xl">{displayName?.[0]}</AvatarFallback>
                        </Avatar>
                        {isPlayer && ppsScore && (
                            <div className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4">
                                <PPSBadge score={ppsScore} className="w-10 h-10 text-sm border-2 border-white" />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2 mb-2">
                        {!isOwnProfile && (
                            <>
                                <Button variant="outline" size="sm">Seguir</Button>
                                <Button size="sm" className="bg-[#EB5E28] hover:bg-[#EB5E28]/90">
                                    <Mail className="w-4 h-4 mr-2" />
                                    Mensaje
                                </Button>
                            </>
                        )}
                        {isOwnProfile && (
                            <Button variant="outline" size="sm">Editar Perfil</Button>
                        )}
                    </div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold text-[#403D39] flex items-center gap-2">
                        {displayName}
                        {profile.role === 'club' && details?.is_verified && (
                            <span className="text-blue-500 text-sm" title="Verificado">✓</span>
                        )}
                    </h1>
                    <p className="text-gray-500 font-medium">
                        {isPlayer ? details?.position?.replace('_', ' ') : 'Club / Academia'}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-600">
                        {details?.location && (
                            <div className="flex items-center gap-1">
                                <MapPin size={14} />
                                {details.location}
                            </div>
                        )}
                        {details?.website && (
                            <div className="flex items-center gap-1">
                                <LinkIcon size={14} />
                                <a href={details.website} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#EB5E28]">
                                    Sitio Web
                                </a>
                            </div>
                        )}
                    </div>

                    {details?.description && (
                        <p className="mt-4 text-[#252422] max-w-2xl">{details.description}</p>
                    )}
                    {details?.bio && (
                        <p className="mt-4 text-[#252422] max-w-2xl">{details.bio}</p>
                    )}
                </div>
            </div>
        </div>
    )
}
