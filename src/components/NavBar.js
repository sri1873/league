import React from "react";
import { Avatar } from "@progress/kendo-react-layout";
import { useSelector } from "react-redux";

const NavBar = () => {
    const onLogoutClick = (e) => {
        e.preventDefault();
        localStorage.clear();
        window.location.reload();
    }
    const userName = useSelector(state => state.user.userName)
    return (<>{userName
        ?
        <nav className="navbar sticky-top navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">The League</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarScroll">
                    <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" aria-current="page" href="/bookings">Bookings</a>
                        </li>
                    </ul>
                    <div className="dropdown" data-bs-toggle="dropdown">
                        <button
                            type="button"
                            style={{ border: "none", display: "flex", backgroundColor: "transparent" }}
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false">
                            <Avatar
                                type="icon"
                                style={{ cursor: "pointer", marginRight: "10px" }}
                            >
                                <span className="k-icon k-i-user" />
                            </Avatar>
                            <div className="fw-bold" style={{ color: "white" }}>
                                {userName}
                            </div>
                        </button>
                        <div
                            className="dropdown-menu"
                            style={{ marginLeft: "-30px" }}
                            aria-labelledby="dropdownMenuButton"
                        >
                            <button className="dropdown-item">
                                <i className="bi bi-person mr-2"></i>My Profile
                            </button>
                            <button className="dropdown-item">
                                <i className="bi bi-key mr-2"></i>Change Password
                            </button>
                            <button
                                className="dropdown-item"
                                type="button"
                                onClick={(e) => {
                                    onLogoutClick(e);
                                }}>
                                <i className="bi bi-box-arrow-right mr-2"></i>Logout
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
        : null}</>
    );
}
export default NavBar;