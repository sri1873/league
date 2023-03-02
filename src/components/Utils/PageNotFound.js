import React from "react";
import "./utils.css"


const PageNotFound = () => {

    return (<div style={{ display: "flex", padding: "2%", maxHeight: "90vh" }}>
        <div className="main col-12">
            <div className="col-12 img-wrapper">
                <img className="image" alt="page not found" src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg" />
            </div>
            <div className="description col-12">
                <p>You are looking the wrong way! </p>
                <a href="/">Go Home</a>
            </div>
            <div className="col-12" >
                <a style={{ fontSize: "x-small" }}  href="https://www.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_13315300.htm#query=failed&position=32&from_view=search&track=sph">Image by storyset on Freepik</a>
            </div>
        </div>
    </div>);
}
export default PageNotFound;