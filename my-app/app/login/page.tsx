"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // usamos redirect: false para tratar resposta manualmente
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (!res) {
      setError("Erro inesperado");
      return;
    }
    if (res.error) {
      setError("Credenciais inválidas");
      return;
    }

    // sucesso -> redireciona para home
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Entrar</h1>

        <label className="block text-sm">Email</label>
        <input value={email} onChange={e => setEmail(e.target.value)} className="w-full border px-3 py-2 mb-3" />

        <label className="block text-sm">Senha</label>
        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full border px-3 py-2 mb-3" />

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
