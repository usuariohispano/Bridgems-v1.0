

import { signup } from '@/app/actions'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from 'next/link'

export default async function SignupPage({
    searchParams,
}: {
    searchParams: Promise<{ message: string, error: string }>
}) {
    const params = await searchParams;
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-[#FFFCF2] px-4 py-8">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-[#403D39]">
                        Crea tu cuenta
                    </h2>
                    <p className="mt-2 text-sm text-[#252422]">
                        ¿Ya tienes cuenta?{' '}
                        <Link href="/login" className="font-medium text-[#EB5E28] hover:text-[#EB5E28]/80">
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6">
                    <div className="space-y-4 rounded-md shadow-sm">
                        <div>
                            <Label htmlFor="email-address" className="sr-only">
                                Email address
                            </Label>
                            <Input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#EB5E28] sm:text-sm sm:leading-6"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="sr-only">
                                Password
                            </Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="new-password"
                                required
                                className="relative block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-[#EB5E28] sm:text-sm sm:leading-6"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    {params.error && (
                        <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm text-center">
                            {params.error}
                        </div>
                    )}

                    <div>
                        <Button
                            formAction={signup}
                            className="group relative flex w-full justify-center rounded-md bg-[#EB5E28] px-3 py-2 text-sm font-semibold text-white hover:bg-[#EB5E28]/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#EB5E28]"
                        >
                            Registrarse
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
