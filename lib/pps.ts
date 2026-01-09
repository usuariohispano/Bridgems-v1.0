
export function calculateBasePPS(data: {
    position?: string,
    height?: number,
    weight?: number,
    dominant_foot?: string,
    bio?: string
}): number {
    let score = 50 // Base score

    // Completeness Bonuses
    if (data.position) score += 5
    if (data.height && data.height > 0) score += 5
    if (data.weight && data.weight > 0) score += 5
    if (data.dominant_foot) score += 5
    if (data.bio && data.bio.length > 10) score += 5

    // Slight randomization for MVP "flavor" (simulating different initial potential)
    // In real app, this would be based on validated stats.
    const potentialBonus = Math.floor(Math.random() * 10)
    score += potentialBonus

    return Math.min(score, 100)
}

export function formatPPS(score: number): string {
    return score.toFixed(0)
}

export function getPPSColor(score: number): string {
    if (score >= 80) return "bg-green-500"
    if (score >= 70) return "bg-blue-500"
    if (score >= 60) return "bg-yellow-500"
    return "bg-gray-400"
}
