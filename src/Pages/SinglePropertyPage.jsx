import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Common/Header';
import DashboardFooter from '../Common/DashboardFooter';
import { propertyContext } from '../Contexts/PropertyContext';
import PropertyDetail from '../Components/PropertyDetail';

const SinglePropertyPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { singleProperty, singleProp } = useContext(propertyContext);

    useEffect(() => {
        if (id) {
            singleProperty(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
        <div className="min-h-screen bg-[#F9F8F6] text-[#1A1A1A] flex flex-col">
            <Header />
            <main className="flex-1">
                <PropertyDetail property={singleProp} onBack={() => navigate(-1)} />
            </main>
            <DashboardFooter />
        </div>
    );
};

export default SinglePropertyPage;
