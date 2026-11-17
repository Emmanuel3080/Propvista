import React from "react";

/**
 * Reusable Propvista Brand Identity Component
 * Combines a geometric architectural skyline/roofline symbol with the
 * Fraunces editorial wordmark.
 *
 * @param {Object} props
 * @param {"dark" | "light"} [props.variant="dark"] - "dark" for light backgrounds (#F9F8F6 / #FFFFFF), "light" for dark backgrounds (#161817)
 * @param {"sm" | "md" | "lg"} [props.size="md"] - Controls responsive sizing of the mark and wordmark
 * @param {boolean} [props.symbolOnly=false] - Renders only the standalone geometric architectural mark
 * @param {string} [props.className=""] - Optional wrapper classes
 */
const PropvistaLogo = ({
    variant = "dark",
    size = "md",
    symbolOnly = false,
    className = "",
}) => {
    const isLight = variant === "light";

    const sizeConfig = {
        sm: {
            iconBox: "w-8 h-8",
            wordmark: "text-xl sm:text-[1.35rem]",
            gap: "gap-2.5",
        },
        md: {
            iconBox: "w-9 h-9 sm:w-10 sm:h-10",
            wordmark: "text-2xl sm:text-[1.65rem]",
            gap: "gap-3",
        },
        lg: {
            iconBox: "w-10 h-10 sm:w-11 sm:h-11",
            wordmark: "text-2xl sm:text-3xl",
            gap: "gap-3.5",
        },
    }[size] || {
        iconBox: "w-9 h-9 sm:w-10 sm:h-10",
        wordmark: "text-2xl sm:text-[1.65rem]",
        gap: "gap-3",
    };

    return (
        <span
            className={`inline-flex items-center ${sizeConfig.gap} select-none ${className}`}
        >
            {/* Geometric Architectural Symbol */}
            <svg
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={`${sizeConfig.iconBox} shrink-0 transition-transform duration-300 group-hover:scale-[1.03]`}
            >
                {/* Primary Architectural Monolith Container */}
                <rect
                    width="40"
                    height="40"
                    rx="9"
                    fill="#1E3A34"
                    stroke={isLight ? "#F9F8F6" : "#1E3A34"}
                    strokeOpacity={isLight ? "0.22" : "0"}
                    strokeWidth="1"
                />
                {/* Inner Structural Frame */}
                <rect
                    x="3.25"
                    y="3.25"
                    width="33.5"
                    height="33.5"
                    rx="6.25"
                    stroke="#F9F8F6"
                    strokeOpacity="0.16"
                    strokeWidth="1"
                />
                {/* Left Ascending Tower & Pitched Roofline */}
                <path
                    d="M10 30V15.5L20 9.5V30H16.5V17.8L13.5 19.6V30H10Z"
                    fill="#F9F8F6"
                />
                {/* Right Cantilevered Architectural Wing */}
                <path
                    d="M20 9.5L30 15.5V30H26.5V17.6L20 13.7V9.5Z"
                    fill="#F9F8F6"
                    fillOpacity="0.78"
                />
                {/* Warm Terracotta Portal Accent */}
                <polygon points="20,18.5 24.5,21.2 24.5,30 20,30" fill="#C86D51" />
                {/* Architectural Horizon Base */}
                <rect
                    x="8"
                    y="29.5"
                    width="24"
                    height="1.5"
                    rx="0.75"
                    fill="#F9F8F6"
                />
            </svg>

            {/* Fraunces Editorial Wordmark */}
            {!symbolOnly && (
                <span className="inline-flex items-baseline gap-1">
                    <span
                        className={`font-serif-editorial ${sizeConfig.wordmark} font-semibold tracking-[-0.025em] leading-none ${
                            isLight ? "text-[#FFFFFF]" : "text-[#1E3A34]"
                        }`}
                    >
                        Propvista
                    </span>
                    {/* <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] shrink-0" /> */}
                </span>
            )}
        </span>
    );
};

export default PropvistaLogo;
