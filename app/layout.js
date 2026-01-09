// Asegúrate que layout.js tenga esto:
import './globals.css' // Si tienes estilos

export const metadata = {
  title: 'Bridgems App',
  description: 'Tu aplicación de oportunidades',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav style={{ padding: '1rem', background: '#0070f3', color: 'white' }}>
          <a href="/" style={{ color: 'white', marginRight: '1rem' }}>Inicio</a>
          <a href="/login" style={{ color: 'white', marginRight: '1rem' }}>Login</a>
          <a href="/signup" style={{ color: 'white', marginRight: '1rem' }}>Registro</a>
          <a href="/opportunities" style={{ color: 'white' }}>Oportunidades</a>
        </nav>
        <div style={{ padding: '2rem' }}>
          {children}
        </div>
      </body>
    </html>
  )
}