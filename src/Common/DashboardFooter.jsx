import React from 'react';

const DashboardFooter = () => {
    const currentYear = new Date().getFullYear();

    return (
        /* 
          1. Changed 'bg-white' to a high-end subtle gradient layout.
          2. Adjusted padding and borders to elevate the layout layers.
        */
        <footer className="mt-1 border-t border-slate-200/60 bg-gradient-to-b from-slate-100 via-white to-blue-500/30 font-sans antialiased">
            <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">

                {/* 4-Column Directory Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200/60">

                    {/* Column 1: Marketplace Links */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">Marketplace</span>
                        <a href="/properties" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Browse Properties</a>
                        <a href="/saved-searches" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Saved Searches</a>
                        <a href="/market-reports" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Market Reports</a>
                        <a href="/valuation" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Instant Valuation</a>
                    </div>

                    {/* Column 2: Transactions Links */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">Transactions</span>
                        <a href="/vault" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Secure Document Vault</a>
                        <a href="/pre-approval" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Pre-Approval Status</a>
                        <a href="/agent-match" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Connect with Advisors</a>
                    </div>

                    {/* Column 3: Platform Resources */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">Resources</span>
                        <a href="#support" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Platform Support Hub</a>
                        <a href="/knowledge-base" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Buyer & Seller Guides</a>
                        <a href="/api-docs" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Developer API</a>
                        <a href="/system-status" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">System Status</a>
                    </div>

                    {/* Column 4: Legal Links */}
                    <div className="flex flex-col gap-3">
                        <span className="text-xs font-bold text-slate-900 tracking-wider uppercase">Legal Room</span>
                        <a href="#privacy" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Privacy Shield Policy</a>
                        <a href="#terms" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Terms of Operations</a>
                        <a href="#mls" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">MLS Compliance Guide</a>
                        <a href="/licenses" className="text-xs text-gray-500 hover:text-blue-600 transition-colors">Brokerage Licenses</a>
                    </div>

                </div>

                <div className="pt-8 flex flex-col md:flex-row md:items-start md:justify-between gap-6">

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-extrabold text-slate-900 tracking-tight">Propvista</span>
                        </div>
                        <p className="text-xs text-gray-400">
                            &copy; {currentYear} Propvista Technologies, Inc. All rights reserved.
                        </p>
                    </div>

                    {/* Real Estate Compliance Disclaimer */}
                    <div className="max-w-md">
                        <p className="text-[10px] text-gray-400 leading-relaxed font-normal">
                            Propvista is a digital real estate platform and licensed brokerage entity fully adhering to the principles of the Fair Housing Act and Equal Opportunity guidelines. Real Estate listings data provided via integrated IDX feeds are sourced reliably from localized MLS registries, but all indices should be independently verified for situational closing accuracy.
                        </p>
                    </div>

                </div>

            </div>
        </footer>
    );
};

export default DashboardFooter;