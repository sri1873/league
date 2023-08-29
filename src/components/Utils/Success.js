import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import base from '../../apis/base'
const Success = () => {
    const [searchParams] = useSearchParams();
    const [bookingDetails, setBookingDetails] = useState({})

    const bookingId = searchParams.get("bookingId");
    useEffect(() => {
        base.get(`api/v1/bookings/${bookingId}`).then(res => setBookingDetails(res.data.data))
    },[bookingId])

    return (<div className="main" style={{ display: "flex", maxHeight: "90vh",padding:'5%',alignItems:"center"}}>
        <div className="img-wrapper col-md-6">
            <img alt="success" className="image" src="https://img.freepik.com/free-vector/man-transferring-money-woman-via-smartphone-online-transaction-banking-flat-vector-illustration-finance-digital-technology-concept_74855-10107.jpg" />
        <div>
            <a style={{ fontSize: "x-small" }} href="https://www.freepik.com/free-vector/man-transferring-money-woman-via-smartphone-online-transaction-banking-flat-vector-illustration-finance-digital-technology-concept_10613198.htm#query=payment&position=5&from_view=search&track=sph">Image by pch.vector on Freepik</a>
        </div>
        </div>
        <div className="col-md-6">
            <div class="card bg-transparent  border-success mb-3">
                <div class="card-header">
                    Booking Details
                </div>
                <div class="card-body">
                    <h5 class="card-title">Payment Status : {bookingDetails.paymentStatus?.toUpperCase()}</h5>
                    <ul class="list-group list-group-flush" style={{padding:"2%"}}>
                        <li class="list-group-item">Booking ID :{bookingDetails.bookingId}</li>
                        <li class="list-group-item">Date : {bookingDetails.bookingDate}</li>
                        <li class="list-group-item">Arena : {bookingDetails.arena}</li>
                        <li class="list-group-item">Slot : {bookingDetails.slot}</li>
                    </ul>
                    <a href="/bookings" class="btn btn-outline-success">Check Bookings</a>
                </div>
            </div>
        </div>
    </div>);
}
export default Success