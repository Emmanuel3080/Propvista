import React, { useContext, useState } from 'react';
import { authContext } from '../Contexts/UserAuthContext';
import bg1 from "../assets/Background3.jpg";

import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';



const userSchema = yup.object({
    fullName: yup.string().required("Fullname Field Required"),
    email: yup.string().email("Invalid Email").required("Email Field is Required"),
    password: yup.string().min(6, "Password should be at least 6 characters").required("Password Field Required"),
    phoneNumber: yup.string().required("Phone Number Field Required")

})

const SignupPage = () => {
    const { handleSignUp, loading } = useContext(authContext);

    const [passwordVisible, setPasswordVisible] = useState(false);



    const togglePassword = () => {
        setPasswordVisible(!passwordVisible);
    }




    const submitData = async (data) => {
        try {
            await handleSignUp(data)
        } catch (error) {
            console.log(error);

        }
    }


    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(userSchema)
    })


    const handleErr = (error) => {
        const firstErr = Object.values(error)[0].message
        toast.error(firstErr)
    }



    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden font-sans">

            <div className="absolute top-0 left-0 w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-emerald-50/20 z-0"></div>

                <div
                    className="absolute inset-0 opacity-100 bg-cover bg-center"
                    style={{ backgroundImage: `url(${bg1})` }}
                ></div>
                <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
            </div>
            <div className="relative z-10 w-full max-w-2xl p-4">
                <form className="bg-white/20 backdrop-blur-2xl border border-white/40 p-10 rounded-3xl shadow-2xl shadow-slate-200 space-y-5" onSubmit={handleSubmit(submitData, handleErr)}>

                    <div className="text-center mb-9">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight">
                            Prop<span className="text-slate-700">vista</span>
                        </h1>
                        <p className="text-slate-700 text-base mt-3 max-w-sm mx-auto">
                            Elevate your real estate journey. Create an account to start booking elite property viewings.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div className="relative group">
                            <i className="fa fa-user absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors"></i>
                            <input
                                type="text"
                                placeholder="Name"
                                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                {...register("fullName")}
                            />
                        </div>

                        {/* Contact Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="relative group">
                                <i className="fa fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors"></i>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none  focus:ring-1 focus:ring-slate-400 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                    {...register("email")}
                                />
                            </div>

                            <div className="relative group">
                                <i className="fa fa-phone absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors"></i>
                                <input
                                    type="tel"
                                    placeholder="+234"
                                    className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none  focus:ring-1 focus:ring-slate-400 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                    {...register("phoneNumber")}
                                />
                            </div>
                        </div>
                        <div className="relative group">
                            <i className="fa fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors"></i>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                placeholder="*******"
                                className="w-full pl-12 pr-12 py-4 bg-white border border-slate-200 rounded-xl outline-none  focus:ring-1 focus:ring-slate-400 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute right-0 top-0 h-full px-4 text-slate-400 hover:text-slate-600 transition-colors rounded-r-xl"
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
                            Already a member?
                            <a href="/signin" className="text-blue-700 hover:text-blue-800 ml-1.5 font-semibold transition-colors">
                                Sign in here
                            </a>
                        </p>
                    </div>
                </form>

                <p className="text-center text-black text-sm mt-2 px-10">
                    By registering, you agree to Propvista's Terms of Service and Privacy Policy regarding property viewings and data protection.
                </p>
            </div >
        </div >
    );
};

export default SignupPage;