import React from 'react';
import { ArrowUpRight, ShieldCheck, CalendarCheck, Handshake } from 'lucide-react';
import { motion } from 'framer-motion';
import bg from "../assets/Background2.jpg";
import { LUXURY_EASE, staggerContainer, fadeUpItem } from '../utils/motion';

const AgentMatchRoadmap = () => {
    const steps = [
        {
            id: '01',
            title: 'Discover Curated Residences',
            description: 'Explore verified architectural listings with transparent pricing, high-resolution imagery, and direct advisor credentials.',
            tag: 'Discovery',
            icon: ShieldCheck,
        },
        {
            id: '02',
            title: 'Reserve a Private Viewing',
            description: 'Select an available date and time directly from the listing calendar to request a private tour with no back-and-forth calls.',
            tag: 'Scheduling',
            icon: CalendarCheck,
        },
        {
            id: '03',
            title: 'Acquire with Confidence',
            description: 'Consult directly with the listing advisor during your viewing to discuss terms, documentation, and closing timelines.',
            tag: 'Advisory',
            icon: Handshake,
        },
    ];

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* Left: Editorial Roadmap */}
                <motion.div
                    variants={staggerContainer(0.08, 0.04)}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.18 }}
                    className="lg:col-span-8 bg-[#F1EFEA] border border-[#E4E2DC] rounded-[12px] p-6 sm:p-10 flex flex-col justify-between space-y-8"
                >
                    <motion.div variants={fadeUpItem(12, 0.42)} className="space-y-2 max-w-xl">
                        <span className="type-micro-badge text-[#8F8E88]">
                            The Propvista Process
                        </span>
                        <h2 className="type-section-heading text-[#1A1A1A]">
                            A deliberate approach to private property viewings.
                        </h2>
                        <p className="type-body text-[#5C5C58]">
                            Three seamless stages from initial discovery to your private architectural walkthrough.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {steps.map((step) => {
                            const IconComponent = step.icon;
                            return (
                                <motion.div
                                    key={step.id}
                                    variants={fadeUpItem(14, 0.42)}
                                    whileHover={{ y: -3, transition: { duration: 0.22, ease: LUXURY_EASE } }}
                                    className="bg-white border border-[#E4E2DC] rounded-[12px] p-5 flex flex-col justify-between space-y-5 transition-colors hover:border-[#1E3A34]/40"
                                >
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-semibold text-[#1E3A34] px-2.5 py-1 rounded-full bg-[#F1EFEA] tabular-nums">
                                            Step {step.id}
                                        </span>
                                        <span className="text-[11px] uppercase tracking-wider text-[#8F8E88] font-medium">
                                            {step.tag}
                                        </span>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="w-8 h-8 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] flex items-center justify-center text-[#1E3A34]">
                                            <IconComponent size={16} />
                                        </div>
                                        <h3 className="font-serif-editorial text-lg font-medium text-[#1A1A1A]">
                                            {step.title}
                                        </h3>
                                        <p className="text-xs text-[#5C5C58] leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Right: Dark Architectural Advisory Card */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.18 }}
                    transition={{ duration: 0.46, delay: 0.1, ease: LUXURY_EASE }}
                    className="lg:col-span-4 relative rounded-[12px] overflow-hidden bg-[#161817] text-[#F9F8F6] border border-[#E4E2DC]/20 p-6 sm:p-8 flex flex-col justify-between min-h-[340px]"
                >
                    <img
                        src={bg}
                        alt="Architectural interior"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#161817] via-[#161817]/85 to-[#161817]/60" />

                    <div className="relative z-10 space-y-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-medium text-[#F9F8F6]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]" />
                            Private Client Concierge
                        </span>

                        <h3 className="font-serif-editorial text-2xl sm:text-3xl font-normal text-white leading-snug">
                            Speak with a dedicated property advisor.
                        </h3>

                        <p className="text-xs sm:text-sm text-[#F1EFEA]/80 leading-relaxed">
                            Connect with our neighborhood specialists for bespoke portfolio recommendations and private viewing coordination.
                        </p>
                    </div>

                    <div className="relative z-10 pt-6 mt-6 border-t border-white/10 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#1E3A34] border border-white/20 flex items-center justify-center font-serif-editorial text-sm font-semibold text-white">
                                PV
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white">Propvista Advisory Desk</p>
                                <p className="text-[11px] text-[#8F8E88]">
                                    Verified Agency Network • Direct Scheduling
                                </p>
                            </div>
                        </div>

                        <motion.a
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.98 }}
                            href="mailto:support@propvista.com?subject=Private%20Real%20Estate%20Consultation&body=Hello%20Propvista%20Advisory%20Team,%0D%0A%0D%0AI%20would%20like%20to%20request%20a%20consultation%20regarding%20available%20residences."
                            className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors"
                        >
                            <span>Request Private Consultation</span>
                            <ArrowUpRight size={14} />
                        </motion.a>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default AgentMatchRoadmap;
