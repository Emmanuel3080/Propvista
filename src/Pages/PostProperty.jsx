import React, { useContext } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import PropVistaHeader from '../Common/AdminHeader';
import { agentAuthContext } from '../Contexts/AgentAuthContext';
import TimeSlotsInput from '../Components/TimeSlotsInput';

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { toast } from 'sonner';
import { propertyContext } from '../Contexts/PropertyContext';


const propertySchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    location: yup.string().required("Location is required"),
    price: yup.number().typeError("Price must be a number").required("Price is required").positive("Price must be greater than zero"),
    propertyType: yup.string().oneOf(['apartment', 'duplex', 'bungalow', 'land', 'commercial']).required("Description is Required"),
    bedrooms: yup.number().min(0, "Cannot be negative").integer().required("Number of Bedroom is Required"),
    description: yup.string().required("Description is required"),

    // Validating the nested Slots
    availableSlots: yup.array().of(
        yup.object().shape({
            date: yup.string()
                .required("Date is required"),
            times: yup.array()
                .of(yup.string().required("Time slot cannot be empty"))
                .min(1, "At least one time slot is required for each date")
        })
    )
});




const PostPropertyForm = () => {
    const { userInfo } = useContext(agentAuthContext);
    const { postProperty, addingProperty, } = useContext(propertyContext)

    const { register, control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            description: '',
            price: '',
            location: '',
            propertyType: 'apartment',
            bedrooms: 0,
            image: '',
            availableSlots: [] // Starts empty
        },
        resolver: yupResolver(propertySchema)

    });
    // console.log(errors);

    const handleErr = (formErr) => {
        const firstErr = Object.values(formErr)[0].message
        toast.error(firstErr)
    }


    // Handle the array of date objects
    const { fields, append, remove } = useFieldArray({
        control,
        name: "availableSlots"
    });

    // const onSubmit = async (data) => {
    //     const finalData = { ...data, agent: userInfo?._id };
    // };

    return (
        <div>
            <PropVistaHeader showPostButton={false} showSearch={false} />
            <div className="max-w-6xl mx-auto p-4 md:p-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">

                    <div className="bg-slate-600 p-8 text-white">
                        <h2 className="text-2xl font-black uppercase tracking-tight">List New Property</h2>
                        <p className="text-slate-400 text-xs uppercase tracking-widest mt-2">Fill in the details to reach potential clients</p>
                    </div>

                    <form onSubmit={handleSubmit(postProperty, handleErr)} className="p-6 md:p-10 space-y-6">

                        {/* Basic Info Group */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Property Title</label>
                                <input
                                    {...register("title", { required: true })}
                                    placeholder="e.g. Modern 3-Bedroom Villa"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Location</label>
                                <input
                                    {...register("location")}
                                    placeholder="City, State"
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Pricing, Type, Bedrooms */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Price ($)</label>
                                <input
                                    type="number"
                                    {...register("price", { required: true })}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Property Type</label>
                                <select
                                    {...register("propertyType")}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all appearance-none"
                                >
                                    <option value="apartment">Apartment</option>
                                    <option value="duplex">Duplex</option>
                                    <option value="bungalow">Bungalow</option>
                                    <option value="land">Land</option>
                                    <option value="commercial">Commercial</option>
                                </select>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Bedrooms</label>
                                <input
                                    type="number"
                                    {...register("bedrooms")}
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Description</label>
                            <textarea
                                {...register("description", { required: true })}
                                rows="4"
                                placeholder="Describe the property..."
                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
                            />
                        </div>
                        {/* Property Image */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">
                                Property Image
                            </label>
                            <div className={`relative flex items-center justify-center w-full border-2 border-dashed rounded-2xl p-4 transition-all ${errors.image ? "border-red-400 bg-red-50" : "border-slate-200 bg-slate-50 hover:border-emerald-400"
                                }`}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    {...register("image")}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="text-center">
                                    <i className={`fas fa-cloud-upload-alt mb-2 ${errors.image ? "text-red-400" : "text-slate-400"}`}></i>
                                    <p className="text-xs text-slate-500 font-medium">
                                        {watch("image")?.[0]?.name || "Click to upload or drag and drop"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Availability Slots Section */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                                <label className="text-[11px] font-bold uppercase text-slate-500 ml-1">Viewing Availability</label>
                                <button
                                    type="button"
                                    onClick={() => append({ date: '', times: [''] })}
                                    className="text-[10px] bg-emerald-50 text-slate-600 px-3 py-1 rounded-full font-bold uppercase hover:bg-emerald-100 transition-colors"
                                >
                                    + Add Date
                                </button>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {fields.map((field, index) => (
                                    <div key={field.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 relative">
                                        <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className="absolute top-2 right-2 text-slate-400 hover:text-red-500 text-xs"
                                        >
                                            <i className="fas fa-times"></i>
                                        </button>

                                        <div className="flex flex-col md:flex-row gap-4">
                                            <div className="flex-1">
                                                <label className="text-[10px] font-bold text-slate-400 uppercase mb-1 block">Date</label>
                                                <input
                                                    type="date"
                                                    {...register(`availableSlots.${index}.date`)}
                                                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400"
                                                />
                                            </div>

                                            {/* Nested Time Slots Array */}
                                            <div className="flex-[2]">
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

                        <div className="pt-4">
                            <button
                                type="submit"
                                className={`w-full py-4 rounded-xl mt-4 flex items-center justify-center gap-2 text-white font-semibold transition-all 
                            ${addingProperty ? "bg-gray-500 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700 cursor-pointer "}`}
                                disabled={addingProperty}
                            >
                                {addingProperty ? (
                                    <>
                                        <span>Processing</span>
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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

export default PostPropertyForm