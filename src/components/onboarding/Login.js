import Password from './Password';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom/dist";
import base from "../../apis/base";
import Decrypt from "../../helpers/decrypt";
import { addUser, toggleActive, setErrorMsg } from "../../store";
import "./onboarding.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [ConfirmButton, setConfirmButton] = useState("")
  const [modal, setModal] = useState(false);
  const [loginDetails, setLoginDetails] = useState({
    email: null,
    password: null,
  });


  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setConfirmButton("disable")
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
        setConfirmButton("");
        dispatch(toggleActive());
        dispatch(addUser(user));
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setConfirmButton("");
        dispatch(setErrorMsg("Invalid Credentials!"));
      });
  };


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
      <button className={`col-12 btn btn-outline-success ${(ConfirmButton === "") ? "" : "disabled"}`} type="submit">
        Login
      </button>
      <button type="button" style={{ backgroundColor: "transparent", border: "none", color: "gray", fontSize: "small" }} onClick={e => setModal(true)} >Forgot Password?</button>
    </form>
  );
  const signupResource = (
    <div>
      <h1>Login</h1>
      <p style={{ color: "gray" }}>
        Don't have an account yet?
        <a href="/signup">Signup</a>
      </p>
    </div>
  );
  return (
    <div className="login">
      {signupResource}
      {loginResource}
      {modal ? <Password setModal={setModal} /> : ""}
    </div>
  );
};
export default Login;

