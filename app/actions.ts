'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { headers } from 'next/headers'
import { calculateBasePPS } from '@/lib/pps'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // Type-casting here for convenience
    // In a production application, you should validate these inputs!
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        redirect('/login?error=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function signup(formData: FormData) {
    const supabase = await createClient()
    const origin = (await headers()).get('origin')

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const { error } = await supabase.auth.signUp({
        ...data,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        }
    })

    if (error) {
        redirect('/login?error=Could not authenticate user')
    }

    redirect('/login?message=Check email to continue sign in process')
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/login')
}

export async function updateUserRole(role: 'player' | 'club') {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User not authenticated')
    }

    const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id)

    if (error) {
        throw new Error('Failed to update role')
    }

    revalidatePath('/onboarding')
}


export async function createPlayerProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const rawData = {
        position: formData.get('position') as string,
        birth_date: formData.get('birth_date') as string,
        height: Number(formData.get('height')),
        weight: Number(formData.get('weight')),
        dominant_foot: formData.get('dominant_foot') as 'left' | 'right' | 'both',
        location: formData.get('location') as string,
        bio: formData.get('bio') as string,
    }

    const pps_score = calculateBasePPS(rawData)

    const data = {
        id: user.id,
        ...rawData,
        pps_score
    }

    const { error } = await supabase
        .from('players')
        .insert(data)

    if (error) {
        console.error('Error creating player profile:', error)
        return { error: 'Failed to create profile' }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function createClubProfile(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const data = {
        id: user.id,
        name: formData.get('name') as string,
        location: formData.get('location') as string,
        website: formData.get('website') as string,
        description: formData.get('description') as string,
    }

    const { error } = await supabase
        .from('clubs')
        .insert(data)

    if (error) {
        console.error('Error creating club profile:', error)
        return { error: 'Failed to create profile' }
    }

    revalidatePath('/', 'layout')
    redirect('/')
}

export async function createPost(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const content = formData.get('content') as string
    const mediaFile = formData.get('media') as File | null

    let mediaUrls: string[] = []

    if (mediaFile && mediaFile.size > 0 && mediaFile.name !== 'undefined') {
        const fileExt = mediaFile.name.split('.').pop()
        const fileName = `${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError } = await supabase.storage
            .from('post-media')
            .upload(fileName, mediaFile)

        if (uploadError) {
            console.error('Error uploading image:', uploadError)
            return { error: 'Failed to upload media' }
        }

        const { data: { publicUrl } } = supabase.storage.from('post-media').getPublicUrl(fileName)
        mediaUrls.push(publicUrl)
    }

    const analyze = formData.get('analyze') === 'on'
    let analysisData = null

    if (analyze) {
        // Mock AI Analysis
        analysisData = {
            speed: Math.floor(Math.random() * (99 - 70) + 70),
            technique: Math.floor(Math.random() * (99 - 70) + 70),
            tags: ['High Intensity', 'Good Vision'],
            summary: 'Movimiento fluido y buena toma de decisiones detectada.'
        }
    }

    const { error } = await supabase.from('posts').insert({
        user_id: user.id,
        content: formData.get('content') as string,
        media_urls: mediaUrls,
        analysis: analysisData
    })

    if (error) {
        console.error('Error creating post:', error)
        return { error: 'Failed to create post' }
    }

    revalidatePath('/')
}

export async function createOpportunity(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const data = {
        club_id: user.id,
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        type: formData.get('type') as string,
        location: formData.get('location') as string,
        deadline: formData.get('deadline') as string,
    }

    const { error } = await supabase.from('opportunities').insert(data)

    if (error) {
        console.error('Error creating opportunity:', error)
        return { error: 'Failed' }
    }

    revalidatePath('/opportunities')
    redirect('/opportunities')
}

export async function applyToOpportunity(opportunityId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) throw new Error('Unauthorized')

    const { error } = await supabase.from('applications').insert({
        opportunity_id: opportunityId,
        player_id: user.id
    })

    if (error) {
        // If unique violation, user already applied.
        if (error.code === '23505') return { error: 'Already applied' }
        console.error('Error applying:', error)
        return { error: 'Failed' }
    }

    // Trigger Notification for Club Owner
    // We need to fetch the opportunity to know the club_id (owner)
    const { data: opp } = await supabase.from('opportunities').select('club_id, title').eq('id', opportunityId).single()
    if (opp) {
        await createNotification(
            opp.club_id,
            'application',
            'Nueva Aplicación',
            `Alguien ha aplicado a tu oportunidad: ${opp.title}`,
            `/opportunities` // Link to view applications (future)
        )
    }

    revalidatePath('/opportunities')
    return { success: true }
}

// Internal Helper
async function createNotification(userId: string, type: string, title: string, message: string, link?: string) {
    const supabase = await createClient()
    await supabase.from('notifications').insert({
        user_id: userId,
        type,
        title,
        message,
        link
    })
}

export async function markAsRead(notificationId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    await supabase.from('notifications').update({ is_read: true }).eq('id', notificationId).eq('user_id', user.id)
    revalidatePath('/notifications')
}

export async function joinChallenge(challengeId: string) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('user_challenges').insert({
        user_id: user.id,
        challenge_id: challengeId,
        status: 'active'
    })

    if (error) return { error: error.message }
    revalidatePath('/challenges')
    return { success: true }
}

export async function completeChallenge(challengeId: string, xpReward: number) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // 1. Update status
    const { error: updateError } = await supabase
        .from('user_challenges')
        .update({ status: 'completed', completed_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)

    if (updateError) return { error: updateError.message }

    // 2. Award XP (Rpc is safer but doing client-side increment for MVP speed, susceptible to race conditions but OK for MVP)
    // Actually, better to fetch current XP and update.
    const { data: player } = await supabase.from('players').select('xp').eq('id', user.id).single()
    const currentXp = player?.xp || 0

    await supabase.from('players').update({ xp: currentXp + xpReward }).eq('id', user.id)

    revalidatePath('/challenges')
    revalidatePath(`/profile/${user.id}`)
    return { success: true }
}
