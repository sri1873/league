import React from "react";

import { clearErrorMsg } from "../store";
import { useDispatch } from "react-redux";

interface ErrorProps {
  color: string;
  message: string;
}
const Error: React.FC<ErrorProps> = ({ color, message }) => {
  const dispatch = useDispatch();
  const errorResourse: React.JSX.Element = (
    <div
      className={`alert alert-${color} alert-dismissible`}
      role="alert"
      style={{
        position: "absolute",
        margin: 0,
        maxWidth: "40%",
        zIndex: 100,
        top: "20px",
        right: "10px",
      }}
    >
      <div>{message}</div>
      <button
        type="button"
        className="btn-close"
        onClick={(e) => dispatch(clearErrorMsg())}
      ></button>
    </div>
  );
  // </div>

  return message ? errorResourse : <></>;
};
export default Error;
