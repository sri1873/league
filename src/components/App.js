import React, { useState,useEffect } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './onboarding/Login';
import SignUp from './onboarding/SignUp';
import Page from './onboarding/Page';

const App=()=>{
    
    return(<>
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Page><Login/></Page>}/>
    <Route path="/signUp" element={<Page><SignUp /></Page>} />
    </Routes>
    </BrowserRouter>
    </>
    );
}

export default App