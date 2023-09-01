import React from "react";
const Footer:React.FC = () => {

    return (
        <div className="footer-container">
            <div className="footer">
                <div>
                    <h3 style={{ borderBottom: "solid 1px #ee495c", paddingBottom: "6px" }}>Contact Us</h3>
  
                    <div className="follow">
                        {/* <h4>Explore. Discover. Connect.</h4> */}
                        <ul>
                            <li><a href="https://www.linkedin.com/school/woxsen-university/" target="_blank">
                                <img src="https://woxsen.edu.in/assets/images/linkedin.webp" className="img-fluid" alt="icon" />
                                <span>Linkedin</span>
                            </a>
                            </li>
                            <li><a href="https://twitter.com/Woxsen" target="_blank">
                                <img src="https://woxsen.edu.in/assets/images/twitter.webp" className="img-fluid" alt="icon" />
                                <span>Twitter</span></a>
                            </li>
                            <li><a href="https://www.instagram.com/woxsen_university/" target="_blank">
                                <img src="https://woxsen.edu.in/assets/images/insta.webp" className="img-fluid" alt="icon" />
                                <span>Instagram</span>
                            </a>
                            </li>
                            <li><a href="https://www.youtube.com/channel/UCjh6E3poHz7IFRGpnYlQ4pQ" target="_blank">
                                <img src="https://woxsen.edu.in/assets/images/youtube.webp" className="img-fluid" alt="icon" />
                                <span>You Tube</span></a>
                            </li>
                            <li><a href="https://woxsen.edu.in/blog/" target="_blank">
                                <img src="https://woxsen.edu.in/assets/images/blog-icon.webp" className="img-fluid" alt="icon" />
                                <span>Blog</span></a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <span>sports@woxsen.edu.in </span>
                        <strong>|</strong>
                        <span> +91 9709704747</span>
                    </div>
                </div>
                <div>
                    ©Copyright 2023 - Woxsen University <br />
                    <p>Designed and Developed by </p>
                    <p>School of Technology</p>
                    <a target={"_blank"} rel="noopener noreferrer" href="https://www.linkedin.com/in/arunchandra-boini/">B.Arun Chandra</a> <span>| </span>
                    <a target={"_blank"} rel="noopener noreferrer" href="https://www.linkedin.com/in/ks-srikumar/">K S Sri Kumar</a> <span>| </span>
                    <a target={"_blank"} rel="noopener noreferrer" href="https://www.linkedin.com/in/harsh-morayya/">Harsh Morayya</a> <br />
                    <p>Under the guidance of</p>
                    <a target={"_blank"} rel="noopener noreferrer" href="https://www.linkedin.com/in/amogh-deshmukh-35009b17/">Prof. Amogh Deshmukh</a>
                </div>
            </div>

        </div>);
}
export default Footer;