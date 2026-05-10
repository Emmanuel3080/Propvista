import React from 'react';

const PropertyCard = ({ title, location, price, bedrooms, description, image, propertyType, id }) => {
    if (!title) return null;

    return (

        <div className="group relative w-full max-w-[360px] bg-white rounded-[2.5rem] p-4 transition-all duration-500 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.2)] cursor-pointer">

            {/* Image Container with Floating Badge */}
            <div className="relative h-64 w-full overflow-hidden rounded-[2rem] bg-gray-100">
                <img
                    className="w-full h-full object-cover transition-transform duration-1000 ease-in-out group-hover:scale-110"
                    src={image}
                    alt={title}
                />

                {/* Modern Status Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-xl">
                    {/* <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> */}
                    <span className="text-[10px] font-bold text-white uppercase tracking-wider">{propertyType}</span>
                </div>

                {/* Overlapping Price Tag - Physical Depth */}
                <div className="absolute bottom-5 right-0 translate-y-1/2 bg-indigo-400 px-2 py-1.5 rounded-2xl shadow-[0_10px_25px_-5px_rgba(79,70,229,0.5)] z-10 transition-transform group-hover:scale-105">
                    <p className="text-white font-semibold font-black text-base tracking-tighter">
                        ₦{Number(price).toLocaleString()}
                    </p>
                </div>
            </div>

            {/* Content Area */}
            <div className="px-2 pt-8 pb-2">

                {/* Meta Row: Location & Stats */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-indigo-500/80">
                        <i className="fa-solid fa-location-dot text-[10px]"></i>
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{location}</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-bed text-gray-400 text-[11px]"></i>
                            <span className="text-xs font-bold text-gray-700">{bedrooms}</span>
                        </div>
                        {/* Adding a subtle divider */}
                        <div className="h-3 w-[1px] bg-gray-200" />
                        <div className="flex items-center gap-1">
                            <i className="fa-solid fa-shield-check text-indigo-400 text-[11px]"></i>
                            <span className="text-[10px] font-bold text-gray-500 uppercase">Verified</span>
                        </div>
                    </div>
                </div>

                {/* Main Title */}
                <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight leading-tight mb-3 group-hover:text-indigo-600 transition-colors duration-300">
                    {title}
                </h2>

                {/* Description with Inset Style */}
                <div className="relative border-l-2 border-indigo-50 pl-4 py-1">
                    <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2 italic">
                        {description}
                    </p>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    {/* <div className="flex -space-x-2">
                         Visual "Social Proof" elements are very modern right now
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-7 w-7 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                                <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="viewer" />
                            </div>
                        ))}
                        <div className="h-7 w-7 rounded-full border-2 border-white bg-gray-900 flex items-center justify-center text-[8px] font-bold text-white">
                            +12
                        </div>
                    </div> */}

                    <button className="flex items-center gap-2 group/btn">
                        <a href={`/single/${id}`} className="text-[11px] font-black uppercase tracking-widest text-gray-900 group-hover/btn:text-indigo-600 transition-colors">
                        <div className='flex items-center gap-1 '>
                          <h1>View Details</h1>

                             <div className="h-6 w-6 rounded-full bg-gray-900 flex items-center justify-center text-white transition-all group-hover/btn:bg-indigo-600 group-hover/btn:translate-x-1">
                            <i className="fa-solid fa-arrow-right-long text-[10px]"></i>
                        </div>

                        </div>
                        
                        </a>
                   
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;