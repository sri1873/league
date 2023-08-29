import React, { useEffect, useState } from "react";
import base from "../../apis/base";
import './registration.css';
import Slot from "./Slot";
import { Button} from "antd";

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
    const [modal, setModal] = useState(false);

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
        setModal(true)
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
        {modal ?
            <div className="modal-lg modal">
            <div className=" modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">Rules & Regulations</h1>
                            <button type="button" className="btn-close" onClick={e => { setModal(false); setArenaId(""); setArenaName("SELECT ARENA")}}  aria-label="Close"></button>
                </div>
                <div className="modal-body" style={{overflow:"scroll", height:"50vh"}}>
                    <ul>
                        <li>Slots coloured pink are reserved for girls, upon violation the instructors are viable to cancel your bookings</li>
                        <li>Slot booking is mandatory to use Badminton, Squash & Table tennis court. The slot timing will be strictly followed. You will not be allowed to use the court beyond the booked timing. Reach the court punctually and leave on time.</li>
                        <li>Badminton Court 7th has been reserved for faculty members, while Badminton Court 8th has been allocated to professional student players. If faculty and professional players are not using their respective courts, these courts will be available for general student bookings.</li>
                        <li>Sports X timings are from 5am to 10am and 4pm to 11pm.</li>
                        <li>Shoes, proper sports attire, and safety equipment as per the game is mandatory. No compromises on safety!</li>
                        <li>You can also rent Badminton Racket, Cricket bat and Badminton Shoes.</li>
                        <li>Students & Staff need to carry the shoes for Sports X and wear shoes here. This ensures the tidiness of the place.</li>
                        <li>Students ID card & Staff ID card is mandatory for renting any of the mentioned equipment. To rent the equipment, you need to go to the Collection room. Fill the information. Submit your ID card, take the locker key and token number. While returning you need to sign in the register. Pay the rental amount and give the locker key and token number back to the collection counter.</li>
                        <li>For snooker, pool, air hockey, foosball & chess, students need to collect the respective game items at the collection counter and handover it back to the collection counter.</li>
                        <li>Zumba & Spin studio is a group activity and only open under the supervision of the Trainers.</li>
                        <li>For games you can also bring your own equipment.</li>
                        <li>Do not vandalize or misuse the property.</li>
                        <li>Do not litter the premises.</li>
                        <li>Respect your team and opponents. Embrace a sportive spirit. "Win with humility, lose with grace, do both with dignity".</li>
                        <li>Kindly cooperate with the sports instructors. Their decision will be binding.</li>
                        <li>In case of any violation, disciplinary action will be taken.</li>
                        <li>In case of injury or emergency on court, please contact: +91 9709704747.</li>
                        <li>In case of any query, please write to sports@woxsen.edu.in.</li>
                    </ul>
                </div>
                <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={e => { setModal(false); setArenaId(""); setArenaName("SELECT ARENA") }} >Close</button>
                    <button type="button" className="btn btn-outline-success" onClick={e => setModal(false)}>Accept</button>
                </div>
            </div>
            </div>
        </div> 
        : <></>}
        
        
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
                {arenaId ? <i onClick={e => { setArenaId(""); setSlots([]); setArenaName(("SELECT ARENA")) }} className="fa-solid fa-arrow-left-long"></i> : <></>}
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