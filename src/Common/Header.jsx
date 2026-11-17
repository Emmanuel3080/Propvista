import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Heart, Menu, X, LogOut, User } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { authContext } from '../Contexts/UserAuthContext';
import { propertyContext } from '../Contexts/PropertyContext';
import PropvistaLogo from './PropvistaLogo';
import { LUXURY_EASE } from '../utils/motion';

const Header = () => {
    const { userInfo, logout } = useContext(authContext);
    const { savedIds = [], setSearchFilters } = useContext(propertyContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleNavFilter = (patch, targetPath = "/properties") => {
        if (setSearchFilters) {
            setSearchFilters((prev) => ({
                ...prev,
                category: "all",
                savedOnly: false,
                ...patch,
            }));
        }
        setMenuOpen(false);
        navigate(targetPath);
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    };

    const handleLogout = () => {
        setMenuOpen(false);
        if (logout) {
            logout();
        } else {
            localStorage.removeItem("AccessToken");
            navigate('/signin');
        }
    };

    const isPropertiesActive =
        location.pathname === "/properties" &&
        !location.search.includes("category=new-build") &&
        !location.search.includes("saved=true");

    const isNewDevelopmentsActive =
        location.pathname === "/properties" &&
        location.search.includes("category=new-build");

    const isSavedActive =
        location.pathname === "/saved" ||
        location.search.includes("saved=true");

    return (
        <header className="sticky top-0 z-50 w-full bg-[#F9F8F6]/90 backdrop-blur-md border-b border-[#E4E2DC] text-[#1A1A1A] transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

                {/* Left: Propvista Wordmark & Primary Navigation */}
                <div className="flex items-center gap-10">
                    <Link
                        to="/"
                        onClick={() => {
                            setSearchFilters?.((prev) => ({
                                ...prev,
                                category: "all",
                                savedOnly: false,
                            }));
                            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
                        }}
                        aria-label="Propvista Home"
                        className="group flex items-center focus:outline-none"
                    >
                        <PropvistaLogo variant="dark" size="md" />
                    </Link>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#5C5C58]">
                        <button
                            type="button"
                            onClick={() => handleNavFilter({ category: "all", savedOnly: false }, "/properties")}
                            className={`relative cursor-pointer transition-colors hover:text-[#1A1A1A] py-1.5 ${
                                isPropertiesActive
                                    ? "text-[#1A1A1A] font-semibold"
                                    : ""
                            }`}
                        >
                            <span>Properties</span>
                            {isPropertiesActive && (
                                <motion.span
                                    layoutId="header-active-nav"
                                    transition={{ duration: 0.28, ease: LUXURY_EASE }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A34] rounded-full"
                                />
                            )}
                        </button>

                        <button
                            type="button"
                            onClick={() => handleNavFilter({ category: "new-build", savedOnly: false }, "/properties?category=new-build")}
                            className={`relative cursor-pointer transition-colors hover:text-[#1A1A1A] py-1.5 ${
                                isNewDevelopmentsActive
                                    ? "text-[#1A1A1A] font-semibold"
                                    : ""
                            }`}
                        >
                            <span>New Developments</span>
                            {isNewDevelopmentsActive && (
                                <motion.span
                                    layoutId="header-active-nav"
                                    transition={{ duration: 0.28, ease: LUXURY_EASE }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A34] rounded-full"
                                />
                            )}
                        </button>

                        <Link
                            to="/saved"
                            onClick={() => setSearchFilters?.((prev) => ({ ...prev, savedOnly: true }))}
                            className={`relative inline-flex items-center gap-2 transition-colors hover:text-[#1A1A1A] py-1.5 ${
                                isSavedActive
                                    ? "text-[#1A1A1A] font-semibold"
                                    : ""
                            }`}
                        >
                            <motion.span
                                key={savedIds.length > 0 ? "saved-filled" : "saved-empty"}
                                initial={{ scale: 0.85 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.22, ease: LUXURY_EASE }}
                                className="inline-flex"
                            >
                                <Heart
                                    size={15}
                                    className={savedIds.length > 0 ? "fill-[#C86D51] text-[#C86D51]" : "text-current"}
                                />
                            </motion.span>
                            <span>Saved Properties</span>
                            <AnimatePresence initial={false} mode="popLayout">
                                {savedIds.length > 0 && (
                                    <motion.span
                                        key={savedIds.length}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2, ease: LUXURY_EASE }}
                                        className="px-1.5 py-0.5 text-[11px] rounded-full bg-[#F1EFEA] border border-[#E4E2DC] text-[#1A1A1A] tabular-nums"
                                    >
                                        {savedIds.length}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {isSavedActive && (
                                <motion.span
                                    layoutId="header-active-nav"
                                    transition={{ duration: 0.28, ease: LUXURY_EASE }}
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1E3A34] rounded-full"
                                />
                            )}
                        </Link>
                    </nav>
                </div>

                {/* Right: User Profile */}
                <div className="hidden md:flex items-center gap-3.5">
                    <div className="flex items-center gap-3 px-3 py-1.5 rounded-[8px] bg-white border border-[#E4E2DC]">
                        <div className="w-8 h-8 rounded-full bg-[#1E3A34] text-white flex items-center justify-center text-xs font-semibold shrink-0">
                            {userInfo?.fullName ? userInfo.fullName[0].toUpperCase() : <User size={14} />}
                        </div>
                        <div className="text-left pr-1">
                            <p className="text-[10px] uppercase tracking-wider text-[#8F8E88] font-semibold leading-none">
                                User Profile
                            </p>
                            <p className="text-xs font-semibold text-[#1A1A1A] max-w-[140px] truncate mt-0.5">
                                {userInfo?.fullName || "Guest"}
                            </p>
                        </div>
                    </div>

                    <motion.button
                        type="button"
                        whileHover={{ y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: LUXURY_EASE }}
                        onClick={handleLogout}
                        title="Sign Out"
                        className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-[8px] text-xs font-medium text-[#5C5C58] hover:text-[#1A1A1A] bg-white hover:bg-[#F1EFEA] border border-[#E4E2DC] transition-colors cursor-pointer"
                    >
                        <LogOut size={14} />
                        <span className="hidden lg:inline">Sign Out</span>
                    </motion.button>
                </div>

                {/* Mobile Actions */}
                <div className="flex md:hidden items-center gap-2">
                    <Link
                        to="/saved"
                        onClick={() => setSearchFilters?.((prev) => ({ ...prev, savedOnly: true }))}
                        aria-label="Saved Properties"
                        className="relative inline-flex items-center justify-center w-10 h-10 rounded-[8px] border border-[#E4E2DC] bg-white text-[#1A1A1A]"
                    >
                        <Heart
                            size={17}
                            className={savedIds.length > 0 ? "fill-[#C86D51] text-[#C86D51]" : ""}
                        />
                        <AnimatePresence initial={false}>
                            {savedIds.length > 0 && (
                                <motion.span
                                    key={savedIds.length}
                                    initial={{ opacity: 0, scale: 0.7 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.7 }}
                                    transition={{ duration: 0.2, ease: LUXURY_EASE }}
                                    className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#1E3A34] text-white text-[10px] font-semibold flex items-center justify-center tabular-nums"
                                >
                                    {savedIds.length}
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </Link>

                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.94 }}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-[8px] border border-[#E4E2DC] bg-white text-[#1A1A1A] hover:bg-[#F1EFEA] transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle Menu"
                        aria-expanded={menuOpen}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.span
                                key={menuOpen ? "close" : "open"}
                                initial={{ opacity: 0, rotate: -45, scale: 0.85 }}
                                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                exit={{ opacity: 0, rotate: 45, scale: 0.85 }}
                                transition={{ duration: 0.18, ease: LUXURY_EASE }}
                                className="inline-flex"
                            >
                                {menuOpen ? <X size={18} /> : <Menu size={18} />}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.26, ease: LUXURY_EASE }}
                        className="md:hidden bg-[#F9F8F6] border-b border-[#E4E2DC] px-4 pt-3 pb-6 space-y-5 shadow-lg overflow-hidden"
                    >
                        <div className="flex items-center justify-between p-3.5 rounded-[12px] bg-[#F1EFEA] border border-[#E4E2DC]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#1E3A34] text-white flex items-center justify-center text-sm font-semibold">
                                    {userInfo?.fullName ? userInfo.fullName[0].toUpperCase() : <User size={16} />}
                                </div>
                                <div>
                                    <p className="text-[11px] uppercase tracking-wider text-[#8F8E88]">User Profile</p>
                                    <p className="text-sm font-semibold text-[#1A1A1A]">
                                        {userInfo?.fullName || "Guest"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <nav className="flex flex-col space-y-1 text-sm font-medium text-[#1A1A1A]">
                            <button
                                type="button"
                                onClick={() => handleNavFilter({ category: "all", savedOnly: false }, "/properties")}
                                className={`text-left px-3 py-2.5 rounded-[8px] transition-colors ${
                                    isPropertiesActive
                                        ? "bg-[#1E3A34] text-white font-semibold"
                                        : "hover:bg-[#F1EFEA]"
                                }`}
                            >
                                Properties
                            </button>
                            <button
                                type="button"
                                onClick={() => handleNavFilter({ category: "new-build", savedOnly: false }, "/properties?category=new-build")}
                                className={`text-left px-3 py-2.5 rounded-[8px] transition-colors ${
                                    isNewDevelopmentsActive
                                        ? "bg-[#1E3A34] text-white font-semibold"
                                        : "hover:bg-[#F1EFEA]"
                                }`}
                            >
                                New Developments
                            </button>
                            <Link
                                to="/saved"
                                onClick={() => {
                                    setSearchFilters?.((prev) => ({ ...prev, savedOnly: true }));
                                    setMenuOpen(false);
                                }}
                                className={`flex items-center justify-between px-3 py-2.5 rounded-[8px] transition-colors ${
                                    isSavedActive
                                        ? "bg-[#1E3A34] text-white font-semibold"
                                        : "hover:bg-[#F1EFEA]"
                                }`}
                            >
                                <span>Saved Properties</span>
                                <span
                                    className={`px-2 py-0.5 rounded-full text-xs border tabular-nums ${
                                        isSavedActive
                                            ? "bg-white/15 border-white/25 text-white"
                                            : "bg-[#F1EFEA] border-[#E4E2DC] text-[#1A1A1A]"
                                    }`}
                                >
                                    {savedIds.length}
                                </span>
                            </Link>
                        </nav>

                        <div className="pt-3 border-t border-[#E4E2DC]">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-[8px] bg-white border border-[#E4E2DC] text-[#1A1A1A] hover:bg-[#F1EFEA] text-xs font-semibold transition-colors"
                            >
                                <LogOut size={14} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Header;
