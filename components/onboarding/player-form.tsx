'use client'

import { createPlayerProfile } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export function PlayerForm() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Perfil de Jugador</CardTitle>
                <CardDescription>Completa tu información básica para los scouts.</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={async (formData) => {
                    await createPlayerProfile(formData)
                }} className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="position">Posición Principal</Label>
                            <Select name="position" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="portero">Portero</SelectItem>
                                    <SelectItem value="defensa_central">Defensa Central</SelectItem>
                                    <SelectItem value="lateral_izquierdo">Lateral Izquierdo</SelectItem>
                                    <SelectItem value="lateral_derecho">Lateral Derecho</SelectItem>
                                    <SelectItem value="mediocentro">Mediocentro</SelectItem>
                                    <SelectItem value="mediapunta">Mediapunta</SelectItem>
                                    <SelectItem value="extremo">Extremo</SelectItem>
                                    <SelectItem value="delantero">Delantero</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="dominant_foot">Pie Dominante</Label>
                            <Select name="dominant_foot" required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="right">Derecho</SelectItem>
                                    <SelectItem value="left">Izquierdo</SelectItem>
                                    <SelectItem value="both">Ambidextro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="birth_date">Fecha de Nacimiento</Label>
                            <Input type="date" name="birth_date" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="location">Ubicación (Ciudad/Provincia)</Label>
                            <Input id="location" name="location" placeholder="Ej: Ciudad de Panamá" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="height">Altura (cm)</Label>
                            <Input type="number" id="height" name="height" placeholder="175" required />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input type="number" id="weight" name="weight" placeholder="70" required />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Biografía / Presentación</Label>
                        <Textarea id="bio" name="bio" placeholder="Cuéntanos sobre tu estilo de juego..." />
                    </div>

                    <Button type="submit" className="w-full bg-[#EB5E28] hover:bg-[#EB5E28]/90">
                        Guardar Perfil
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
