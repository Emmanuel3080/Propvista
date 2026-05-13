import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



export const propertyContext = createContext()



const PropertyProvider = ({ children }) => {

    const [property, setProperty] = useState([])
    const [loadProperty, showProperty] = useState(false)
    const [showAgentProperty, setAgentProperty] = useState(false)
    const [agentProp, viewAgentProp] = useState([])
    const [addingProperty, setAddProperty] = useState(false)
    const [singleProp, setSingleProp] = useState({})
    const [deleteProp, setDelete] = useState(false)


    const navigate = useNavigate()



    const baseUrl = import.meta.env.VITE_API_URL

    const fetchProperties = async () => {
        showProperty(true)
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
        finally {
            showProperty(false)
        }
    }



    const agentProperty = async (agentId) => {
        setAgentProperty(true)
        try {
            const response = await fetch(`${baseUrl}/agent/agent_property/${agentId}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("AgentAccessToken")}`
                }

            })
            const data = await response.json()
            if (response.ok) {
                // console.log(data);
                viewAgentProp(data.property)
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setAgentProperty(false)
        }
    }



    const postProperty = async (propertyData) => {
        setAddProperty(true)

        try {
            const payload = new FormData()
            payload.append("title", propertyData.title)
            payload.append("description", propertyData.description)
            payload.append("price", propertyData.price)
            payload.append("location", propertyData.location)
            payload.append("propertyType", propertyData.propertyType)
            payload.append("bedrooms", propertyData.bedrooms)
            payload.append('availableSlots', JSON.stringify(propertyData.availableSlots));

            if (propertyData.image && propertyData.image[0]) {
                payload.append("image", propertyData.image[0])
            }
            const response = await fetch(`${baseUrl}/agent/post/property`, {
                method: "POST",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("AgentAccessToken")}`
                },
                body: payload
            })
            const data = await response.json()
            if (response.json) {
                toast.success(data.Message)
                navigate("/dashboard")
            }
            else {
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setAddProperty(false)
        }
    }



    const singleProperty = async (id) => {
        try {
            const response = await fetch(`${baseUrl}/users/property/single/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${localStorage.getItem("AccessToken")}`
                }
            })

            const data = await response.json()
            if (response.ok) {
                console.log(data);
                setSingleProp(data.property)
            } else {
                toast.error("Unable to fetch Property")
            }

        } catch (error) {
            console.log(error);

        }
    }




    const deleteProperty = async (id) => {
        setDelete(true)
        try {

            const response = await fetch(`${baseUrl}/agent/property/delete/${id}`, {
                method: "DELETE",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("AgentAccessToken")}`
                },
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.Message)
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            }
            else {
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setDelete(false)
        }
    }

    const propertyValue = {
        fetchProperties,
        agentProperty,
        postProperty,
        singleProperty,
        deleteProperty,
        deleteProp,
        addingProperty,
        property,
        loadProperty,
        agentProp,
        showAgentProperty,
        singleProp
    }
    return (
        <>
            <propertyContext.Provider value={propertyValue}>{children}</propertyContext.Provider>
        </>
    )
}


export default PropertyProvider