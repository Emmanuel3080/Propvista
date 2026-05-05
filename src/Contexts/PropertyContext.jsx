import { createContext, useState } from "react";



export const propertyContext = createContext()



const PropertyProvider = ({ children }) => {

    const [property, setProperty] = useState([])



    const baseUrl = import.meta.env.VITE_API_URL

    const fetchProperties = async () => {
        const token = localStorage.getItem("AccessToken")
        try {
            const response = await fetch(`${baseUrl}/users/property/all`, {
                headers: {
                    "Content-Type": "application.json",
                    authorization: `Bearer ${token} `
                }
            })
            const data = await response.json()
            if (response.ok) {
                console.log(data);
                setProperty(data.properties)

            }

        } catch (error) {
            console.log(error);

        }
    }

    const propertyValue = {
        fetchProperties,
        property
    }
    return (
        <>
            <propertyContext.Provider value={propertyValue}>{children}</propertyContext.Provider>
        </>
    )
}


export default PropertyProvider