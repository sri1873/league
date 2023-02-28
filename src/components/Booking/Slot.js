import React, { useEffect, useState } from 'react'
import base from '../../apis/base';

const Slot = ({ arenaId, court, setBookingDetails }) => {
    const [slotId, setSlotId] = useState();
    const [slots, setSlots] = useState([]);
    useEffect(() => {
        base.get(`api/v1/arenas/${arenaId}/slots`).then(res => setSlots(res.data.data))
    }, [arenaId])

    const handleClick = (e) => {

        e.preventDefault();
        // e.target.classList.add("btn-outline")
        setBookingDetails(prevState => ({ ...prevState, "slotId": e.target.value }))
        setBookingDetails(prevState => ({ ...prevState, "arenaId": arenaId }))
        setBookingDetails(prevState => ({ ...prevState, "isPay": true }))
        setSlotId(e.target.value)
    }
    return (<div className='slot'>
        <p className='courtname'>{court}</p>
        {slots.map((slot) => {
            var css=(slot.available) ? '' : 'btn btn-outline-secondary disabled';
        var unavailable = (slot.available) ? 'success' : 'secondary disabled';
        return (
        <button key={slot.id} value={slot.id}
            onClick={e => handleClick(e)}
            className={`btn btn${slotId === slot.id ? "" : "-outline"}-${unavailable} pink `}
        >{slot.slot}</button>);
        })}
    </div>);

}
export default Slot