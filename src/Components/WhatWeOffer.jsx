import React, { useState } from "react";
import { ChevronDown, Compass, Calendar, MessageSquare, Bell, Lock, CheckCircle2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LUXURY_EASE } from "../utils/motion";

const items = [
    {
        title: "Curated architectural discovery",
        icon: Compass,
        content:
            "Every residence on Propvista is presented with clean architectural photography, verified specifications, and transparent pricing—allowing you to evaluate spaces with clarity before scheduling an in-person visit.",
    },
    {
        title: "Direct viewing slot reservation",
        icon: Calendar,
        content:
            "Select from real viewing dates and time slots published directly by the listing agent. Submit your request in moments without phone tag or unreturned inquiries.",
    },
    {
        title: "Direct listing agent connection",
        icon: MessageSquare,
        content:
            "Every property page connects you straight to the responsible agent and agency, complete with verified telephone and email contact channels for immediate inquiries.",
    },
    {
        title: "Personal saved collection",
        icon: Bell,
        content:
            "Curate your own shortlist of residences as you browse. Compare architectural styles, locations, and viewing schedules from your Saved Properties collection at any time.",
    },
    {
        title: "Verified property listings",
        icon: Lock,
        content:
            "Every residence in the directory is vetted for accuracy so that availability calendars, pricing, and property specifications remain reliable.",
    },
    {
        title: "Streamlined appointment confirmation",
        icon: CheckCircle2,
        content:
            "Once your viewing request is submitted, you receive prompt confirmation details for your scheduled walkthrough.",
    },
];

const AccordionItem = ({ title, content, iconElement, isOpen, onClick }) => (
    <div
        className={`border rounded-[12px] transition-colors duration-200 bg-white overflow-hidden ${
            isOpen ? "border-[#1E3A34]" : "border-[#E4E2DC] hover:border-[#8F8E88]"
        }`}
    >
        <button
            type="button"
            onClick={onClick}
            aria-expanded={isOpen}
            className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus:outline-none"
        >
            <div className="flex items-center gap-3.5">
                <div
                    className={`w-9 h-9 rounded-[8px] flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                            ? "bg-[#1E3A34] text-white"
                            : "bg-[#F1EFEA] text-[#5C5C58]"
                    }`}
                >
                    {iconElement}
                </div>
                <span className="font-serif-editorial text-base sm:text-lg font-medium text-[#1A1A1A]">
                    {title}
                </span>
            </div>
            <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.24, ease: LUXURY_EASE }}
                className={`shrink-0 inline-flex ${
                    isOpen ? "text-[#1E3A34]" : "text-[#8F8E88]"
                }`}
            >
                <ChevronDown size={18} />
            </motion.span>
        </button>

        <AnimatePresence initial={false}>
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.26, ease: LUXURY_EASE }}
                    className="overflow-hidden"
                >
                    <div className="px-5 pb-5 pl-[4.25rem]">
                        <p className="text-xs sm:text-sm leading-relaxed text-[#5C5C58] max-w-[68ch]">
                            {content}
                        </p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const WhatWeOffer = () => {
    const [openIndex, setOpenIndex] = useState(0);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, ease: LUXURY_EASE }}
                className="bg-[#F1EFEA] border border-[#E4E2DC] rounded-[12px] p-6 sm:p-10 lg:p-14"
            >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    <div className="lg:col-span-5 space-y-4">
                        <span className="type-micro-badge text-[#8F8E88]">
                            Platform Capabilities
                        </span>
                        <h2 className="type-section-heading text-[#1A1A1A]">
                            Everything you need to discover and view with confidence.
                        </h2>
                        <p className="type-body text-[#5C5C58]">
                            Propvista brings your entire property discovery and private viewing experience into one calm, architectural environment.
                        </p>
                    </div>

                    <div className="lg:col-span-7 space-y-3">
                        {items.map((item, i) => {
                            const IconComp = item.icon;
                            return (
                                <AccordionItem
                                    key={item.title}
                                    title={item.title}
                                    content={item.content}
                                    iconElement={<IconComp size={16} />}
                                    isOpen={openIndex === i}
                                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                />
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default WhatWeOffer;
