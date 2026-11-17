import { createContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


// eslint-disable-next-line react-refresh/only-export-components
export const agentAuthContext = createContext()

const AgentAuthProvider = ({ children }) => {


    const baseUrl = import.meta.env.VITE_API_URL

    const [loading, setLoading] = useState(false)
    const [loadingLogin, setLogin] = useState(false)
    const [userInfo, setuserInfo] = useState({})

    const navigate = useNavigate()


    const SignUp = async (agentData) => {

        setLoading(true)

        try {
            const payload = new FormData()
            payload.append("fullName", agentData.fullName)
            payload.append("email", agentData.email)
            payload.append("password", agentData.password)
            payload.append("phone", agentData.phone)
            payload.append("agencyName", agentData.agencyName)
            payload.append("location", agentData.location)

            if (agentData.profileImage && agentData.profileImage[0]) {
                payload.append("profileImage", agentData.profileImage[0]);
            }


            const response = await fetch(`${baseUrl}/agent/auth/signup`, {
                method: "POST",
                headers: {
                    // 
                },
                body: payload
            })
            const data = await response.json()
            if (response.ok) {
                toast.success("Sign Up Successful")
                navigate("/agent/signin")
            }
            else {
                toast.error(`${data.Message || "Sign Up Failed"}`)
            }

        } catch (error) {
            console.log(error);


        }
        finally {
            setLoading(false)
        }
    }



    const handleSignIn = async (agentData) => {
        setLogin(true)
        try {
            const response = await fetch(`${baseUrl}/agent/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(agentData)
            })


            const data = await response.json()
            if (response.ok) {
                localStorage.setItem("AgentAccessToken", data.accessToken)
                toast.success(`Welcome Onboard ${data.userDetails.name || "Sign Up Successful"} Redirecting....`)
                navigate("/dashboard")
            }
            else {
                toast.error(`${data.Message || "Sign Up Failed"}`)
            }

        } catch (error) {
            console.log(error);

        }
        finally {
            setLogin(false)
        }
    }



    const isAuthenticated = async () => {
        const token = localStorage.getItem("AgentAccessToken")
        if (!token) {
            return false
        }
        try {
            const response = await fetch(`${baseUrl}/agent/auth/verify_token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setuserInfo(data.user)
                return true
            }
            else {
                return false
            }

        } catch (error) {
            console.log(error);

        }
    }



    const logout = () => {
        localStorage.removeItem("AgentAccessToken")
        setuserInfo({})
        toast.success("Logged out successfully")
        navigate("/agent/signin")
    }

    const authValue = {
        SignUp,
        handleSignIn,
        isAuthenticated,
        logout,
        userInfo,
        loading,
        loadingLogin
    }


    return (
        <>
            <agentAuthContext.Provider value={authValue}>{children}</agentAuthContext.Provider>
        </>
    )


}


export default AgentAuthProvider