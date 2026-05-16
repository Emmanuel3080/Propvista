import React from 'react';
import bg from "../assets/Background2.jpg"

const AgentMatchRoadmap = () => {
    const steps = [
        {
            id: '01',
            title: 'Get pre-approved',
            description: 'Know your buying power before touring. It strengthens your position when making an offer.',
            tag: 'Financial'
        },
        {
            id: '02',
            title: 'Schedule a viewing',
            description: 'Use our 1-click booking to reserve private tours or attend upcoming open houses.',
            tag: 'Tours'
        },
        {
            id: '03',
            title: 'Make an offer',
            description: 'When you find the one, your assigned agent will handle negotiations and paperwork.',
            tag: 'Closing'
        },
    ];

    return (
        <section
            className="relative mt-5 flex flex-col gap-6 lg:flex-row items-stretch font-sans antialiased py-20 px-6 md:px-3 rounded-3xl overflow-hidden bg-slate-200 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bg})` }}
        >

            {/* Left: Steps Panel (Fancy Soft Mesh Gradient background over image overlay) */}
            <div className="relative z-10 flex-[2] flex flex-col gap-5 rounded-2xl border border-white/1 bg-white/30 backdrop-blur-md p-6 shadow-xl md:p-8">
                <div>
                    <h2 className="text-base font-bold text-gray-900 tracking-tight">Your homebuying roadmap</h2>
                    <p className="mt-1 text-xs text-gray-600 font-medium">Three milestones to unlock your dream home.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {steps.map((step) => (
                        <div
                            key={step.id}
                            className="flex flex-col gap-3 p-4 bg-white/95 border border-gray-100/80 rounded-xl hover:border-blue-300 hover:shadow-lg hover:shadow-blue-950/10 transition-all duration-300 group"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-bold bg-blue-50 text-blue-700 px-2.5 py-0.5 rounded-full tracking-wide">
                                    Step {step.id}
                                </span>
                                <span className="text-[10px] uppercase font-semibold tracking-wider text-gray-400">
                                    {step.tag}
                                </span>
                            </div>

                            {/* Milestone Dot/Line decoration */}
                            <div className="flex items-center gap-2 my-0.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 ring-4 ring-blue-50 flex-shrink-0 group-hover:scale-110 transition-transform" />
                                <div className="flex-1 h-px bg-gray-100" />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">{step.title}</p>
                                <p className="text-xs leading-relaxed text-gray-500 font-medium">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 flex-1 flex flex-col justify-between bg-gradient-to-b from-slate-900/95 to-indigo-950/95 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl gap-6 overflow-hidden">
              
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                <div>
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-400 bg-blue-500/20 border border-blue-500/30 px-3 py-1 rounded-full tracking-wide">
                    Local expert match
                    </span>
                    <h3 className="mt-4 text-base font-bold text-white tracking-tight">Ready to take action?</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-300">
                        Connect with our top-rated neighborhood expert for a free, no-obligation consultation.
                    </p>
                </div>

                <div>
                    {/* Dark Card Border Separator */}
                    <div className="flex items-center gap-3 pt-5 border-t border-slate-800">
                        <div className="relative w-9 h-9 flex-shrink-0">
                            <div className="w-full h-full rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[11px] font-bold tracking-wider text-blue-400 shadow-inner">
                                PV
                            </div>
                            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-pulse" />
                        </div>

                        <div>
                            <p className="text-xs font-semibold text-slate-100 tracking-wide">Propvista Expert</p>
                            <p className="text-[11px] text-slate-400 mt-0.5">
                                <span className="text-amber-400 font-sans">★</span> 4.9 · 120+ homes closed
                            </p>
                        </div>
                    </div>

                    {/* Functional Premium Action Button Navigation */}
                    <a
                        href="mailto:support@propvista.com?subject=Real Estate Consultation Request&body=Hi Propvista Team,%0D%0A%0D%0AI would like to schedule a consultation regarding my saved properties."
                        className="mt-4 block w-full text-center rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-[0.98] py-2.5 text-xs font-semibold text-white transition-all shadow-md shadow-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                    >
                        Email Advisor Instantly
                    </a>
                </div>
            </div>

        </section>
    );
};

export default AgentMatchRoadmap;