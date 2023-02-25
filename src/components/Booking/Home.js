import React, { useEffect, useState } from 'react'
import base from '../../apis/base'
import Slot from './Slot';
import './booking.css'
import Payu from '../../helpers/Payu';

const Home = () => {
    const [arenas, setArenas] = useState([]);
    const [slots, setSlots] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({})
    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log()
        if (bookingDetails?.isPay) {
            // <Payu />
        } else {
            base({
                method: 'POST',
                url: `api/v1/users/${sessionStorage.getItem("userId")}/bookings`,
                data: { "arenaId": bookingDetails?.arenaId, "slotId": bookingDetails?.slotId }
            }).then(res => console.log(res))
        }
    }
    const modalResource = <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Hooray!</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Booking Successfull.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">See Bookings</button>
                </div>
            </div>
        </div>
    </div>
    return (
        <div className='home'>
            {modalResource}
            <form className="row g-3 booking" onSubmit={e => handleSubmit(e)}>
                <h3>Choose Your Slot</h3>
                <div className="col-md-4">
                    <label className="form-label">Mobile</label>
                    <input type="number" className="form-control" />
                </div>
                <div className='col-md-8 illu'></div>
                <div className='slots col-12'>
                    {arenas.map(arena => {
                        return <Slot key={arena.id} arenaId={arena.id} court={arena.name} setBookingDetails={setBookingDetails} />
                    })}
                </div>
                <button type='submit' className="btn btn-info" data-bs-target="#exampleModal" data-bs-toggle="modal">
                    {!bookingDetails?.isPay ? "Confirm Booking" : <Payu />}
                </button>
            </form>
        </div>
    );
}
export default Home;