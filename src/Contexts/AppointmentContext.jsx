import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";



export const appointmentContext = createContext()



const AppointmentProvider = ({ children }) => {


    // const greet = () => {
    //     alert("Hello")
    // }
    const baseUrl = import.meta.env.VITE_API_URL

    const navigate = useNavigate()
    const [appointmentdata, showAppointment] = useState([])
    const [loadAppointment, setLoadingAppointment] = useState(false)

    const AgentAppointments = async () => {
        const token = localStorage.getItem("AgentAccessToken");

        if (!token) {
            console.error("No Agent Access Token found");
            return;
        }
        setLoadingAppointment(true)
        try {

            const response = await fetch(`${baseUrl}/agent/appointments`, {
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data);
            if (response.ok) {
                showAppointment(data.appointments)
            }
            else {
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setLoadingAppointment(false)
        }
    }
    const appointmentValue = {
        AgentAppointments,
        appointmentdata,
        loadAppointment
    }

    return (
        <>
            <appointmentContext.Provider value={appointmentValue}>{children}</appointmentContext.Provider>
        </>
    )
}


export default AppointmentProvider