import { Dispatch } from '@reduxjs/toolkit';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "../apis/base";
import Error from "../helpers/Error";
import RequireAuth from "../helpers/RequireAuth";
import { State, setErrorMsg } from "../store";
// import AdminControls from "./Admin/Wrapper";
import Footer from "./Footer";
import NavBar from "./NavBar";
import ArenaScreen from "./Registration/Arena";
import Booking from "./Registration/Booking";
// import Registration from "./Registration/registration";
// import Dashboard from './Admin/Dashboard';
import ControlCenter from './Admin/ControlCenter';
import Slot from './Registration/Slot';
import Failure from "./Utils/Failure";
import InternalServerError from "./Utils/InternalServerError";
import Loader from "./Utils/Loader";
import PageNotFound from "./Utils/PageNotFound";
import Success from "./Utils/Success";
import Login from "./onboarding/Login";
import Onboarding from "./onboarding/Onboarding";
import SignUp from "./onboarding/SignUp";


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
        dispatch(setErrorMsg({errMsg:error?.response?.data?.message + "😔",errColor:"danger"}))
        newRes.config.headers.endTime = new Date();
        newRes.duration =
            newRes.config.headers.endTime - newRes.config.headers.startTime;
        newRes.duration < 700 ? setTimeout(() => { setLoading(false) }, 800 - newRes.duration) : setLoading(false);
        return newRes
    })
    const roles = useSelector((state: State) => state.auth.user.roles)
    const roleAdmin = () => {
        if (roles.includes("STUDENT")) {
            return <>
                <Route path="/" element={<ArenaScreen />} />
                <Route path="/slotBooking" element={<Slot />} />
                <Route path="/bookings" element={<Booking />} /></>
        } else if (roles.includes("ADMIN")) {
            return <>
                <Route path="/" element={<ArenaScreen />} />
                <Route path="/slotBooking" element={<Slot />} />
                <Route path="/bookings" element={<Booking />} />
                <Route path="/controlcenter" element={<ControlCenter />} />
            </>
        }
        else return <></>
    }
    return (<>
        <NavBar />
        <Loader state={loading} />
        <Error color={useSelector((state: State) => state.auth.errorColor)} message={useSelector((state: State) => state.auth.errorMsg)} />

        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Onboarding><Login /></Onboarding>} />
                <Route path="/signup" element={<Onboarding><SignUp /></Onboarding>} />

                <Route element={<RequireAuth />}>
                    {roleAdmin()}
                    <Route path="/" element={<ArenaScreen />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/fail" element={<Failure />} />
                </Route>

                <Route path="*" element={<PageNotFound />} />
                <Route path="/server-error" element={<InternalServerError />} />
            </Routes>
        </BrowserRouter>

        <Footer />
    </>
    );
};

export default App;
