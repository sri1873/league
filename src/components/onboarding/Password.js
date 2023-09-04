import { Field, Form, Formik, ErrorMessage } from "formik";
import React, { useState } from "react";
import base from "../../apis/base";
import { useDispatch } from "react-redux";
import { clearErrorMsg } from "../../store";
const Password = ({ setModal }) => {
  const dispatch = useDispatch();
  const [question, setQuestion] = useState({});
  const [formDetails, setFormDetails] = useState();

  const getQuestion = (e) => {
    base.get(`api/v1/auth/security-question?email=${formDetails?.email}`)
      .then(res => {
        setQuestion(res.data?.data);
        setFormDetails(prevState => ({ ...prevState, "securityQuestionId": res.data?.data?.id }));
      })
  }

  const handleForgotPassword = () => {
    if (question?.id) {
      base({
        method: "POST",
        url: `api/v1/auth/password/reset`,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
        data: formDetails,
      }).then(res => {
        setModal(false);
        localStorage.clear();
        // window.location.href = "/";
      })
    } else {
      getQuestion()
    }
  }

  return (
    <Formik initialValues={{
      newPassword: ""
    }}
      validate={(values, props) => {
        const errors = {};
        if (!values.newPassword) {
          errors.newPassword = "* Enter password";
        } else if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]).{8,}$/i.test(
            values.newPassword
          )
        ) {
          errors.newPassword =
            "* Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one special character and one number";
          return errors;
        }
      }}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        dispatch(clearErrorMsg());
        sessionStorage.clear();
        if (question?.id) {
          base({
            method: "POST",
            url: `api/v1/auth/password/reset`,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Credentials": true,
            },
            data: {...formDetails, "newPassword": values.newPassword },
          }).then(res => {
            setModal(false);
            localStorage.clear();
            // window.location.href = "/";
          })
        } else {
          getQuestion()
        }
      }
      }
    >
      {props => (


        <Form className="modal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Reset Password</h1>
                <button type="button" className="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <label className="form-label">Email</label>
                <input type={"text"} className="form-control" required onChange={e => {
                  setFormDetails(prevState => ({
                    ...prevState,
                    "email": e.target.value
                  }));
                }} />
                {question?.id ? <>

                  <label className="form-label">Your Security Question</label>
                  <input type="text" className="form-control" disabled value={question?.question} />
                  <label className="form-label">Answer</label>
                  <input type={"text"} className="form-control" required onChange={e => {
                    setFormDetails(prevState => ({
                      ...prevState,
                      "securityAnswer": e.target.value
                    }));
                  }} />
                  <label className="form-label">New Password</label>
                  <Field
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    className="form-control"
                    placeholder="Shh! Its's a secret" />
                </> : ""}
              </div>
              <div className="col-md-6 errmsg">
                <ErrorMessage
                  style={{ color: "red" }}
                  name="newPassword"
                  component="div"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={e => setModal(false)}>Close</button>
                <button type="submit" className="btn btn-outline-success">Submit</button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
export default Password;