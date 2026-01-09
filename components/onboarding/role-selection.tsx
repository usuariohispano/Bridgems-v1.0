'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updateUserRole } from "@/app/actions"
import { User, Shield } from "lucide-react"

export function RoleSelection() {
    return (
        <div className="grid gap-4 md:grid-cols-2">
            <Card
                className="cursor-pointer hover:border-[#EB5E28] transition-all"
                onClick={() => updateUserRole('player')}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-6 w-6 text-[#EB5E28]" />
                        Soy Jugador
                    </CardTitle>
                    <CardDescription>
                        Busco oportunidades y quiero mostrar mi talento.
                    </CardDescription>
                </CardHeader>
            </Card>

            <Card
                className="cursor-pointer hover:border-[#EB5E28] transition-all"
                onClick={() => updateUserRole('club')}
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-6 w-6 text-[#EB5E28]" />
                        Soy Club / Academia
                    </CardTitle>
                    <CardDescription>
                        Busco talento y quiero publicar oportunidades.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    )
}
