import React from 'react';
import { useFieldArray } from 'react-hook-form';

const TimeSlotsInput = ({ nestIndex, control, register }) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `availableSlots.${nestIndex}.times`
    });

    return (
        <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Available Times</label>
            <div className="flex flex-wrap gap-2">
                {fields.map((field, k) => (
                    <div key={field.id} className="relative group">
                        <input
                            type="time"
                            {...register(`availableSlots.${nestIndex}.times.${k}`)}
                            className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400 bg-white"
                        />
                        <button 
                            type="button" 
                            onClick={() => remove(k)}
                            className="absolute -top-1 -right-1 bg-white text-red-500 border border-slate-200 rounded-full w-4 h-4 flex items-center justify-center text-[8px] opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                ))}
                <button 
                    type="button"
                    onClick={() => append("")}
                    className="w-10 h-10 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-emerald-400 hover:text-emerald-500 transition-all"
                >
                    +
                </button>
            </div>
        </div>
    );
};

export default TimeSlotsInput;