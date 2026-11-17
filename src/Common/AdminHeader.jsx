import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, Menu } from 'lucide-react';
import { agentAuthContext } from '../Contexts/AgentAuthContext';
import PropvistaLogo from './PropvistaLogo';

const PropVistaHeader = ({
    showSearch = true,
    showPostButton = true,
    toggleSidebar,
    searchQuery = "",
    onSearchChange
}) => {
    const { userInfo } = useContext(agentAuthContext);

    return (
        <header className="sticky top-0 z-40 w-full bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E4E2DC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

                {/* Left: Brand & Agency Identity */}
                <div className="flex items-center gap-4">
                    {toggleSidebar && (
                        <button
                            type="button"
                            onClick={toggleSidebar}
                            className="flex md:hidden h-10 w-10 items-center justify-center rounded-[8px] border border-[#E4E2DC] bg-white text-[#1A1A1A] hover:bg-[#F1EFEA] transition-colors"
                            aria-label="Open Navigation"
                        >
                            <Menu size={18} />
                        </button>
                    )}

                    <div className="flex items-center gap-3">
                        <Link to="/dashboard" className="group flex items-center">
                            <PropvistaLogo variant="dark" size="sm" />
                        </Link>
                        <span className="hidden sm:inline-block h-4 w-px bg-[#E4E2DC]" />
                        <div className="hidden sm:flex flex-col">
                            <span className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                                {userInfo?.agencyName || "Partner Agency"}
                            </span>
                            {/* <span className="text-[11px] text-[#8F8E88]">
                                Architectural Portfolio Portal
                            </span> */}
                        </div>
                    </div>
                </div>

                {/* Middle: Optional Portfolio Search */}
                {showSearch && (
                    <div className="hidden lg:flex flex-1 max-w-md mx-6">
                        <div className="relative w-full">
                            <Search
                                size={15}
                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                            />
                            <input
                                type="search"
                                value={searchQuery}
                                onChange={(e) => onSearchChange?.(e.target.value)}
                                placeholder="Filter portfolio by title or location..."
                                className="w-full rounded-[8px] border border-[#E4E2DC] bg-white py-2 pl-10 pr-4 text-sm text-[#1A1A1A] placeholder:text-[#8F8E88] outline-none focus:border-[#1E3A34] transition-colors"
                            />
                        </div>
                    </div>
                )}

                {/* Right: Actions & Agent Profile */}
                <div className="flex items-center gap-3 sm:gap-4">
                    {showPostButton && (
                        <Link
                            to="/post-job"
                            className="inline-flex items-center gap-2 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] px-3.5 py-2.5 text-xs font-semibold text-white transition-colors"
                        >
                            <Plus size={15} />
                            <span className="hidden sm:inline">List Property</span>
                        </Link>
                    )}

                    <div className="h-6 w-px bg-[#E4E2DC] hidden sm:block" />

                    <div className="flex items-center gap-2.5">
                        <div className="text-right hidden sm:block">
                            <p className="text-xs font-semibold text-[#1A1A1A] leading-tight">
                                {userInfo?.fullName || "Advisor"}
                            </p>
                            <p className="text-[11px] text-[#8F8E88] capitalize">
                                {userInfo?.role || "Licensed Agent"}
                            </p>
                        </div>

                        <div className="relative h-10 w-10 overflow-hidden rounded-full border border-[#E4E2DC] bg-[#F1EFEA] flex items-center justify-center">
                            {userInfo?.profileImage ? (
                                <img
                                    src={userInfo.profileImage}
                                    alt={userInfo?.fullName || "Agent Profile"}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <span className="font-serif-editorial text-sm font-semibold text-[#1E3A34]">
                                    {userInfo?.fullName ? userInfo.fullName[0].toUpperCase() : "A"}
                                </span>
                            )}
                            {userInfo?.isActive && (
                                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#2E7D32]" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default PropVistaHeader;
