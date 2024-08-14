import SlotControl from './SlotControl';
import React, { useEffect, useState } from "react";
import './controlcenter.css'
import { Arena, SlotType } from "../../types";
import base from "../../apis/base";
import { List } from "antd";
import ArenaControl from './ArenaControl';
import SchoolControl from './SchoolControl';

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];


const ControlCenter = () => {
    const [activeTab, setActiveTab] = useState<"slot" | "school" | "arena" | null>(null)



    return (
        <div className="control-center-container">

            <SlotControl activeTab={activeTab} setActiveTab={setActiveTab} />
            <SchoolControl activeTab={activeTab} setActiveTab={setActiveTab} />
            <ArenaControl activeTab={activeTab} setActiveTab={setActiveTab} />

        </div>
    );
}
export default ControlCenter;