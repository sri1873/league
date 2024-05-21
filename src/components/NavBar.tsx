import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import { State } from "../store";
import Password from "./onboarding/Password";

const NavBar = () => {
  const [modal, setModal] = useState(false);
  const onLogoutClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    localStorage.clear();
    window.location.href = "/";
  };
  const userName: string | null = useSelector(
    (state: State) => state.auth.user.userName
  );
  const roles: string[] = useSelector((state: State) => state.auth.user.roles);
  return (
    <>
      {userName ? (
        <nav
          className="navbar sticky-top navbar-expand-lg bg-body-tertiary"
          data-bs-theme="dark"
        >
          <div className="container-fluid justify-content-between">
            <a className="navbar-brand flex-column" href="/">The League</a>
            <button
              className="navbar-toggler"
              style={{ backgroundColor: "aliceblue" }}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarScroll"
              aria-controls="navbarScroll"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-between"
              style={{ flexGrow: "0 !important", flexBasis: "10% !important" }}
              id="navbarScroll"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/bookings">
                    Bookings
                  </a>
                </li>
                <li
                  className="dropdown nav-item align-center"
                  data-bs-toggle="dropdown"
                >
                  <button
                    className="nav-link"
                    type="button"
                    style={{
                      border: "none",
                      display: "flex",
                      backgroundColor: "transparent",
                      paddingRight: "1em",
                    }}
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <div className="" >
                      {userName}&nbsp;
                    </div>
                    <Avatar
                      style={{
                        color: "black",
                        backgroundColor: "#befa19",
                        cursor: "pointer",
                        marginRight: "10px",
                      }}
                      icon={<UserOutlined />}
                    />

                  </button>
                  <div
                    className="dropdown-menu"
                    style={{ marginLeft: "-30px" }}
                    aria-labelledby="dropdownMenuButton"
                  >
                    {/* <button className="dropdown-item">
                                <i className="bi bi-person mr-2"></i>My Profile
                            </button> */}
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(e) => setModal(true)}
                    >
                      <i className="bi bi-key mr-2"></i>Change Password
                    </button>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={(e) => {
                        onLogoutClick(e);
                      }}
                    >
                      <i className="bi bi-box-arrow-right mr-2"></i>Logout
                    </button>
                  </div>
                </li>
              </ul>
            </div>
            <img alt="Woxsen Logo" src={logo} width="100" height="60" />
          </div>
        </nav>
      ) : null}
      {modal ? <Password setModal={setModal} /> : ""}
    </>
  );
};
export default NavBar;
