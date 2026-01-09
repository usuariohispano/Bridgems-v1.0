'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { createPost } from "@/app/actions"
import { useState } from "react"
import { ImagePlus, Loader2, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

export function CreatePost() {
    const [isPosting, setIsPosting] = useState(false)

    // We wrap action to handle loading state slightly better visually
    async function onSubmit(formData: FormData) {
        setIsPosting(true)
        await createPost(formData)
        setIsPosting(false)
        // Reset form via key or ref ideally, simplification:
        const form = document.getElementById('create-post-form') as HTMLFormElement
        form?.reset()
    }

    return (
        <Card className="mb-6">
            <CardContent className="p-4">
                <form id="create-post-form" action={onSubmit} className="space-y-4">
                    <Textarea
                        name="content"
                        placeholder="¿Qué estás pensando? Comparte tus logros o busca talento..."
                        className="resize-none min-h-[100px] border-none focus-visible:ring-0 text-base"
                    />
                    <div className="flex justify-between items-center border-t pt-4">
                        <div className="flex gap-2">
                            <label htmlFor="media-upload" className="cursor-pointer p-2 hover:bg-gray-100 rounded-full text-[#EB5E28]">
                                <ImagePlus size={20} />
                                <input type="file" id="media-upload" name="media" accept="image/*" className="hidden" />
                            </label>
                            {/* Added AI Analysis checkbox */}
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="analyze" name="analyze" className="rounded border-gray-300 text-[#EB5E28] focus:ring-[#EB5E28]" />
                                <Label htmlFor="analyze" className="text-sm cursor-pointer flex items-center gap-1">
                                    <Sparkles size={14} className="text-purple-500" />
                                    Analizar con IA (Beta)
                                </Label>
                            </div>
                        </div>
                        <Button type="submit" disabled={isPosting} className="bg-[#EB5E28] hover:bg-[#EB5E28]/90 text-white rounded-full px-6">
                            {isPosting ? 'Publicando...' : 'Publicar'}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}
