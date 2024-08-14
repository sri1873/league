import React, { useEffect, useState } from "react";
import base from "../../apis/base";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setErrorMsg } from "../../store";
interface School {
    id: string,
    name: string
}
interface SchoolControlProps {
    activeTab: "slot" | "school" | "arena" | null,
    setActiveTab: React.Dispatch<React.SetStateAction<"slot" | "school" | "arena" | null>>
}
const SchoolControl: React.FC<SchoolControlProps> = ({ activeTab, setActiveTab }) => {

    const dispatch: Dispatch = useDispatch();
    const [schools, setSchools] = useState<School[]>([]);
    const [selectedSchool, setSelectedSchool] = useState<string>("");
    const [newSchoolFormData, setNewSchoolFormData] = useState<string>("");
    useEffect(() => {
        base.get("api/v1/Schools").then(res => setSchools(res.data.data))
    }, [])

    const handleSchoolSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        selectedSchool ?
            base.put(`api/v1/Schools/${selectedSchool}/update`, { "schoolName": newSchoolFormData }).then(res => dispatch(setErrorMsg({ errMsg: res.data.message + "👍", errColor: "success" }))) :
            base.post("api/v1/Schools", { "schoolName": newSchoolFormData }).then(res => dispatch(setErrorMsg({ errMsg: res.data.message + "👍", errColor: "success" })))
        window.location.reload();
    }

    return (
        <div className="school-control-container">
            {activeTab !== "school" ?
                <p className="label-name-disabled" onClick={e => { setActiveTab('school'); window.scrollTo(0, 0) }}>SCHOOL SETTINGS
                    <i className="fa-solid fa-chevron-down"></i></p>
                : <>
                    <p className="arena-name" >
                        <i className="fa-solid fa-graduation-cap"></i>
                        SCHOOL SETTINGS</p>
                    <form className="school-operations" onSubmit={(e) => handleSchoolSubmit(e)}>
                        <>
                            <label className="form-label">School Name</label>
                            <input type="text" required placeholder="NEW SCHOOL" value={newSchoolFormData} className="form-control"
                                onChange={e => { setNewSchoolFormData(e.target.value) }} />
                        </>
                        {selectedSchool ?
                            <>
                                <button type="submit" className="btn btn-outline-primary">Update</button>
                                <button className="btn btn-outline-danger" onClick={() => { setNewSchoolFormData(""); setSelectedSchool("") }}>Clear</button>
                            </> :
                            <button type="submit" className="btn btn-outline-primary">Add</button>
                        }

                    </form>
                    <div className="school-display-container">
                        {schools.map(school => {
                            return (
                                <div className="school-display-item" onClick={() => { setNewSchoolFormData(school.name); setSelectedSchool(school.id) }}>{school.name}</div>
                            )
                        })}
                    </div>
                </>}
        </div>
    )
}

export default SchoolControl;