import React, { useState, useEffect } from 'react'
import './onboarding.css'


const Page = ({ children }) => {
    return (<div className='onboarding'>
        <div className='container'>
            <div className='welcome-img'>
                <h1>Welcome To The League</h1>
            </div>
            {children}
        </div>
    </div>);
}
export default Page