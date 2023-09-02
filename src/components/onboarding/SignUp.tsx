import { Field, Form, Formik, ErrorMessage, FormikErrors } from "formik";
import React, { useState, useEffect } from "react";
import { Location, NavigateFunction, useLocation, useNavigate } from "react-router-dom/dist";
import base from "../../apis/base";
import "./onboarding.css";
import Decrypt from "../../helpers/Decrypt";

import { addUser, toggleActive, clearErrorMsg, setErrorMsg } from "../../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { BranchType, CoursesType, QuestionType, SignUpFormDetails, User } from "../../types";
import { AxiosResponse } from "axios";

const SignUp = () => {
  const dispatch: Dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [branches, setBranches] = useState<BranchType[]>([]);
  const [courses, setCourses] = useState<CoursesType[]>([]);

  const [formDetails, setFormDetails] = useState<SignUpFormDetails>({
    "gender": "",
    "firstName": "",
    "lastName": "",
    "userName": "",
    "email": "",
    "phone": "",
    "password": "",
    "confirmPassword": "",
    "courseId": ""
  });

  const [modal, setModal] = useState<boolean>(false);

  const from: string = location.state?.from?.pathname || "/";

  useEffect(() => {
    base.get<AxiosResponse<BranchType[]>>("api/v1/Schools").then((res) => {
      setBranches(res.data.data);
    });
    base.get<AxiosResponse<QuestionType[]>>("api/v1/security/questions").then(res => setQuestions(res.data.data))
  }, []);
  const getCourse: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    e.preventDefault();
    base.get<AxiosResponse<CoursesType[]>>(`api/v1/schools/${e.target.value}/courses`).then((res) => {
      setCourses(res.data.data);
    });
  };

  const modalSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    base({
      method: "POST",
      url: `api/v1/auth/signup`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      data: formDetails,
    }).then((res) => {
      const user: User = Decrypt(res.data.data.token);
      dispatch(toggleActive());
      dispatch(addUser(user));
      navigate(from, { replace: true });
    });
  }

  const signUpResource = (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        courseId: "",
        gender:"",
      }}
      validate={(values:SignUpFormDetails) => {
        const errors: FormikErrors<SignUpFormDetails> = {};
        if (!values.email) {
          errors.email = "* Enter Woxsen email ID";
        } else if (!/^[A-Z0-9._%+-]+@woxsen.edu.in$/i.test(values.email)) {
          errors.email = "* Please enter a valid Woxsen email ID";
        }

        if (!values.userName) {
          errors.userName = "* Enter your Username";
        }
        if (!values.firstName) {
          errors.firstName = "* Enter your Firstname";
        }
        if (!values.lastName) {
          errors.firstName = "* Enter your Lastname";
        }
        if (!values.courseId || values.courseId === null) {
          errors.courseId = "* Select your course";
        }
        if (!values.phone) {
          errors.phone = "* Enter phone number";
        }
        // } else if (!isValidPhoneNumber("+91" + values.contact)) {
        //     errors.phone = "*Enter valid phone number";
        // }
        if (!values.password) {
          errors.password = "* Enter password";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/i.test(
            values.password
          )
        ) {
          errors.password =
            "* Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number";
        } else if (values.password !== values.confirmPassword) {
          errors.confirmPassword = "* Both passowords must be same";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(clearErrorMsg());
        sessionStorage.clear();
        base
          .get(`/api/v1/util/availability/username?userName=${values.userName}`)
          .then(res => {
            if (!res.data)
              dispatch(setErrorMsg("Username not available"))
            else {
              base.get(`api/v1/util/availability/email?email=${values.email}`)
                .then(res => {
                  if (!res.data)
                    dispatch(setErrorMsg("Mail-Id not available"))
                  else {
                    setFormDetails(prevState => ({
                      ...prevState,
                      firstName: values.firstName,
                      lastName: values.lastName,
                      userName: values.userName,
                      email: values.email,
                      phone: values.phone,
                      password: values.password,
                      courseId: values.courseId
                    }))
                    setModal(true);
                  }
                }).catch(err => {
                  console.log(err);
                  dispatch(setErrorMsg("Internal Server Error"))
                });
            }
          }).catch(err => {
            console.log(err);
            dispatch(setErrorMsg("Internal Server Error"))
          });
      }}
    >
      {(props) => (
        <Form className="row g-3">
          <div className="col-12 input-group">
            <span className="input-group-text">First and last name</span>
            <Field id="firstName" name="firstName" className="form-control" />
            <Field id="lastName" name="lastName" className="form-control" />
          </div>

          <div className="col-md-4">
            <label className="form-label">Email</label>
            <div className="input-group flex-nowrap">
              <span className="input-group-text">@</span>
              <Field
                id="email"
                name="email"
                type="email"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-4">
            <label className="form-label">Username</label>
            <Field
              id="userName"
              name="userName"
              type="userName"
              className="form-control"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Mobile</label>
            <Field
              name="phone"
              id="phone"
              type="number"
              min={10}
              className="form-control"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Password</label>
            <Field
              name="password"
              id="password"
              type="password"
              className="form-control"
              placeholder="Shh! Its's a secret"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Confirm Password</label>
            <Field
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              className="form-control"
              placeholder="Should be same as password"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Branch</label>
            <select
              name="branchId"
              required
              onChange={(e) => getCourse(e)}
              className="form-select"
            >
              <option style={{ display: "none" }} value=''>
                Choose...
              </option>
              {branches.map((branch) => {
                return <option value={branch.id}>{branch.name}</option>;
              })}
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Course</label>
            <Field as="select" name="courseId" className="form-select">
              <option style={{ display: "none" }} value=''>
                Select Branch First
              </option>
              {courses.map((course) => {
                return <option value={course.id}>{course.name}</option>;
              })}
            </Field>
          </div>
          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <div className="form-check">
              <input className="form-check-input" type="radio" value={"MALE"} checked={formDetails?.gender === "MALE"} onClick={e => { setFormDetails(prevState => ({ ...prevState, "gender": e.currentTarget.value })) }} />
              <label className="form-check-label">
                Male
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" value={"FEMALE"} checked={formDetails?.gender === "FEMALE"} onClick={e => { setFormDetails(prevState => ({ ...prevState, "gender": e.currentTarget.value })) }} />
              <label className="form-check-label">
                Female
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <button className="col-12 btn btn-outline-success" type="submit">
              Proceed
            </button>
          </div>
          <div className="col-md-6 errmsg">
            <ErrorMessage
              className="formikErrorMessage"
              name="firstName"
              component="div"

            />
            <ErrorMessage
              className="formikErrorMessage"
              name="email"
              component="div"
            />
            <ErrorMessage
              className="formikErrorMessage"
              name="userName"
              component="div"
            />
            <ErrorMessage
              className="formikErrorMessage"
              name="phone"
              component="div"
            />
            <ErrorMessage
              className="formikErrorMessage"
              name="password"
              component="div"
            />
            <ErrorMessage
              className="formikErrorMessage"
              name="confirmPassword"
              component="div"
            />
            <ErrorMessage
              className="formikErrorMessage"
              name="courseId"
              component="div"
            />
          </div>
        </Form>
      )}
    </Formik>
  );

  const securityQuestionModal = (
    <form onSubmit={e => modalSubmit(e)} className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Security Question</h1>
            <button type="button" className="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Choose Question</label>
            <select required className="form-select" onChange={e => { setFormDetails(prevState => ({ ...prevState, "securityQuestionId": e.target.value })) }}>
              <option>--Select--</option>
              {questions.map((question) => {
                return <option value={question.id}>{question.question}</option>;
              })}
            </select>
            <label className="form-label">Answer</label>
            <input type={"text"} className="form-control" required onChange={e => { setFormDetails(prevState => ({ ...prevState, "securityAnswer": e.target.value })) }} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={e => setModal(false)}>Close</button>
            <button type="submit" className="btn btn-outline-success">Sign Up</button>
          </div>
        </div>
      </div>
    </form>
  )



  const loginResource = (
    <div>
      <h1>SignUp</h1>
      Already have an account?
      <a href="/login">Login</a>
    </div>
  );
  return (
    <div className="signup">
      {loginResource}
      {signUpResource}
      {modal ? securityQuestionModal : ""}
    </div>
  );
};
export default SignUp;



