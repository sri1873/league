import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import base from "../../apis/base";
import Payu from "./Payu";
import './registration.css';
import Slot from "./Slot";


const Registration = () => {
    const [date, setDate] = useState("Today");
    const [arenaId, setArenaId] = useState("");
    const [arenas, setArenas] = useState([]);
    const [slots, setSlots] = useState([]);
    const [bookingDetails, setBookingDetails] = useState({})
    const userId = useSelector(state => state.user.userId);
    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bookingDetails?.isPay) {
            base({
                method: 'POST',
                url: `api/v1/users/${userId}/bookings`,
                data: { "arenaId": arenaId, "slotId": bookingDetails?.slotId }
            }).then(res => console.log(res))
        }
    }
    const handleDateClick = e => {
        setDate(e.target.value);
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
    }
    const dropdownToggle = (id) => {
        if (arenaId === id) {
            setArenaId("")
        } else {
            setArenaId(id)
            base.get(`api/v1/arenas/${id}/slots`).then(res => setSlots(res.data.data))
        }

    }

    return (<div className="registration">
        <div className="col-md-2 time-slots">
            <button className={`date ${date === 'Today' ? "selected" : ''}`} value="Today" onClick={e => handleDateClick(e)}>Today</button>
            <button className={`date ${date === 'Tomorrow' ? "selected" : ''}`} value="Tomorrow" onClick={e => handleDateClick(e)}>Tomorrow</button>
            <button className={`date ${date === 'Day After' ? "selected" : ''}`} value="Day After" onClick={e => handleDateClick(e)}>Day After</button>
        </div>
        <div className="col-md-10 arenas">
            {arenas.map(arena => {
                return (
                    <>
                        <div className="arena">
                            <div className="col-md-6 info">
                                {/* <div className="info"></div> */}
                                <button style={{ border: "none", backgroundColor: "transparent", paddingRight: "10%" }} className="dropdown-arrow" onClick={e => dropdownToggle(arena.id)}><i style={{ color: "white", fontSize: "xx-large" }} className="fa-solid fa-caret-down mr-3"></i></button>
                                {arena.name}
                            </div>
                            <div className="col-md-6 details">
                                <p>Total Slots : 12</p>
                                <p>Women Allocated Slots : 12</p>
                                <p>Slots Left : 12</p>
                            </div>
                            {/* <img class='col-md-6 bookmark' src="https://woxsen.edu.in/uploads/A20221109110949.jpg" /> */}
                        </div>
                        <div className={`dropdown-arena ${arenaId === arena.id ? "selected" : ""}`}>
                            <Slot slots={slots} setBookingDetails={setBookingDetails} />
                            {!bookingDetails?.isPay ?
                                <button className="btn submit" data-bs-target="#exampleModal" onClick={e => handleSubmit(e)} data-bs-toggle="modal">
                                    Confirm Booking
                                </button> : <Payu arenaId={arenaId} slotId={bookingDetails?.slotId} />}
                        </div>
                    </>

                )
            })}

        </div>
    </div>);
}
export default Registration;