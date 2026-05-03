import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { agentAuthContext } from '../Contexts/AgentAuthContext'
import { toast } from 'sonner'

const AgentProtected = () => {
  const { isAuthenticated, userInfo, } = useContext(agentAuthContext)


  const navigate = useNavigate()

  const isAuth = async () => {
    try {
      const checkAuth = await isAuthenticated()
      if (!checkAuth) {
        toast.error("Kindly Sign In")
        navigate("/agent/signin")
      }
    } catch (error) {
      console.log(error);

    }
  }


  useEffect(() => {
    isAuth()
  }, [])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AgentProtected