import React from "react";

const Failure = () => {

    return (<div style={{ display: "flex", maxHeight: "90vh",padding:'5%',alignItems:"center" }}>
        <div className="col-md-6 img-wrapper">
            <img className="image" alt="failure" src="https://img.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_74855-11104.jpg" />
            <div>
                <a style={{ fontSize: "x-small" }} href="https://www.freepik.com/free-vector/tiny-people-examining-operating-system-error-warning-web-page-isolated-flat-illustration_11235921.htm#query=failed&position=6&from_view=search&track=sph">Image by pch.vector on Freepik</a>
            </div>
        </div>
        <div className="col-md-6">
            <div class="card bg-transparent  border-danger mb-3">
                <div class="card-header">
                    Booking Details
                </div>
                <div class="card-body text-danger">
                    <h5>Booking Failed</h5>
                    <a href="/bookings" class="btn btn-outline-danger">Go Home</a>
                </div>
            </div>
        </div>
    </div>);
}
export default Failure