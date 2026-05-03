import React, { useContext, useEffect, useState } from 'react';
import backgroundImage from "../assets/Background3.jpg";
import { useForm } from 'react-hook-form';
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { agentAuthContext } from '../Contexts/AgentAuthContext';
import { toast } from 'sonner';

const agentSchema = yup.object({
    fullName: yup.string().required("Name Field Required"),
    email: yup.string().email("Inavlid Email").required("Email Filed Required"),
    password: yup.string().min(6, "Minimum of Six Charcters").matches(/[a-z]/, "Password must contain lowercase Letter"),
    phone: yup.string().required("Phone Number Field Required"),
    agencyName: yup.string().required(""),
    location: yup.string().required()
})

const AgentSignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { SignUp, loading } = useContext(agentAuthContext)

    const [preview, setPreview] = useState(null)
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(agentSchema)
    });





    const handleErr = (formErr) => {
        const firstErr = Object.values(formErr)[0].message
        toast.error(firstErr)

    }
    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    }


    const profileImageFile = watch("profileImage");

    useEffect(() => {
        if (profileImageFile && profileImageFile.length > 0) {
            const file = profileImageFile[0];
            const url = URL.createObjectURL(file);
            setPreview(url);

            // Clean up memory when component unmounts or file changes
            return () => URL.revokeObjectURL(url);
        }
    }, [profileImageFile]);



    return (
        <div className='min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden font-sans py-12'>
            {/* Background Layers */}
            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-emerald-50/20 z-0"></div>
                <div
                    className="absolute inset-0 opacity-100 bg-cover bg-center"
                    style={{ backgroundImage: `url(${backgroundImage})` }}
                ></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
            </div>

            <div className="relative z-10 w-full max-w-3xl p-1">
                <form
                    className='bg-white/20 backdrop-blur-2xl border border-white/40 p-10 rounded-3xl shadow-2xl space-y-5' onSubmit={handleSubmit(SignUp, handleErr)}
                >
                    <div className="flex flex-col items-center justify-center mb-10 space-y-3">

                        <div className="flex items-center gap-2">
                            <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                                Prop<span className="text-slate-500">Vista</span>
                            </h1>

                            <span className="bg-gradient-to-r from-slate-800 to-slate-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                Agent
                            </span>
                        </div>

                        <div className="text-center">
                            <p className="text-sm text-slate-500">
                                Create your account to start listing properties and managing clients.
                            </p>
                        </div>

                    </div>
                    <div>
                        <div className="md:col-span-2 flex flex-col items-center justify-center space-y-4 py-4">
                            <div className="relative group">
                                {/* Profile Image Circle */}
                                <div className="h-28 w-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center transition-all group-hover:ring-4 group-hover:ring-blue-500/10">
                                    {preview ? (
                                        <img src={preview} alt="Preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex flex-col items-center">
                                            <i className="fa fa-user text-slate-300 text-3xl"></i>
                                        </div>
                                    )}
                                </div>

                                {/* Floating Upload Button */}
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute bottom-0 right-0 h-9 w-9 bg-slate-900 border-2 border-white text-white rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors shadow-sm"
                                >
                                    <i className="fa fa-camera text-xs"></i>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        {...register("profileImage")}
                                    />
                                </label>
                            </div>

                            {/* Helper Text */}
                            <div className="text-center">
                                <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                                    Profile Photo
                                </p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                    JPG, PNG or GIF • Max 5MB
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                                {...register("fullName")}
                            />

                        </div>

                        <div className="relative group">
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                                {...register("email")}
                            />
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Agency Name"
                                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                                {...register("agencyName")}
                            />
                        </div>

                        <div className="relative group">
                            <input
                                type="tel"
                                placeholder="Phone Number"
                                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                                {...register("phone")}
                            />
                        </div>

                        <div className="relative group md:col-span-2">
                            <input
                                type="text"
                                placeholder="Office Location (City, State)"
                                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                                {...register("location")}
                            />
                        </div>

                        <div className="relative group md:col-span-2">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="Create Password"
                                className="w-full px-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-4 top-4 text-slate-400"
                            >
                                <i className={`fa ${passwordVisible ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                            </button>
                        </div>


                    </div>

                    <button
                        type="submit"
                        className={`w-full py-4 rounded-xl mt-4 flex items-center justify-center gap-2 text-white font-semibold transition-all 
                            ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700 cursor-pointer "}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <span>Processing</span>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            </>
                        ) : (
                            "Create Account"
                        )}
                    </button>

                    <div className="pt-6 border-t border-slate-200/60 text-center">
                        <p className="text-slate-600 text-sm">
                            Already have an account?
                            <a href="/agent/signin" className="text-blue-700 hover:text-blue-800 ml-1.5 font-semibold">
                                Log in
                            </a>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentSignUp;