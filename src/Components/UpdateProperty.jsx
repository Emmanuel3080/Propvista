import React, { useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeft, UploadCloud, Plus, Trash2, Calendar } from 'lucide-react';
import PropVistaHeader from '../Common/AdminHeader';
import { useFieldArray, useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { propertyContext } from '../Contexts/PropertyContext';
import TimeSlotsInput from './TimeSlotsInput';
import { toast } from 'sonner';

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

const UpdateProperty = () => {
    const { propertyId } = useParams();
    const { updateProperty, updateProp, singleProp, singleProperty } = useContext(propertyContext);

    const {
        register,
        control,
        handleSubmit,
        watch,
        reset,
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

    useEffect(() => {
        if (propertyId) {
            singleProperty(propertyId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [propertyId]);

    useEffect(() => {
        if (singleProp) {
            reset({
                title: singleProp.title || '',
                description: singleProp.description || '',
                price: singleProp.price || '',
                location: singleProp.location || '',
                propertyType: singleProp.propertyType || 'apartment',
                bedrooms: singleProp.bedrooms || 0,
                availableSlots: singleProp.availableSlots || [],
                image: "",
            });
        }
    }, [singleProp, reset]);

    const onSubmit = async (data) => {
        try {
            await updateProperty(data, propertyId);
        } catch (error) {
            console.log(error);
        }
    };

    const handleErr = (formErr) => {
        const errorValues = Object.values(formErr);
        if (errorValues.length > 0) {
            const firstErr = errorValues[0]?.message;
            if (firstErr) toast.error(firstErr);
        }
    };

    const { fields, append, remove } = useFieldArray({
        control,
        name: "availableSlots",
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const selectedImageName = watch("image")?.[0]?.name;

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] pb-20">
            <PropVistaHeader showSearch={false} showPostButton={false} />

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
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#1E3A34] border border-white/15 text-[10px] font-semibold uppercase tracking-wider">
                            Portfolio Management
                        </span>
                        <h1 className="font-serif-editorial text-2xl sm:text-3xl font-normal">
                            Update Residence Details
                        </h1>
                        <p className="text-xs sm:text-sm text-[#8F8E88]">
                            Refine pricing, architectural descriptions, photography, or viewing availability.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit, handleErr)} className="p-6 sm:p-10 space-y-8">
                        {/* Basic Info Group */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="update-title"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Residence Title
                                </label>
                                <input
                                    id="update-title"
                                    {...register("title")}
                                    placeholder="e.g. Modern 3-Bedroom Villa"
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="update-location"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Location
                                </label>
                                <input
                                    id="update-location"
                                    {...register("location")}
                                    placeholder="City, State"
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                                />
                            </div>
                        </div>

                        {/* Pricing, Type, Bedrooms */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="update-price"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Guide Price (₦)
                                </label>
                                <input
                                    id="update-price"
                                    type="number"
                                    {...register("price")}
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors tabular-nums"
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="update-type"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Property Classification
                                </label>
                                <select
                                    id="update-type"
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
                                    htmlFor="update-bedrooms"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Bedrooms
                                </label>
                                <input
                                    id="update-bedrooms"
                                    type="number"
                                    {...register("bedrooms")}
                                    className="w-full h-11 rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] px-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors tabular-nums"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-1.5">
                            <label
                                htmlFor="update-description"
                                className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                            >
                                Architectural Narrative & Description
                            </label>
                            <textarea
                                id="update-description"
                                {...register("description")}
                                rows="4"
                                placeholder="Describe the property..."
                                className="w-full rounded-[8px] border border-[#E4E2DC] bg-[#F9F8F6] p-3.5 text-sm text-[#1A1A1A] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors"
                            />
                        </div>

                        {/* Property Image */}
                        <div className="space-y-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]">
                                Residence Photograph
                            </label>

                            {singleProp?.image && !selectedImageName && (
                                <div className="flex items-center gap-3 p-3 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC]">
                                    <img
                                        src={singleProp.image}
                                        alt={singleProp.title || "Current photograph"}
                                        className="w-16 h-12 rounded-[6px] object-cover"
                                    />
                                    <span className="text-xs text-[#5C5C58]">
                                        Current photograph active • Upload a new file below to replace it
                                    </span>
                                </div>
                            )}

                            <div
                                className={`relative flex flex-col items-center justify-center w-full border border-dashed rounded-[12px] p-7 transition-colors ${
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
                                <UploadCloud size={24} className="text-[#1E3A34] mb-2" />
                                <p className="text-xs font-semibold text-[#1A1A1A]">
                                    {selectedImageName || "Click to upload a replacement photograph (optional)"}
                                </p>
                            </div>
                        </div>

                        {/* Availability Slots Section */}
                        <div className="space-y-4 pt-4 border-t border-[#E4E2DC]">
                            <div className="flex flex-wrap justify-between items-center gap-2">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                                        Viewing Availability
                                    </label>
                                    <p className="text-xs text-[#5C5C58]">
                                        Manage open dates and times for private client viewings.
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => append({ date: '', times: [''] })}
                                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[8px] bg-[#F1EFEA] border border-[#E4E2DC] hover:border-[#1E3A34] text-xs font-semibold text-[#1E3A34] transition-colors cursor-pointer"
                                >
                                    <Plus size={14} />
                                    <span>Add Date</span>
                                </button>
                            </div>

                            <div className="space-y-3">
                                {fields.map((field, index) => (
                                    <div
                                        key={field.id}
                                        className="bg-[#F9F8F6] p-4 sm:p-5 rounded-[12px] border border-[#E4E2DC] relative"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            aria-label="Remove date"
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
                        </div>

                        <div className="pt-4 border-t border-[#E4E2DC] flex items-center justify-end gap-3">
                            <Link
                                to="/dashboard"
                                className="px-5 py-3 rounded-[8px] border border-[#E4E2DC] bg-white text-xs font-semibold text-[#5C5C58] hover:text-[#1A1A1A] transition-colors"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                disabled={updateProp}
                                className={`px-7 py-3 rounded-[8px] flex items-center justify-center gap-2 text-white text-xs sm:text-sm font-semibold transition-colors ${
                                    updateProp
                                        ? "bg-[#8F8E88] cursor-not-allowed"
                                        : "bg-[#1E3A34] hover:bg-[#142824] cursor-pointer"
                                }`}
                            >
                                {updateProp ? (
                                    <>
                                        <span>Saving Changes...</span>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    </>
                                ) : (
                                    "Update Property"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProperty;
