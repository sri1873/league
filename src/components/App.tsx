import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "../apis/base";
import RequireAuth from "../helpers/RequireAuth";
import AdminWrapper from "./Admin/Wrapper";
import Footer from "./Footer";
import NavBar from "./NavBar";
import Booking from "./Registration/Booking";
import Registration from "./Registration/registration";
import Failure from "./Utils/Failure";
import InternalServerError from "./Utils/InternalServerError";
import Loader from "./Utils/Loader";
import PageNotFound from "./Utils/PageNotFound";
import Success from "./Utils/Success";
import Login from "./onboarding/Login";
import Onboarding from "./onboarding/Onboarding";
import SignUp from "./onboarding/SignUp";
import Error from "../helpers/Error";
import { setErrorMsg } from "../store";
import { Dispatch } from '@reduxjs/toolkit';
import { AuthState } from "../types";

const App: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const dispatch: Dispatch = useDispatch();
    // Below 2 functions enable and disable loader for each api call
    axios.interceptors.request.use((config) => {
        const newConfig = { ...config }
        newConfig.headers.startDate = new Date();
        setLoading(true)
        return newConfig;
    })
    axios.interceptors.response.use(response => {
        const newRes = { ...response }
        newRes.config.headers.endTime = new Date();
        newRes.headers.duration =
            newRes.config.headers.endTime - newRes.config.headers.startTime;
        newRes.headers.duration < 700 ? setTimeout(() => { setLoading(false) }, 800 - newRes.headers.duration) : setLoading(false);
        return newRes
    }, error => {
        const newRes = { ...error }
        dispatch(setErrorMsg(error?.response?.data?.message))
        newRes.config.metadata.endTime = new Date();
        newRes.duration =
            newRes.config.metadata.endTime - newRes.config.metadata.startTime;
        newRes.duration < 700 ? setTimeout(() => { setLoading(false) }, 800 - newRes.duration) : setLoading(false);
        return newRes
    })
    const roles = useSelector((state: AuthState) => state.user.roles)
    const roleAdmin = () => {
        if (roles.includes("STUDENT") && roles.includes("ADMIN")) {
            return <>
                <Route path="/" element={<Registration />} />
                <Route path="/adminpage" element={<AdminWrapper />} />
                <Route path="/bookings" element={<Booking />} />
            </>
        } else if (roles.includes("STUDENT")) {
            return <> <Route path="/" element={<Registration />} />
                <Route path="/bookings" element={<Booking />} /></>
        } else if (roles.includes("ADMIN")) {
            return <><Route path="/" element={<AdminWrapper />} />
                <Route path="/bookings" element={<PageNotFound />} />
            </>
        }
    }
    return (<>
        <NavBar />
        <Loader state={loading} />
        <Error color={"danger"} message={useSelector((state: AuthState) => state.errorMsg)} />

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Onboarding><Login /></Onboarding>} />
                <Route path="/signup" element={<Onboarding><SignUp /></Onboarding>} />

                <Route element={<RequireAuth />}>
                    {roleAdmin()}
                    <Route path="/" element={<Registration />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/fail" element={<Failure />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
                <Route path="/server-error" element={<InternalServerError />} />
            </Routes>
        </BrowserRouter>
        {/* </div> */}
        <Footer />
    </>
    );
};

export default App;
