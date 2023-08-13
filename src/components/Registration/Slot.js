import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import base from '../../apis/base';

const Slot = ({ slots, arenaId, date }) => {
    const navigate = useNavigate();

    const [slotId, setSlotId] = useState("")
    const [html, setHTML] = useState({ __html: "" });
    const [pay, setPay] = useState(false)
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        if (pay)
            base.get(`/api/v1/payu/users/${userId}/arenas/${arenaId}/slots/${slotId}/day/${date}/get-payu-button`).then(res => setHTML({ "__html": res.data }))
    }, [slotId, userId, arenaId, date, pay])

    const handleSubmit = (e) => {

        base({
            method: 'POST',
            url: `api/v1/users/${userId}/bookings?day=${date}`,
            data: { "arenaId": arenaId, "slotId": slotId }
        }).then(res => navigate("/bookings"))
    }
    const handleClick = (slot) => {
        setSlotId(slot.id);
        setPay(slot?.paid)
    }
    return (
        <>

            <div className='arena-slots'>
                <div className='slots'>
                    {slots.map((slot) => {
                        var unavailable = (slot.available) ? '' : 'btn-outline-secondary disabled';
                        var women = (slot.forWomen) ? "women" : ""
                        return (
                            <button key={slot.id}
                                onClick={e => handleClick(slot)}
                                className={`slot btn ${unavailable} ${women} ${slot.id === slotId ? "selected-btn" : ""}`}
                            >{slot.slot}</button>
                        );
                    })}
                </div>
            </div>
            {pay ? <div dangerouslySetInnerHTML={html} /> :
                <button className={`booking-btn col-md-2 ${slotId ? "" : "disabled"}`} disabled={slotId ? "" : "false"} onClick={e => { e.currentTarget.disabled = true; handleSubmit(e) }}>Confirm Booking</button>}
        </>
    );


}
export default Slot;