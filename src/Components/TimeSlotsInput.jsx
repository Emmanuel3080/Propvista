import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, X, Clock } from 'lucide-react';

const TimeSlotsInput = ({ nestIndex, control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `availableSlots.${nestIndex}.times`,
    });

    return (
        <div>
            <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5C5C58] mb-2">
                <Clock size={12} className="text-[#1E3A34]" />
                <span>Available Viewing Times</span>
            </label>
            <div className="flex flex-wrap items-center gap-2.5">
                {fields.map((field, k) => (
                    <div key={field.id} className="relative group flex items-center">
                        <input
                            type="time"
                            {...register(`availableSlots.${nestIndex}.times.${k}`)}
                            className="h-10 rounded-[8px] border border-[#E4E2DC] bg-white px-3 pr-8 text-xs font-medium text-[#1A1A1A] outline-none focus:border-[#1E3A34] tabular-nums"
                        />
                        <button
                            type="button"
                            onClick={() => remove(k)}
                            aria-label="Remove time slot"
                            className="absolute right-2 text-[#8F8E88] hover:text-[#C86D51] transition-colors cursor-pointer"
                        >
                            <X size={13} />
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={() => append("")}
                    className="h-10 px-3 rounded-[8px] border border-dashed border-[#8F8E88] text-xs font-semibold text-[#5C5C58] hover:border-[#1E3A34] hover:text-[#1E3A34] inline-flex items-center gap-1 transition-colors cursor-pointer bg-white"
                >
                    <Plus size={13} />
                    <span>Add Time</span>
                </button>
            </div>
        </div>
    );
};

export default TimeSlotsInput;
