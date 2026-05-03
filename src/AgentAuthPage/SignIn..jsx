import React, { useContext, useState } from 'react'
import bg1 from "../assets/Background3.jpg";


import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { agentAuthContext } from '../Contexts/AgentAuthContext';


const agentSchema = yup.object({
  userEmail: yup.string().email("Inavlid Email").required("Email Filed Required"),
  password: yup.string().min(6, "Minimum of Six Charcters").matches(/[a-z]/, "Password must contain lowercase Letter"),
})


const AgentSignin = () => {
  const { handleSignIn, loadingLogin } = useContext(agentAuthContext)

  const [passwordVisible, setPasswordVisible] = useState(false);

  const submitData = async (data) => {
    try {
      await handleSignIn(data)
    } catch (error) {
      console.log(error);

    }
  }

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(agentSchema)
  })


  const handleErr = (formErr) => {
    const firstErr = Object.values(formErr)[0].message
    toast.error(firstErr)
  }

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  }
  return (
    <div className='min-h-screen bg-slate-50 flex items-center justify-center relative overflow-hidden font-sans'>


      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 to-emerald-50/20 z-0"></div>

        <div
          className="absolute inset-0 opacity-100 bg-cover bg-center"
          style={{ backgroundImage: `url(${bg1})` }}
        ></div>
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
      </div>



      <div className="relative z-10 w-full max-w-2xl p-4">


        <form className='bg-white/20 backdrop-blur-2xl border border-white/40 p-10 rounded-3xl shadow-2xl shadow-slate-200 space-y-5' onSubmit={handleSubmit(submitData, handleErr)} >

          <div className="flex flex-col items-center justify-center mb-10 space-y-3">

            <div className="flex items-center gap-2">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900">
                Prop<span className="text-slate-500">Vista</span>
              </h1>
              <span className="bg-gradient-to-l from-slate-800 to-slate-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                Agent
              </span>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-500">
                Access your dashboard to manage properties and clients.
              </p>
            </div>

          </div>

          <div className='space-y-4'>
            <div className="relative group">
              <i className="fa fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-slate-600 transition-colors"></i>
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-xl outline-none focus:ring-1 focus:ring-slate-400 transition-all text-slate-900 font-medium placeholder:text-slate-400"
                {...register("userEmail")}
              />
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
                            ${loadingLogin ? "bg-gray-500 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-700 cursor-pointer "}`}
            disabled={loadingLogin}
          >
            {loadingLogin ? (
              <>
                <span>Authenticating User</span>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </>
            ) : (
              "Sign In"
            )}
          </button>


          <div className="pt-6 border-t border-slate-200/60 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?
              <a href="/agent/signup" className="text-blue-700 hover:text-blue-800 ml-1.5 font-semibold transition-colors">
                Create an account
              </a>
            </p>
          </div>
        </form>
      </div>


    </div>
  )
}

export default AgentSignin