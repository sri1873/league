import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom/dist';
import './onboarding.css'


const Onboarding = ({ children }) => {
    const location=useLocation();
    const user = useSelector ((state) => {
        return state.isValid
    })
    return (
        <>
        {!user?
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
export default Onboarding