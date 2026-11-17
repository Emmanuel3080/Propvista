import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import PropvistaLogo from './PropvistaLogo';

const DashboardFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#161817] text-[#F9F8F6] border-t border-[#E4E2DC]/15 mt-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">

                {/* Top Editorial Lockup */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
                    <div className="max-w-xl space-y-4">
                        <Link
                            to="/"
                            onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "instant" })}
                            aria-label="Propvista Home"
                            className="inline-flex group focus:outline-none"
                        >
                            <PropvistaLogo variant="light" size="lg" />
                        </Link>
                        <p className="text-sm text-[#8F8E88] leading-relaxed max-w-[60ch]">
                            Curating architectural residences and private viewings with understated precision. Discover verified properties and schedule viewings effortlessly.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors"
                        >
                            <span>Explore Properties</span>
                            <ArrowUpRight size={14} />
                        </Link>
                        <Link
                            to="/saved"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] border border-white/15 hover:border-white/35 text-[#F9F8F6] text-xs font-semibold transition-colors"
                        >
                            <span>Saved Properties</span>
                        </Link>
                    </div>
                </div>

                {/* 4-Column Directory Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10 text-sm">

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">Discovery</span>
                        <Link to="/properties" className="text-xs text-[#8F8E88] hover:text-white transition-colors">All Properties</Link>
                        <Link to="/properties?category=new-build" className="text-xs text-[#8F8E88] hover:text-white transition-colors">New Developments</Link>
                        <Link to="/saved" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Saved Properties</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">Architectural Styles</span>
                        <Link to="/properties?category=architectural" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Contemporary Architectural</Link>
                        <Link to="/properties?category=waterfront" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Waterfront Estates</Link>
                        <Link to="/properties?category=penthouse" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Penthouses & Apartments</Link>
                        <Link to="/properties?category=garden-villa" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Garden Villas & Duplexes</Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">Client Services</span>
                        <Link to="/about" className="text-xs text-[#8F8E88] hover:text-white transition-colors">About Propvista</Link>
                        <Link to="/properties" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Private Viewing Guide</Link>
                        <a href="mailto:support@propvista.com" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Client Concierge</a>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-semibold text-white uppercase tracking-wider">Governance</span>
                        <Link to="/about" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Verified Listing Standards</Link>
                        <Link to="/about" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Privacy & Data Stewardship</Link>
                        <Link to="/about" className="text-xs text-[#8F8E88] hover:text-white transition-colors">Terms of Service</Link>
                    </div>

                </div>

                {/* Bottom Compliance Row */}
                <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <p className="text-xs text-[#8F8E88]">
                        &copy; {currentYear} Propvista Technologies. All rights reserved.
                    </p>
                    <p className="text-xs text-[#8F8E88] max-w-xl leading-relaxed">
                        Propvista is a luxury property discovery and private viewing platform adhering to fair housing and equal opportunity standards.
                    </p>
                </div>

            </div>
        </footer>
    );
};

export default DashboardFooter;
