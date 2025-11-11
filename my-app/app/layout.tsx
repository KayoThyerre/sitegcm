// app/layout.tsx
export const metadata = {
  title: "Meu App",
  description: "Aplicação de autenticação com NextAuth e Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
