
import { createClient } from "@/utils/supabase/server"
import { notFound, redirect } from "next/navigation"
import { getProfile, getUserPosts } from "@/lib/data"
import { ProfileHeader } from "@/components/profile/profile-header"
import { StatsView } from "@/components/profile/stats-view"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PostCard } from "@/components/feed/post-card"

export const revalidate = 0

export default async function ProfilePage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const supabase = await createClient()
    const { data: { user: currentUser } } = await supabase.auth.getUser()

    const profile = await getProfile(id)
    if (!profile) return notFound()

    const posts = await getUserPosts(id)
    const isOwnProfile = currentUser?.id === id
    const isPlayer = profile.role === 'player'

    return (
        <div className="container mx-auto py-10 px-4 max-w-4xl">
            <ProfileHeader profile={profile} isOwnProfile={isOwnProfile} />

            <Tabs defaultValue="posts" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="posts">Publicaciones</TabsTrigger>
                    {isPlayer && <TabsTrigger value="stats">Estadísticas</TabsTrigger>}
                    <TabsTrigger value="media">Multimedia</TabsTrigger>
                </TabsList>

                <TabsContent value="posts" className="space-y-4">
                    {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                    {posts.length === 0 && (
                        <div className="text-center py-10 text-gray-500 bg-white rounded-lg">
                            No hay publicaciones aún.
                        </div>
                    )}
                </TabsContent>

                <TabsContent value="stats">
                    {isPlayer && <StatsView player={profile.player} />}
                </TabsContent>

                <TabsContent value="media">
                    <div className="text-center py-10 text-gray-500 bg-white rounded-lg">
                        Galería Multimedia próximamente.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
