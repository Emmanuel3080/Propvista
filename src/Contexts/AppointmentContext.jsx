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
    const [loadBooking, setBooking] = useState(false)




    const BookAppointment = async (propertyId, agentId, selectedSlot) => {
        setBooking(true)
        const token = localStorage.getItem("AccessToken");

        // Ensure we have a selection before sending
        if (!selectedSlot.date || !selectedSlot.time) {
            console.error("No date or time selected");
            return;
        }

        try {
            const response = await fetch(`${baseUrl}/users/appointment_book`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    propertyId,
                    agentId,
                    date: selectedSlot.date,
                    time: selectedSlot.time
                })
            });

            const data = await response.json();
            if (response.ok) {
                toast.success(`${data.Message} Kindly check your mail for more information`)
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
            setBooking(false)
        }
    };


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
        BookAppointment,
        loadBooking,
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