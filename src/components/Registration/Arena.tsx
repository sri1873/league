import { Dispatch } from "@reduxjs/toolkit";
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import base from "../../apis/base";
import { State, setArenaDetails, setErrorMsg } from "../../store";
import { Arena, SlotType } from "../../types";
import './registration.css';
interface CreateArenaDetails {
    name: string,
    description: string,
    arenaType: "OUTDOOR" | "INDOOR"
}
interface selectedSlotsPayload {
    label: string,
    value: string
}

const icons = {
    "volleyball": "fa-solid fa-volleyball",
    "basketball": "fa-solid fa-basketball",
    "football": "fa-regular fa-futbol",
    "golf": "fa-solid fa-golf-ball-tee",
    "tennis": "fa-solid fa-baseball",
    "cricket": "fa-solid fa-baseball-bat-ball",
    "kabbadi": "fa-solid fa-people-pulling",
    "croquet": "fa-solid fa-gavel",
    "swimming": "fa-solid fa-person-swimming",
    "table": "fa-solid fa-table-tennis-paddle-ball",
}

const ArenaScreen: React.FC = () => {
    const navigate: NavigateFunction = useNavigate();
    const [arenas, setArenas] = useState<Arena[]>([]);
    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
    }, [])

    const handleClick = (arenaId: string, arenaName: string) => {
        dispatch(setArenaDetails({ arenaId, arenaName }))
        navigate('/slotBooking')
    };


    const getIcon: (arName: string) => string | "fa-solid fa-medal" = (arName: string) => {
        for (const icon in icons) {
            if (arName.includes(icon)) {
                return icons[icon as keyof typeof icons];
            }
        }
        return "fa-solid fa-medal";
    };

    return (<div className="registration">
        <div className="arena-container">
            <div className="arena-name col-md-12">
                SELECT ARENA
            </div>
            <div className="arena-details col-md-12">
                {arenas.map(arena => {
                    return (
                        <>
                            {!arena.underMaintainence &&
                                <div key={arena.id} className="arena" onClick={e => handleClick(arena.id, (arena.name).toUpperCase())}>
                                    <i className={getIcon((arena.name).toLowerCase())}></i>
                                    <h1>{(arena.name).toUpperCase()}</h1>
                                    <div className="ar-bottom"></div>
                                </div>
                            }
                        </>
                    );
                })}
            </div>

        </div>
    </div>);
}
export default ArenaScreen;