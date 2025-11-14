"use client";

import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Se já estiver autenticado, vai pro dashboard
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

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

    // sucesso -> redireciona pro dashboard
    router.push("/dashboard");
  };

  if (status === "loading") return <p className="p-6">Checando sessão...</p>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-white p-6 rounded shadow">
        <h1 className="text-xl font-semibold mb-4">Entrar</h1>

        <label className="block text-sm mb-1">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 mb-3"
        />

        <label className="block text-sm mb-1">Senha</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="w-full border px-3 py-2 mb-3"
        />

        {error && <p className="text-sm text-red-600 mb-3">{error}</p>}

        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
