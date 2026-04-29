import React, { useContext, useEffect } from 'react'
import { authContext } from '../Contexts/UserAuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

const ProtectedRoute = () => {
    const { userInfo, checkAuthState } = useContext(authContext)

    const navigate = useNavigate()

    const isAuthenticated = async () => {
        try {
            const isAuth = await checkAuthState()
            if (!isAuth) {
                toast.error("Kindly Sign In")
                navigate("/signin")
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        isAuthenticated()
    }, [])

    return (
        <Outlet />
    )
}

export default ProtectedRoute