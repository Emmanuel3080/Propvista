import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, Banknote, BedDouble, RotateCcw } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import bg1 from "../assets/Background4.jpg";
import { propertyContext } from '../Contexts/PropertyContext';
import { PROPERTY_TYPE_OPTIONS, PRICE_RANGE_OPTIONS } from '../utils/propertyFilter';
import { LUXURY_EASE, staggerContainer, fadeUpItem } from '../utils/motion';

const HeroSection = ({ onScrollToResults }) => {
    const { searchFilters, setSearchFilters, resetSearchFilters } = useContext(propertyContext);
    const navigate = useNavigate();

    const updateFilter = (key, value) => {
        setSearchFilters?.((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onScrollToResults) {
            onScrollToResults();
        } else {
            navigate("/properties");
        }
    };

    const activeFilterCount = [
        Boolean(searchFilters?.locationQuery?.trim()),
        searchFilters?.propertyType !== "all",
        searchFilters?.priceRange !== "all",
        searchFilters?.minBedrooms !== "any",
    ].filter(Boolean).length;

    return (
        <section className="relative w-full overflow-hidden bg-[#161817]">
            {/* Hero Architectural Photograph */}
            <div className="relative min-h-[560px] lg:min-h-[620px] w-full flex flex-col justify-between">
                <div className="absolute inset-0 z-0 overflow-hidden">
                    <motion.img
                        src={bg1}
                        alt="Contemporary architectural residence"
                        fetchPriority="high"
                        initial={{ scale: 1.05, opacity: 0.82 }}
                        animate={{ scale: 1.01, opacity: 1 }}
                        transition={{ duration: 0.58, ease: LUXURY_EASE }}
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#161817]/70 via-[#161817]/55 to-[#161817]/85" />
                </div>

                {/* Editorial Hero Copy — Staggered Entrance */}
                <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-12">
                    <motion.div
                        variants={staggerContainer(0.1, 0.05)}
                        initial="hidden"
                        animate="visible"
                        className="max-w-3xl space-y-5"
                    >
                        <motion.h1
                            variants={fadeUpItem(16, 0.48)}
                            className="type-hero text-white"
                        >
                            Spaces designed for how you live.
                        </motion.h1>

                        <motion.p
                            variants={fadeUpItem(14, 0.45)}
                            className="type-body text-[#F1EFEA]/90 max-w-[54ch]"
                        >
                            Discover exceptional properties and find a place that feels like yours.
                        </motion.p>
                    </motion.div>
                </div>

                {/* Floating Glassmorphic Search Interface — 4 Core Filters: Location, Property Type, Price Range, Bedrooms */}
                <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
                    <motion.form
                        onSubmit={handleSearchSubmit}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.18, ease: LUXURY_EASE }}
                        className="font-sans-ui bg-white/95 backdrop-blur-xl border border-[#E4E2DC] rounded-[12px] p-4 sm:p-6 shadow-[0_24px_60px_-15px_rgba(22,24,23,0.35)] text-[#1A1A1A]"
                    >
                        <motion.div
                            variants={staggerContainer(0.06, 0.22)}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3.5 sm:gap-4 items-end"
                        >
                            {/* 1. Location */}
                            <motion.div variants={fadeUpItem(10, 0.36)} className="lg:col-span-3">
                                <label
                                    htmlFor="hero-location-search"
                                    className="block type-micro-badge text-[#5C5C58] mb-2"
                                >
                                    Location
                                </label>
                                <div className="relative">
                                    <MapPin
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                    />
                                    <input
                                        id="hero-location-search"
                                        type="text"
                                        value={searchFilters?.locationQuery || ""}
                                        onChange={(e) => updateFilter("locationQuery", e.target.value)}
                                        placeholder="City, neighborhood, or title..."
                                        enterKeyHint="search"
                                        className="w-full h-11 pl-10 pr-3.5 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] placeholder:text-[#8F8E88] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                    />
                                </div>
                            </motion.div>

                            {/* 2. Property Type */}
                            <motion.div variants={fadeUpItem(10, 0.36)} className="lg:col-span-3">
                                <label
                                    htmlFor="hero-property-type"
                                    className="block type-micro-badge text-[#5C5C58] mb-2"
                                >
                                    Property Type
                                </label>
                                <div className="relative">
                                    <Home
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                    />
                                    <select
                                        id="hero-property-type"
                                        value={searchFilters?.propertyType || "all"}
                                        onChange={(e) => updateFilter("propertyType", e.target.value)}
                                        className="w-full h-11 pl-10 pr-8 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors cursor-pointer"
                                    >
                                        {PROPERTY_TYPE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>

                            {/* 3. Price Range */}
                            <motion.div variants={fadeUpItem(10, 0.36)} className="lg:col-span-3">
                                <label
                                    htmlFor="hero-price-range"
                                    className="block type-micro-badge text-[#5C5C58] mb-2"
                                >
                                    Price Range
                                </label>
                                <div className="relative">
                                    <Banknote
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                    />
                                    <select
                                        id="hero-price-range"
                                        value={searchFilters?.priceRange || "all"}
                                        onChange={(e) => updateFilter("priceRange", e.target.value)}
                                        className="w-full h-11 pl-10 pr-8 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors cursor-pointer tabular-nums"
                                    >
                                        {PRICE_RANGE_OPTIONS.map((opt) => (
                                            <option key={opt.value} value={opt.value}>
                                                {opt.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </motion.div>

                            {/* 4. Bedrooms */}
                            <motion.div variants={fadeUpItem(10, 0.36)} className="lg:col-span-2">
                                <label
                                    htmlFor="hero-min-bedrooms"
                                    className="block type-micro-badge text-[#5C5C58] mb-2"
                                >
                                    Bedrooms
                                </label>
                                <div className="relative">
                                    <BedDouble
                                        size={16}
                                        className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                    />
                                    <select
                                        id="hero-min-bedrooms"
                                        value={searchFilters?.minBedrooms || "any"}
                                        onChange={(e) => updateFilter("minBedrooms", e.target.value)}
                                        className="w-full h-11 pl-10 pr-6 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors cursor-pointer tabular-nums"
                                    >
                                        <option value="any">Any</option>
                                        <option value="1">1+ Bed</option>
                                        <option value="2">2+ Beds</option>
                                        <option value="3">3+ Beds</option>
                                        <option value="4">4+ Beds</option>
                                        <option value="5">5+ Beds</option>
                                    </select>
                                </div>
                            </motion.div>

                            {/* Search CTA */}
                            <motion.div
                                variants={fadeUpItem(10, 0.36)}
                                className="sm:col-span-2 lg:col-span-1 flex items-center gap-2"
                            >
                                <motion.button
                                    type="submit"
                                    whileHover={{ y: -1 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={{ duration: 0.2, ease: LUXURY_EASE }}
                                    className="w-full h-11 px-4 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                    aria-label="Search Properties"
                                >
                                    <Search size={16} />
                                    <span className="lg:hidden">Search Properties</span>
                                </motion.button>
                            </motion.div>
                        </motion.div>

                        <AnimatePresence initial={false}>
                            {activeFilterCount > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, y: -6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -6 }}
                                    transition={{ duration: 0.22, ease: LUXURY_EASE }}
                                    className="mt-3 pt-3 border-t border-[#E4E2DC] flex items-center justify-end"
                                >
                                    <motion.button
                                        type="button"
                                        whileTap={{ scale: 0.96 }}
                                        onClick={resetSearchFilters}
                                        className="inline-flex items-center gap-1.5 type-micro-badge text-[#C86D51] hover:underline cursor-pointer tabular-nums"
                                    >
                                        <RotateCcw size={12} />
                                        <span>Clear Filters ({activeFilterCount})</span>
                                    </motion.button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
