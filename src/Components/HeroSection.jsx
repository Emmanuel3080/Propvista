import React from 'react';
import bg1 from "../assets/Background4.jpg";

const HeroSection = () => {
    return (
        <section className="relative h-120 w-full flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img
                    src={bg1}
                    alt="Background"
                    className="w-full h-120  object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-slate-900/70 via-slate-900/40 to-transparent"></div>
            </div>
            <div className="relative z-10 w-full max-w-6xl px-1 pt-32 pb-20 text-center lg:text-left flex flex-col items-center lg:items-start">

                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                        Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-tr from-slate-400 to-emerald-300">Propvista</span>
                    </h1>

                    <p className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-200 leading-relaxed">
                        Discover the future of property management and investment. We bridge the gap between your vision and the perfect space.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                        <button className="px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl shadow-emerald-500/20 cursor-pointer">
                            Explore Properties
                        </button>
                        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-md border border-white/30 transition-all cursor-pointer">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-50 to-transparent"></div>
        </section>
    );
};

export default HeroSection;