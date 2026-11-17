import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { propertyContext } from '../Contexts/PropertyContext';
import { CATEGORY_PILLS } from '../utils/propertyFilter';
import { LUXURY_EASE } from '../utils/motion';

const FeaturedText = ({ totalCount, filteredCount }) => {
    const { searchFilters, setSearchFilters } = useContext(propertyContext);
    const activeCategory = searchFilters?.category || "all";

    const handleCategorySelect = (categoryId) => {
        setSearchFilters?.((prev) => ({
            ...prev,
            category: categoryId,
        }));
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.42, ease: LUXURY_EASE }}
            className="space-y-6"
        >
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#E4E2DC] pb-6">
                <div className="space-y-2">
                    <span className="inline-block type-micro-badge text-[#8F8E88]">
                        Curated Portfolio
                    </span>
                    <h2 className="type-section-heading text-[#1A1A1A]">
                        Featured Residences
                    </h2>
                </div>

                <div className="flex items-center gap-4">
                    {typeof filteredCount === "number" && (
                        <span className="text-xs text-[#5C5C58] tabular-nums">
                            Showing{" "}
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.strong
                                    key={filteredCount}
                                    initial={{ opacity: 0, y: 4 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -4 }}
                                    transition={{ duration: 0.18, ease: LUXURY_EASE }}
                                    className="inline-block text-[#1A1A1A] font-semibold tabular-nums"
                                >
                                    {filteredCount}
                                </motion.strong>
                            </AnimatePresence>
                            {typeof totalCount === "number" ? ` of ${totalCount}` : ""} residences
                        </span>
                    )}

                    <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
                        <Link
                            to="/properties"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-white border border-[#E4E2DC] hover:border-[#1E3A34] text-xs font-semibold text-[#1A1A1A] transition-colors"
                        >
                            <span>View All Listings</span>
                            <ArrowUpRight size={14} />
                        </Link>
                    </motion.div>
                </div>
            </div>

            {/* Category Filter Pills with Animated Active Background */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
                {CATEGORY_PILLS.map((pill) => {
                    const isSelected = activeCategory === pill.id;
                    return (
                        <motion.button
                            key={pill.id}
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={() => handleCategorySelect(pill.id)}
                            className={`relative px-4 py-2.5 rounded-full type-micro-badge whitespace-nowrap transition-colors cursor-pointer border ${
                                isSelected
                                    ? "text-white border-[#1E3A34]"
                                    : "bg-[#F1EFEA] text-[#5C5C58] border-[#E4E2DC] hover:text-[#1A1A1A] hover:border-[#8F8E88]"
                            }`}
                        >
                            {isSelected && (
                                <motion.span
                                    layoutId="featured-category-pill"
                                    transition={{ duration: 0.28, ease: LUXURY_EASE }}
                                    className="absolute inset-0 rounded-full bg-[#1E3A34]"
                                />
                            )}
                            <span className="relative z-10">{pill.label}</span>
                        </motion.button>
                    );
                })}
            </div>
        </motion.div>
    );
};

export default FeaturedText;
