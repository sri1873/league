import { Field, Form, Formik, ErrorMessage, FormikErrors } from "formik";
import React, { useState } from "react";
import base from "../../apis/base";
import { useDispatch } from "react-redux";
import { clearErrorMsg } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";

interface PwProps {
  setModal(val: boolean): void
}
interface SecurityQuestion {
  id: string,
  question: string
}
interface FormDetailsType {
  email: string,
  securityQuestionId: string,
  securiyAnswer: string,
  newPassword: string
}
interface FormikDetail {
  newPassword: string
}
const Password: React.FC<PwProps> = ({ setModal }) => {
  const dispatch: Dispatch = useDispatch();
  const [question, setQuestion] = useState<SecurityQuestion>({ "id": "", "question": "" });
  const [formDetails, setFormDetails] = useState<FormDetailsType>({
    "email": "",
    "securityQuestionId": "",
    "securiyAnswer": "",
    "newPassword": ""
  });

  const getQuestion = (): void => {
    base.get<AxiosResponse<SecurityQuestion>>(`api/v1/auth/security-question?email=${formDetails?.email}`)
      .then(res => {
        setQuestion(res.data?.data);
        setFormDetails((prevState) => ({ ...prevState, "securityQuestionId": res.data?.data?.id }));
      })
  }

  return (
    <Formik initialValues={{
      newPassword: ""
    }}
      validate={(values: FormikDetail) => {
        const errors: FormikErrors<FormikDetail> = {};
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
            data: { ...formDetails, "newPassword": values.newPassword },
          }).then(res => {
            setModal(false);
            localStorage.clear();
            window.location.href = "/";
          })
        } else {
          getQuestion()
        }
      }
      }
    >
      {props => (

        <Form className="modal" tabIndex={-1}>
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
              <div className="col-md-12 px-3 pb-2 errmsg">
                <ErrorMessage
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