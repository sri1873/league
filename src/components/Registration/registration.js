import React, { useEffect, useState } from "react";
import base from "../../apis/base";
import './registration.css';
import Slot from "./Slot";


const Registration = () => {
    const [arenaId, setArenaId] = useState("");
    const [arenaName, setArenaName] = useState("SELECT ARENA");
    const [arenas, setArenas] = useState([]);
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState("today")

    var today = new Date();
    var tomorrow = new Date();
    var dayAfter = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dayAfter.setDate(dayAfter.getDate() + 2);


    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))

    }, [])
    useEffect(() => {
        if (arenaId) base.get(`api/v1/arenas/${arenaId}/slots?day=${date}`).then(res => setSlots(res.data.data));
    }, [date, arenaId])

    const handleClick = (id, name) => {
        setArenaId(id)
        setArenaName(name)
    }
    const handleDate = e => {
        setDate(e.target.value);
    }
    return (<div className="registration">
        <div className="col-md-6 time-slots">
            <label className="btn btn-secondary">Select Date</label>
            <select className="btn col-md-3 time" onChange={e => handleDate(e)}>
                <option value="today">Today</option>
                <option value="tomorrow">Tomorrow</option>
                <option value="day-after">Day After</option>
            </select>
            <span className="btn col-md-3 time">{date === "today" ? today.toLocaleDateString('en-GB') : date === "tomorrow" ? tomorrow.toLocaleDateString('en-GB') : dayAfter.toLocaleDateString('en-GB')}</span>
        </div>
        <div className="arena-name col-md-12">
            {arenaId ? <i onClick={e => { setArenaId(""); setArenaName(("SELECT ARENA")) }} className="fa-solid fa-arrow-left-long"></i> : <></>}
            {arenaName}
        </div>
        {!arenaId ?
            <div className="arena-details col-md-12">
                {arenas.map(arena => {
                    return (
                        <div key={arena.id} className="arena" onClick={e => handleClick(arena.id, (arena.name).toUpperCase())}>
                            {(arena.name).toUpperCase()}
                        </div>
                    );
                })}
            </div>
            : <Slot setDate={setDate} handleClick={handleClick} date={date} arenaId={arenaId} slots={slots} />}
    </div>);
}
export default Registration;