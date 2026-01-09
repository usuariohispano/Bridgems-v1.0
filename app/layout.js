export const metadata = {
  title: "Mi App Next.js",
  description: "Aplicación con Next.js y Supabase",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
