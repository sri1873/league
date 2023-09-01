import React from "react";
import "./utils.css"

const InternalServerError:React.FC = () => {

    return (<div style={{ display: "flex", padding: "2%", maxHeight: "90vh" }}>
        <div className="main col-12">
            <div className="col-12 img-wrapper">
                <img className="image" alt="internal server error" src="https://img.freepik.com/free-vector/500-internal-server-error-concept-illustration_114360-5572.jpg" />
            </div>
            <div className="description col-12">
                <p>Its's not you! It's us.</p>
                <p>Sorry. Try Again later</p>
                <a href="#/">Go Home</a>
            </div>
            <div className="col-12" >
                <a style={{ fontSize: "x-small" }} href="https://www.freepik.com/free-vector/500-internal-server-error-concept-illustration_13416109.htm#query=failed&position=4&from_view=search&track=sph">Image by storyset on Freepik</a>
            </div>
        </div>
    </div>);
}
export default InternalServerError;
