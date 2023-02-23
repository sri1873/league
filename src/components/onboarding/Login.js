import React, { useState, useEffect } from 'react'
import base from '../../apis/base'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import './onboarding.css'

const Login = () => {

    const [loginDetails, setLoginDetails] = useState({ "username": null, "password": null });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(loginDetails)
        base({
            method: 'POST',
            url: ``,
            data: loginDetails
        }).then(res => console.log(res))
    }
    const loginResource =
        <form className='row g-3' onSubmit={e => handleSubmit(e)}>
            <div className="col-12">
                <label className="form-label">Username</label>
                <input className="form-control" type={"email"} placeholder='Username' required onChange={e => setLoginDetails(prevState => ({ ...prevState, "username": e.target.value }))} />
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