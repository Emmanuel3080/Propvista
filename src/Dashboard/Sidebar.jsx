import React from 'react';
import { Home, Calendar, BarChart3, User, X } from "lucide-react";
import PropvistaLogo from '../Common/PropvistaLogo';

const Sidebar = ({ isOpen, closeSidebar, activeTab, setActiveTab }) => {
    const navItems = [
        { id: "properties", label: "Residences", icon: Home },
        { id: "appointments", label: "Viewings", icon: Calendar },
        { id: "stats", label: "Analytics", icon: BarChart3 },
        { id: "account", label: "Advisor Profile", icon: User },
    ];

    return (
        <>
            <div
                className={`fixed inset-0 z-50 bg-[#161817]/50 backdrop-blur-xs transition-opacity duration-300 md:hidden ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                onClick={closeSidebar}
            />

            <aside
                className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#F1EFEA] border-r border-[#E4E2DC] transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:flex md:flex-col md:h-screen md:sticky md:top-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <PropvistaLogo variant="dark" size="sm" />
                        <button
                            type="button"
                            onClick={closeSidebar}
                            className="md:hidden text-[#5C5C58] hover:text-[#1A1A1A]"
                            aria-label="Close Sidebar"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    <nav className="space-y-1.5">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                    setActiveTab(item.id);
                                    closeSidebar?.();
                                }}
                                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-[8px] text-xs font-semibold transition-all cursor-pointer ${
                                    activeTab === item.id
                                        ? "bg-[#1E3A34] text-white"
                                        : "text-[#5C5C58] hover:bg-white hover:text-[#1A1A1A]"
                                }`}
                            >
                                <item.icon size={16} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
