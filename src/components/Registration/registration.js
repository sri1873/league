import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import base from "../../apis/base";
import Payu from "./Payu";
import './registration.css';
import Slot from "./Slot";


const Registration = () => {
    const [arenaId, setArenaId] = useState("");
    const [arenaName, setArenaName] = useState("SELECT ARENA");
    const [arenas, setArenas] = useState([]);
    const [slots, setSlots] = useState([]);
    const userId = useSelector(state => state.user.userId);
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
            {arenaId?<i onClick={e=>setArenaId("")} className="fa-solid fa-arrow-right-long"></i>:<></>}
        </div>
        {!arenaId ?
            <div className="arena-details col-md-11">
                {arenas.map(arena => {
                    return (
                        <div className="arena" onClick={e => handleClick(arena.id, arena.name)}>
                            {arena.name}
                        </div>
                    );
                })}
            </div>
            :<Slot arenaId={arenaId} slots={slots}/>}
        {/* </div> */}
    </div>);
}
export default Registration;