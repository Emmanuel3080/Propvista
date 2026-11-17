import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import bg1 from "../assets/Background3.jpg";
import { authContext } from '../Contexts/UserAuthContext';
import PropvistaLogo from '../Common/PropvistaLogo';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const loginSchema = yup.object({
    userEmail: yup.string().email("Invalid Email").required("Email Field is Required"),
    password: yup.string().min(6, "Password should be at least 6 characters").required("Password Field Required"),
});

const SignInPage = () => {
    const { handleSignIn, loadingLogin } = useContext(authContext);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(loginSchema),
    });

    const handleError = (err) => {
        const formErr = Object.values(err)[0]?.message;
        if (formErr) toast.error(formErr);
    };

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12">
            {/* Left Editorial Visual Column */}
            <div className="hidden lg:flex lg:col-span-6 relative bg-[#161817] overflow-hidden p-12 flex-col justify-between">
                <img
                    src={bg1}
                    alt="Architectural residence exterior"
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
                        Spaces designed for how you live.
                    </h2>
                    <p className="type-body text-[#F1EFEA]/80">
                        Sign in to explore curated architectural residences, manage your saved properties, and schedule private viewings.
                    </p>
                </div>
            </div>

            {/* Right Sign-In Form Column */}
            <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    {/* Mobile Brand Header */}
                    <div className="flex items-center justify-between lg:hidden pb-4 border-b border-[#E4E2DC]">
                        <PropvistaLogo variant="dark" size="sm" />
                    </div>

                    <div className="space-y-2">
                        <span className="type-micro-badge text-[#8F8E88]">
                            Welcome Back
                        </span>
                        <h1 className="type-property-title text-[#1A1A1A]">
                            Sign in to Propvista
                        </h1>
                        <p className="type-body text-[#5C5C58]">
                            Enter your credentials to access your account and saved residences.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(handleSignIn, handleError)}
                        className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 sm:p-8 space-y-5 shadow-xs"
                    >
                        <div className="space-y-1.5">
                            <label
                                htmlFor="signin-email"
                                className="block type-micro-badge text-[#5C5C58]"
                            >
                                Email Address
                            </label>
                            <input
                                id="signin-email"
                                type="email"
                                autoComplete="username"
                                spellCheck={false}
                                required
                                placeholder="name@example.com"
                                className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A] placeholder:text-[#8F8E88]"
                                {...register("userEmail")}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="signin-password"
                                className="block type-micro-badge text-[#5C5C58]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="signin-password"
                                    type={passwordVisible ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                    placeholder="Enter your password"
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
                            disabled={loadingLogin}
                            className={`w-full h-11 rounded-[8px] mt-2 flex items-center justify-center gap-2 text-white text-sm font-semibold transition-colors ${
                                loadingLogin
                                    ? "bg-[#8F8E88] cursor-not-allowed"
                                    : "bg-[#1E3A34] hover:bg-[#142824] cursor-pointer"
                            }`}
                        >
                            {loadingLogin ? (
                                <>
                                    <span>Signing In...</span>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight size={15} />
                                </>
                            )}
                        </button>

                        <div className="pt-5 border-t border-[#E4E2DC] text-center">
                            <p className="text-xs text-[#5C5C58]">
                                Don't have an account?{" "}
                                <Link
                                    to="/signup"
                                    className="text-[#1E3A34] font-semibold hover:underline ml-1"
                                >
                                    Create an account
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;
