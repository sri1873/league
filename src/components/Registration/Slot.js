import React, { useEffect, useState } from 'react'
import base from '../../apis/base';

const Slot = ({ slots, setBookingDetails }) => {
    const [slotId, setSlotId] = useState()

    const handleClick = (e) => {

        e.preventDefault();
        setBookingDetails(prevState => ({ ...prevState, "slotId": e.target.value }))
        setBookingDetails(prevState => ({ ...prevState, "isPay": true }))
        setSlotId(e.target.value)
    }
    return (<div className='slot'>
            {slots.map((slot) => {
            var unavailable = (slot.available) ? 'success' : 'secondary disabled';
            return (
                <button key={slot.id} value={slot.id}
                    onClick={e => handleClick(e)}
                    className={`btn btn${slotId === slot.id ? "" : "-outline"}-${unavailable} `}
                >{slot.slot}</button>);
        })}
    </div>);

}
export default Slot