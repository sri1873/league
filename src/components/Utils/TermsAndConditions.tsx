import { Dispatch } from "@reduxjs/toolkit";
import React from "react";
import { useDispatch } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { clearArenaDetails } from "../../store";

interface TnCProps {
    setTnCModal: React.Dispatch<React.SetStateAction<boolean>>
}

const TermsAndConditions: React.FC<TnCProps> = ({ setTnCModal }) => {
    const dispatch: Dispatch = useDispatch();
    const navigate: NavigateFunction = useNavigate();
    return (
        <div className="modal-lg modal">
            <div className=" modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5">Rules & Regulations</h1>
                        <button type="button" className="btn-close" onClick={e => { setTnCModal(false); dispatch(clearArenaDetails()); navigate('/') }} aria-label="Close"></button>
                    </div>
                    <div className="modal-body" style={{ overflow: "scroll", height: "50vh" }}>
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
                        <button type="button" className="btn btn-secondary" onClick={e => { setTnCModal(false); dispatch(clearArenaDetails()); navigate('/') }} >Close</button>
                        <button type="button" className="btn btn-outline-success" onClick={e => { setTnCModal(false) }}>Accept</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TermsAndConditions;