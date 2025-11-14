"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/dashboard",
    });

    setLoading(false);

    if (!res || res.error) {
      setError("Credenciais inválidas");
      return;
    }

    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-login bg-overlay flex items-center justify-center p-4">

      {/* CARD */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm border border-white/20 rounded-xl p-10 w-full max-w-md shadow-lg">
        
        <h1 className="text-3xl font-bold text-center text-white mb-6">
          Entrar
        </h1>

        {/* FORM */}
        <form onSubmit={onSubmit} className="space-y-4">

          <div>
            <label className="text-white">Email</label>
            <input
              className="w-full mt-1 p-3 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none"
              type="email"
              value={email}
              placeholder="email@exemplo.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="text-white">Senha</label>
            <input
              className="w-full mt-1 p-3 rounded bg-white/20 text-white placeholder-gray-300 border border-white/30 outline-none"
              type="password"
              value={password}
              placeholder="••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded font-semibold"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
