import React from 'react'
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
                <div className="col-md-4">
                    <label className="form-label">Email</label>
                    <div className='input-group flex-nowrap'><span className="input-group-text">@</span>
                        <input type="email" className="form-control" id="inputEmail4" /></div>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Mobile</label>
                    <input type="password" className="form-control"/>
                </div>
                <div className="col-md-4">
                    <label className="form-label">Date</label>
                    <input type="date" min={datePickerId} className="form-control"/>
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