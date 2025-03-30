import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Button } from "@/components/ui/button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CyraAI - Management",
  description: "Your Web3 talent hire AI Agent.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`antialiased min-h-screen flex flex-col`}
            >
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-gray-100 to-gray-200 p-4 border-b">
                    <div className="container mx-auto">
                        <h1 className="text-gray-700 text-xl font-medium">CyraAI Management</h1>
                    </div>
                </div>

                <div className="container mx-auto py-6 flex gap-6 flex-1">
                    {/* Sidebar */}
                    <div className="w-64 bg-white rounded-lg shadow-sm p-4">
                        <nav className="space-y-2">
                            <Button
                                variant="default"
                                className="w-full justify-start"
                            >
                                🎯 Job Listings
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                👥 Candidates
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                💎 Credits
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                🏢 Company Profile
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                📊 Analytics
                            </Button>
                            <Button
                                variant="ghost"
                                className="w-full justify-start"
                            >
                                ⚙️ Settings
                            </Button>
                        </nav>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1">
                        {children}
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-white border-t mt-auto">
                    <div className="container mx-auto py-6">
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-500">
                                © 2025 CyraAI. All rights reserved.
                            </p>
                            <div className="flex gap-4">
                                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Terms</a>
                                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Privacy</a>
                                <a href="#" className="text-sm text-gray-500 hover:text-gray-700">Support</a>
                            </div>
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    );
}
