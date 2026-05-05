import React, { useContext, useEffect } from 'react'
import Header from '../Common/Header'
import HeroSection from '../Components/HeroSection'
import { propertyContext } from '../Contexts/PropertyContext'
import PropertyCard from '../Components/PropertyCard'

const UserDashboard = () => {

  const { fetchProperties, property } = useContext(propertyContext)

  console.log(property);


  useEffect(() => {
    fetchProperties()
  }, [])
  return (
    <div>
      <Header />

      <HeroSection />

  



      <h1 className='text-center text-3xl font-bold p-3'>Featured Properties</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-5'>
        {property.map((prop, index) => (
          <div key={prop._id || index}>
            <PropertyCard
              title={prop?.title}
              location={prop?.location}
              price={prop?.price}
              bedrooms={prop?.bedrooms}
              description={prop?.description}
              image={prop?.image}
              agent={prop?.agent}
              propertyType={prop?.propertyType}
            />
          </div>
        ))}
      </div>





    </div>
  )
}

export default UserDashboard