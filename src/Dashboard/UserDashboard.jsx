import React, { useContext, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ArrowUpRight, Building2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Header from '../Common/Header';
import HeroSection from '../Components/HeroSection';
import { propertyContext } from '../Contexts/PropertyContext';
import PropertyCard from '../Components/PropertyCard';
import FeaturedText from '../Components/FeaturedText';
import AgentMatchRoadmap from '../Components/AgentMatch';
import DashboardFooter from '../Common/DashboardFooter';
import WhatWeOffer from '../Components/WhatWeOffer';
import { filterAndSortProperties } from '../utils/propertyFilter';
import { LUXURY_EASE } from '../utils/motion';

const UserDashboard = () => {
    const {
        fetchProperties,
        property,
        loadProperty,
        searchFilters,
        resetSearchFilters,
        savedIds,
    } = useContext(propertyContext);

    const listingsRef = useRef(null);

    useEffect(() => {
        fetchProperties();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredProperties = useMemo(
        () => filterAndSortProperties(property, searchFilters, savedIds),
        [property, searchFilters, savedIds]
    );

    const hasActiveFilter =
        Boolean(searchFilters?.locationQuery?.trim()) ||
        searchFilters?.propertyType !== "all" ||
        searchFilters?.priceRange !== "all" ||
        searchFilters?.minBedrooms !== "any" ||
        searchFilters?.category !== "all" ||
        Boolean(searchFilters?.savedOnly);

    const displayedProperties = hasActiveFilter
        ? filteredProperties
        : filteredProperties.slice(0, 6);

    const scrollToListings = () => {
        listingsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col">
            <Header />

            <HeroSection onScrollToResults={scrollToListings} />

            {/* Featured Portfolio Section */}
            <main
                ref={listingsRef}
                className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-8 space-y-10"
            >
                <FeaturedText
                    totalCount={property?.length || 0}
                    filteredCount={filteredProperties.length}
                />

                <AnimatePresence mode="wait">
                    {loadProperty ? (
                        <motion.div
                            key="dashboard-loading"
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
                    ) : !property || property.length === 0 ? (
                        <motion.div
                            key="dashboard-empty"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: LUXURY_EASE }}
                            className="flex flex-col items-center justify-center text-center py-20 px-6 bg-[#F1EFEA] rounded-[12px] border border-[#E4E2DC]"
                        >
                            <div className="w-12 h-12 rounded-full bg-white border border-[#E4E2DC] flex items-center justify-center text-[#8F8E88] mb-4">
                                <Building2 size={20} />
                            </div>
                            <h3 className="font-serif-editorial text-2xl text-[#1A1A1A] mb-2">
                                No Residences Available Yet
                            </h3>
                            <p className="text-sm text-[#5C5C58] max-w-md">
                                New architectural listings will appear here as soon as they are added to the directory.
                            </p>
                        </motion.div>
                    ) : displayedProperties.length === 0 ? (
                        <motion.div
                            key="dashboard-no-matches"
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.3, ease: LUXURY_EASE }}
                            className="flex flex-col items-center justify-center text-center py-16 px-6 bg-[#F1EFEA] rounded-[12px] border border-[#E4E2DC] space-y-4"
                        >
                            <h3 className="font-serif-editorial text-2xl text-[#1A1A1A]">
                                No residences match your current selection
                            </h3>
                            <p className="text-sm text-[#5C5C58] max-w-md tabular-nums">
                                Try broadening your price guide, location query, or architectural style filter to view all {property.length} available residences.
                            </p>
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={resetSearchFilters}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors cursor-pointer"
                            >
                                <RotateCcw size={14} />
                                <span>Reset All Filters</span>
                            </motion.button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`dashboard-grid-${searchFilters?.category || "all"}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.25, ease: LUXURY_EASE }}
                            className="space-y-10"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                                {displayedProperties.map((prop, index) => (
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
                            </div>

                            {property.length > displayedProperties.length && (
                                <div className="pt-4 flex justify-center">
                                    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                                        <Link
                                            to="/properties"
                                            className="inline-flex items-center gap-2 px-6 py-3 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs sm:text-sm font-semibold transition-colors tabular-nums"
                                        >
                                            <span>Explore All {property.length} Residences</span>
                                            <ArrowUpRight size={16} />
                                        </Link>
                                    </motion.div>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AgentMatchRoadmap />

            <WhatWeOffer />

            <DashboardFooter />
        </div>
    );
};

export default UserDashboard;
