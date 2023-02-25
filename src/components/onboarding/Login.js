import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom/dist'
import base from '../../apis/base'
import AuthContext from '../../context/AuthProvider'
import Decrypt from '../../helpers/decrypt'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import './onboarding.css'

const Login = () => {
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [loginDetails, setLoginDetails] = useState({ "email": null, "password": null });
    const handleSubmit = (e) => {
        e.preventDefault();
        sessionStorage.clear();
        base({
            method: 'POST',
            url: `api/v1/auth/login`,
            data: loginDetails,
            headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials': true },
        }).then(res => {
            Decrypt(res.data.data.token);
            setAuth({ 'user': sessionStorage.getItem('user') })
            navigate(from, { replace: true });
        })
    }
    const loginResource =
        <form className='row g-3' onSubmit={e => handleSubmit(e)}>
            <div className="col-12">
                <label className="form-label">Username</label>
                <input className="form-control" type={"email"} placeholder='Username' required onChange={e => setLoginDetails(prevState => ({ ...prevState, "email": e.target.value }))} />
            </div>
            <div className="col-12">
                <label className="form-label">Password</label>
                <input className="form-control" type={"password"} required placeholder='Password' onChange={e => setLoginDetails(prevState => ({ ...prevState, "password": e.target.value }))} />
            </div>
            <button className='col-12 btn btn-outline-success' type='submit'>Login</button>
        </form>;
    const signupResource =
        <div>
            <h1>Login</h1>
            <p style={{ color: "gray" }}>Don't have an account yet?
                <a href='/signUp'>Signup</a></p>
        </div>;
    return <div className='login'>{signupResource}{loginResource}</div>;
}
export default Login