import React from 'react';
import { Home, Calendar, BarChart3, User, X } from "lucide-react";

const Sidebar = ({ isOpen, closeSidebar, activeTab, setActiveTab }) => {
    const navItems = [
        { id: "properties", label: "My Properties", icon: Home },
        { id: "appointments", label: "Appointments", icon: Calendar },
        { id: "stats", label: "Analytics", icon: BarChart3 },
        { id: "account", label: "Account", icon: User },
    ];

    return (
        <>
            {/* Mobile Overlay - Only visible when sidebar is open on small screens */}
            <div 
                className={`fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 md:hidden 
                ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={closeSidebar}
            />

            {/* Sidebar Container */}
            <aside className={`
                fixed inset-y-0 left-0 z-[70] w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
                md:relative md:translate-x-0 md:flex md:flex-col md:h-screen md:sticky md:top-0
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="p-6">
                    {/* Brand Logo */}
                    <div className="flex items-center justify-between mb-10">
                        <div className="flex items-center gap-3">
                            <div className="bg-slate-800 p-2 rounded-lg">
                                <Home className="text-white" size={24} />
                            </div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-800">PropVista</h1>
                        </div>
                        {/* Mobile Close Button */}
                        <button onClick={closeSidebar} className="md:hidden text-slate-500 hover:text-slate-800">
                            <X size={24} />
                        </button>
                    </div>
                    
                    {/* Navigation */}
                    <nav className="space-y-2">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    closeSidebar(); // Auto-close sidebar on mobile after selection
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                                    activeTab === item.id
                                    ? "bg-indigo-50 text-indigo-700 shadow-sm"
                                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                                }`}
                            >
                                <item.icon size={20} className={activeTab === item.id ? "text-indigo-600" : "group-hover:text-slate-700"} />
                                <span className="font-semibold">{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;