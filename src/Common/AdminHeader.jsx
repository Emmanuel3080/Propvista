import React, { useContext } from 'react';
import { agentAuthContext } from '../Contexts/AgentAuthContext';

const PropVistaHeader = ({ showSearch = true, showPostButton = true }) => {
    const { userInfo } = useContext(agentAuthContext);

    return (
        <header className="w-full px-2 pt-2 md:px-1">
            <div
                style={{ fontFamily: "'Syne', sans-serif" }}
                className="relative overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 backdrop-blur-2xl shadow-[0_10px_40px_rgba(0,0,0,0.06)] transition-all duration-300"
            >
                {/* Background Accents */}
                <div className="absolute top-0 left-0 h-32 w-32 bg-emerald-400/10 blur-3xl rounded-full"></div>
                <div className="absolute bottom-0 right-0 h-32 w-32 bg-slate-900/5 blur-3xl rounded-full"></div>

                <div className="relative z-10 flex items-center justify-between px-3 md:px-6 py-3">
                    
                    {/* LEFT SECTION: Brand */}
                    <div className="flex items-center gap-3">
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-2">
                                <h2 className="text-[15px] font-black uppercase tracking-tight text-slate-900">
                                   <a href="/dashboard"> {userInfo?.agencyName || "SQI"}</a>
                                </h2>
                            </div>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-slate-400 font-semibold">
                                Agent Dashboard
                            </p>
                        </div>
                    </div>

                    {/* MIDDLE SECTION: Search (Conditional) */}
                    {showSearch && (
                        <div className="hidden lg:flex flex-1 justify-center px-8">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                                    <i className="fas fa-search text-slate-400 text-xs"></i>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search properties, agents, clients..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50/80 py-3 pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition-all focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-100"
                                />
                            </div>
                        </div>
                    )}

                    {/* RIGHT SECTION */}
                    <div className="flex items-center gap-2 md:gap-4">
                        
                        {/* Post Property (Conditional) */}
                        {showPostButton && (
                            <button className="group flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-2.5 text-[11px] md:text-[12px] font-bold text-white shadow-lg shadow-slate-300 transition-all hover:bg-emerald-500 active:scale-95">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                    <i className="fas fa-plus text-[10px]"></i>
                                </div>
                                <a href="/post-job" className="hidden md:inline cursor-pointer">Post Property</a>
                            </button>
                        )}

                        {/* Notification */}
                        <div className="hidden sm:flex items-center rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                            <button className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition-all hover:bg-slate-100 hover:text-emerald-600">
                                <i className="fas fa-bell text-sm"></i>
                                <span className="absolute top-2 right-2 flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
                                </span>
                            </button>
                        </div>

                        <div className="hidden md:block h-7 w-px bg-slate-200"></div>

                        {/* PROFILE */}
                        <div className="group flex items-center gap-3 rounded-2xl border border-transparent px-2 py-1 transition-all hover:border-slate-200 hover:bg-slate-50">
                            <div className="hidden md:block text-right">
                                <p className="text-[12px] font-black text-slate-900 leading-none transition-colors group-hover:text-emerald-600">
                                    {userInfo?.fullName}
                                </p>
                                <span className="mt-1 inline-flex rounded-md border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-600">
                                    {userInfo?.role}
                                </span>
                            </div>

                            <div className="relative">
                                <div className="h-10 w-10 overflow-hidden rounded-2xl ring-2 ring-white shadow-md transition-transform group-hover:scale-105">
                                    <img
                                        src={userInfo?.profileImage}
                                        alt={userInfo?.fullName}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                {userInfo?.isActive && (
                                    <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500"></span>
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