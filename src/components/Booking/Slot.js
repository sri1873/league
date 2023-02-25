import React, { useEffect, useState } from 'react'
import base from '../../apis/base';
// import base from '../../apis/base'

const Slot = ({ arenaId, court, setBookingDetails }) => {
    const [slotId, setSlotId] = useState();
    const [slots, setSlots] = useState([]);
    useEffect(() => {
        base.get(`api/v1/arenas/${arenaId}/slots`).then(res => setSlots(res.data.data))
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        setBookingDetails(prevState => ({ ...prevState, "slotId": e.target.value }))
        setBookingDetails(prevState => ({ ...prevState, "arenaId": arenaId }))
        // setBookingDetails(prevState => ({ ...prevState, "isPay": true }))
        setSlotId(e.target.value)
    }
    return (<div className='slot'>
        <p className='courtname'>{court}</p>
        {slots.map((slot) => {
            var unavailable = (slot.available) ? 'success' : 'secondary disabled';

            return (
                <button key={slot.id} value={slot.id} onClick={e => handleClick(e)} className={`btn btn-outline-${unavailable}`}>{slot.slot}</button>);
        })}
    </div>);

}
export default Slot