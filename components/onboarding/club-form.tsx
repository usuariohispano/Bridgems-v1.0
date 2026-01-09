'use client'

import { createClubProfile } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function ClubForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Perfil de Club / Academia</CardTitle>
                <CardDescription>Registra tu organización para encontrar talento.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={async (formData) => {
                    await createClubProfile(formData)
                }} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre del Club / Academia</Label>
                        <Input id="name" name="name" required placeholder="Ej: Academia FC" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Ubicación Principal</Label>
                        <Input id="location" name="location" required placeholder="Ej: Costa del Este, Panamá" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="website">Sitio Web / Red Social Principal</Label>
                        <Input id="website" name="website" placeholder="https://instagram.com/academiafc" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" name="description" placeholder="Descripción de la academia..." />
                    </div>

                    <Button type="submit" className="w-full bg-[#EB5E28] hover:bg-[#EB5E28]/90">
                        Registrar Club
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
