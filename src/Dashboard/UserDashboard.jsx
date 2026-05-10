import React, { useContext, useEffect } from 'react'
import Header from '../Common/Header'
import HeroSection from '../Components/HeroSection'
import { propertyContext } from '../Contexts/PropertyContext'
import PropertyCard from '../Components/PropertyCard'
import FeaturedText from '../Components/FeaturedText'

const UserDashboard = () => {

  const { fetchProperties, property, loadProperty } = useContext(propertyContext)

  console.log(property);


  useEffect(() => {
    fetchProperties()
  }, [])
  return (
    <div>
      <Header />

      <HeroSection />




      <FeaturedText />
      <div className="px-4 py-1">
        {loadProperty ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {[...Array(4)].map((_, index) => (
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

export default UserDashboard