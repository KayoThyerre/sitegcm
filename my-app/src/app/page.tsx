export default function Home() {
  return (
    <main style={{display: 'flex', minHeight: '100vh', alignItems:'center', justifyContent:'center'}}>
      <div>
        <h1>Home</h1>
        <p>App rodando. Vá para <a href="/dashboard">Dashboard</a>.</p>
      </div>
    </main>
  );
}
