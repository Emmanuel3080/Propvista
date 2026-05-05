import React from 'react';

const PropertyCard = ({ title, location, price, bedrooms, description, image, agent, propertyType }) => {
    // Guard clause
    if (!title) return null;

    return (

        <div>

        <div className="group relative flex flex-col w-full max-w-[380px] rounded-[2.5rem] bg-white p-3 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_60px_rgba(79,70,229,0.15)] transition-all duration-500 hover:-translate-y-2">
            
            {/* Image Container: Made smaller and "Inset" with padding */}
            <div className="relative h-60 w-full overflow-hidden rounded-[2rem]">
                <img
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    src={image}
                    alt={title}
                />
                
                {/* Glassmorphic Price Tag - Floating style */}
                {/* <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-xl border border-white/30 text-white text-xs font-black px-4 py-2 rounded-2xl shadow-lg">
                    ${price?.toLocaleString()}
                </div> */}

                {/* Property Type - Minimalist style */}
                <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md text-white text-[9px] font-bold px-3 py-1.5 rounded-xl uppercase tracking-widest border border-white/10">
                    {propertyType}
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col px-4 pt-6 pb-4">
                
                {/* Title & Price Header */}
                <div className="flex justify-between items-start mb-1">
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-indigo-600 transition-colors truncate">
                        {title}
                    </h2>
                </div>

                {/* Location with lighter typography */}
                <p className="text-xs font-semibold text-gray-400 flex items-center mb-4">
                    <i className="fa-solid fa-location-dot mr-1.5 text-indigo-500/60"></i>
                    {location}
                </p>

                {/* Description: More spacing and lighter font weight */}
                <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed mb-6">
                    {description}
                </p>

                {/* Modern Features Grid: Using subtle "pill" boxes */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex-1 flex flex-col items-center py-2 bg-gray-50 rounded-2xl border border-gray-100/50">
                        <i className="fa-solid fa-bed text-gray-400 text-[10px] mb-1"></i>
                        <span className="text-[11px] font-bold text-gray-800">{bedrooms}</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center py-2 bg-gray-50 rounded-2xl border border-gray-100/50">
                        <i className="fa-solid fa-bath text-gray-400 text-[10px] mb-1"></i>
                        <span className="text-[11px] font-bold text-gray-800">1.5</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center py-2 bg-gray-50 rounded-2xl border border-gray-100/50">
                        <i className="fa-solid fa-vector-square text-gray-400 text-[10px] mb-1"></i>
                        <span className="text-[11px] font-bold text-gray-800">1.2k</span>
                    </div>
                </div>

                {/* Footer: Agent & CTA */}
                {/* <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-400 flex items-center justify-center text-white text-[10px] shadow-lg shadow-indigo-200">
                            <i className="fa-solid fa-user-tie"></i>
                        </div>
                        <div className="ml-3">
                            <p className="text-[10px] font-bold text-gray-900 leading-none">
                                {agent?.fullName || "Agent Name"}
                            </p>
                            <p className="text-[8px] text-gray-400 font-bold uppercase mt-1 tracking-wider">
                                {agent?.agencyName || "Agency"}
                            </p>
                        </div>
                    </div>

                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-900 text-white text-[10px] font-bold hover:bg-indigo-600 transition-all shadow-md group-hover:scale-105">
                        Details <i className="fa-solid fa-arrow-right-long transition-transform group-hover:translate-x-1"></i>
                    </button>
                </div> */}
            </div>
        </div>

        </div>
    );
};

export default PropertyCard;