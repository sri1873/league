import React, { useEffect, useState } from "react";
import base from "../../apis/base";
import './registration.css';
import Slot from "./Slot";
import { Button, Form, Input, Card, Select } from "antd";
import { Option } from "antd/es/mentions";
import { DoubleRightOutlined, SendOutlined } from "@ant-design/icons"

const icons = {
    "volleyball": "fa-solid fa-volleyball",
    "basketball": "fa-solid fa-basketball",
    "football": "fa-regular fa-futbol",
    "golf": "fa-solid fa-golf-ball-tee",
    "tennis":"fa-solid fa-baseball",
    "cricket": "fa-solid fa-baseball-bat-ball",
    "kabbadi": "fa-solid fa-people-pulling",
    "croquet":"fa-solid fa-gavel"
}
const Registration = () => {
    const [arenaId, setArenaId] = useState("");
    const [arenaName, setArenaName] = useState("SELECT ARENA");
    const [arenas, setArenas] = useState([]);
    const [slots, setSlots] = useState([]);
    const [date, setDate] = useState("today")

    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var dayAfter = new Date();
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
        console.log(e.target.value)
        setDate(e.target.value);
    }
    const getIcon = (arName) => {
        for (const icon in icons) {
            if (arName.includes(icon)) {
                return icons[icon];
            }
        }
        return "fa-solid fa-medal";
    }

    return (<div className="registration">
        <div className="arena-container">
            {arenaId ?
                <div style={{ width: "90%" }}>
                    <div className="date-slots">
                        <Button size="large" className="btn-date col-md-3 ">Select Date</Button>
                        <button size="large" onClick={e => handleDate(e)} value="today" className={` col-md-3 time ${date === "today" ? "selected" : ""}`}>Today - {today.toLocaleDateString('en-GB')}</button>
                        <button size="large" onClick={e => handleDate(e)} value="tomorrow" className={` col-md-3 time ${date === "tomorrow" ? "selected" : ""}`}>Tomorrow - {tomorrow.toLocaleDateString('en-GB')}</button>
                        <button size="large" onClick={e => handleDate(e)} value="day-after" className={` col-md-3 time ${date === "day-after" ? "selected" : ""}`}>{dayAfter.toLocaleDateString('en-GB')}</button>
                    </div>
                </div> : <></>}
            <div className="arena-name col-md-12">
                {arenaId ? <i onClick={e => { setArenaId(""); setArenaName(("SELECT ARENA")) }} className="fa-solid fa-arrow-left-long"></i> : <></>}
                {arenaName}
            </div>
            {!arenaId ?
                <div className="arena-details col-md-12">
                    {arenas.map(arena => {
                        return (
                            <div key={arena.id} className="arena" onClick={e => handleClick(arena.id, (arena.name).toUpperCase())}>
                                <i className={getIcon((arena.name).toLowerCase())}></i>
                                <h1>{(arena.name).toUpperCase()}</h1>
                                <div className="ar-bottom"></div>
                            </div>
                        );
                    })}
                </div>
                : <Slot date={date} arenaId={arenaId} slots={slots} />}
        </div>
    </div>);
}
export default Registration;