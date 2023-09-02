import React, { useState } from "react";
import base from "../../apis/base";
import { AxiosResponse } from "axios";

interface PwProps {
  setModal(val:boolean):void
}
interface SecurityQuestion {
  id: string,
  question: string
}
interface FormDetailsType{
  email: string,
  securityQuestionId: string,
  securiyAnswer: string,
  newPassword:string
}
const Password: React.FC<PwProps> = ({ setModal }) => {
  const [question, setQuestion] = useState <SecurityQuestion>({"id":"","question":""});
  const [formDetails, setFormDetails] = useState<FormDetailsType>({
    "email":"",
    "securityQuestionId":"",
    "securiyAnswer":"",
    "newPassword":""
  });

  const getQuestion = ():void => {
    base.get<AxiosResponse<SecurityQuestion>>(`api/v1/auth/security-question?email=${formDetails?.email}`)
      .then(res => {
        setQuestion(res.data?.data);
        setFormDetails((prevState) => ({ ...prevState, "securityQuestionId": res.data?.data?.id }));
      })
  }

  const handleForgotPassword:React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
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
        window.location.href = "/";
      })
    } else {
      getQuestion()
    }
  }

  return (

    <form onSubmit={e => handleForgotPassword(e)} className="modal" tabIndex={-1}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">Reset Password</h1>
            <button type="button" className="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Email</label>
            <input type={"text"} className="form-control" required onChange={e => {
              setFormDetails((prevState) => ({
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
              <input type={"password"} className="form-control" required onChange={e => {
                setFormDetails(prevState => ({
                  ...prevState,
                  "newPassword": e.target.value
                }));
              }} />
            </> : ""}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={e => setModal(false)}>Close</button>
            <button type="submit" className="btn btn-outline-success">Submit</button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Password;