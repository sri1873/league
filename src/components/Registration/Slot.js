import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import base from '../../apis/base';

const Slot = ({ slots, arenaId, setDate, date }) => {
    const navigate = useNavigate();
    
    const [slotId, setSlotId] = useState("")
    const [html, setHTML] = useState({ __html: "" });
    const [pay, setPay] = useState(false)
    const userId = useSelector(state => state.user.userId);

    useEffect(() => {
        if (pay)
            base.get(`/api/v1/payu/users/${userId}/arenas/${arenaId}/slots/${slotId}/day/${date}/get-payu-button`).then(res => setHTML({ "__html": res.data }))
    }, [slotId])

    const handleSubmit = (e) => {
        base({
            method: 'POST',
            url: `api/v1/users/${userId}/bookings?day=${date}`,
            data: { "arenaId": arenaId, "slotId": slotId }
        }).then(res =>  navigate("/bookings"))
    }
    const handleClick = (slot) => {
        setSlotId(slot.id);
        setPay(slot?.paid)
    }
    const handleDate = e => {
        setDate(e.target.value);

    }
    return (<div className='arena-slots'>
        <div>
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
            <button className={`booking-btn col-md-4 ${slotId?"":"disabled"}`} disabled={slotId?"":"false"} onClick={e => handleSubmit(e)}>Confirm Booking</button>}
    </div>);



}
export default Slot;