import React, { useState, useEffect } from 'react'
import base from '../../apis/base'
import Slot from './Slot';
import './booking.css'

const Home = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log()
        base({
            method: 'POST',
            url: ``,
            data: ""
        }).then(res => console.log(res))
    }
    const datePickerId = new Date().toISOString().split("T")[0];
    return (
        <div className='home'>
            <form className="row g-3 booking" onSubmit={e => handleSubmit(e)}>
                <h3>Choose Your Slot</h3>
                <div class="col-md-4">
                    <label for="inputEmail4" class="form-label">Email</label>
                    <div className='input-group flex-nowrap'><span class="input-group-text">@</span>
                        <input type="email" class="form-control" id="inputEmail4" /></div>
                </div>
                <div class="col-md-4">
                    <label for="inputPassword4" class="form-label">Mobile</label>
                    <input type="password" class="form-control" id="inputPassword4" />
                </div>
                <div class="col-md-4">
                    <label for="inputPassword4" class="form-label">Date</label>
                    <input type="date" min={datePickerId} class="form-control" id="inputPassword4" />
                </div>
            <div className='col-md-3 illu'></div>
                <div className='slots col-9'>
                    <Slot court="Basketball" slots="" />
                    <Slot court="Football-1" slots="" />
                    <Slot court="Football-2" slots="" />
                    <Slot court="Volleyball" slots="" />
                    <Slot court="Throwball" slots="" />
                </div>
            </form>
        </div>
    );
}
export default Home;