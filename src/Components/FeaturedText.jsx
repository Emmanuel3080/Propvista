import React from 'react'

const FeaturedText = () => {
    return (
     <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-8 py-5 bg-gradient-to-r from-white to-sky-50 rounded-2xl md:rounded-full border border-sky-100/50 shadow-sm">
  
  {/* Header Section */}
  <div className="relative">
    <div className="absolute -left-2 -top-2 w-8 h-8 bg-emerald-100 rounded-full blur-xl opacity-60" />
    <h2 className="relative text-2xl md:text-3xl font-black tracking-tight text-slate-900 text-center md:text-left">
      Featured 
      <span className="ml-2 bg-gradient-to-r from-emerald-600 to-teal-400 bg-clip-text text-transparent">
        Listings
      </span>
    </h2>
  </div>

  {/* CTA Button Section */}
  <div className="shrink-0">
    <a
      href="#"
      className="group flex items-center gap-2 bg-white border-2 border-slate-900 text-slate-900 px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-400 hover:border-emerald-400 hover:text-white transition-all duration-300 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] hover:shadow-none hover:translate-x-[1px] hover:translate-y-[1px]"
    >
      View All
      <span className="group-hover:translate-x-1 transition-transform duration-300">
        →
      </span>
    </a>
  </div>

</div>
    )
}

export default FeaturedText