import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import base from '../../apis/base';
import Payu from './Payu';

const Slot = ({ slots, arenaId,setDate,date }) => {
    const [slotId, setSlotId] = useState("")
    const [pay, setPay] = useState(true)
    const userId = useSelector(state => state.user.userId);

    const handleSubmit = (e) => {
        base({
            method: 'POST',
            url: `api/v1/users/${userId}/bookings?day=${date}`,
            data: { "arenaId": arenaId, "slotId": slotId }
        }).then(res => console.log(res))
    }
    const handleClick = (slot) => {
        setSlotId(slot.id);
        setPay(!pay);
    }
    const handleDate = e => {
        setDate(e.target.value);

    }
    return (<div className='arena-slots'>
        <div>
            <div className='time-slots'>
                <button onClick={e => handleDate(e)} value="today" className={`btn col-md-3 time ${date === "today" ? "selected" : ""}`}>Today</button>
                <button onClick={e => handleDate(e)} value="tomorrow" className={`btn col-md-3 time ${date === "tomorrow" ? "selected" : ""}`}>Tomorrow</button>
                <button onClick={e => handleDate(e)} value="day-after" className={`btn col-md-3 time ${date === "day-after" ? "selected" : ""}`}>Day After</button>
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
        {pay ? <Payu date={date} arenaId={arenaId} slotId={slotId} /> :
            <button className='booking-btn col-md-12' onClick={e => handleSubmit(e)}>Confirm Booking</button>}
    </div>);



}
export default Slot;

    // return (<div className='slot'>
    //         {slots.map((slot) => {
    //         var unavailable = (slot.available) ? 'success' : 'secondary disabled';
    //         return (
    //             <button key={slot.id} value={slot.id}
    //                 onClick={e => handleClick(e)}
    //                 className={`btn btn${slotId === slot.id ? "" : "-outline"}-${unavailable} `}
    //             >{slot.slot}</button>);
    //     })}
    // </div>);