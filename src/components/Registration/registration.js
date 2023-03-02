import React, { useEffect, useState } from "react";
import base from "../../apis/base";
import './registration.css';
import Slot from "./Slot";


const Registration = () => {
    const [arenaId, setArenaId] = useState("");
    const [arenaName, setArenaName] = useState("SELECT ARENA");
    const [arenas, setArenas] = useState([]);
    const [slots, setSlots] = useState([]);
    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
    }, [])

    const handleClick = (id, name) => {
        setArenaId(id)
        setArenaName(name)
        base.get(`api/v1/arenas/${id}/slots`).then(res => setSlots(res.data.data))
    }

    return (<div className="registration">
        {/* <div className="main"> */}
        <div className="arena-name col-md-1">
            {arenaName}
            {arenaId?<i onClick={e=>{setArenaId("");setArenaName(("SELECT ARENA"))}} className="fa-solid fa-arrow-right-long"></i>:<></>}
        </div>
        {!arenaId ?
            <div className="arena-details col-md-11">
                {arenas.map(arena => {
                    return (
                        <div key={arena.id} className="arena" onClick={e => handleClick(arena.id, (arena.name).toUpperCase())}>
                            {(arena.name).toUpperCase()}
                        </div>
                    );
                })}
            </div>
            :<Slot arenaId={arenaId} slots={slots}/>}
        {/* </div> */}
    </div>);
}
export default Registration;