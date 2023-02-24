import React, { useState, useEffect } from "react";
import { Avatar } from "@progress/kendo-react-layout";

const NavBar = () => {
    return (
        <div className="navbar">
            <a href="/">
                <img
                    alt="logo"
                    className="logo"
                    src="https://res.cloudinary.com/santoshk/image/upload/v1666692180/order-management/fishmiles-logo_g0e32x.svg"
                ></img>
            </a>
            <div className="float-end h-100 d-flex align-items-center text-end">
                <div className="dropdown">
                    <button
                        type="button"
                        style={{ border: "none", backgroundColor: "transparent" }}
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        <Avatar
                            type="icon"
                            style={{ cursor: "pointer", marginRight: "10px" }}
                        >
                            <span className="k-icon k-i-user" />
                        </Avatar>
                    </button>
                    <div
                        className="dropdown-menu"
                        style={{ marginLeft: "-60px" }}
                        aria-labelledby="dropdownMenuButton"
                    >
                        <button
                            className="dropdown-item"
                            // onClick={(e) =>
                            //     (window.location.href = `userdetails?userId=${keycloak.tokenParsed.sub}`)
                            // }
                        >
                            <i className="bi bi-person mr-2"></i>My Profile
                        </button>
                        <button
                            className="dropdown-item"
                            // onClick={(e) => setToggle(!toggle)}
                        >
                            <i className="bi bi-key mr-2"></i>Change Password
                        </button>
                        <a href="/">
                            <button
                                className="dropdown-item"
                                type="button"
                                // onClick={(e) => {
                                //     onLogoutClick(e);
                                // }}
                            >
                                <i className="bi bi-box-arrow-right mr-2"></i>Logout
                            </button>
                        </a>
                    </div>
                </div>
                <div className="d-inline user-name">
                    <div>Logged in as</div>
                    <div className="fw-bold">
                        srikumar
                    </div>
                </div>

                {/* <div className="d-inline">
                  <span className="logout" title="Logout" onClick={(e) => { keycloak.logout(); HISTORY.push('/'); HISTORY.go(0) }}>
                    <i className="bi bi-box-arrow-right ml-2" style={{ fontSize: "25px", cursor: 'pointer' }}></i>
                  </span>
                </div> */}
            </div>
                    </div>
    );
}
export default NavBar;