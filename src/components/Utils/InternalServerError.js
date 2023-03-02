import React from "react";

const InternalServerError = () => {

    return (<div style={{ display: "flex", padding: "2%", maxHeight: "90vh" }}>
        <div className="col-md-6">
            <img alt="internal server error" src="https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-5572.jpg" />
            <a style={{ fontSize: "x-small" }} href="https://www.freepik.com/free-vector/500-internal-server-error-concept-illustration_13416109.htm#query=failed&position=4&from_view=search&track=sph">Image by storyset on Freepik</a>
        </div>
        <div className="col-md-6" style={{ border: "1px solid black", borderRadius: "10px" }}>
            Order Details
        </div>
    </div>);
}
export default InternalServerError;