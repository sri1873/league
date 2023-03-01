import React from "react";
import { useSearchParams } from "react-router-dom";

const Success = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    console.log(searchParams.get("txnId"));

    return (<div style={{ display: "flex", padding: "2%", maxHeight: "90vh" }}>
        <div className="col-md-6">
            <img src="https://img.freepik.com/free-vector/man-transferring-money-woman-via-smartphone-online-transaction-banking-flat-vector-illustration-finance-digital-technology-concept_74855-10107.jpg" />
            <a style={{ fontSize: "x-small" }} href="https://www.freepik.com/free-vector/man-transferring-money-woman-via-smartphone-online-transaction-banking-flat-vector-illustration-finance-digital-technology-concept_10613198.htm#query=payment&position=5&from_view=search&track=sph">Image by pch.vector on Freepik</a>
        </div>
        <div className="col-md-6" style={{ border: "1px solid black", borderRadius: "10px" }}>
            Order Details
        </div>
    </div>);
}
export default Success