import React, { useContext, useEffect } from 'react'
import Header from '../Common/Header'
import { propertyContext } from '../Contexts/PropertyContext'
import { useParams } from 'react-router-dom'
import PropertyDetail from '../Components/PropertyDetail'

const SinglePropertyPage = () => {
    const { id } = useParams()


    const { singleProperty, singleProp } = useContext(propertyContext)





    useEffect(() => {
        singleProperty(id)
    }, [])


    console.log(singleProp);

    return (
        <div>
            <Header />

            <PropertyDetail property={singleProp}/>


        </div>
    )
}

export default SinglePropertyPage