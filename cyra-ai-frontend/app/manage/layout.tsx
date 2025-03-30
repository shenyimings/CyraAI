// import { useManageStore } from './store'
import type { Metadata } from "next";
import "../globals.css";
import { Sidebar } from "./sidebar";

export const metadata: Metadata = {
  title: "CyraAI - Management",
  description: "Your Web3 talent hire AI Agent.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // const { activeSection, setActiveSection } = useManageStore()
    return (
        <html lang="en">
            <body
                className={`antialiased min-h-screen flex flex-col`}
            >
                {/* Top Banner */}
                <div className="bg-gradient-to-r from-gray-10 to-gray-100 p-4 border-b">
                    <div className="container mx-auto">
                        <h1 className="text-gray-900 text-xl font-semibold ml-4">CyraAI Management</h1>
                    </div>
                </div>

                <div className="container mx-auto py-6 flex gap-6 flex-1">
                    {/* Sidebar */}
                    <Sidebar />
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
