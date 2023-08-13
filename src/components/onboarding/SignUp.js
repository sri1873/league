import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom/dist";
// import { isValidPhoneNumber } from "react-phone-number-input";
import base from "../../apis/base";
import "./onboarding.css";
import Decrypt from "../../helpers/decrypt";
import Error from "../../helpers/Error";
import { addUser, toggleActive } from "../../store";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [questions, setQuestions] = useState([]);
  const [branches, setBranches] = useState([]);
  const [courses, setCourses] = useState([]);

  const [errorMsg, setErrorMsg] = useState("");
  const [formDetails, setFormDetails] = useState({});

  const [modal, setModal] = useState(false);

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    base.get("api/v1/Schools").then((res) => {
      setBranches(res.data.data);
    });
    base.get("api/v1/security/questions").then(res => setQuestions(res.data.data))
  }, []);
  const getCourse = (e) => {
    e.preventDefault();
    base.get(`api/v1/schools/${e.target.value}/courses`).then((res) => {
      setCourses(res.data.data);
    });
  };

  const onSubmit = (e) => {
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
      const user = Decrypt(res.data.data.token);
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
        courseId: ""
      }}
      validate={(values, props) => {
        const errors = {};
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
        sessionStorage.clear();
        base
          .get(`/api/v1/util/availability/username?userName=${values.userName}`)
          .then((res) => {
            if (!res.data)
              setErrorMsg("Username not available")
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
              <option style={{ display: "none" }} value={null}>
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
              <option style={{ display: "none" }} value={null}>
                Select Branch First
              </option>
              {courses.map((course) => {
                return <option value={course.id}>{course.name}</option>;
              })}
            </Field>
          </div>
          <div className="col-md-4">
            <label className="form-label">Gender</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" value={"MALE"} checked={formDetails?.gender === "MALE"} onClick={e => { setFormDetails(prevState => ({ ...prevState, "gender": e.target.value })) }} />
              <label class="form-check-label">
                Male
              </label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" value={"FEMALE"} checked={formDetails?.gender === "FEMALE"} onClick={e => { setFormDetails(prevState => ({ ...prevState, "gender": e.target.value })) }} />
              <label class="form-check-label">
                Female
              </label>
            </div>
          </div>
          <div className="col-md-6">
            <button className="col-12 btn btn-outline-success" type="submit">
              Proceed
            </button>
            <Error
              setErrorMsg={setErrorMsg}
              color={"danger"}
              message={errorMsg}
            />
          </div>
          <div className="col-md-6 errmsg">
            <ErrorMessage
              style={{ color: "red" }}
              name="firstName"
              component="div"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="email"
              component="div"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="userName"
              component="div"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="phone"
              component="div"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="password"
              component="div"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="confirmPassword"
              component="div"
            />
            <ErrorMessage
              style={{ color: "red" }}
              name="courseId"
              component="div"
            />
          </div>
        </Form>
      )}
    </Formik>
  );

  const securityQuestionModal = (
    <form onSubmit={e => onSubmit(e)} class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Security Question</h1>
            <button type="button" class="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
          </div>
          <div class="modal-body">
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
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={e => setModal(false)}>Close</button>
            <button type="submit" class="btn btn-outline-success">Sign Up</button>
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



