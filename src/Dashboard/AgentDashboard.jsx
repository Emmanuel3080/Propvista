import React, { useContext, useEffect } from 'react'
import { agentAuthContext } from '../Contexts/AgentAuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import PropVistaHeader from '../Common/AdminHeader'
import AgentProperties from './AgentProperties'

const AgentDashboard = () => {


    const { userInfo } = useContext(agentAuthContext)
    // console.log(userInfo);

    return (
        <div>

            <PropVistaHeader />

            <AgentProperties />




        </div>
    )
}

export default AgentDashboard