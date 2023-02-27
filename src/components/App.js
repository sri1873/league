import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './onboarding/Login';
import SignUp from './onboarding/SignUp';
import Page from './onboarding/Page';
import Home from './Booking/Home';
import NavBar from './NavBar';
import RequireAuth from '../helpers/RequireAuth';
import Booking from './Booking/Booking';


const App = () => {
    return (<>
        <NavBar />
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Page><Login /></Page>} />
                <Route path="/signUp" element={<Page><SignUp /></Page>} />
                <Route element={<RequireAuth />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/bookings" element={<Booking />} />
                </Route>
            </Routes>
        </BrowserRouter>
    </>
    );
}

export default App