import React, { useState } from 'react';
import PropVistaHeader from '../Common/AdminHeader';
import AgentProperties from './AgentProperties';

const AgentDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A]">
            <PropVistaHeader
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
            />
            <AgentProperties searchQuery={searchQuery} />
        </div>
    );
};

export default AgentDashboard;
