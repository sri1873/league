import React, { useState, useEffect } from 'react'
import { Navigate, useLocation } from 'react-router-dom/dist';
import './onboarding.css'


const Page = ({ children }) => {
    const location=useLocation();
    return (
        <>
        {!sessionStorage.getItem("user")?
        <div className='onboarding'>
            <div className='container'>
                <div className='welcome-img'>
                    <h1>Welcome To The League</h1>
                </div>
                {children}
            </div>
        </div>:<Navigate to={'/'} state={{from: location}} replace/>
}
        </>
    );
}
export default Page