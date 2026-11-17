import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
    MapPin,
    Home,
    Banknote,
    BedDouble,
    Heart,
    RotateCcw,
    Building2,
    X,
    SlidersHorizontal,
    ChevronDown,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../Common/Header';
import DashboardFooter from '../Common/DashboardFooter';
import { propertyContext } from '../Contexts/PropertyContext';
import PropertyCard from '../Components/PropertyCard';
import {
    CATEGORY_PILLS,
    PROPERTY_TYPE_OPTIONS,
    PRICE_RANGE_OPTIONS,
    filterAndSortProperties,
} from '../utils/propertyFilter';
import { LUXURY_EASE, staggerContainer, fadeUpItem } from '../utils/motion';

const AllPropperties = ({ savedOnlyDefault = false }) => {
    const {
        fetchProperties,
        loadProperty,
        property,
        searchFilters,
        setSearchFilters,
        resetSearchFilters,
        savedIds,
    } = useContext(propertyContext);

    const [searchParams, setSearchParams] = useSearchParams();
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(true);

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Synchronize URL query parameters or /saved route into filter state
    useEffect(() => {
        const categoryParam = searchParams.get("category");
        const savedParam = searchParams.get("saved");

        setSearchFilters?.((prev) => ({
            ...prev,
            category: categoryParam || prev.category,
            savedOnly: savedOnlyDefault || savedParam === "true" ? true : false,
        }));
    }, [searchParams, savedOnlyDefault, setSearchFilters]);

    const updateFilter = (key, value) => {
        setSearchFilters?.((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleClearAll = () => {
        resetSearchFilters?.();
        if (searchParams.toString()) {
            setSearchParams({});
        }
    };

    const filteredProperties = useMemo(
        () => filterAndSortProperties(property, searchFilters, savedIds),
        [property, searchFilters, savedIds]
    );

    const isViewingSaved = Boolean(savedOnlyDefault || searchFilters?.savedOnly);

    const activePills = [];
    if (searchFilters?.locationQuery?.trim()) {
        activePills.push({
            key: "locationQuery",
            label: `Location: ${searchFilters.locationQuery.trim()}`,
            resetValue: "",
        });
    }
    if (searchFilters?.propertyType && searchFilters.propertyType !== "all") {
        activePills.push({
            key: "propertyType",
            label: `Type: ${searchFilters.propertyType}`,
            resetValue: "all",
        });
    }
    if (searchFilters?.priceRange && searchFilters.priceRange !== "all") {
        const priceObj = PRICE_RANGE_OPTIONS.find((o) => o.value === searchFilters.priceRange);
        activePills.push({
            key: "priceRange",
            label: priceObj?.label || searchFilters.priceRange,
            resetValue: "all",
        });
    }
    if (searchFilters?.minBedrooms && searchFilters.minBedrooms !== "any") {
        activePills.push({
            key: "minBedrooms",
            label: `${searchFilters.minBedrooms}+ Beds`,
            resetValue: "any",
        });
    }

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col">
            <Header />

            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20 space-y-8">
                {/* Editorial Page Header */}
                <motion.div
                    variants={staggerContainer(0.08, 0.02)}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#E4E2DC]"
                >
                    <motion.div variants={fadeUpItem(12, 0.4)} className="space-y-2">
                        <span className="type-micro-badge text-[#8F8E88]">
                            {isViewingSaved ? "Personal Shortlist" : "Unified Property Discovery"}
                        </span>
                        <h1 className="type-property-title text-[#1A1A1A]">
                            {isViewingSaved ? "Saved Properties" : "All Properties"}
                        </h1>
                        <p className="type-body text-[#5C5C58] max-w-xl">
                            {isViewingSaved
                                ? "Properties you have bookmarked for private review and viewing appointments."
                                : "Explore all verified properties in one unified directory and schedule private viewings directly."}
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUpItem(12, 0.4)}
                        className="flex items-center gap-3 self-start md:self-end"
                    >
                        <div className="bg-white border border-[#E4E2DC] rounded-[12px] px-5 py-3 text-right">
                            <p className="type-micro-badge text-[#8F8E88]">
                                {isViewingSaved ? "Saved Properties" : "Available Properties"}
                            </p>
                            <p className="font-sans-ui text-2xl font-semibold text-[#1A1A1A] tabular-nums mt-1">
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.span
                                        key={filteredProperties.length}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -4 }}
                                        transition={{ duration: 0.18, ease: LUXURY_EASE }}
                                        className="inline-block"
                                    >
                                        {filteredProperties.length}
                                    </motion.span>
                                </AnimatePresence>
                                <span className="text-xs font-normal text-[#8F8E88] ml-1 tabular-nums">
                                    / {property?.length || 0}
                                </span>
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Unified Search & 4-Filter Control Bar: Location, Property Type, Price Range, Bedrooms */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.08, ease: LUXURY_EASE }}
                    className="bg-white border border-[#E4E2DC] rounded-[12px] p-4 sm:p-5 space-y-4 shadow-xs"
                >
                    {/* Mobile Filter Drawer Toggle */}
                    <div className="flex sm:hidden items-center justify-between">
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen((prev) => !prev)}
                            aria-expanded={mobileFiltersOpen}
                            className="inline-flex items-center gap-2 text-xs font-semibold text-[#1A1A1A] cursor-pointer"
                        >
                            <SlidersHorizontal size={14} className="text-[#1E3A34]" />
                            <span>Search & Filter Controls</span>
                            {activePills.length > 0 && (
                                <span className="px-1.5 py-0.5 rounded-full bg-[#1E3A34] text-white text-[10px] tabular-nums">
                                    {activePills.length}
                                </span>
                            )}
                        </button>
                        <button
                            type="button"
                            onClick={() => setMobileFiltersOpen((prev) => !prev)}
                            className="p-1 text-[#5C5C58]"
                            aria-label="Toggle filter drawer"
                        >
                            <motion.span
                                animate={{ rotate: mobileFiltersOpen ? 180 : 0 }}
                                transition={{ duration: 0.22, ease: LUXURY_EASE }}
                                className="inline-flex"
                            >
                                <ChevronDown size={16} />
                            </motion.span>
                        </button>
                    </div>

                    <AnimatePresence initial={false}>
                        {mobileFiltersOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.26, ease: LUXURY_EASE }}
                                className="overflow-hidden"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
                                    {/* 1. Location */}
                                    <div>
                                        <label
                                            htmlFor="directory-location"
                                            className="block type-micro-badge text-[#5C5C58] mb-2"
                                        >
                                            Location
                                        </label>
                                        <div className="relative">
                                            <MapPin
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                            />
                                            <input
                                                id="directory-location"
                                                type="search"
                                                value={searchFilters?.locationQuery || ""}
                                                onChange={(e) => updateFilter("locationQuery", e.target.value)}
                                                placeholder="City, neighborhood, or title..."
                                                className="w-full h-10 pl-9 pr-3.5 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-xs sm:text-sm text-[#1A1A1A] placeholder:text-[#8F8E88] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                            />
                                        </div>
                                    </div>

                                    {/* 2. Property Type */}
                                    <div>
                                        <label
                                            htmlFor="directory-type"
                                            className="block type-micro-badge text-[#5C5C58] mb-2"
                                        >
                                            Property Type
                                        </label>
                                        <div className="relative">
                                            <Home
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                            />
                                            <select
                                                id="directory-type"
                                                value={searchFilters?.propertyType || "all"}
                                                onChange={(e) => updateFilter("propertyType", e.target.value)}
                                                className="w-full h-10 pl-9 pr-7 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-xs sm:text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors cursor-pointer"
                                            >
                                                {PROPERTY_TYPE_OPTIONS.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* 3. Price Range */}
                                    <div>
                                        <label
                                            htmlFor="directory-price"
                                            className="block type-micro-badge text-[#5C5C58] mb-2"
                                        >
                                            Price Range
                                        </label>
                                        <div className="relative">
                                            <Banknote
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                            />
                                            <select
                                                id="directory-price"
                                                value={searchFilters?.priceRange || "all"}
                                                onChange={(e) => updateFilter("priceRange", e.target.value)}
                                                className="w-full h-10 pl-9 pr-7 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-xs sm:text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors cursor-pointer tabular-nums"
                                            >
                                                {PRICE_RANGE_OPTIONS.map((opt) => (
                                                    <option key={opt.value} value={opt.value}>
                                                        {opt.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    {/* 4. Bedrooms */}
                                    <div>
                                        <label
                                            htmlFor="directory-beds"
                                            className="block type-micro-badge text-[#5C5C58] mb-2"
                                        >
                                            Bedrooms
                                        </label>
                                        <div className="relative">
                                            <BedDouble
                                                size={15}
                                                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8F8E88] pointer-events-none"
                                            />
                                            <select
                                                id="directory-beds"
                                                value={searchFilters?.minBedrooms || "any"}
                                                onChange={(e) => updateFilter("minBedrooms", e.target.value)}
                                                className="w-full h-10 pl-9 pr-7 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-xs sm:text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors cursor-pointer tabular-nums"
                                            >
                                                <option value="any">Any Bedrooms</option>
                                                <option value="1">1+ Bedroom</option>
                                                <option value="2">2+ Bedrooms</option>
                                                <option value="3">3+ Bedrooms</option>
                                                <option value="4">4+ Bedrooms</option>
                                                <option value="5">5+ Bedrooms</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Category Pills with Sliding Active Highlight */}
                    <div className="flex items-center gap-2 overflow-x-auto pt-3 border-t border-[#E4E2DC] no-scrollbar">
                        {CATEGORY_PILLS.map((pill) => {
                            const active = (searchFilters?.category || "all") === pill.id;
                            return (
                                <motion.button
                                    key={pill.id}
                                    type="button"
                                    whileTap={{ scale: 0.96 }}
                                    onClick={() => updateFilter("category", pill.id)}
                                    className={`relative px-4 py-2 rounded-full type-micro-badge whitespace-nowrap transition-colors cursor-pointer border ${
                                        active
                                            ? "text-white border-[#1E3A34]"
                                            : "bg-[#F9F8F6] text-[#5C5C58] border-[#E4E2DC] hover:text-[#1A1A1A]"
                                    }`}
                                >
                                    {active && (
                                        <motion.span
                                            layoutId="directory-category-pill"
                                            transition={{ duration: 0.28, ease: LUXURY_EASE }}
                                            className="absolute inset-0 rounded-full bg-[#1E3A34]"
                                        />
                                    )}
                                    <span className="relative z-10">{pill.label}</span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Active Filter Indicator Tags */}
                    <AnimatePresence initial={false}>
                        {activePills.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ duration: 0.22, ease: LUXURY_EASE }}
                                className="pt-3 border-t border-[#E4E2DC] flex flex-wrap items-center gap-2"
                            >
                                <span className="type-micro-badge text-[#8F8E88] mr-1">
                                    Active:
                                </span>
                                <AnimatePresence mode="popLayout">
                                    {activePills.map((pill) => (
                                        <motion.button
                                            key={pill.key}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.2, ease: LUXURY_EASE }}
                                            type="button"
                                            onClick={() => updateFilter(pill.key, pill.resetValue)}
                                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E2DC] text-xs font-medium text-[#1A1A1A] hover:border-[#1E3A34] cursor-pointer"
                                        >
                                            <span className="capitalize">{pill.label}</span>
                                            <X size={12} className="text-[#8F8E88]" />
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                                <button
                                    type="button"
                                    onClick={handleClearAll}
                                    className="text-xs font-semibold text-[#C86D51] hover:underline ml-2 cursor-pointer"
                                >
                                    Clear all
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Listings Grid */}
                <AnimatePresence mode="wait">
                    {loadProperty ? (
                        <motion.div
                            key="loading-grid"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.22 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                        >
                            {[...Array(6)].map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-[12px] border border-[#E4E2DC] overflow-hidden animate-pulse"
                                >
                                    <div className="aspect-[16/10] bg-[#F1EFEA] w-full" />
                                    <div className="p-6 space-y-4">
                                        <div className="flex justify-between">
                                            <div className="h-5 bg-[#F1EFEA] rounded w-1/3" />
                                            <div className="h-4 bg-[#F1EFEA] rounded w-1/4" />
                                        </div>
                                        <div className="h-6 bg-[#F1EFEA] rounded w-3/4" />
                                        <div className="h-4 bg-[#F1EFEA] rounded w-full" />
                                        <div className="pt-4 border-t border-[#E4E2DC] flex justify-between">
                                            <div className="h-4 bg-[#F1EFEA] rounded w-24" />
                                            <div className="h-4 bg-[#F1EFEA] rounded w-20" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    ) : isViewingSaved && (!savedIds || savedIds.length === 0) ? (
                        <motion.div
                            key="empty-saved"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: LUXURY_EASE }}
                            className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#F1EFEA] rounded-[12px] border border-[#E4E2DC] space-y-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border border-[#E4E2DC] flex items-center justify-center text-[#C86D51]">
                                <Heart size={20} />
                            </div>
                            <h2 className="type-section-heading text-[#1A1A1A]">
                                Your saved collection is empty
                            </h2>
                            <p className="type-body text-[#5C5C58] max-w-md">
                                Tap the heart icon on any property card or detail page to curate your personal shortlist of spaces.
                            </p>
                            <Link
                                to="/properties"
                                onClick={() => updateFilter("savedOnly", false)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors"
                            >
                                <span>Explore All Properties</span>
                            </Link>
                        </motion.div>
                    ) : filteredProperties.length === 0 ? (
                        <motion.div
                            key="empty-filtered"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: LUXURY_EASE }}
                            className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#F1EFEA] rounded-[12px] border border-[#E4E2DC] space-y-4"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border border-[#E4E2DC] flex items-center justify-center text-[#8F8E88]">
                                <Building2 size={20} />
                            </div>
                            <h2 className="type-section-heading text-[#1A1A1A]">
                                No properties match your filter criteria
                            </h2>
                            <p className="type-body text-[#5C5C58] max-w-md">
                                Adjust your location, property type, price range, or bedroom count to view more available properties.
                            </p>
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={handleClearAll}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <RotateCcw size={14} />
                                <span>Reset All Filters</span>
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`grid-${searchFilters?.category || "all"}-${isViewingSaved}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: LUXURY_EASE }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
                        >
                            {filteredProperties.map((prop, index) => (
                                <Link
                                    key={prop._id || index}
                                    to={`/single/${prop._id}`}
                                    className="block h-full focus:outline-none"
                                >
                                    <PropertyCard
                                        title={prop?.title}
                                        location={prop?.location}
                                        price={prop?.price}
                                        bedrooms={prop?.bedrooms}
                                        description={prop?.description}
                                        image={prop?.image}
                                        agent={prop?.agent}
                                        propertyType={prop?.propertyType}
                                        availableSlots={prop?.availableSlots}
                                        createdAt={prop?.createdAt}
                                        id={prop?._id}
                                    />
                                </Link>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <DashboardFooter />
        </div>
    );
};

export default AllPropperties;
