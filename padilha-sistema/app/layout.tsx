import "../styles/globals.css";

export const metadata = {
  title: "Padilha BarberShop",
  description: "Sistema de controle da barbearia",
  icons: {
    icon: "/logoPadilha.ico",
    shortcut: "/logoPadilha.ico",
    apple: "/logoPadilha.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="container">
          {children}
        </div>
      </body>
    </html>
  );
}