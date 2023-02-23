import React, { useState, useEffect } from 'react'
import base from '../../apis/base'
// import { Formik, Form, Field, ErrorMessage } from 'formik';
import './onboarding.css'

const SignUp = () => {

    const [signUpDetails, setSignUpDetails] = useState({ "username": null, "password": null, "phoneNumber": null });
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(signUpDetails)
        base({
            method: 'POST',
            url: ``,
            data: signUpDetails
        }).then(res => console.log(res))
    }
    // onChange={e => setSignUpDetails(prevState => ({ ...prevState, "username": e.target.value }))}
    const signUpResource =
            <form className="row g-3" onSubmit={e => handleSubmit(e)}>
                <div class="col-12 input-group">
                    <span class="input-group-text">First and last name</span>
                    <input type="text" aria-label="First name" class="form-control" />
                    <input type="text" aria-label="Last name" class="form-control" />
                </div>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <div className='input-group flex-nowrap'><span class="input-group-text">@</span>
                        <input type="email" class="form-control" id="inputEmail4" /></div>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Mobile</label>
                    <input type="password" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-6">
                    <label for="inputAddress" class="form-label">Password</label>
                    <input type="text" class="form-control" id="inputAddress" placeholder="Shh! Its's a secret" />
                </div>
                <div class="col-md-6">
                    <label for="inputAddress2" class="form-label">Confirm Password</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Should be same as password" />
                </div>
                <div class="col-md-6">
                    <label for="inputState" class="form-label">Branch</label>
                    <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <div class="col-md-6">
                    <label for="inputState" class="form-label">Course</label>
                    <select id="inputState" class="form-select">
                        <option selected>Choose...</option>
                        <option>...</option>
                    </select>
                </div>
                <button className=' col-12 btn btn-outline-success' type='submit'>SignUp</button>
            </form>

    const loginResource =
        <div>
            <h1>SignUp</h1>
            Already have an account?
            <a href='/login'>Login</a>
        </div>;
    return <div className='signup'>{loginResource}{signUpResource}</div>;
}
export default SignUp