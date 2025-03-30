"use client"

import { Button } from "@/components/ui/button"
import { useManageStore } from './store'

export function Sidebar() {
    const { activeSection, setActiveSection } = useManageStore()

    const menuItems = [
        { id: 'jobs', icon: '🎯', label: 'Job Listings' },
        { id: 'candidates', icon: '👥', label: 'Candidates' },
        { id: 'credits', icon: '💎', label: 'Credits' },
        { id: 'profile', icon: '🏢', label: 'Company Profile' },
        { id: 'analytics', icon: '📊', label: 'Analytics' },
        { id: 'settings', icon: '⚙️', label: 'Settings' },
    ]

    return (
        <div className="w-64 bg-white rounded-lg shadow-sm p-4">
            <nav className="space-y-2">
                {menuItems.map((item) => (
                    <Button
                        key={item.id}
                        variant={activeSection === item.id ? 'default' : 'ghost'}
                        className="w-full justify-start"
                        onClick={() => setActiveSection(item.id)}
                    >
                        {item.icon} {item.label}
                    </Button>
                ))}
            </nav>
        </div>
    )
}