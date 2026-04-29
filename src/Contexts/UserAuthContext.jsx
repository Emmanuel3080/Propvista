import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export const authContext = createContext()



const AuthProvider = ({ children }) => {


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [loadingLogin, setLoginLoading] = useState(false)
    const [userInfo, setUserInfo] = useState({})

    // const greet = () => {
    //     alert("Hello")p
    // }    
    const baseUrl = import.meta.env.VITE_API_URL
    // console.log(baseUrl);


    const handleSignUp = async (userData) => {
        setLoading(true)
        try {
            const response = await fetch(`${baseUrl}/users/auth/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })


            const data = await response.json()
            if (response.ok) {
                toast.success("Sign Up Successful")
                navigate("/signin")
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

    const handleSignIn = async (userData) => {
        setLoginLoading(true)
        try {
            const response = await fetch(`${baseUrl}/users/auth/signin`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })

            const data = await response.json()
            if (response.ok) {
                console.log(data);

                toast.success(`Welcome onboard ${data.data.fullName || "Sign In Successful"}`)
                localStorage.setItem("AccessToken", data.accessToken)
                navigate("/")
            }
            else {
                toast.error(`${data.Message || "Sign Up Failed"}`)
            }

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoginLoading(false)
        }
    }

    const checkAuthState = async () => {
        const token = localStorage.getItem("AccessToken")
        if (!token) {
            return false
        }
        try {
            const response = await fetch(`${baseUrl}/users/auth/verify_token`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await response.json()
            console.log(data);

            if (response.ok) {
                setUserInfo(data.user)
                return true
            }
            else {
                return false
            }
        } catch (error) {
            console.log(error);

        }
    }


    const authValue = {
        handleSignUp,
        handleSignIn,
        checkAuthState,
        loading,
        loadingLogin,
        userInfo
    }
    return (
        <>
            <authContext.Provider value={authValue}>{children}</authContext.Provider>
        </>
    )
}



export default AuthProvider