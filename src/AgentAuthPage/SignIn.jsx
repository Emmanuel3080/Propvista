import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import bg1 from "../assets/Background3.jpg";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { agentAuthContext } from '../Contexts/AgentAuthContext';
import PropvistaLogo from '../Common/PropvistaLogo';

const agentSchema = yup.object({
    userEmail: yup.string().email("Invalid Email").required("Email Field Required"),
    password: yup
        .string()
        .min(6, "Minimum of Six Characters")
        .matches(/[a-z]/, "Password must contain lowercase Letter"),
});

const AgentSignin = () => {
    const { handleSignIn, loadingLogin } = useContext(agentAuthContext);
    const [passwordVisible, setPasswordVisible] = useState(false);

    const submitData = async (data) => {
        try {
            await handleSignIn(data);
        } catch (error) {
            console.log(error);
        }
    };

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(agentSchema),
    });

    const handleErr = (formErr) => {
        const firstErr = Object.values(formErr)[0]?.message;
        if (firstErr) toast.error(firstErr);
    };

    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    };

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] grid grid-cols-1 lg:grid-cols-12">
            {/* Left Dark Architectural Column */}
            <div className="hidden lg:flex lg:col-span-6 relative bg-[#161817] overflow-hidden p-12 flex-col justify-between">
                <img
                    src={bg1}
                    alt="Architectural portfolio management"
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

                <div className="relative z-10 max-w-lg space-y-4">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#C86D51] text-white text-[11px] font-semibold uppercase tracking-wider">
                        Partner Agency Suite
                    </span>
                    <h2 className="font-serif-editorial text-4xl font-normal text-white leading-tight">
                        Curate your portfolio and manage private viewings.
                    </h2>
                    <p className="text-sm text-[#F1EFEA]/80 leading-relaxed">
                        Sign in to publish architectural listings, configure viewing windows, and confirm client appointment requests.
                    </p>
                </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    <div className="flex items-center justify-between lg:hidden pb-4 border-b border-[#E4E2DC]">
                        <div className="flex items-center gap-2.5">
                            <PropvistaLogo variant="dark" size="sm" />
                            <span className="px-2 py-0.5 rounded-full bg-[#1E3A34] text-white text-[10px] font-semibold">
                                Agent
                            </span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8F8E88]">
                            Partner Authentication
                        </span>
                        <h1 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#1A1A1A]">
                            Advisor Sign In
                        </h1>
                        <p className="text-sm text-[#5C5C58]">
                            Access your dashboard to manage properties and client viewings.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit(submitData, handleErr)}
                        className="bg-white border border-[#E4E2DC] rounded-[12px] p-6 sm:p-8 space-y-5 shadow-xs"
                    >
                        <div className="space-y-1.5">
                            <label
                                htmlFor="agent-signin-email"
                                className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                            >
                                Advisor Email
                            </label>
                            <input
                                id="agent-signin-email"
                                type="email"
                                autoComplete="username"
                                spellCheck={false}
                                required
                                placeholder="advisor@agency.com"
                                className="w-full h-11 px-3.5 bg-[#F9F8F6] border border-[#E4E2DC] rounded-[8px] outline-none focus:border-[#1E3A34] focus:bg-white transition-colors text-sm text-[#1A1A1A] placeholder:text-[#8F8E88]"
                                {...register("userEmail")}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label
                                htmlFor="agent-signin-password"
                                className="block text-xs font-semibold uppercase tracking-wider text-[#5C5C58]"
                            >
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="agent-signin-password"
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
                                    <span>Authenticating...</span>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                </>
                            ) : (
                                <>
                                    <span>Sign In to Dashboard</span>
                                    <ArrowRight size={15} />
                                </>
                            )}
                        </button>

                        <div className="pt-5 border-t border-[#E4E2DC] text-center">
                            <p className="text-xs text-[#5C5C58]">
                                Don't have an advisor account?{" "}
                                <Link
                                    to="/agent/signup"
                                    className="text-[#1E3A34] font-semibold hover:underline ml-1"
                                >
                                    Register your agency
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AgentSignin;
