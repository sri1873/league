import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './onboarding/Login';
import SignUp from './onboarding/SignUp';
import Onboarding from './onboarding/Onboarding';
import NavBar from './NavBar';
import RequireAuth from '../helpers/RequireAuth';
import Booking from './Registration/Booking';
import Success from './Utils/Success';
import Failure from './Utils/Failure';
import PageNotFound from './Utils/PageNotFound';
import InternalServerError from './Utils/InternalServerError';
import Registration from './Registration/registration';
import AdminWrapper from "./Admin/Wrapper";


const App = () => {
    return (<>
        <NavBar />
        
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Onboarding><Login /></Onboarding>} />
                <Route path="/signUp" element={<Onboarding><SignUp /></Onboarding>} />

                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Registration />} />
                    <Route path="/bookings" element={<Booking />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/failure" element={<Failure />} />
                    <Route path="/adminPage" element={<AdminWrapper />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
                <Route path="/server-error" element={<InternalServerError />} />
            </Routes>
        </BrowserRouter>
    </>
  );
};

export default App;
