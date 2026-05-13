import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Contexts/UserAuthContext';

const Header = () => {
    const { userInfo, logout } = useContext(authContext);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Appointments', path: '/applications' },
        { name: 'View Properties', path: '/properties' },
    ];

    const handleLogout = () => {
        // logout(); // Uncomment this when your context is ready
        setMenuOpen(false);
        navigate('/signin');
    };

    return (
        <header className="bg-white/80 backdrop-blur-md text-slate-900 shadow-sm sticky top-0 z-50 border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo & Desktop Nav */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-3xl font-extrabold tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-slate-900">Propvista</span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="hover:text-blue-600 transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Desktop User Info & Logout */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex flex-col items-end pr-4 border-r border-slate-200">
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold">Account</p>
                        <p className="text-sm font-bold text-slate-900">
                            {userInfo?.fullName || "Guest"}
                        </p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-red-600 bg-red-50 border border-red-100 rounded-full hover:bg-red-600 hover:text-white transition-all active:scale-95"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>
                </div>

                {/* Mobile Toggle Button */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {menuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="p-6 space-y-6">

                        {/* Mobile User Identity (Added this for you) */}
                        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                                {userInfo?.fullName ? userInfo.fullName[0] : "G"}
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                                <p className="text-base font-bold text-slate-900">{userInfo?.fullName || "Guest"}</p>
                            </div>
                        </div>

                        <nav className="flex flex-col gap-2 font-semibold text-slate-700">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    onClick={() => setMenuOpen(false)}
                                    className="p-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                to="/profile"
                                onClick={() => setMenuOpen(false)}
                                className="p-3 rounded-xl hover:bg-blue-50 hover:text-blue-600"
                            >
                                Profile Settings
                            </Link>
                        </nav>

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100 active:bg-red-100"
                        >
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;