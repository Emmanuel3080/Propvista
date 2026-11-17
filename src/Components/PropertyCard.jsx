import React, { useContext } from 'react';
import { Heart, MapPin, BedDouble, Calendar, Building2, ArrowUpRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { propertyContext } from '../Contexts/PropertyContext';
import { cardScrollVariants, LUXURY_EASE } from '../utils/motion';

const MODULE_LOAD_TIME = Date.now();

const PropertyCard = ({
    title,
    location,
    price,
    bedrooms,
    description,
    image,
    propertyType,
    id,
    agent,
    availableSlots,
    createdAt,
}) => {
    const { toggleSavedProperty, isPropertySaved } = useContext(propertyContext);

    if (!title) return null;

    const saved = isPropertySaved ? isPropertySaved(id) : false;
    const slotCount = Array.isArray(availableSlots)
        ? availableSlots.reduce((acc, s) => acc + (s?.times?.length || 0), 0)
        : 0;

    const isRecent = createdAt
        ? (MODULE_LOAD_TIME - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24) <= 14
        : false;

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSavedProperty?.(id);
    };

    return (
        <motion.article
            variants={cardScrollVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.14 }}
            whileHover={{ y: -5, transition: { duration: 0.28, ease: LUXURY_EASE } }}
            className="group h-full bg-white rounded-[12px] border border-[#E4E2DC] overflow-hidden transition-shadow duration-300 hover:shadow-[0_20px_40px_-15px_rgba(26,26,26,0.12)] flex flex-col"
        >
            {/* 16:10 Architectural Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#F1EFEA]">
                {image ? (
                    <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.55, ease: LUXURY_EASE }}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                        src={image}
                        alt={title}
                        loading="lazy"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#8F8E88] text-xs">
                        No photograph provided
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#161817]/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Top Left Badges */}
                <div className="absolute top-3.5 left-3.5 flex flex-wrap items-center gap-1.5">
                    <span className="px-3 py-1.5 rounded-full bg-[#161817]/80 backdrop-blur-md text-white type-micro-badge">
                        {propertyType || "Residence"}
                    </span>

                    {isRecent ? (
                        <span className="px-2.5 py-1.5 rounded-full bg-[#C86D51] text-white type-micro-badge">
                            New Release
                        </span>
                    ) : (
                        <span className="px-2.5 py-1.5 rounded-full bg-[#C86D51] text-white type-micro-badge">
                            Featured
                        </span>
                    )}
                </div>

                {/* Top Right Animated Favorite Button */}
                <motion.button
                    type="button"
                    onClick={handleFavoriteClick}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.85 }}
                    transition={{ duration: 0.2, ease: LUXURY_EASE }}
                    aria-label={saved ? "Remove from saved properties" : "Save property"}
                    aria-pressed={saved}
                    className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full flex items-center justify-center transition-colors cursor-pointer border ${
                        saved
                            ? "bg-white text-[#C86D51] border-white shadow-sm"
                            : "bg-white/90 hover:bg-white text-[#1A1A1A] border-white/60"
                    }`}
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={saved ? "saved" : "unsaved"}
                            initial={{ scale: 0.65, opacity: 0.5 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.65, opacity: 0 }}
                            transition={{ duration: 0.2, ease: LUXURY_EASE }}
                            className="inline-flex items-center justify-center"
                        >
                            <Heart
                                size={16}
                                className={saved ? "fill-[#C86D51] text-[#C86D51]" : "text-[#1A1A1A]"}
                            />
                        </motion.span>
                    </AnimatePresence>
                </motion.button>

                {/* Bottom Left Availability Indicator */}
                {slotCount > 0 && (
                    <div className="absolute bottom-3 left-3.5 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/95 backdrop-blur-xs type-micro-badge text-[#2E7D32] shadow-xs tabular-nums">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                        <span>{slotCount} Viewing {slotCount === 1 ? "Slot" : "Slots"}</span>
                    </div>
                )}
            </div>

            {/* Card Content */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                    {/* Price & Location Row */}
                    <div className="flex items-baseline justify-between gap-2">
                        <p className="type-card-price text-[#1A1A1A] tabular-nums">
                            ₦{Number(price || 0).toLocaleString()}
                        </p>
                        <div className="flex items-center gap-1 type-card-meta text-[#5C5C58] truncate max-w-[55%]">
                            <MapPin size={13} className="text-[#8F8E88] shrink-0" />
                            <span className="truncate">{location || "Location pending"}</span>
                        </div>
                    </div>

                    {/* Card Property Title */}
                    <h3 className="type-card-title text-[#1A1A1A] group-hover:text-[#1E3A34] transition-colors line-clamp-1">
                        {title}
                    </h3>

                    {/* Description */}
                    {description && (
                        <p className="type-body text-[#5C5C58] line-clamp-2">
                            {description}
                        </p>
                    )}
                </div>

                {/* Specifications & Footer */}
                <div className="pt-4 border-t border-[#E4E2DC] space-y-3">
                    <div className="flex items-center justify-between text-[#5C5C58]">
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-1.5 type-micro-badge text-[#1A1A1A] tabular-nums">
                                <BedDouble size={14} className="text-[#8F8E88]" />
                                {bedrooms ?? 0} {Number(bedrooms) === 1 ? "Bed" : "Beds"}
                            </span>
                            <span className="inline-flex items-center gap-1.5 type-micro-badge text-[#5C5C58]">
                                <Building2 size={14} className="text-[#8F8E88]" />
                                {propertyType || "Residence"}
                            </span>
                        </div>

                        {Array.isArray(availableSlots) && availableSlots.length > 0 && (
                            <span className="inline-flex items-center gap-1 type-micro-badge text-[#2E7D32] tabular-nums">
                                <Calendar size={12} />
                                {availableSlots.length} {availableSlots.length === 1 ? "Date" : "Dates"}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-[#8F8E88] truncate max-w-[65%]">
                            {agent?.agencyName || agent?.fullName
                                ? `Listed by ${agent.agencyName || agent.fullName}`
                                : "Verified Propvista Listing"}
                        </span>

                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1E3A34] group-hover:translate-x-0.5 transition-transform duration-200">
                            <span>View Residence</span>
                            <ArrowUpRight size={14} />
                        </span>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

export default PropertyCard;
