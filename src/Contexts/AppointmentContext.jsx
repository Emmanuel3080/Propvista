import { createContext, useState } from "react";
import { toast } from "sonner";



// eslint-disable-next-line react-refresh/only-export-components
export const appointmentContext = createContext()



const AppointmentProvider = ({ children }) => {


    // const greet = () => {
    //     alert("Hello")
    // }
    const baseUrl = import.meta.env.VITE_API_URL

    const [appointmentdata, showAppointment] = useState([])
    const [loadAppointment, setLoadingAppointment] = useState(false)
    const [loadBooking, setBooking] = useState(false)
    const [loadApproval, setApproval] = useState(null)
    const [loadCancel, setCancellation] = useState(null)




    const BookAppointment = async (propertyId, agentId, selectedSlot, message) => {
        // Ensure we have a selection before sending
        if (!selectedSlot?.date || !selectedSlot?.time) {
            toast.error("Please select an available date and time slot");
            return;
        }

        setBooking(true)
        const token = localStorage.getItem("AccessToken");

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
                    time: selectedSlot.time,
                    message: message
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



    const approveAppoinment = async (id) => {
        setApproval(id)
        const token = localStorage.getItem("AgentAccessToken");
        try {

            const response = await fetch(`${baseUrl}/agent/appointment/confirm/${id}`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.Message)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            else {
                toast.error(data.Message)
            }
        } catch (error) {
            console.log(error);

        }
        finally {
            setApproval(null)
        }
    }



    const cancelAppointment = async (id) => {

        setCancellation(id)
        const token = localStorage.getItem("AgentAccessToken");
        try {
            const response = await fetch(`${baseUrl}/agent/appointment/cancel/${id}`, {
                method: "PATCH",
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                toast.success(data.Message)
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            else {
                toast.error(data.Message)
            }


        } catch (error) {
            console.log(error);

        }
        finally {
            setCancellation(null)
        }
    }
    const appointmentValue = {
        AgentAppointments,
        BookAppointment,
        approveAppoinment,
        cancelAppointment,
        loadCancel,
        loadApproval,
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