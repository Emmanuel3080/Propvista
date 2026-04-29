import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../Contexts/UserAuthContext';

const Header = () => {
    const { userInfo, logout } = useContext(authContext); // Assuming logout exists in context
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Appointments', path: '/applications' },
        { name: 'View Properties', path: '/jobs' },
    ];

    const handleLogout = () => {
        // Perform logout logic (clear tokens, etc.)
        // logout(); 
        navigate('/signin');
    };

    return (
        <header className="bg-white/90 backdrop-blur-md text-slate-900 shadow-sm sticky top-0 z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo & Desktop Nav */}
                <div className="flex items-center gap-8">
                    <Link to="/" className="text-2xl font-extrabold tracking-tight hover:opacity-90 transition-opacity">
                        Prop<span className="text-blue-600">Vista</span>
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

                {/* User Actions (Desktop) */}
                <div className="hidden md:flex items-center gap-4">
                    <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
                        <div className="text-right">
                            <p className="text-xs text-slate-500 font-medium">Welcome,</p>
                            <p className="text-sm font-bold text-slate-900">
                                {userInfo?.fullName || "Guest"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-red-600 bg-red-50 border-2 border-red-100 rounded-full hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 active:scale-95 cursor-pointer"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle Menu"
                >
                    <i className={`fa-solid ${menuOpen ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t border-slate-100 p-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <nav className="flex flex-col gap-4 font-semibold text-slate-700">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setMenuOpen(false)}
                                className="text-lg hover:text-blue-600"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link to="/profile" onClick={() => setMenuOpen(false)} className="text-lg hover:text-blue-600">
                            Profile
                        </Link>
                    </nav>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-red-50 text-red-600 rounded-2xl font-bold border border-red-100"
                    >
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                        Logout
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;