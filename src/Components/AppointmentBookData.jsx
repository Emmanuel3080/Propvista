import React, { useState, useEffect } from 'react';

// Add onSelectionChange to your props here!
const AppointmentBooking = ({ availableSlots, onSelectionChange }) => {
    const [selectedSlot, setSelectedSlot] = useState(
        availableSlots?.find(slot => slot.times.length > 0) || availableSlots?.[0]
    );
    const [selectedTime, setSelectedTime] = useState(null);

    // KEY FIX: This useEffect watches for changes and sends them to the parent
    useEffect(() => {
        if (onSelectionChange) {
            onSelectionChange({
                date: selectedSlot?.date || null,
                time: selectedTime || null
            });
        }
    }, [selectedSlot, selectedTime, onSelectionChange]);

    const parseDate = (dateStr) => {
        if (!dateStr) return { weekday: "", day: "", monthYear: "" };
        const d = new Date(dateStr);
        return {
            weekday: d.toLocaleDateString('en-US', { weekday: 'short' }),
            day: d.getDate(),
            monthYear: d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        };
    };

    if (!availableSlots || availableSlots.length === 0) {
        return <div className="text-slate-400 text-sm py-4">No appointments available.</div>;
    }

    return (
        <div className="flex flex-col h-full">
            {/* Date Row */}
            <section className="mb-8">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Select Date</h3>
                    <span className="text-xs font-semibold text-slate-900">
                        {selectedSlot ? parseDate(selectedSlot.date).monthYear : ""}
                    </span>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                    {availableSlots.map((slot) => {
                        const { weekday, day } = parseDate(slot.date);
                        const isSelected = selectedSlot?._id === slot._id;
                        const hasTimes = slot.times.length > 0;

                        return (
                            <button 
                                type='button'
                                key={slot._id}
                                onClick={() => {
                                    setSelectedSlot(slot);
                                    setSelectedTime(null); // Reset time when date changes
                                }}
                                className={`flex-shrink-0 w-14 h-16 rounded-2xl flex flex-col items-center justify-center transition-all border-2
                                    ${isSelected
                                        ? 'bg-slate-900 border-slate-900 text-white shadow-md'
                                        : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}
                                    ${!hasTimes && !isSelected ? 'opacity-40' : ''}`}
                            >
                                <span className="text-[9px] font-bold uppercase mb-0.5">{weekday}</span>
                                <span className="text-base font-bold">{day}</span>
                            </button>
                        );
                    })}
                </div>
            </section>

            {/* Time Grid */}
            <section className="mb-4">
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4">Available Times</h3>
                {selectedSlot?.times.length > 0 ? (
                    <div className="grid grid-cols-3 gap-2">
                        {selectedSlot.times.map((time) => (
                            <button 
                                type='button'
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 rounded-xl text-xs font-bold transition-all border
                                    ${selectedTime === time
                                        ? 'bg-blue-50 border-blue-200 text-blue-600'
                                        : 'bg-white border-slate-100 text-slate-600 hover:border-slate-300'}`}
                            >
                                {time}
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="py-8 rounded-2xl bg-slate-50 border border-dashed border-slate-200 flex flex-col items-center">
                        <p className="text-xs text-slate-400">No slots for this date</p>
                    </div>
                )}
            </section>

            {/* Visual Confirmation (Optional, since you have a form button below) */}
            <div className="mt-2 text-center">
                {selectedTime && (
                    <p className="text-[10px] text-blue-500 font-bold uppercase">
                        Selected: {parseDate(selectedSlot.date).day} {parseDate(selectedSlot.date).monthYear} at {selectedTime}
                    </p>
                )}
            </div>
        </div>
    );
};

export default AppointmentBooking;