import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LUXURY_EASE } from '../utils/motion';

const AppointmentBooking = ({ availableSlots, onSelectionChange, instanceId = "default" }) => {
    const [selectedSlot, setSelectedSlot] = useState(
        availableSlots?.find((slot) => slot?.times?.length > 0) || availableSlots?.[0] || null
    );
    const [selectedTime, setSelectedTime] = useState(null);

    const activeSlot =
        selectedSlot ||
        availableSlots?.find((slot) => slot?.times?.length > 0) ||
        availableSlots?.[0] ||
        null;

    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange({
                date: activeSlot?.date || null,
                time: selectedTime || null,
            });
        }
    }, [activeSlot, selectedTime, onSelectionChange]);

    const parseDate = (dateStr) => {
        if (!dateStr) return { weekday: "", day: "", monthShort: "", monthYear: "" };
        const d = new Date(dateStr);
        return {
            weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
            day: d.getDate(),
            monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
            monthYear: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        };
    };

    if (!availableSlots || availableSlots.length === 0) {
        return (
            <div className="p-4 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] text-xs text-[#5C5C58]">
                No viewing dates have been published for this residence yet. Contact the listing advisor directly to request a custom time.
            </div>
        );
    }

    return (
        <div className="space-y-5">
            {/* Available Viewing Dates */}
            <div>
                <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5C5C58]">
                        <Calendar size={13} className="text-[#1E3A34]" />
                        <span>Select Viewing Date</span>
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={activeSlot?.date || "month"}
                            initial={{ opacity: 0, y: 3 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -3 }}
                            transition={{ duration: 0.18, ease: LUXURY_EASE }}
                            className="text-xs font-medium text-[#1A1A1A]"
                        >
                            {activeSlot ? parseDate(activeSlot.date).monthYear : ""}
                        </motion.span>
                    </AnimatePresence>
                </div>

                <div className="flex gap-2.5 overflow-x-auto pb-1.5 no-scrollbar">
                    {availableSlots.map((slot, idx) => {
                        const { weekday, day, monthShort } = parseDate(slot.date);
                        const isSelected =
                            (activeSlot?._id && activeSlot._id === slot._id) ||
                            activeSlot?.date === slot.date;
                        const hasTimes = slot?.times?.length > 0;

                        return (
                            <motion.button
                                type="button"
                                key={slot._id || `${slot.date}-${idx}`}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.96 }}
                                transition={{ duration: 0.2, ease: LUXURY_EASE }}
                                onClick={() => {
                                    setSelectedSlot(slot);
                                    setSelectedTime(null);
                                }}
                                className={`relative shrink-0 min-w-[68px] py-2.5 px-3 rounded-[8px] flex flex-col items-center justify-center transition-colors border cursor-pointer tabular-nums overflow-hidden ${
                                    isSelected
                                        ? 'border-[#1E3A34] text-white shadow-xs'
                                        : 'bg-[#F9F8F6] border-[#E4E2DC] text-[#1A1A1A] hover:border-[#1E3A34]'
                                } ${!hasTimes && !isSelected ? 'opacity-50' : ''}`}
                            >
                                {isSelected && (
                                    <motion.span
                                        layoutId={`${instanceId}-booking-date-pill`}
                                        transition={{ duration: 0.26, ease: LUXURY_EASE }}
                                        className="absolute inset-0 bg-[#1E3A34]"
                                    />
                                )}
                                <span
                                    className={`relative z-10 text-[10px] font-semibold uppercase tracking-wider ${
                                        isSelected ? 'text-white/80' : 'text-[#8F8E88]'
                                    }`}
                                >
                                    {weekday}
                                </span>
                                <span className="relative z-10 text-base font-semibold leading-tight my-0.5 tabular-nums">
                                    {day}
                                </span>
                                <span
                                    className={`relative z-10 text-[10px] font-medium ${
                                        isSelected ? 'text-white/80' : 'text-[#5C5C58]'
                                    }`}
                                >
                                    {monthShort}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Available Time Slots */}
            <div>
                <div className="flex items-center justify-between mb-2.5">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5C5C58]">
                        <Clock size={13} className="text-[#1E3A34]" />
                        <span>Available Time Slots</span>
                    </span>
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    {activeSlot?.times?.length > 0 ? (
                        <motion.div
                            key={activeSlot?._id || activeSlot?.date || "slots"}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.22, ease: LUXURY_EASE }}
                            className="grid grid-cols-3 gap-2"
                        >
                            {activeSlot.times.map((time, i) => {
                                const active = selectedTime === time;
                                return (
                                    <motion.button
                                        type="button"
                                        key={`${time}-${i}`}
                                        whileHover={{ y: -1 }}
                                        whileTap={{ scale: 0.96 }}
                                        transition={{ duration: 0.18, ease: LUXURY_EASE }}
                                        onClick={() => setSelectedTime(time)}
                                        className={`relative py-2.5 px-2 rounded-[8px] text-xs font-semibold transition-colors border cursor-pointer tabular-nums overflow-hidden ${
                                            active
                                                ? 'border-[#1E3A34] text-white'
                                                : 'bg-[#F9F8F6] border-[#E4E2DC] text-[#1A1A1A] hover:border-[#1E3A34]'
                                        }`}
                                    >
                                        {active && (
                                            <motion.span
                                                layoutId={`${instanceId}-booking-time-pill`}
                                                transition={{ duration: 0.24, ease: LUXURY_EASE }}
                                                className="absolute inset-0 bg-[#1E3A34]"
                                            />
                                        )}
                                        <span className="relative z-10">{time}</span>
                                    </motion.button>
                                );
                            })}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="no-slots"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="py-5 px-4 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] text-center"
                        >
                            <p className="text-xs text-[#5C5C58]">No time slots listed for this date</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Selected Slot Summary */}
            <AnimatePresence initial={false}>
                {activeSlot?.date && selectedTime && (
                    <motion.div
                        key={`${activeSlot.date}-${selectedTime}`}
                        initial={{ opacity: 0, y: 6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.24, ease: LUXURY_EASE }}
                        className="p-3 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] flex items-center justify-between text-xs"
                    >
                        <span className="inline-flex items-center gap-1.5 text-[#5C5C58] font-medium">
                            <CheckCircle2 size={13} className="text-[#2E7D32]" />
                            <span>Selected Slot:</span>
                        </span>
                        <span className="font-semibold text-[#1E3A34] tabular-nums">
                            {parseDate(activeSlot.date).day} {parseDate(activeSlot.date).monthYear} • {selectedTime}
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AppointmentBooking;
