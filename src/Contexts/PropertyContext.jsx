import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



// eslint-disable-next-line react-refresh/only-export-components
export const propertyContext = createContext()



const DEFAULT_FILTERS = {
    locationQuery: "",
    propertyType: "all",
    priceRange: "all", // 'all' | 'under-5m' | '5m-25m' | '25m-100m' | 'above-100m'
    minBedrooms: "any",
    category: "all", // 'all' | 'architectural' | 'waterfront' | 'penthouse' | 'garden-villa' | 'new-build'
    savedOnly: false,
    sortBy: "newest"
};

const PropertyProvider = ({ children }) => {

    const [property, setProperty] = useState([])
    const [loadProperty, showProperty] = useState(false)
    const [showAgentProperty, setAgentProperty] = useState(false)
    const [agentProp, viewAgentProp] = useState([])
    const [addingProperty, setAddProperty] = useState(false)
    const [singleProp, setSingleProp] = useState({})
    const [deleteProp, setDelete] = useState(false)
    const [updateProp, setUpdateProp] = useState(false)
    const [searchFilters, setSearchFilters] = useState(DEFAULT_FILTERS)
    const [savedIds, setSavedIds] = useState(() => {
        try {
            const raw = localStorage.getItem("PropvistaSavedProperties")
            return raw ? JSON.parse(raw) : []
        } catch {
            return []
        }
    })

    const toggleSavedProperty = (id) => {
        if (!id) return
        setSavedIds((prev) => {
            const exists = prev.includes(id)
            const next = exists ? prev.filter((item) => item !== id) : [...prev, id]
            try {
                localStorage.setItem("PropvistaSavedProperties", JSON.stringify(next))
            } catch (e) {
                console.log(e)
            }
            toast.success(exists ? "Removed from Saved Properties" : "Saved to your collection")
            return next
        })
    }

    const isPropertySaved = (id) => Boolean(id && savedIds.includes(id))

    const resetSearchFilters = () => setSearchFilters(DEFAULT_FILTERS)


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
            if (response.ok) {
                toast.success(data.Message)
                navigate("/dashboard")
            }
            else {
                toast.error(data.Message || "Failed to post property")
            }
        } catch (error) {
            console.log(error);
        }
        finally {
            setAddProperty(false)
        }
    }



    const singleProperty = async (id) => {
        const token = localStorage.getItem("AccessToken") || localStorage.getItem("AgentAccessToken")
        try {
            const response = await fetch(`${baseUrl}/users/property/single/${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })

            const data = await response.json()
            if (response.ok) {
                console.log(data);
                setSingleProp(data.property)
            } else {
                const cached = agentProp?.find((item) => item._id === id)
                if (cached) {
                    setSingleProp(cached)
                } else {
                    toast.error("Unable to fetch Property")
                }
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




    const updateProperty = async (propertyData,id) => {
        setUpdateProp(true)
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
            const response = await fetch(`${baseUrl}/agent/property/update/${id}`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("AgentAccessToken")}`
                },
                body: payload
            })
            const data = await response.json()

            if (response.ok) {
                toast.success(data.Message)
                navigate("/dashboard")
            }
            else {
                toast.error(data.Message)
            }
        }
        catch (error) {
            console.log(error);
        }
        finally {
            setUpdateProp(false)
        }
    }


    const propertyValue = {
        fetchProperties,
        agentProperty,
        postProperty,
        singleProperty,
        deleteProperty,
        updateProperty,
        updateProp,
        deleteProp,
        addingProperty,
        property,
        loadProperty,
        agentProp,
        showAgentProperty,
        singleProp,
        savedIds,
        toggleSavedProperty,
        isPropertySaved,
        searchFilters,
        setSearchFilters,
        resetSearchFilters
    }
    return (
        <>
            <propertyContext.Provider value={propertyValue}>{children}</propertyContext.Provider>
        </>
    )
}


export default PropertyProvider