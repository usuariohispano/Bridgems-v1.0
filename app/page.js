export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>¡Bridgems App está viva!</h1>
      <p>Deployed on Vercel: {new Date().toLocaleString()}</p>
      <a href="/login">Login</a> | <a href="/signup">Signup</a>
    </div>
  )
}
