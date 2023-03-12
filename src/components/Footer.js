import React from "react";
import logo from '../assets/logo.png'
const Footer =()=>{

    return (
    <div className="footer-container">
        <div className="footer">
        <div className="logo" ><img src={logo}className="logo" /></div>
        <div>
        ©Copyright 2023 - Woxsen University <br/>
        <p>Designed and Developed by </p>
        <p>School of Technology</p>
        <a target={"_blank"} href="https://www.linkedin.com/in/arunchandra-boini/">B.Arun Chandra </a>
        <a target={"_blank"} href="https://www.linkedin.com/in/ks-srikumar/">K S Sri Kumar </a>
        <a target={"_blank"} href="https://www.linkedin.com/in/harsh-morayya/">Harsh Morayya </a> <br/>
        <p>Under the guidance of</p>
        <a target={"_blank"} href="https://www.linkedin.com/in/amogh-deshmukh-35009b17/">Prof. Amogh Deshmukh</a>
        </div>
        </div>
    </div>);
}
export default Footer;