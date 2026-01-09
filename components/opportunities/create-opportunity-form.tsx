'use client'

import { createOpportunity } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function CreateOpportunityForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Publicar Nueva Oportunidad</CardTitle>
                <CardDescription>Busca talento para tu club o academia.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={async (formData) => {
                    await createOpportunity(formData)
                }} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="title">Título</Label>
                        <Input id="title" name="title" required placeholder="Ej: Prueba Categoría Sub-17" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="type">Tipo</Label>
                            <Select name="type" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="trial">Prueba / Visoría</SelectItem>
                                    <SelectItem value="contract">Contrato Profesional</SelectItem>
                                    <SelectItem value="academy">Cupo Academia</SelectItem>
                                    <SelectItem value="other">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="deadline">Fecha Límite</Label>
                            <Input type="date" id="deadline" name="deadline" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input id="location" name="location" required placeholder="Ej: Estadio Maracaná, Panamá" />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción y Requisitos</Label>
                        <Textarea id="description" name="description" required placeholder="Describe qué buscas y requisitos..." className="min-h-[150px]" />
                    </div>

                    <Button type="submit" className="w-full bg-[#EB5E28] hover:bg-[#EB5E28]/90">
                        Publicar Oportunidad
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
