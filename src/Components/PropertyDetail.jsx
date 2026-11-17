import React, { useContext, useState } from 'react';
import {
    MapPin,
    BedDouble,
    Clock,
    Calendar,
    Phone,
    Mail,
    Building2,
    ChevronLeft,
    Heart,
    Share2,
    Maximize2,
    X,
    CheckCircle2,
    Sparkles,
    ShieldCheck,
} from 'lucide-react';
import Modal from "react-modal";
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authContext } from '../Contexts/UserAuthContext';
import { appointmentContext } from '../Contexts/AppointmentContext';
import { propertyContext } from '../Contexts/PropertyContext';
import AppointmentBooking from './AppointmentBookData';
import {
    LUXURY_EASE,
    staggerContainer,
    fadeUpItem,
    modalPanelVariants,
} from '../utils/motion';

Modal.setAppElement("#root");

const appointmentSchema = yup.object({
    name: yup.string().required("Name Field Required"),
    email: yup.string().email("Invalid Email").required("Email Field is Required"),
    message: yup.string().required("Message Field is Required"),
});

const PropertyDetail = ({ property, onBack }) => {
    const [selectedDetails, setSelectedDetails] = useState({ date: null, time: null });
    const [modalOpen, setOpen] = useState(false);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [bookingSubmitted, setBookingSubmitted] = useState(false);

    const { userInfo } = useContext(authContext);
    const { BookAppointment, loadBooking } = useContext(appointmentContext);
    const { toggleSavedProperty, isPropertySaved } = useContext(propertyContext);
    const navigate = useNavigate();

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(appointmentSchema),
    });

    if (!property || Object.keys(property).length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 animate-pulse">
                <div className="h-8 w-40 bg-[#F1EFEA] rounded-[8px]" />
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[420px]">
                    <div className="lg:col-span-8 bg-[#F1EFEA] rounded-[12px]" />
                    <div className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4">
                        <div className="bg-[#F1EFEA] rounded-[12px]" />
                        <div className="bg-[#F1EFEA] rounded-[12px]" />
                    </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-4">
                        <div className="h-10 w-2/3 bg-[#F1EFEA] rounded" />
                        <div className="h-6 w-1/3 bg-[#F1EFEA] rounded" />
                        <div className="h-32 w-full bg-[#F1EFEA] rounded-[12px]" />
                    </div>
                    <div className="lg:col-span-4 h-80 bg-[#F1EFEA] rounded-[12px]" />
                </div>
            </div>
        );
    }

    const saved = isPropertySaved ? isPropertySaved(property._id) : false;
    const totalViewingTimes = Array.isArray(property.availableSlots)
        ? property.availableSlots.reduce((sum, s) => sum + (s?.times?.length || 0), 0)
        : 0;

    function openModal() {
        setBookingSubmitted(false);
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
        setBookingSubmitted(false);
    }

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            toast.success("Residence link copied to clipboard");
        } catch {
            toast.info("Copy the URL from your address bar to share");
        }
    };

    const submitData = async (formData) => {
        const { message, ...otherFormFields } = formData;
        if (selectedDetails?.date && selectedDetails?.time) {
            setBookingSubmitted(true);
        }
        try {
            await BookAppointment(
                property._id,
                property.agent?._id,
                {
                    date: selectedDetails.date,
                    time: selectedDetails.time,
                    ...otherFormFields,
                },
                message
            );
            setSelectedDetails({ date: null, time: null });
        } catch (error) {
            setBookingSubmitted(false);
            console.log(error);
        }
    };

    const handleErr = (err) => {
        const firstEr = Object.values(err)[0]?.message;
        if (firstEr) toast.error(firstEr);
    };

    const architecturalHighlights = [
        {
            label: "Property Classification",
            value: property.propertyType
                ? `${property.propertyType.charAt(0).toUpperCase()}${property.propertyType.slice(1)} Residence`
                : "Residential Property",
        },
        {
            label: "Sleeping Quarters",
            value: `${property.bedrooms ?? 0} ${Number(property.bedrooms) === 1 ? "Bedroom" : "Bedrooms"}`,
        },
        {
            label: "Neighborhood & Locale",
            value: property.location || "Prime Location",
        },
        {
            label: "Viewing Availability",
            value:
                totalViewingTimes > 0
                    ? `${totalViewingTimes} Scheduled Viewing ${totalViewingTimes === 1 ? "Slot" : "Slots"}`
                    : "By Direct Appointment",
        },
    ];

    return (
        <div className="bg-[#F9F8F6] text-[#1A1A1A] pb-28 lg:pb-20">
            {/* Full-Screen Image Lightbox Modal */}
            <Modal
                isOpen={lightboxOpen}
                onRequestClose={() => setLightboxOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(22, 24, 23, 0.92)",
                        zIndex: 1100,
                        backdropFilter: "blur(8px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    },
                    content: {
                        position: "relative",
                        inset: "auto",
                        padding: "0",
                        border: "none",
                        background: "transparent",
                        maxWidth: "92vw",
                        maxHeight: "90vh",
                        overflow: "hidden",
                    },
                }}
                contentLabel="Property Photograph Viewer"
            >
                <motion.div
                    variants={modalPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="relative flex flex-col items-center"
                >
                    <div className="w-full flex items-center justify-between pb-3 text-white">
                        <div>
                            <p className="font-serif-editorial text-lg">{property.title}</p>
                            <p className="text-xs text-[#8F8E88]">{property.location}</p>
                        </div>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={() => setLightboxOpen(false)}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                            aria-label="Close Fullscreen Viewer"
                        >
                            <X size={20} />
                        </motion.button>
                    </div>
                    <img
                        src={property.image}
                        alt={property.title}
                        className="max-h-[80vh] w-auto object-contain rounded-[12px] border border-white/15"
                    />
                </motion.div>
            </Modal>

            {/* Book Appointment Modal */}
            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: "rgba(22, 24, 23, 0.75)",
                        zIndex: 1000,
                        backdropFilter: "blur(6px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "16px",
                    },
                    content: {
                        position: "relative",
                        inset: "auto",
                        borderRadius: "12px",
                        padding: "0",
                        width: "100%",
                        maxWidth: "640px",
                        maxHeight: "90vh",
                        border: "none",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        overflow: "visible",
                        display: "flex",
                        flexDirection: "column",
                    },
                }}
                contentLabel="Schedule Private Viewing Modal"
            >
                <motion.div
                    variants={modalPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full max-h-[90vh] rounded-[12px] border border-[#E4E2DC] bg-white shadow-[0_25px_50px_-12px_rgba(22,24,23,0.25)] overflow-hidden flex flex-col"
                >
                    {/* Modal Header */}
                    <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#E4E2DC] bg-[#F9F8F6]">
                        <div>
                            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8F8E88]">
                                Private Appointment Request
                            </span>
                            <h2 className="font-serif-editorial text-2xl font-normal text-[#1A1A1A]">
                                Schedule a Viewing
                            </h2>
                        </div>
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.94 }}
                            onClick={closeModal}
                            className="w-9 h-9 rounded-[8px] border border-[#E4E2DC] bg-white flex items-center justify-center text-[#5C5C58] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </motion.button>
                    </div>

                    {/* Modal Form */}
                    <form onSubmit={handleSubmit(submitData, handleErr)} className="flex flex-col flex-1 overflow-hidden">
                        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6">
                            {/* Property Summary Pill */}
                            <div className="flex items-center gap-3.5 p-3.5 rounded-[12px] bg-[#F1EFEA] border border-[#E4E2DC]">
                                {property.image && (
                                    <img
                                        src={property.image}
                                        alt={property.title}
                                        className="w-16 h-12 rounded-[8px] object-cover shrink-0"
                                    />
                                )}
                                <div className="min-w-0 flex-1">
                                    <p className="font-serif-editorial text-sm font-medium text-[#1A1A1A] truncate">
                                        {property.title}
                                    </p>
                                    <p className="text-xs text-[#5C5C58] truncate tabular-nums">
                                        {property.location} • ₦{Number(property.price || 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            {/* Animated Booking Confirmation Banner when submitting */}
                            <AnimatePresence initial={false}>
                                {(bookingSubmitted || loadBooking) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                                        transition={{ duration: 0.26, ease: LUXURY_EASE }}
                                        className="p-4 rounded-[12px] bg-[#2E7D32]/10 border border-[#2E7D32]/25 flex items-center gap-3"
                                    >
                                        <motion.div
                                            initial={{ scale: 0.7 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.25, ease: LUXURY_EASE }}
                                            className="w-9 h-9 rounded-full bg-[#2E7D32] text-white flex items-center justify-center shrink-0"
                                        >
                                            <CheckCircle2 size={18} />
                                        </motion.div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-[#1E3A34]">
                                                {loadBooking
                                                    ? "Dispatching viewing appointment request..."
                                                    : "Viewing request submitted"}
                                            </p>
                                            <p className="text-[11px] text-[#5C5C58] tabular-nums">
                                                {selectedDetails.date && selectedDetails.time
                                                    ? `Requested window: ${selectedDetails.date} at ${selectedDetails.time}`
                                                    : "Confirming schedule with the listing advisor."}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Date & Time Slot Selector */}
                            <AppointmentBooking
                                instanceId="modal"
                                availableSlots={property.availableSlots}
                                onSelectionChange={setSelectedDetails}
                            />

                            {/* Client Contact Fields */}
                            <div className="space-y-4 pt-4 border-t border-[#E4E2DC]">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label
                                            htmlFor="booking-client-name"
                                            className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C5C58] mb-1.5"
                                        >
                                            Full Name
                                        </label>
                                        <input
                                            id="booking-client-name"
                                            type="text"
                                            autoComplete="name"
                                            placeholder="Your full name"
                                            defaultValue={userInfo?.fullName}
                                            {...register("name")}
                                            className="w-full h-11 px-3.5 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="booking-client-email"
                                            className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C5C58] mb-1.5"
                                        >
                                            Email Address
                                        </label>
                                        <input
                                            id="booking-client-email"
                                            type="email"
                                            autoComplete="email"
                                            spellCheck={false}
                                            placeholder="you@example.com"
                                            defaultValue={userInfo?.email}
                                            {...register("email")}
                                            className="w-full h-11 px-3.5 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="booking-client-message"
                                        className="block text-[11px] font-semibold uppercase tracking-wider text-[#5C5C58] mb-1.5"
                                    >
                                        Viewing Notes or Questions
                                    </label>
                                    <textarea
                                        id="booking-client-message"
                                        placeholder="Share any specific preferences or questions for the listing advisor..."
                                        rows="3"
                                        {...register("message")}
                                        className="w-full p-3.5 rounded-[8px] bg-[#F9F8F6] border border-[#E4E2DC] text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white resize-none transition-colors"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="px-6 sm:px-8 py-4 border-t border-[#E4E2DC] bg-[#F9F8F6] flex items-center justify-end gap-3">
                            <motion.button
                                type="button"
                                whileTap={{ scale: 0.97 }}
                                onClick={closeModal}
                                className="px-4 py-2.5 rounded-[8px] border border-[#E4E2DC] bg-white text-xs font-semibold text-[#5C5C58] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                type="submit"
                                whileHover={!loadBooking ? { y: -1 } : undefined}
                                whileTap={!loadBooking ? { scale: 0.97 } : undefined}
                                disabled={loadBooking}
                                className={`px-6 py-2.5 rounded-[8px] flex items-center justify-center gap-2 text-xs font-semibold text-white transition-colors ${
                                    loadBooking
                                        ? "bg-[#8F8E88] cursor-not-allowed"
                                        : "bg-[#1E3A34] hover:bg-[#142824] cursor-pointer"
                                }`}
                            >
                                <AnimatePresence mode="wait" initial={false}>
                                    {loadBooking ? (
                                        <motion.span
                                            key="confirming"
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.18 }}
                                            className="inline-flex items-center gap-2"
                                        >
                                            <span>Confirming Request...</span>
                                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="confirm"
                                            initial={{ opacity: 0, y: 4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -4 }}
                                            transition={{ duration: 0.18 }}
                                        >
                                            Confirm Viewing Appointment
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </Modal>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 space-y-8">
                {/* Top Breadcrumb & Action Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: LUXURY_EASE }}
                    className="flex items-center justify-between gap-4"
                >
                    <motion.button
                        type="button"
                        whileHover={{ x: -2 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={onBack || (() => navigate(-1))}
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white border border-[#E4E2DC] hover:border-[#1E3A34] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                    >
                        <ChevronLeft size={16} />
                        <span>Back to Residences</span>
                    </motion.button>

                    <div className="flex items-center gap-2.5">
                        <motion.button
                            type="button"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.96 }}
                            onClick={handleShare}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-white border border-[#E4E2DC] hover:border-[#1E3A34] text-xs font-semibold text-[#1A1A1A] transition-colors cursor-pointer"
                        >
                            <Share2 size={14} />
                            <span className="hidden sm:inline">Share</span>
                        </motion.button>

                        <motion.button
                            type="button"
                            whileHover={{ y: -1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleSavedProperty?.(property._id)}
                            aria-pressed={saved}
                            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] border text-xs font-semibold transition-colors cursor-pointer ${
                                saved
                                    ? "bg-[#1E3A34] text-white border-[#1E3A34]"
                                    : "bg-white text-[#1A1A1A] border-[#E4E2DC] hover:border-[#1E3A34]"
                            }`}
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={saved ? "saved-icon" : "unsaved-icon"}
                                    initial={{ scale: 0.7, opacity: 0.5 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.7, opacity: 0 }}
                                    transition={{ duration: 0.18, ease: LUXURY_EASE }}
                                    className="inline-flex"
                                >
                                    <Heart
                                        size={14}
                                        className={saved ? "fill-[#C86D51] text-[#C86D51]" : ""}
                                    />
                                </motion.span>
                            </AnimatePresence>
                            <span>{saved ? "Saved" : "Save Residence"}</span>
                        </motion.button>
                    </div>
                </motion.div>

                {/* Editorial Bento-Style Photo Gallery */}
                <motion.section
                    aria-label="Property Gallery"
                    variants={staggerContainer(0.08, 0.04)}
                    initial="hidden"
                    animate="visible"
                    className="relative"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 sm:gap-4">
                        {/* Primary Large Photograph */}
                        <motion.div
                            variants={fadeUpItem(14, 0.45)}
                            onClick={() => setLightboxOpen(true)}
                            className="lg:col-span-8 relative h-[320px] sm:h-[440px] lg:h-[500px] rounded-[12px] overflow-hidden bg-[#F1EFEA] border border-[#E4E2DC] group cursor-pointer"
                        >
                            <motion.img
                                whileHover={{ scale: 1.025 }}
                                transition={{ duration: 0.55, ease: LUXURY_EASE }}
                                src={property.image}
                                alt={property.title}
                                fetchPriority="high"
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#161817]/40 via-transparent to-transparent pointer-events-none" />
                            <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#161817]/80 backdrop-blur-md text-white text-xs font-medium capitalize">
                                {property.propertyType || "Architectural Residence"}
                            </span>
                        </motion.div>

                        {/* Supporting Bento Detail Views */}
                        <motion.div
                            variants={fadeUpItem(14, 0.45)}
                            className="hidden lg:grid lg:col-span-4 grid-rows-2 gap-4 h-[500px]"
                        >
                            <div
                                onClick={() => setLightboxOpen(true)}
                                className="relative rounded-[12px] overflow-hidden bg-[#F1EFEA] border border-[#E4E2DC] group cursor-pointer"
                            >
                                <img
                                    src={property.image}
                                    alt={`${property.title} architectural perspective`}
                                    className="w-full h-full object-cover object-left scale-125 transition-transform duration-700 group-hover:scale-[1.3]"
                                />
                                <div className="absolute inset-0 bg-[#161817]/15 group-hover:bg-transparent transition-colors" />
                                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white/90 text-[#1A1A1A] text-[11px] font-medium">
                                    Exterior & Spatial Composition
                                </span>
                            </div>

                            <div
                                onClick={() => setLightboxOpen(true)}
                                className="relative rounded-[12px] overflow-hidden bg-[#F1EFEA] border border-[#E4E2DC] group cursor-pointer"
                            >
                                <img
                                    src={property.image}
                                    alt={`${property.title} detail frame`}
                                    className="w-full h-full object-cover object-right scale-125 transition-transform duration-700 group-hover:scale-[1.3]"
                                />
                                <div className="absolute inset-0 bg-[#161817]/25 group-hover:bg-[#161817]/10 transition-colors" />
                                <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.96 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setLightboxOpen(true);
                                    }}
                                    className="absolute bottom-3.5 right-3.5 inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white text-[#1A1A1A] text-xs font-semibold shadow-md hover:bg-[#F9F8F6] transition-colors cursor-pointer"
                                >
                                    <Maximize2 size={14} />
                                    <span>View All Photos</span>
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Mobile View Full Photo Button */}
                    <button
                        type="button"
                        onClick={() => setLightboxOpen(true)}
                        className="lg:hidden absolute bottom-3.5 right-3.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-white/95 text-[#1A1A1A] text-xs font-semibold shadow-md"
                    >
                        <Maximize2 size={13} />
                        <span>View Full Photo</span>
                    </button>
                </motion.section>

                {/* Two-Column Content & Booking Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start pt-2">
                    {/* Left Column: Main Property Content */}
                    <motion.div
                        variants={staggerContainer(0.08, 0.1)}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-8 space-y-10"
                    >
                        {/* Title, Location & Price Header */}
                        <motion.div
                            variants={fadeUpItem(12, 0.42)}
                            className="pb-8 border-b border-[#E4E2DC] space-y-4"
                        >
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="px-3 py-1.5 rounded-full bg-[#C86D51] text-white type-micro-badge">
                                    Featured Listing
                                </span>
                                {totalViewingTimes > 0 && (
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#2E7D32]/10 text-[#2E7D32] type-micro-badge">
                                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E7D32]" />
                                        Available for Private Viewing
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                                <div className="space-y-2">
                                    <h1 className="type-property-title text-[#1A1A1A]">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center gap-1.5 type-card-meta text-[#5C5C58]">
                                        <MapPin size={16} className="text-[#1E3A34] shrink-0" />
                                        <span>{property.location}</span>
                                    </div>
                                </div>

                                <div className="sm:text-right">
                                    <p className="type-micro-badge text-[#8F8E88] mb-1">
                                        Guide Price
                                    </p>
                                    <p className="font-sans-ui text-2xl sm:text-3xl font-semibold text-[#1A1A1A] tabular-nums tracking-[-0.015em]">
                                        ₦{Number(property.price || 0).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Key Specifications Bar */}
                        <motion.div
                            variants={fadeUpItem(12, 0.42)}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4"
                        >
                            <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-4 space-y-1.5">
                                <div className="flex items-center gap-1.5 type-micro-badge text-[#8F8E88]">
                                    <BedDouble size={14} className="text-[#1E3A34]" />
                                    <span>Bedrooms</span>
                                </div>
                                <p className="font-sans-ui text-base font-semibold text-[#1A1A1A] tabular-nums">
                                    {property.bedrooms ?? 0} {Number(property.bedrooms) === 1 ? "Room" : "Rooms"}
                                </p>
                            </div>

                            <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-4 space-y-1.5">
                                <div className="flex items-center gap-1.5 type-micro-badge text-[#8F8E88]">
                                    <Building2 size={14} className="text-[#1E3A34]" />
                                    <span>Classification</span>
                                </div>
                                <p className="font-sans-ui text-base font-semibold text-[#1A1A1A] capitalize">
                                    {property.propertyType || "Residence"}
                                </p>
                            </div>

                            <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-4 space-y-1.5">
                                <div className="flex items-center gap-1.5 type-micro-badge text-[#8F8E88]">
                                    <Calendar size={14} className="text-[#1E3A34]" />
                                    <span>Viewing Dates</span>
                                </div>
                                <p className="font-sans-ui text-base font-semibold text-[#1A1A1A] tabular-nums">
                                    {property.availableSlots?.length || 0} {property.availableSlots?.length === 1 ? "Date" : "Dates"}
                                </p>
                            </div>

                            <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-4 space-y-1.5">
                                <div className="flex items-center gap-1.5 type-micro-badge text-[#8F8E88]">
                                    <Clock size={14} className="text-[#1E3A34]" />
                                    <span>Published</span>
                                </div>
                                <p className="font-sans-ui text-base font-semibold text-[#1A1A1A] tabular-nums">
                                    {property.createdAt
                                        ? new Date(property.createdAt).toLocaleDateString('en-GB', {
                                              day: 'numeric',
                                              month: 'short',
                                              year: 'numeric',
                                          })
                                        : "Verified"}
                                </p>
                            </div>
                        </motion.div>

                        {/* Editorial Narrative Description */}
                        <motion.section variants={fadeUpItem(12, 0.42)} className="space-y-4">
                            <h2 className="type-section-heading text-[#1A1A1A]">
                                About This Residence
                            </h2>
                            <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 sm:p-8">
                                <p className="type-body text-[#5C5C58] whitespace-pre-line max-w-[75ch]">
                                    {property.description}
                                </p>
                            </div>
                        </motion.section>

                        {/* Architectural Highlights & Specifications */}
                        <motion.section variants={fadeUpItem(12, 0.42)} className="space-y-4">
                            <h2 className="type-section-heading text-[#1A1A1A]">
                                Architectural Specifications
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {architecturalHighlights.map((item) => (
                                    <div
                                        key={item.label}
                                        className="bg-[#F1EFEA] border border-[#E4E2DC] rounded-[12px] p-5 flex items-start gap-3.5"
                                    >
                                        <div className="w-8 h-8 rounded-[8px] bg-white border border-[#E4E2DC] flex items-center justify-center text-[#1E3A34] shrink-0 mt-0.5">
                                            <Sparkles size={15} />
                                        </div>
                                        <div>
                                            <p className="type-micro-badge text-[#8F8E88]">
                                                {item.label}
                                            </p>
                                            <p className="type-card-meta text-[#1A1A1A] mt-1 tabular-nums">
                                                {item.value}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Published Viewing Schedule */}
                        <motion.section variants={fadeUpItem(12, 0.42)} className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="type-section-heading text-[#1A1A1A]">
                                        Published Viewing Windows
                                    </h2>
                                    <p className="type-body text-[#5C5C58] mt-0.5">
                                        Select a window in the booking panel or click any slot below to reserve your private tour.
                                    </p>
                                </div>
                            </div>

                            {property.availableSlots?.length > 0 ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {property.availableSlots.map((slot, index) => (
                                        <motion.div
                                            key={slot._id || index}
                                            whileHover={{ y: -3 }}
                                            transition={{ duration: 0.22, ease: LUXURY_EASE }}
                                            onClick={openModal}
                                            className="bg-white border border-[#E4E2DC] hover:border-[#1E3A34] rounded-[12px] p-5 transition-colors cursor-pointer space-y-3"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="inline-flex items-center gap-2 text-xs font-semibold text-[#1E3A34] tabular-nums">
                                                    <Calendar size={14} />
                                                    <span>Viewing Window {index + 1}</span>
                                                </span>
                                                <span className="text-[11px] text-[#2E7D32] font-semibold tabular-nums">
                                                    {slot.times?.length || 0} {slot.times?.length === 1 ? "Slot" : "Slots"}
                                                </span>
                                            </div>

                                            <p className="font-serif-editorial text-lg text-[#1A1A1A]">
                                                {new Date(slot.date).toLocaleDateString('en-GB', {
                                                    weekday: 'long',
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                })}
                                            </p>

                                            <div className="flex flex-wrap gap-1.5 pt-1">
                                                {slot.times?.length > 0 ? (
                                                    slot.times.map((time, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-2.5 py-1 rounded-full bg-[#F1EFEA] border border-[#E4E2DC] text-xs font-medium text-[#1A1A1A] tabular-nums"
                                                        >
                                                            {time}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-xs text-[#8F8E88] italic">
                                                        No time slots listed
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-[#F1EFEA] border border-[#E4E2DC] rounded-[12px] p-6 text-sm text-[#5C5C58]">
                                    No open viewing dates are currently listed. Use the advisor contact details to arrange a bespoke appointment.
                                </div>
                            )}
                        </motion.section>
                    </motion.div>

                    {/* Right Column: Sticky Viewing & Advisor Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.16, ease: LUXURY_EASE }}
                        className="lg:col-span-4 space-y-6 lg:sticky lg:top-28"
                    >
                        {/* Schedule Viewing Card */}
                        <div className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 shadow-xs space-y-6">
                            <div className="flex items-center justify-between pb-4 border-b border-[#E4E2DC]">
                                <div>
                                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8F8E88]">
                                        Private Tour
                                    </span>
                                    <h3 className="font-serif-editorial text-xl font-normal text-[#1A1A1A]">
                                        Request a Viewing
                                    </h3>
                                </div>
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#F1EFEA] text-[11px] font-semibold text-[#1E3A34]">
                                    <CheckCircle2 size={12} />
                                    In-Person
                                </span>
                            </div>

                            <AppointmentBooking
                                instanceId="sidebar"
                                availableSlots={property.availableSlots}
                                onSelectionChange={setSelectedDetails}
                            />

                            <motion.button
                                type="button"
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={openModal}
                                className="w-full py-3.5 px-4 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                            >
                                Schedule Private Viewing
                            </motion.button>

                            <p className="text-[11px] text-center text-[#8F8E88]">
                                Direct scheduling with the listing representative • No booking fees
                            </p>
                        </div>

                        {/* Listing Advisor Card */}
                        <div className="bg-[#F1EFEA] border border-[#E4E2DC] rounded-[12px] p-6 space-y-5">
                            <div className="flex items-center justify-between">
                                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8F8E88]">
                                    Listed By
                                </span>
                                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1E3A34]">
                                    <ShieldCheck size={13} />
                                    Verified Advisor
                                </span>
                            </div>

                            <div className="flex items-center gap-4">
                                {property?.agent?.profileImage ? (
                                    <img
                                        src={property.agent.profileImage}
                                        alt={property?.agent?.fullName || "Listing Agent"}
                                        className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                                    />
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-[#1E3A34] text-white flex items-center justify-center font-serif-editorial text-xl font-semibold shrink-0">
                                        {property?.agent?.fullName?.[0] || "A"}
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <h4 className="font-serif-editorial text-lg font-medium text-[#1A1A1A] truncate">
                                        {property?.agent?.fullName || "Propvista Advisor"}
                                    </h4>
                                    <div className="flex items-center gap-1.5 text-xs text-[#5C5C58] mt-0.5">
                                        <Building2 size={13} className="text-[#1E3A34] shrink-0" />
                                        <span className="truncate">
                                            {property?.agent?.agencyName || "Partner Agency"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2.5 pt-2">
                                {property?.agent?.phone && (
                                    <a
                                        href={`tel:${property.agent.phone}`}
                                        className="flex items-center gap-3 w-full px-4 py-3 bg-white rounded-[8px] border border-[#E4E2DC] hover:border-[#1E3A34] text-[#1A1A1A] transition-colors"
                                    >
                                        <Phone size={15} className="text-[#1E3A34] shrink-0" />
                                        <span className="text-xs font-semibold tabular-nums">
                                            {property.agent.phone}
                                        </span>
                                    </a>
                                )}
                                {property?.agent?.email && (
                                    <a
                                        href={`mailto:${property.agent.email}`}
                                        className="flex items-center gap-3 w-full px-4 py-3 bg-white rounded-[8px] border border-[#E4E2DC] hover:border-[#1E3A34] text-[#1A1A1A] transition-colors"
                                    >
                                        <Mail size={15} className="text-[#1E3A34] shrink-0" />
                                        <span className="text-xs font-semibold truncate">
                                            {property.agent.email}
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.aside>
                </div>
            </div>

            {/* Mobile Sticky Bottom Action Bar */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E4E2DC] px-4 py-3 flex items-center justify-between gap-3 shadow-lg">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-[#8F8E88]">
                        Guide Price
                    </p>
                    <p className="font-sans-ui text-base font-semibold text-[#1A1A1A] tabular-nums">
                        ₦{Number(property.price || 0).toLocaleString()}
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    {property?.agent?.phone && (
                        <a
                            href={`tel:${property.agent.phone}`}
                            className="px-3.5 py-2.5 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] text-xs font-semibold text-[#1A1A1A] inline-flex items-center gap-1.5"
                        >
                            <Phone size={14} className="text-[#1E3A34]" />
                            <span>Call</span>
                        </a>
                    )}
                    <motion.button
                        type="button"
                        whileTap={{ scale: 0.96 }}
                        onClick={openModal}
                        className="px-5 py-2.5 rounded-[8px] bg-[#1E3A34] hover:bg-[#142824] text-white text-xs font-semibold transition-colors"
                    >
                        Schedule Viewing
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
