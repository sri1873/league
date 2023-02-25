import { Field, Form, Formik, ErrorMessage } from 'formik';
import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom/dist';
// import { isValidPhoneNumber } from "react-phone-number-input";
import base from '../../apis/base'
import './onboarding.css'
import Decrypt from '../../helpers/decrypt'
import AuthContext from '../../context/AuthProvider';

const SignUp = () => {
    const { setAuth } = useContext(AuthContext)
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [branches, setBranches] = useState([]);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        base.get("api/v1/branches").then(res => {
            setBranches(res.data.data);
        })
    }, [])
    const getCourse = (e) => {
        e.preventDefault();
        base.get(`api/v1/branches/${e.target.value}/courses`).then(res => {
            setCourses(res.data.data);
        })
    }

    const signUpResource =
        <Formik
            initialValues={{
                firstName: '',
                lastName: '',
                userName: '',
                email: '', phone: '', password: '', confirmPassword: '', courseId: '',
            }}
            validate={(values, props) => {
                const errors = {};
                if (!values.email) {
                    errors.email = "Enter Woxsen email ID";
                } else if (
                    !/^[A-Z0-9._%+-]+@woxsen.edu.in$/i.test(values.email)
                ) {
                    errors.email = "Please enter a valid Woxsen email ID";
                }

                if (!values.firstName) {
                    errors.firstName = "Enter your Firstname";
                    console.log(values);
                }
                if (!values.lastName) {
                    errors.firstName = "Enter your Lastname";
                }
                if (!values.courseId || values.courseId === null) {
                    errors.courseId = "Select your course";
                }
                if (!values.phone) {
                    errors.phone = "Enter phone number";
                }
                // } else if (!isValidPhoneNumber("+91" + values.contact)) {
                //     errors.phone = "Enter valid phone number";
                // }
                if (!values.password) {
                    errors.password = "Enter password";
                } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(values.password)) {
                    errors.password = "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number";
                } else if (values.password !== values.confirmPassword) {
                    errors.confirmPassword = "Both passowords must be same";
                }
                return errors;
            }}

            onSubmit={(values, { setSubmitting, resetForm }) => {

                sessionStorage.clear();
                base({
                    method: 'POST',
                    url: `api/v1/auth/signup`,
                    headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*", 'Access-Control-Allow-Credentials': true },
                    data: {
                        firstName: values.firstName,
                        lastName: values.lastName,
                        userName: values.firstName + values.lastName,
                        email: values.email,
                        phone: values.phone,
                        password: values.password,
                        courseId: values.courseId,
                        graduationYear:"2024"
                    }
                }).then(res => {
                    Decrypt(res.data.data.token);
                    setAuth({ 'user': sessionStorage.getItem('user') })
                    navigate(from, { replace: true });
                })
            }}
        >
            {props => (

                <Form className="row g-3">
                    <div className="col-12 input-group">
                        <span className="input-group-text">First and last name</span>
                        <Field id="firstName" name="firstName" className="form-control" />
                        <Field id="lastName" name="lastName" className="form-control" />
                    </div>
                    <ErrorMessage
                        style={{ color: "red" }}
                        name="firstName"
                        component="div"
                    />
                    <div className="col-md-6">
                        <label className="form-label">Email</label>
                        <div className='input-group flex-nowrap'><span className="input-group-text">@</span>
                            <Field id="email" name="email" type="email" className="form-control" /></div>
                        <ErrorMessage
                            style={{ color: "red" }}
                            name="email"
                            component="div"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Mobile</label>
                        <Field name="phone" id='phone' type="number" min={10} className="form-control" />
                        <ErrorMessage
                            style={{ color: "red" }}
                            name="phone"
                            component="div"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Password</label>
                        <Field name="password" id="password" type="password" className="form-control" placeholder="Shh! Its's a secret" />
                        <ErrorMessage
                            style={{ color: "red" }}
                            name="password"
                            component="div"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Confirm Password</label>
                        <Field name="confirmPassword" id="confirmPassword" type="password" className="form-control" placeholder="Should be same as password" />
                        <ErrorMessage
                            style={{ color: "red" }}
                            name="confirmPassword"
                            component="div"
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Branch</label>
                        <select name="branchId" required onChange={e => getCourse(e)}
                            className="form-select">
                            <option style={{ 'display': 'none' }} value={null}>Choose...</option>
                            {branches.map(branch => {
                                return (<option value={branch.id}>{branch.name}</option>);
                            })
                            }
                        </select>

                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Course</label>
                        <Field as='select' name='courseId' className="form-select">
                            <option style={{ 'display': 'none' }} value={null}>Select Branch First</option>
                            {courses.map(course => {
                                return (
                                    <option value={course.id}>{course.name}</option>);
                            })
                            }
                        </Field>
                        <ErrorMessage
                            style={{ color: "red" }}
                            name="courseId"
                            component="div"
                        />
                    </div>
                    <button className=' col-12 btn btn-outline-success' type='submit'>SignUp</button>
                </Form>

            )}
        </Formik >

    const loginResource =
        <div>
            <h1>SignUp</h1>
            Already have an account?
            <a href='/login'>Login</a>
        </div>;
    return <div className='signup'>{loginResource}{signUpResource}</div>;
}
export default SignUp