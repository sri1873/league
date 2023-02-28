import React, { useEffect, useState } from 'react'
import base from '../../apis/base'
import Slot from './Slot';
import './booking.css'
import Payu from './Payu';
import { useSelector } from 'react-redux';


const Home = () => {
    const [arenas, setArenas] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({})
    const userId = useSelector(state => state.user.userId);
    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
    }, [])

    console.log(bookingDetails?.arenaId, bookingDetails?.slotId)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (bookingDetails?.isPay) {
            <Payu arenaId={bookingDetails?.arenaId} slotId={bookingDetails?.slotId} />
        } else {
            base({
                method: 'POST',
                url: `api/v1/users/${userId}/bookings`,
                data: { "arenaId": bookingDetails?.arenaId, "slotId": bookingDetails?.slotId }
            }).then(res => console.log(res))
        }
    }
    const modalResource = <div className="modal" tabIndex="-1" id="exampleModal">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Hooray!</h5>
                    <button type="button" className="btn-close" onClick={e => window.location.reload()} data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <p>Booking Successfull.</p>
                </div>
                <div className="modal-footer">
                    <button type="button" onClick={e => window.location.reload()} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
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
                    {!bookingDetails?.isPay ? "Confirm Booking" : <Payu arenaId={bookingDetails?.arenaId} slotId={bookingDetails?.slotId} />}
                </button>
            </form>
        </div>
    );
}
export default Home;