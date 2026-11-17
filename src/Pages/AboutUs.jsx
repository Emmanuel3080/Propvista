import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CalendarCheck, Compass, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from '../Common/Header';
import DashboardFooter from '../Common/DashboardFooter';
import bg2 from '../assets/Background2.jpg';
import { LUXURY_EASE, staggerContainer, fadeUpItem } from '../utils/motion';

const stats = [
    { value: "500+", label: "Properties Listed" },
    { value: "1,200+", label: "Appointments Booked" },
    { value: "150+", label: "Verified Agents" },
    { value: "98%", label: "Client Satisfaction" },
];

const values = [
    {
        icon: ShieldCheck,
        title: "Trust First",
        description: "Every agent is verified and every listing is checked before it goes live in our architectural directory.",
    },
    {
        icon: CalendarCheck,
        title: "Effortless Booking",
        description: "Schedule a private viewing in seconds — no phone tag, no back-and-forth emails, just direct calendar access.",
    },
    {
        icon: Compass,
        title: "Transparent Process",
        description: "Clear availability windows, direct advisor credentials, and no hidden friction from discovery to walkthrough.",
    },
];

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Editorial Hero Banner */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-16 lg:pt-20 lg:pb-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
                        <motion.div
                            variants={staggerContainer(0.08, 0.04)}
                            initial="hidden"
                            animate="visible"
                            className="lg:col-span-7 space-y-6"
                        >
                            <motion.span
                                variants={fadeUpItem(12, 0.4)}
                                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F1EFEA] border border-[#E4E2DC] type-micro-badge text-[#5C5C58]"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51]" />
                                Editorial & Philosophy
                            </motion.span>

                            <motion.h1
                                variants={fadeUpItem(14, 0.45)}
                                className="type-hero text-[#1A1A1A]"
                            >
                                Making architectural property viewings effortless.
                            </motion.h1>

                            <motion.p
                                variants={fadeUpItem(14, 0.45)}
                                className="type-body text-[#5C5C58] max-w-[65ch]"
                            >
                                Propvista connects discerning buyers and renters directly with verified real estate advisors, removing the friction of scheduling private property viewings. No phone tag, no delayed replies — simply select an available window and reserve your tour.
                            </motion.p>

                            <motion.p
                                variants={fadeUpItem(14, 0.45)}
                                className="type-body text-[#5C5C58] max-w-[65ch]"
                            >
                                We built Propvista because discovering a home should feel calm and deliberate. From exploring architectural residences to scheduling your private walkthrough, our platform keeps every step transparent, fast, and direct.
                            </motion.p>

                            <motion.div
                                variants={fadeUpItem(12, 0.4)}
                                className="pt-2 flex flex-wrap items-center gap-3"
                            >
                                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        to="/properties"
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs sm:text-sm font-semibold transition-colors"
                                    >
                                        <span>Explore Residences</span>
                                        <ArrowUpRight size={15} />
                                    </Link>
                                </motion.div>
                                <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                                    <Link
                                        to="/saved"
                                        className="inline-flex items-center gap-2 px-5 py-3 rounded-[8px] bg-white border border-[#E4E2DC] hover:border-[#1E3A34] text-[#1A1A1A] text-xs sm:text-sm font-semibold transition-colors"
                                    >
                                        <span>View Saved Properties</span>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.14, ease: LUXURY_EASE }}
                            className="lg:col-span-5"
                        >
                            <div className="relative rounded-[12px] overflow-hidden border border-[#E4E2DC] bg-[#F1EFEA] aspect-[4/5] shadow-md">
                                <img
                                    src={bg2}
                                    alt="Architectural residence interior"
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#161817]/60 via-transparent to-transparent" />
                                <div className="absolute bottom-5 left-5 right-5 p-4 rounded-[12px] bg-white/95 backdrop-blur-md border border-[#E4E2DC]">
                                    <p className="font-serif-editorial text-sm text-[#1A1A1A]">
                                        “Architecture is a visual art, and the buildings speak for themselves.”
                                    </p>
                                    <p className="text-[11px] uppercase tracking-wider text-[#8F8E88] mt-1 font-semibold">
                                        Propvista Curatorial Standard
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Metrics Strip */}
                <section className="bg-[#F1EFEA] border-y border-[#E4E2DC] py-14">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div
                            variants={staggerContainer(0.08, 0.04)}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.25 }}
                            className="grid grid-cols-2 md:grid-cols-4 gap-8"
                        >
                            {stats.map((stat) => (
                                <motion.div
                                    key={stat.label}
                                    variants={fadeUpItem(12, 0.4)}
                                    className="space-y-1"
                                >
                                    <p className="font-sans-ui text-3xl sm:text-4xl font-semibold text-[#1E3A34] tabular-nums tracking-[-0.02em]">
                                        {stat.value}
                                    </p>
                                    <p className="text-xs sm:text-sm font-medium text-[#5C5C58]">
                                        {stat.label}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </section>

                {/* Core Principles */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 space-y-10">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.25 }}
                        transition={{ duration: 0.42, ease: LUXURY_EASE }}
                        className="max-w-xl space-y-2"
                    >
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F8E88]">
                            Foundational Principles
                        </span>
                        <h2 className="font-serif-editorial text-3xl font-normal text-[#1A1A1A]">
                            Built around clarity, trust, and respect for your time.
                        </h2>
                    </motion.div>

                    <motion.div
                        variants={staggerContainer(0.08, 0.04)}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {values.map((value) => {
                            const Icon = value.icon;
                            return (
                                <motion.div
                                    key={value.title}
                                    variants={fadeUpItem(14, 0.42)}
                                    whileHover={{ y: -4, transition: { duration: 0.24, ease: LUXURY_EASE } }}
                                    className="bg-white border border-[#E4E2DC] hover:border-[#1E3A34]/50 rounded-[12px] p-7 space-y-4 transition-colors"
                                >
                                    <div className="w-10 h-10 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] flex items-center justify-center text-[#1E3A34]">
                                        <Icon size={18} />
                                    </div>
                                    <h3 className="font-serif-editorial text-xl font-medium text-[#1A1A1A]">
                                        {value.title}
                                    </h3>
                                    <p className="text-sm text-[#5C5C58] leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </section>
            </main>

            <DashboardFooter />
        </div>
    );
};

export default AboutUs;
