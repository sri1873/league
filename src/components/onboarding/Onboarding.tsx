import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom/dist';
import logo from "../../assets/logo.png";
import { State } from '../../store';
import './onboarding.css';


const Onboarding: React.FC<React.PropsWithChildren> = ({ children }) => {
    const location = useLocation();
    const user = useSelector((state: State) => {
        return state.auth.isValid
    })
    return (
        <>
            {!user ?
                <div className='onboarding'>
                    <a className="navbar-brand flex-column logo-login">
                        <img alt="Woxsen Logo" src={logo} width="100" height="60" />
                    </a>
                    <div className='contain'>
                        <div className='welcome-img'>
                            <h1>Welcome To The League</h1>
                        </div>
                        {children}
                    </div>
                </div> : <Navigate to={'/'} state={{ from: location }} replace />
            }
        </>
    );
}
export default Onboarding