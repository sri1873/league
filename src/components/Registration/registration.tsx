// import { Button } from "antd";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import base from "../../apis/base";
// import { State } from "../../store";
// import { Arena, SlotType } from "../../types";
// import Slot from "./Slot";
// import './registration.css';



// const icons = {
//     "volleyball": "fa-solid fa-volleyball",
//     "basketball": "fa-solid fa-basketball",
//     "football": "fa-regular fa-futbol",
//     "golf": "fa-solid fa-golf-ball-tee",
//     "tennis": "fa-solid fa-baseball",
//     "cricket": "fa-solid fa-baseball-bat-ball",
//     "kabbadi": "fa-solid fa-people-pulling",
//     "croquet": "fa-solid fa-gavel"
// }
// const Registration: React.FC = () => {
//     const [arenaId, setArenaId] = useState<string>("");
//     const [arenaName, setArenaName] = useState<string>("SELECT ARENA");
//     const [arenas, setArenas] = useState<Arena[]>([]);
//     const [slots, setSlots] = useState<SlotType[]>([]);
//     const [date, setDate] = useState<string>("today")
//     const [modal, setModal] = useState<boolean>(false);
//     const [acceptTerms, setAcceptTerms] = useState<boolean>(false);

//     const roles: string[] = useSelector((state: State) => state.auth.user.roles);
//     console.log(roles.includes('ADMIN'))
//     var today: Date = new Date();
//     var tomorrow: Date = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     var dayAfter: Date = new Date();
//     dayAfter.setDate(dayAfter.getDate() + 2);


//     useEffect(() => {
//         base.get("api/v1/arenas").then(res => setArenas(res.data.data))
//     }, [])
//     useEffect(() => {
//         if (arenaId && acceptTerms) base.get(`api/v1/arenas/${arenaId}/slots?day=${date}`).then(res => setSlots(res.data.data));
//     }, [date, arenaId, acceptTerms])

//     const handleClick = (
//         id: string,
//         name: string
//     ) => {
//         setModal(true);
//         setArenaId(id);
//         setArenaName(name);
//     };
//     const handleDate: React.MouseEventHandler<HTMLButtonElement> = (event) => {
//         setDate(event.currentTarget.value);
//     };
//     const getIcon: (arName: string) => string | "fa-solid fa-medal" = (arName: string) => {
//         for (const icon in icons) {
//             if (arName.includes(icon)) {
//                 return icons[icon as keyof typeof icons];
//             }
//         }
//         return "fa-solid fa-medal";
//     };

//     return (<div className="registration">
//         {modal ?
//             <div className="modal-lg modal">
//                 <div className=" modal-dialog">
//                     <div className="modal-content">
//                         <div className="modal-header">
//                             <h1 className="modal-title fs-5">Rules & Regulations</h1>
//                             <button type="button" className="btn-close" onClick={e => { setModal(false); setArenaId(""); setArenaName("SELECT ARENA") }} aria-label="Close"></button>
//                         </div>
//                         <div className="modal-body" style={{ overflow: "scroll", height: "50vh" }}>
//                             <ul>
//                                 <li>Slots coloured pink are reserved for girls, upon violation the instructors are viable to cancel your bookings</li>
//                                 <li>Slot booking is mandatory to use Badminton, Squash & Table tennis court. The slot timing will be strictly followed. You will not be allowed to use the court beyond the booked timing. Reach the court punctually and leave on time.</li>
//                                 <li>Badminton Court 7th has been reserved for faculty members, while Badminton Court 8th has been allocated to professional student players. If faculty and professional players are not using their respective courts, these courts will be available for general student bookings.</li>
//                                 <li>Sports X timings are from 5am to 10am and 4pm to 11pm.</li>
//                                 <li>Shoes, proper sports attire, and safety equipment as per the game is mandatory. No compromises on safety!</li>
//                                 <li>You can also rent Badminton Racket, Cricket bat and Badminton Shoes.</li>
//                                 <li>Students & Staff need to carry the shoes for Sports X and wear shoes here. This ensures the tidiness of the place.</li>
//                                 <li>Students ID card & Staff ID card is mandatory for renting any of the mentioned equipment. To rent the equipment, you need to go to the Collection room. Fill the information. Submit your ID card, take the locker key and token number. While returning you need to sign in the register. Pay the rental amount and give the locker key and token number back to the collection counter.</li>
//                                 <li>For snooker, pool, air hockey, foosball & chess, students need to collect the respective game items at the collection counter and handover it back to the collection counter.</li>
//                                 <li>Zumba & Spin studio is a group activity and only open under the supervision of the Trainers.</li>
//                                 <li>For games you can also bring your own equipment.</li>
//                                 <li>Do not vandalize or misuse the property.</li>
//                                 <li>Do not litter the premises.</li>
//                                 <li>Respect your team and opponents. Embrace a sportive spirit. "Win with humility, lose with grace, do both with dignity".</li>
//                                 <li>Kindly cooperate with the sports instructors. Their decision will be binding.</li>
//                                 <li>In case of any violation, disciplinary action will be taken.</li>
//                                 <li>In case of injury or emergency on court, please contact: +91 9709704747.</li>
//                                 <li>In case of any query, please write to sports@woxsen.edu.in.</li>
//                             </ul>
//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" onClick={e => { setAcceptTerms(false); setModal(false); setArenaId(""); setArenaName("SELECT ARENA") }} >Close</button>
//                             <button type="button" className="btn btn-outline-success" onClick={e => { setModal(false); setAcceptTerms(true) }}>Accept</button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             : <></>}


//         <div className="arena-container">
//             {arenaId ?
//                 <div style={{ width: "90%" }}>
//                     <div className="date-slots">
//                         <Button size="large" className="btn-date col-md-3 ">Select Date</Button>
//                         <button onClick={e => handleDate(e)} value="today" className={` col-md-3 time ${date === "today" ? "selected" : ""}`}>Today - {today.toLocaleDateString('en-GB')}</button>
//                         <button onClick={e => handleDate(e)} value="tomorrow" className={` col-md-3 time ${date === "tomorrow" ? "selected" : ""}`}>Tomorrow - {tomorrow.toLocaleDateString('en-GB')}</button>
//                         <button onClick={e => handleDate(e)} value="day-after" className={` col-md-3 time ${date === "day-after" ? "selected" : ""}`}>{dayAfter.toLocaleDateString('en-GB')}</button>
//                     </div>
//                 </div> : <></>}
//             <div className="arena-name col-md-12">
//                 {arenaId ? <i onClick={e => { setAcceptTerms(false); setArenaId(""); setSlots([]); setArenaName(("SELECT ARENA")) }} className="fa-solid fa-arrow-left-long"></i> : <></>}
//                 {arenaName}
//                 {roles.includes('ADMIN') ? <button value="Add New" className="col-md-2 ">Add New</button> : <></>}
//             </div>
//             {!arenaId ?
//                 <div className="arena-details col-md-12">
//                     {arenas.map(arena => {
//                         return (
//                             <div key={arena.id} className="arena" onClick={e => handleClick(arena.id, (arena.name).toUpperCase())}>
//                                 <i className={getIcon((arena.name).toLowerCase())}></i>
//                                 <h1>{(arena.name).toUpperCase()}</h1>
//                                 <div className="ar-bottom"></div>
//                             </div>
//                         );
//                     })}
//                 </div>
//                 : <Slot date={date} arenaId={arenaId} slots={slots} setArenaId={setArenaId} setArenaName={setArenaName} />}
//         </div>
//     </div>);
// }
// export default Registration;