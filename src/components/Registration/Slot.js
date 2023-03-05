import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import base from '../../apis/base';

const Slot = ({ slots, arenaId, setDate, date }) => {
    const [slotId, setSlotId] = useState("")
    const [html, setHTML] = useState({ __html: "" });
    const [pay, setPay] = useState(false)
    const userId = useSelector(state => state.user.userId);

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dayAfter = new Date();
    dayAfter.setDate(dayAfter.getDate() + 2);

    useEffect(() => {
        if (pay)
            base.get(`/api/v1/payu/users/${userId}/arenas/${arenaId}/slots/${slotId}/day/${date}/get-payu-button`).then(res => setHTML({ "__html": res.data }))
    }, [slotId])

    const handleSubmit = (e) => {
        base({
            method: 'POST',
            url: `api/v1/users/${userId}/bookings?day=${date}`,
            data: { "arenaId": arenaId, "slotId": slotId }
        }).then(res => console.log(res))
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
            <div className='time-slots'>
                <button onClick={e => handleDate(e)} value="today" className={`btn col-md-3 time ${date === "today" ? "selected" : ""}`}>Today {today.toLocaleDateString('en-GB')} </button>
                <button onClick={e => handleDate(e)} value="tomorrow" className={`btn col-md-3 time ${date === "tomorrow" ? "selected" : ""}`}>Tomorrow {tomorrow.toLocaleDateString('en-GB')}</button>
                <button onClick={e => handleDate(e)} value="day-after" className={`btn col-md-3 time ${date === "day-after" ? "selected" : ""}`}>{dayAfter.toLocaleDateString('en-GB')}</button>
            </div>
        </div>
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
            <button className='booking-btn col-md-12' onClick={e => handleSubmit(e)}>Confirm Booking</button>}
    </div>);



}
export default Slot;