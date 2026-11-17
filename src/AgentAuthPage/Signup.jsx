import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Camera, User, ArrowRight } from 'lucide-react';
import backgroundImage from "../assets/Background3.jpg";
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { agentAuthContext } from '../Contexts/AgentAuthContext';
import { toast } from 'sonner';
import PropvistaLogo from '../Common/PropvistaLogo';

const agentSchema = yup.object({
    fullName: yup.string().required("Name Field Required"),
    email: yup.string().email("Invalid Email").required("Email Field Required"),
    password: yup
        .string()
        .min(6, "Minimum of Six Characters")
        .matches(/[a-z]/, "Password must contain lowercase Letter"),
    phone: yup.string().required("Phone Number Field Required"),
    agencyName: yup.string().required("Agency Name is required"),
    location: yup.string().required("Office Location is required"),
});

const AgentSignUp = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { SignUp, loading } = useContext(agentAuthContext);
    const [preview, setPreview] = useState(null);

    const { register, handleSubmit, watch } = useForm({
        resolver: yupResolver(agentSchema),
    });

    const handleErr = (formErr) => {
        const firstErr = Object.values(formErr)[0]?.message;
        if (firstErr) toast.error(firstErr);
    };

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    // eslint-disable-next-line react-hooks/incompatible-library
    const profileImageFile = watch("profileImage");

    useEffect(() => {
        if (profileImageFile && profileImageFile.length > 0) {
            const file = profileImageFile[0];
            const url = URL.createObjectURL(file);
            setPreview(url);

            return () => URL.revokeObjectURL(url);
        }
    }, [profileImageFile]);

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12">
            {/* Left Dark Architectural Column */}
            <div className="hidden lg:flex lg:col-span-5 relative bg-[#161817] overflow-hidden p-12 flex-col justify-between">
                <img
                    src={backgroundImage}
                    alt="Architectural residence"
                    className="absolute inset-0 w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161817] via-[#161817]/60 to-[#161817]/40" />

                <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <PropvistaLogo variant="light" size="md" />
                        <span className="px-2.5 py-0.5 rounded-full bg-[#1E3A34] border border-white/15 text-[11px] font-semibold text-white">
                            Agent Portal
                        </span>
                    </div>
                </div>

                <div className="relative z-10 max-w-md space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#C86D51] text-white text-[11px] font-semibold uppercase tracking-wider">
                        Partner Onboarding
                    </span>
                    <h2 className="font-serif-editorial text-4xl font-normal text-white leading-tight">
                        Present your properties with architectural distinction.
                    </h2>
                    <p className="text-sm text-[#F1EFEA]/80 leading-relaxed">
                        Create your partner advisor profile to publish verified listings and coordinate private viewings with qualified buyers.
                    </p>
                </div>
            </div>

            {/* Right Registration Form Column */}
            <div className="lg:col-span-7 flex items-center justify-center p-6 sm:p-10 lg:p-12">
                <div className="w-full max-w-xl space-y-6">
                    <div className="flex items-center justify-between lg:hidden pb-4 border-b border-[#E4E2DC]">
                        <div className="flex items-center gap-2.5">
                            <PropvistaLogo variant="dark" size="sm" />
                            <span className="px-2 py-0.5 rounded-full bg-[#1E3A34] text-white text-[10px] font-semibold">
                                Advisor
                            </span>
                        </div>
                        <Link
                            to="/agent/signin"
                            className="text-xs font-semibold text-[#1E3A34] hover:underline"
                        >
                            Sign In →
                        </Link>
                    </div>

                    <div className="space-y-1.5">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F8E88]">
                            Advisor Registration
                        </span>
                        <h1 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                            Create Partner Account
                        </h1>
                        <p className="text-sm text-[#5C5C58]">
                            Complete your agency credentials to start listing residences.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(SignUp, handleErr)}
                        className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 sm:p-8 space-y-6 shadow-xs"
                    >
                        {/* Profile Photo Upload */}
                        <div className="flex items-center gap-5 pb-5 border-b border-[#E4E2DC]">
                            <div className="relative">
                                <div className="h-20 w-20 rounded-full border-2 border-[#E4E2DC] overflow-hidden bg-[#F1EFEA] flex items-center justify-center">
                                    {preview ? (
                                        <img src={preview} alt="Advisor portrait preview" className="h-full w-full object-cover" />
                                    ) : (
                                        <User size={28} className="text-[#8F8E88]" />
                                    )}
                                </div>
                                <label
                                    htmlFor="profile-upload"
                                    className="absolute -bottom-1 -right-1 h-8 w-8 bg-[#1E3A34] hover:bg-[#142824] border-2 border-white text-white rounded-full flex items-center justify-center cursor-pointer transition-colors"
                                >
                                    <Camera size={13} />
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        className="sr-only"
                                        {...register("profileImage")}
                                    />
                                </label>
                            </div>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-[#1A1A1A]">
                                    Advisor Portrait
                                </p>
                                <p className="text-xs text-[#5C5C58] mt-0.5">
                                    Displayed on your residence listings • JPG or PNG
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="agent-fullname"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="agent-fullname"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    placeholder="Your full name"
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A]"
                                    {...register("fullName")}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="agent-email"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="agent-email"
                                    type="email"
                                    autoComplete="username"
                                    spellCheck={false}
                                    required
                                    placeholder="advisor@agency.com"
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A]"
                                    {...register("email")}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="agent-agency"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Agency / Brokerage Name
                                </label>
                                <input
                                    id="agent-agency"
                                    type="text"
                                    autoComplete="organization"
                                    required
                                    placeholder="e.g. Atelier Estates"
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A]"
                                    {...register("agencyName")}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="agent-phone"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Direct Telephone
                                </label>
                                <input
                                    id="agent-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    placeholder="+234..."
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A]"
                                    {...register("phone")}
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label
                                    htmlFor="agent-location"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Primary Office Location
                                </label>
                                <input
                                    id="agent-location"
                                    type="text"
                                    required
                                    placeholder="City, State (e.g. Victoria Island, Lagos)"
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A]"
                                    {...register("location")}
                                />
                            </div>

                            <div className="space-y-1.5 sm:col-span-2">
                                <label
                                    htmlFor="agent-password"
                                    className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="agent-password"
                                        type={passwordVisible ? "text" : "password"}
                                        autoComplete="new-password"
                                        required
                                        placeholder="Minimum 6 characters (include lowercase)"
                                        enterKeyHint="done"
                                        className="w-full h-11 pl-3.5 pr-11 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A]"
                                        {...register("password")}
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePassword}
                                        aria-label={passwordVisible ? "Hide password" : "Show password"}
                                        className="absolute right-0 top-0 h-full px-3.5 text-[#8F8E88] hover:text-[#1A1A1A] transition-colors cursor-pointer"
                                    >
                                        {passwordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-11 rounded-[8px] flex items-center justify-center gap-2 text-white text-sm font-semibold transition-colors ${
                                loading
                                    ? "bg-[#8F8E88] cursor-not-allowed"
                                    : "bg-[#1E3A34] hover:bg-[#142824] cursor-pointer"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <span>Creating Partner Account...</span>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Create Partner Account</span>
                                    <ArrowRight size={15} />
                                </>
                            )}
                        </button>

                        <div className="pt-5 border-t border-[#E4E2DC] text-center">
                            <p className="text-xs text-[#5C5C58]">
                                Already registered as a Propvista advisor?{" "}
                                <Link
                                    to="/agent/signin"
                                    className="text-[#1E3A34] font-semibold hover:underline ml-1"
                                >
                                    Sign in to your dashboard
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgentSignUp;
