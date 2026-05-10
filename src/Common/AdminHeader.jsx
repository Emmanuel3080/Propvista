import React, { useContext, useState } from 'react';
import { agentAuthContext } from '../Contexts/AgentAuthContext';

const PropVistaHeader = ({ showSearch = true, showPostButton = true, toggleSidebar }) => {
    const { userInfo } = useContext(agentAuthContext);

    return (
        <header className="w-full px-2 pt-2 md:px-4">
            <div
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
                {/* Background Accents */}
                <div className="absolute top-0 left-0 h-32 w-32 bg-emerald-400/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 h-32 w-32 bg-slate-900/5 blur-3xl rounded-full"></div>

                <div className="relative z-10 flex items-center justify-between px-4 py-3">
                    
                    {/* LEFT SECTION: Brand & Mobile Menu Toggler */}
                    <div className="flex items-center gap-3">
                        {/* Mobile Sidebar Toggle - Visible only on mobile */}
                        <button 
                            onClick={toggleSidebar}
                            className="flex md:hidden h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 active:scale-90 transition-transform"
                        >
                            <i className="fas fa-bars"></i>
                        </button>

                        <div className="flex flex-col">
                            <h2 className="text-[14px] md:text-[15px] font-black uppercase tracking-tight text-slate-900">
                                <a href="/dashboard"> {userInfo?.agencyName || "SQI"}</a>
                            </h2>
                            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.1em] text-slate-400 font-semibold">
                                Agent Dashboard
                            </p>
                        </div>
                    </div>

                    {/* MIDDLE SECTION: Search (Hidden on mobile/tablet to save space) */}
                    {showSearch && (
                        <div className="hidden lg:flex flex-1 justify-center px-8">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-slate-400 text-xs"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-emerald-400 focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    )}

                    {/* RIGHT SECTION */}
                    <div className="flex items-center gap-2 md:gap-4">
                        
                        {/* Post Property - Icon only on mobile, text added on md+ */}
                        {showPostButton && (
                            <button className="group flex items-center gap-2 rounded-2xl bg-slate-900 px-3 py-2.5 md:px-4 text-[11px] md:text-[12px] font-bold text-white shadow-lg transition-all hover:bg-emerald-500 active:scale-95">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                    <i className="fas fa-plus text-[10px]"></i>
                                </div>
                                <a href="/post-job" className="hidden sm:inline cursor-pointer">Post Property</a>
                            </button>
                        )}

                        {/* Notification - Hidden on very small screens, visible from sm up */}
                        <div className="hidden xs:flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                            <button className="relative flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100">
                                <i className="fas fa-bell text-sm"></i>
                                <span className="absolute top-2 right-2 flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                                </span>
                            </button>
                        </div>

                        {/* PROFILE */}
                        <div className="flex items-center gap-2 md:gap-3 rounded-2xl border border-transparent py-1 transition-all">
                            {/* Name: Now visible on mobile, smaller font */}
                            <div className="text-right flex flex-col justify-center">
                                <p className="text-[10px] md:text-[12px] font-black text-slate-900 leading-tight">
                                    {userInfo?.fullName?.split(' ')[0]} {/* Show first name only on tiny screens if needed */}
                                </p>
                                <span className="hidden xs:inline-flex mt-0.5 rounded-md border border-emerald-100 bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold uppercase text-emerald-600">
                                    {userInfo?.role}
                                </span>
                            </div>

                            <div className="relative">
                                <div className="h-9 w-9 md:h-10 md:w-10 overflow-hidden rounded-xl md:rounded-2xl ring-2 ring-white shadow-md">
                                    <img
                                        src={userInfo?.profileImage}
                                        alt="Profile"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                {userInfo?.isActive && (
                                    <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500"></span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PropVistaHeader;