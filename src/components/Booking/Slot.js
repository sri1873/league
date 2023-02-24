import React, { useState } from 'react'
// import base from '../../apis/base'

const Slot = ({ court, slots }) => {
    const [d, setd] = useState("-outline");
    const s = ["10:45", "10:20", "10:45", "10:20", "10:45", "10:20"];

    const handleClick = (e, id) => {
        e.preventDefault();
        if (id === e.key) setd('')
    }
    return (<div className='slot'>
        <p className='courtname'>{court}</p>
        {s.map((e,id) => {
            console.log(e.id)
            var c = (false == true) ? 'success' : 'secondary disabled';
            return (
                <button key={id} onClick={e => handleClick(e, id)} className={`btn btn${d}-${c}`}>{e}</button>);
        })}
    </div>);

}
export default Slot