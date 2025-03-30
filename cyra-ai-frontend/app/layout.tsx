import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "CyraAI",
  description: "Your Web3 talent hire AI Agent.",
};

// ${geistSans.variable} ${geistMono.variable}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
