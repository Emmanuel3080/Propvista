import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { authContext } from '../Contexts/UserAuthContext';
import PropvistaLogo from '../Common/PropvistaLogo';
import bg1 from "../assets/Background3.jpg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const userSchema = yup.object({
    fullName: yup.string().required("Fullname Field Required"),
    email: yup.string().email("Invalid Email").required("Email Field is Required"),
    password: yup.string().min(6, "Password should be at least 6 characters").required("Password Field Required"),
    phoneNumber: yup.string().required("Phone Number Field Required"),
});

const SignupPage = () => {
    const { handleSignUp, loading } = useContext(authContext);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    const submitData = async (data) => {
        try {
            await handleSignUp(data);
        } catch (error) {
            console.log(error);
        }
    };

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(userSchema),
    });

    const handleErr = (error) => {
        const firstErr = Object.values(error)[0]?.message;
        if (firstErr) toast.error(firstErr);
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12">
            {/* Left Editorial Visual Column */}
            <div className="hidden lg:flex lg:col-span-6 relative bg-[#161817] overflow-hidden p-12 flex-col justify-between">
                <img
                    src={bg1}
                    alt="Architectural residence"
                    className="absolute inset-0 w-full h-full object-cover opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161817] via-[#161817]/50 to-[#161817]/40" />

                <div className="relative z-10 flex items-center justify-between">
                    <PropvistaLogo variant="light" size="md" />
                </div>

                <div className="relative z-10 max-w-lg space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#C86D51] text-white type-micro-badge">
                        Property Discovery & Viewings
                    </span>
                    <h2 className="font-serif-editorial text-4xl font-medium tracking-[-0.02em] text-white leading-tight">
                        Begin your property search.
                    </h2>
                    <p className="type-body text-[#F1EFEA]/80">
                        Create your account to browse verified residences, save your favorite spaces, and reserve private viewing appointments.
                    </p>
                </div>
            </div>

            {/* Right Sign-Up Form Column */}
            <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-lg space-y-8">
                    <div className="flex items-center justify-between lg:hidden pb-4 border-b border-[#E4E2DC]">
                        <PropvistaLogo variant="dark" size="sm" />
                    </div>

                    <div className="space-y-2">
                        <span className="type-micro-badge text-[#8F8E88]">
                            Create Account
                        </span>
                        <h1 className="type-property-title text-[#1A1A1A]">
                            Join Propvista
                        </h1>
                        <p className="type-body text-[#5C5C58]">
                            Elevate your real estate journey and start booking private property viewings.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(submitData, handleErr)}
                        className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 sm:p-8 space-y-5 shadow-xs"
                    >
                        <div className="space-y-1.5">
                            <label
                                htmlFor="signup-fullname"
                                className="block type-micro-badge text-[#5C5C58]"
                            >
                                Full Name
                            </label>
                            <input
                                id="signup-fullname"
                                type="text"
                                autoComplete="name"
                                required
                                placeholder="Your full name"
                                className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A] placeholder:text-[#8F8E88]"
                                {...register("fullName")}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="signup-email"
                                    className="block type-micro-badge text-[#5C5C58]"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="signup-email"
                                    type="email"
                                    autoComplete="username"
                                    spellCheck={false}
                                    required
                                    placeholder="name@example.com"
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A] placeholder:text-[#8F8E88]"
                                    {...register("email")}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label
                                    htmlFor="signup-phone"
                                    className="block type-micro-badge text-[#5C5C58]"
                                >
                                    Phone Number
                                </label>
                                <input
                                    id="signup-phone"
                                    type="tel"
                                    autoComplete="tel"
                                    required
                                    placeholder="+234..."
                                    className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A] placeholder:text-[#8F8E88]"
                                    {...register("phoneNumber")}
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="signup-password"
                                className="block type-micro-badge text-[#5C5C58]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="signup-password"
                                    type={passwordVisible ? "text" : "password"}
                                    autoComplete="new-password"
                                    required
                                    placeholder="Minimum 6 characters"
                                    enterKeyHint="done"
                                    className="w-full h-11 pl-3.5 pr-11 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A] placeholder:text-[#8F8E88]"
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

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full h-11 rounded-[8px] mt-2 flex items-center justify-center gap-2 text-white text-sm font-semibold transition-colors ${
                                loading
                                    ? "bg-[#8F8E88] cursor-not-allowed"
                                    : "bg-[#1E3A34] hover:bg-[#142824] cursor-pointer"
                            }`}
                        >
                            {loading ? (
                                <>
                                    <span>Creating Account...</span>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight size={15} />
                                </>
                            )}
                        </button>

                        <div className="pt-5 border-t border-[#E4E2DC] text-center">
                            <p className="text-xs text-[#5C5C58]">
                                Already a member?{" "}
                                <Link
                                    to="/signin"
                                    className="text-[#1E3A34] font-semibold hover:underline ml-1"
                                >
                                    Sign in here
                                </Link>
                            </p>
                        </div>
                    </form>

                    <p className="text-center text-xs text-[#8F8E88] leading-relaxed">
                        By registering, you agree to Propvista's Terms of Service and Privacy Policy regarding property viewings and data protection.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
