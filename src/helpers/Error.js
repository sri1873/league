import React from "react";

const Error = ({ setErrorMsg, color, message }) => {

    const errorResourse =
        <div class={`alert alert-${color} d-flex align-items-center alert-dismissible`} role="alert">

            <div>
                {message}
            </div>
            <button type="button" class="btn-close" onClick={e => setErrorMsg(null)} ></button>
        </div>

    return (
        message ? errorResourse : <></>
    );
}
export default Error;