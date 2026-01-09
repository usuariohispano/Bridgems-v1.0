import { createClient } from "@/utils/supabase/server"

export async function getPosts() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .select(`
      *,
      users (*),
      players (position, pps_score),
      clubs (name, is_verified)
    `)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching posts:', error)
        return []
    }

    return data
}

export async function getOpportunities() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('opportunities')
        .select(`
      *,
      clubs (name, location, is_verified)
    `)
        .eq('is_active', true)
        .order('created_at', { ascending: false })

    if (error) {
        console.error('Error fetching opportunities:', error)
        return []
    }

    return data
}

export async function searchPlayers(query: string, filters: { position?: string, location?: string }) {
    const supabase = await createClient()

    let dbQuery = supabase
        .from('players')
        .select(`
        *,
        users (full_name, avatar_url)
      `)

    if (query) {
        // Simple fallback search on location
        dbQuery = dbQuery.ilike('location', `%${query}%`)
    }

    if (filters.position && filters.position !== 'all') {
        dbQuery = dbQuery.eq('position', filters.position)
    }

    if (filters.location) {
        dbQuery = dbQuery.ilike('location', `%${filters.location}%`)
    }

    const { data, error } = await dbQuery

    if (error) {
        console.error('Error searching players:', error)
        return []
    }
    return data
}

export async function searchClubs(query: string, location?: string) {
    const supabase = await createClient()
    let dbQuery = supabase.from('clubs').select('*')

    if (query) {
        dbQuery = dbQuery.ilike('name', `%${query}%`)
    }

    if (location) {
        dbQuery = dbQuery.ilike('location', `%${location}%`)
    }

    const { data, error } = await dbQuery
    if (error) return []
    return data
}

export async function getChallenges() {
    const supabase = await createClient()
    const { data } = await supabase.from('challenges').select('*').order('xp_reward', { ascending: true })
    return data || []
}

export async function getUserChallenges(userId: string) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('user_challenges')
        .select(`*, challenges(*)`)
        .eq('user_id', userId)
    return data || []
}

export async function getProfile(userId: string) {
    const supabase = await createClient()

    // First get base user
    const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

    if (userError || !user) return null

    let profileData = { ...user, player: null as any, club: null as any }

    if (user.role === 'player') {
        const { data: player } = await supabase.from('players').select('*').eq('id', userId).single()
        profileData.player = player
    } else if (user.role === 'club') {
        const { data: club } = await supabase.from('clubs').select('*').eq('id', userId).single()
        profileData.club = club
    }

    return profileData
}

export async function getUserPosts(userId: string) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('posts')
        .select(`*, users(*), clubs(name), players(position, pps_score)`)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    return data || []
}

export async function getNotifications(userId: string) {
    const supabase = await createClient()
    const { data } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
    return data || []
}
