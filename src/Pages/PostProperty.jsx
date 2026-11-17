import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { ChevronLeft, UploadCloud, Plus, Trash2, Calendar } from 'lucide-react';
import PropVistaHeader from '../Common/AdminHeader';
import TimeSlotsInput from '../Components/TimeSlotsInput';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from 'sonner';
import { propertyContext } from '../Contexts/PropertyContext';

const propertySchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    location: yup.string().required("Location is required"),
    price: yup
        .number()
        .typeError("Price must be a number")
        .required("Price is required")
        .positive("Price must be greater than zero"),
    propertyType: yup
        .string()
        .oneOf(['apartment', 'duplex', 'bungalow', 'land', 'commercial'])
        .required("Property type is Required"),
    bedrooms: yup
        .number()
        .min(0, "Cannot be negative")
        .integer()
        .required("Number of Bedroom is Required"),
    description: yup.string().required("Description is required"),

    availableSlots: yup.array().of(
        yup.object().shape({
            date: yup.string().required("Date is required"),
            times: yup
                .array()
                .of(yup.string().required("Time slot cannot be empty"))
                .min(1, "At least one time slot is required for each date"),
        })
    ),
});

const PostPropertyForm = () => {
    const { postProperty, addingProperty } = useContext(propertyContext);

    const {
        register,
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
            price: '',
            location: '',
            propertyType: 'apartment',
            bedrooms: 0,
            image: '',
            availableSlots: [],
        },
        resolver: yupResolver(propertySchema),
    });

    const handleErr = (formErr) => {
        const firstErr = Object.values(formErr)[0]?.message;
        if (firstErr) toast.error(firstErr);
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "availableSlots",
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const selectedImageName = watch("image")?.[0]?.name;

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-20">
            <PropVistaHeader showPostButton={false} showSearch={false} />

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
                <div className="flex items-center justify-between">
                    <Link
                        to="/dashboard"
                        className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white border border-[#E4E2DC] hover:border-[#1E3A34] text-xs font-semibold text-[#1A1A1A] transition-colors"
                    >
                        <ChevronLeft size={15} />
                        <span>Back to Portfolio</span>
                    </Link>
                </div>

                <div className="bg-white rounded-[12px] border border-[#E4E2DC] shadow-xs overflow-hidden">
                    <div className="bg-[#161817] px-6 sm:px-10 py-8 text-white space-y-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#C86D51] text-[10px] font-semibold uppercase tracking-wider">
                            New Residence Listing
                        </span>
                        <h1 className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                            Publish a Residence
                        </h1>
                        <p className="text-xs sm:text-sm text-[#8F8E88]">
                            Provide architectural specifications, photography, and private viewing availability.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(postProperty, handleErr)} className="p-6 sm:p-10 space-y-8">
                        {/* Title & Location */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="post-title"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Residence Title
                                </label>
                                <input
                                    id="post-title"
                                    {...register("title", { required: true })}
                                    placeholder="e.g. The Solis Contemporary Villa"
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="post-location"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Location
                                </label>
                                <input
                                    id="post-location"
                                    {...register("location")}
                                    placeholder="Neighborhood, City (e.g. Ikoyi, Lagos)"
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Price, Type, Bedrooms */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="post-price"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Guide Price (₦)
                                </label>
                                <input
                                    id="post-price"
                                    type="number"
                                    {...register("price", { required: true })}
                                    placeholder="e.g. 85000000"
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors tabular-nums"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="post-type"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Property Classification
                                </label>
                                <select
                                    id="post-type"
                                    {...register("propertyType")}
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                >
                                    <option value="apartment">Apartment</option>
                                    <option value="duplex">Duplex</option>
                                    <option value="bungalow">Bungalow</option>
                                    <option value="land">Land</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="post-bedrooms"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Bedrooms
                                </label>
                                <input
                                    id="post-bedrooms"
                                    type="number"
                                    {...register("bedrooms")}
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors tabular-nums"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="post-description"
                                className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                            >
                                Architectural Narrative & Description
                            </label>
                            <textarea
                                id="post-description"
                                {...register("description", { required: true })}
                                rows="4"
                                placeholder="Describe the spatial layout, natural light, materials, and neighborhood setting..."
                                className="w-full rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] p-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                            />
                        </div>

                        {/* Primary Photograph Upload */}
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]">
                                Primary Residence Photograph
                            </label>
                            <div
                                className={`relative flex flex-col items-center justify-center w-full border border-dashed rounded-[12px] p-8 transition-colors ${
                                    errors.image
                                        ? "border-[#C86D51] bg-[#C86D51]/5"
                                        : "border-[#8F8E88] bg-[#F9F8F6] hover:border-[#1E3A34]"
                                }`}
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <UploadCloud size={26} className="text-[#1E3A34] mb-2" />
                                <p className="text-xs font-semibold text-[#1A1A1A]">
                                    {selectedImageName || "Click to select or drop high-resolution photography"}
                                </p>
                                <p className="text-[11px] text-[#8F8E88] mt-1">
                                    Recommended 16:10 landscape orientation • JPG, PNG, WebP
                                </p>
                            </div>
                        </div>

                        {/* Viewing Availability Slots */}
                        <div className="space-y-4 pt-4 border-t border-[#E4E2DC]">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                                        Private Viewing Windows
                                    </label>
                                    <p className="text-xs text-[#5C5C58]">
                                        Add available dates and time slots for prospective clients to book.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ date: '', times: [''] })}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] hover:border-[#1E3A34] text-xs font-semibold text-[#1E3A34] transition-colors cursor-pointer"
                                >
                                    <Plus size={14} />
                                    <span>Add Viewing Date</span>
                                </button>
                            </div>

                            {fields.length === 0 ? (
                                <div className="p-6 rounded-[12px] bg-[#F1EFEA] border border-[#E4E2DC] text-center text-xs text-[#5C5C58]">
                                    No viewing dates added yet. Click "Add Viewing Date" above to publish open tour windows.
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {fields.map((field, index) => (
                                        <div
                                            key={field.id}
                                            className="bg-[#F9F8F6] p-4 sm:p-5 rounded-[12px] border border-[#E4E2DC] relative"
                                        >
                                            <button
                                                type="button"
                                                onClick={() => remove(index)}
                                                aria-label="Remove viewing date"
                                                className="absolute top-3.5 right-3.5 text-[#8F8E88] hover:text-[#C86D51] transition-colors cursor-pointer"
                                            >
                                                <Trash2 size={15} />
                                            </button>

                                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start pr-6">
                                                <div className="md:col-span-4">
                                                    <label className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#5C5C58] uppercase tracking-wider mb-2">
                                                        <Calendar size={12} className="text-[#1E3A34]" />
                                                        <span>Date</span>
                                                    </label>
                                                    <input
                                                        type="date"
                                                        {...register(`availableSlots.${index}.date`)}
                                                        className="w-full h-10 rounded-[8px] border border-[#E4E2DC] bg-white px-3 text-xs font-medium text-[#1A1A1A] outline-none focus:border-[#1E3A34]"
                                                    />
                                                </div>

                                                <div className="md:col-span-8">
                                                    <TimeSlotsInput
                                                        nestIndex={index}
                                                        control={control}
                                                        register={register}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Submit Action */}
                        <div className="pt-4 border-t border-[#E4E2DC] flex items-center justify-end gap-3">
                            <Link
                                to="/dashboard"
                                className="px-5 py-3 rounded-[8px] border border-[#E4E2DC] bg-white text-xs font-semibold text-[#5C5C58] hover:text-[#1A1A1A] transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={addingProperty}
                                className={`px-7 py-3 rounded-[8px] flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-semibold transition-colors ${
                                    addingProperty
                                        ? "bg-[#8F8E88] cursor-not-allowed"
                                        : "bg-[#1E3A34] hover:bg-[#142824] cursor-pointer"
                                }`}
                            >
                                {addingProperty ? (
                                    <>
                                        <span>Publishing Residence...</span>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    </>
                                ) : (
                                    "Publish Property"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default PostPropertyForm;
