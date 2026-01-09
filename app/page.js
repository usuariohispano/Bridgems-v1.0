import { supabase } from '@/lib/supabase'  // Ajusta la ruta

export default async function HomePage() {
  // Verificar conexión a Supabase
  let isConnected = false
  try {
    const { data, error } = await supabase.from('your_table').select('*').limit(1)
    if (!error) isConnected = true
  } catch (err) {
    console.error('Supabase connection error:', err)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mi Aplicación Bridgems</h1>
      
      <div style={{ 
        padding: '1rem', 
        margin: '1rem 0',
        background: isConnected ? '#d4edda' : '#f8d7da',
        border: `1px solid ${isConnected ? '#c3e6cb' : '#f5c6cb'}`,
        borderRadius: '4px'
      }}>
        <strong>Conexión a Supabase:</strong> 
        <span style={{ color: isConnected ? '#155724' : '#721c24', marginLeft: '0.5rem' }}>
          {isConnected ? '✅ CONECTADO' : '❌ NO CONECTADO'}
        </span>
      </div>

      <h2>Rutas disponibles:</h2>
      <ul>
        <li><a href="/login" style={{ color: '#0070f3' }}>/login</a> - Iniciar sesión</li>
        <li><a href="/signup" style={{ color: '#0070f3' }}>/signup</a> - Registrarse</li>
        <li><a href="/opportunities" style={{ color: '#0070f3' }}>/opportunities</a> - Oportunidades</li>
        <li><a href="/profile/test" style={{ color: '#0070f3' }}>/profile/[id]</a> - Perfil</li>
      </ul>

      <div style={{ marginTop: '2rem', padding: '1rem', background: '#f8f9fa', borderRadius: '4px' }}>
        <h3>Debug Info:</h3>
        <p>URL Supabase: {process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Configurada' : '❌ Faltante'}</p>
        <p>Clave Supabase: {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✅ Configurada' : '❌ Faltante'}</p>
      </div>
    </div>
  )
}