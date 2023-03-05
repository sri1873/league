import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom/dist";
import base from "../../apis/base";
import Decrypt from "../../helpers/decrypt";
import Error from "../../helpers/Error";
import { addUser, toggleActive } from "../../store";
import "./onboarding.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [modal, setModal] = useState(false);
  const [question, setQuestion] = useState({});
  const [formDetails, setFormDetails] = useState();

  const [loginDetails, setLoginDetails] = useState({
    email: null,
    password: null,
  });
  const [errorMsg, setErrorMsg] = useState("");

  const from = location.state?.from?.pathname || "/";
  console.log(errorMsg);
  const getQuestion = (e) => {
    base.get(`api/v1/auth/security-question?email=${formDetails?.email}`).
      then(res => {
        setQuestion(res.data?.data);
        setFormDetails(prevState => ({ ...prevState, "securityQuestionId": res.data?.data?.id }));
      }).err(err => setErrorMsg(err.message))
  }

  const handleForgotPassword = (e) => {
    e.preventDefault();
    base({
      method: "POST",
      url: `api/v1/auth/password/reset`,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
      data: formDetails,
    }).then(res => setModal(false)).err(err => setErrorMsg(err.message))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    sessionStorage.clear();
    base({
      method: "POST",
      url: `api/v1/auth/login`,
      data: loginDetails,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
    })
      .then((res) => {
        const user = Decrypt(res.data.data.token);
        dispatch(toggleActive());
        dispatch(addUser(user));
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setErrorMsg("Invalid Credentials!");
      });
  };

  const securityQuestionModal = (
    <form onSubmit={e => handleForgotPassword(e)} class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">Reset Password</h1>
            <button type="button" class="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label className="form-label">Email</label>
            <input type={"text"} className="form-control" required onChange={e => { setFormDetails(prevState => ({ ...prevState, "email": e.target.value })) }} />
            {question?.id ? <>

              <label className="form-label">Your Security Question</label>
              <input type="text" className="form-control" disabled value={question?.question} />
              <label className="form-label">Answer</label>
              <input type={"text"} className="form-control" required onChange={e => { setFormDetails(prevState => ({ ...prevState, "securityAnswer": e.target.value })) }} />
              <label className="form-label">New Password</label>
              <input type={"password"} className="form-control" required onChange={e => { setFormDetails(prevState => ({ ...prevState, "newPassword": e.target.value })) }} />
            </> : ""}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" onClick={e => setModal(false)}>Close</button>
            {question?.id ? <button type="submit" class="btn btn-outline-success" disabled={formDetails?.securityAnswer ? "" : "true"}>Submit</button>
              : <button type="button" onClick={e => getQuestion(e)} class="btn btn-outline-success">Submit</button>}
          </div>
          <Error
            setErrorMsg={setErrorMsg}
            color={"danger"}
            message={errorMsg}
          />
        </div>
      </div>
    </form>
  )

  const loginResource = (
    <form className="row g-3" onSubmit={(e) => handleSubmit(e)}>
      <div className="col-12">
        <label className="form-label">Username</label>
        <input
          className="form-control"
          type={"email"}
          placeholder="Username"
          required
          onChange={(e) =>
            setLoginDetails((prevState) => ({
              ...prevState,
              email: e.target.value,
            }))
          }
        />
      </div>
      <div className="col-12">
        <label className="form-label">Password</label>
        <input
          className="form-control"
          type={"password"}
          required
          placeholder="Password"
          onChange={(e) =>
            setLoginDetails((prevState) => ({
              ...prevState,
              password: e.target.value,
            }))
          }
        />
      </div>
      <button className="col-12 btn btn-outline-success" type="submit">
        Login
      </button>
      <Error setErrorMsg={setErrorMsg} color={"danger"} message={errorMsg} />
      <button type="button" style={{ backgroundColor: "transparent", border: "none", color: "gray", fontSize: "small" }} onClick={e => setModal(true)} >Forgot Password?</button>
    </form>
  );
  const signupResource = (
    <div>
      <h1>Login</h1>
      <p style={{ color: "gray" }}>
        Don't have an account yet?
        <a href="/signUp">Signup</a>
      </p>
    </div>
  );
  return (
    <div className="login">
      {signupResource}
      {loginResource}
      {modal ? securityQuestionModal : ""}
    </div>
  );
};
export default Login;

