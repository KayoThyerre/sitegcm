import "./globals.css";
import Providers from "@/app/providers";

export const metadata = {
  title: "GCM App",
  description: "Sistema de login com NextAuth e Prisma",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
