import React, { useState } from "react";

const icons = {
    "Smart valuation engine": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12l3-3 4 4 4-5 4 3" /><path d="M3 20h18" /><path d="M3 4h18" />
        </svg>
    ),
    "1-click tour booking": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
    ),
    "Instant agent connect": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
    ),
    "Smart listing alerts": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 01-3.46 0" />
        </svg>
    ),
    "Secure document vault": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
        </svg>
    ),
    "End-to-end closing support": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
    ),
};

const items = [
    {
        title: "Smart valuation engine",
        content:
            "Before you book a viewing, know exactly what a property is worth. Our valuation engine cross-references live MLS data, recent comparable sales, and neighborhood price trends to give you an accurate estimate in seconds — so you never walk into an appointment blind.",
    },
    {
        title: "1-click tour booking",
        content:
            "Found a listing you love? Reserve a private showing or register for an open house instantly — no back-and-forth calls, no waiting on a callback. Your confirmed appointments sync directly to your calendar, with automated reminders sent before each visit.",
    },
    {
        title: "Instant agent connect",
        content:
            "Skip the call center. Every listing on Propvista is paired with a verified local specialist you can message directly from your dashboard. Ask questions, request adjustments to offers, or get guidance on next steps — all in one place, in real time.",
    },
    {
        title: "Smart listing alerts",
        content:
            "Save a search once, and we do the rest. Our indexing engine monitors pricing updates, new listings, and zoning changes across your target neighborhoods — notifying you the moment something matching your criteria hits the market, before most buyers even see it.",
    },
    {
        title: "Secure document vault",
        content:
            "Store and share pre-approval letters, escrow documents, and signed agreements inside an encrypted vault tied to your account. Every file is protected with military-grade cryptography and access-controlled, so sensitive paperwork never ends up in the wrong hands.",
    },
    {
        title: "End-to-end closing support",
        content:
            "From your first tour to the day you get the keys, Propvista keeps the process moving. Our platform handles digital form submissions, tracks outstanding steps in your closing checklist, and connects you with support around the clock if anything needs attention.",
    },
];

const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div
        className={`border rounded-xl mb-2 overflow-hidden transition-all duration-150 bg-white ${isOpen ? "border-gray-200" : "border-gray-100 hover:border-gray-200"
            }`}
    >
        <button
            type="button"
            onClick={onClick}
            className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors focus:outline-none"
        >
            <div className="flex items-center gap-3">
                <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? "bg-blue-50 text-blue-800" : "bg-gray-100 text-gray-500"
                        }`}
                >
                    {icons[title]}
                </div>
                <span className="text-sm font-medium text-gray-900">{title}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-blue-600" : "text-gray-400"
                    }`}
            >
                <path d="M6 9l6 6 6-6" />
            </svg>
        </button>

        {isOpen && (
            <div className="px-4 pb-4 pl-[52px]">
                <p className="text-xs leading-relaxed text-gray-500">{content}</p>
            </div>
        )}
    </div>
);

const WhatWeOffer = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (

        <div className="relative overflow-hidden max-w-7xl mx-auto mt-0 px-4 md:px-6 bg-gradient-to-tr from-slate-300 via-indigo-50/20 to-blue-200 py-12 rounded-2xl border border-slate-100">
           <div className="absolute -top-40 -right-40 w-96 h-96 bg-slate-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto ">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-medium tracking-tight text-gray-900">
                        Everything you need to close with confidence
                    </h2>
                    <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
                        Propvista brings your entire homebuying journey from first tour to final signature into one seamless platform.
                    </p>
                </div>

                <div>
                    {items.map((item, i) => (
                        <AccordionItem
                            key={i}
                            title={item.title}
                            content={item.content}
                            isOpen={openIndex === i}
                            onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        />
                    ))}
                </div>
            </div>


        </div>
    );
};

export default WhatWeOffer;