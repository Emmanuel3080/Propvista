import React, { useContext, useEffect } from 'react'
import Header from '../Common/Header'
import { propertyContext } from '../Contexts/PropertyContext'
import PropertyDetail from '../Components/PropertyDetail'
import PropertyCard from '../Components/PropertyCard'

const AllPropperties = () => {

    const { fetchProperties, loadProperty, property } = useContext(propertyContext)




    useEffect(() => {
        fetchProperties()
    }, [])

    console.log(property);

    return (
        <div>
            <Header />

            <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl">
                {/* Title Section */}
                <h1 className="text-4xl font-extrabold tracking-tight">
                    <span className="bg-gradient-to-tr from-slate-800 to-emerald-500 bg-clip-text text-transparent">
                        Explore Properties
                    </span>
                </h1>

                {/* Stats Section */}
                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end rounded-2xl border border-slate-100 bg-white px-6 py-3 shadow-sm transition-all hover:shadow-md">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                            Total Listings
                        </p>
                        <p className="text-2xl font-black text-slate-800">
                            {property?.length || 0}
                        </p>
                    </div>
                </div>
            </div>

            <div className="px-4 py-1">
                {loadProperty ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {[...Array(6)].map((_, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl shadow-md overflow-hidden animate-pulse"
                            >
                                <div className="h-56 bg-gray-300 w-full"></div>

                                <div className="p-5 space-y-4">
                                    <div className="h-5 bg-gray-300 rounded w-3/4"></div>

                                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>

                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>

                                    <div className="flex justify-between pt-4">
                                        <div className="h-5 bg-gray-300 rounded w-20"></div>
                                        <div className="h-5 bg-gray-300 rounded w-16"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : property.length === 0 ? (
                    <div className="flex items-center justify-center h-60 bg-gray-100 rounded-3xl border border-dashed border-gray-300">
                        <p className="text-gray-500 text-lg font-medium">
                            No Properties Added Yet
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                        {property.map((prop, index) => (
                            <div
                                key={prop._id || index}
                                className="transform transition duration-300 hover:-translate-y-1"
                            >
                                <a href={`/single/${prop._id}`}>
                                    <PropertyCard
                                        title={prop?.title}
                                        location={prop?.location}
                                        price={prop?.price}
                                        bedrooms={prop?.bedrooms}
                                        description={prop?.description}
                                        image={prop?.image}
                                        agent={prop?.agent}
                                        propertyType={prop?.propertyType}
                                        id={prop?._id}
                                    />

                                </a>

                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    )
}

export default AllPropperties