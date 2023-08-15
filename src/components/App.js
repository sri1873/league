import React, { useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import Login from "./onboarding/Login";
import SignUp from "./onboarding/SignUp";
import Onboarding from "./onboarding/Onboarding";
import NavBar from "./NavBar";
import RequireAuth from "../helpers/RequireAuth";
import Booking from "./Registration/Booking";
import Success from "./Utils/Success";
import Failure from "./Utils/Failure";
import PageNotFound from "./Utils/PageNotFound";
import InternalServerError from "./Utils/InternalServerError";
import Registration from "./Registration/registration";
import AdminWrapper from "./Admin/Wrapper";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import axios from "../apis/base";
import Loader from "./Utils/Loader";

const App = () => {
    const [loading, setLoading] = useState(false)
    // Below 2 functions enable and disable loader for each api call
    axios.interceptors.request.use(function (config) {
        const newConfig = { ...config }
        newConfig.metadata = { startTime: new Date() }
        setLoading(true)
        return newConfig;
    })
    axios.interceptors.response.use(function (response) {
        const newRes = { ...response }
        newRes.config.metadata.endTime = new Date();
        newRes.duration =
            newRes.config.metadata.endTime - newRes.config.metadata.startTime;
        newRes.duration < 700 ? setTimeout(() => { setLoading(false) }, 800-newRes.duration) : setLoading(false);
        return newRes
    })
    const roles = useSelector(state => state.user.roles)
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
        <div className="content">
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Onboarding><Login /></Onboarding>} />
                    <Route path="/signup" element={<Onboarding><SignUp /></Onboarding>} />

                    <Route element={<RequireAuth />}>
                        {roleAdmin()}
                        <Route path="/" element={<Registration />} />
                        <Route path="/success" element={<Success />} />
                        <Route path="/failure" element={<Failure />} />
                    </Route>

                    <Route path="*" element={<PageNotFound />} />
                    <Route path="/server-error" element={<InternalServerError />} />
                </Routes>
            </BrowserRouter>
        </div>
        <Footer />
    </>
    );
};

export default App;
