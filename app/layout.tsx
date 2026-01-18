import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arko Agency",
  description: "AI-powered agency with specialist agents",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
