import { Dispatch } from "@reduxjs/toolkit";
import type { SelectProps } from 'antd';
import { Select } from 'antd';
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import base from "../../apis/base";
import { setErrorMsg } from "../../store";
import { Arena, SlotType } from "../../types";

interface ArenaControlProps {
    activeTab: "slot" | "school" | "arena" | null,
    setActiveTab: React.Dispatch<React.SetStateAction<"slot" | "school" | "arena" | null>>
}
interface CreateArenaDetails {
    name: string,
    description: string,
    arenaType: "OUTDOOR" | "INDOOR"
}
interface selectedSlotsPayload {
    label: string,
    value: string
}


const ArenaControl: React.FC<ArenaControlProps> = ({ activeTab, setActiveTab }) => {
    const [arenas, setArenas] = useState<Arena[]>([]);
    const [modal, setModal] = useState(false);
    const [updateArenaId, setUpdateArenaId] = useState<string>("");

    const dispatch: Dispatch = useDispatch();
    const [options, setOptions] = useState<SelectProps['options']>([]);
    const [updateSlotOptions, setUpdateSlotOptions] = useState<selectedSlotsPayload[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [newArenaForm, setNewArenaForm] = useState<CreateArenaDetails>({ name: '', description: '', arenaType: 'OUTDOOR' });

    useEffect(() => {
        base.get("api/v1/arenas").then(res => setArenas(res.data.data))
        base.get(`/api/v1/slots`).then(
            res => {
                res.data.data.map(((slot: SlotType) =>
                    setOptions(prevState => (
                        [...(prevState || []),
                        {
                            value: slot.id,
                            label: slot.slot,
                        }
                        ]))
                ))
            }
        )
    }, [])

    const createNewArena = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (updateArenaId) handleUpdate();
        else {
            if (selectedSlots.length === 0) {
                dispatch(setErrorMsg({ errMsg: "Please Select Slot Timings 😊", errColor: "danger" }))
            }
            else {
                base.post(`/api/v1/arenas`, newArenaForm).then(res => {
                    base.post(`api/v1/arenas/${res.data.data.id}/slots`, { "slotIds": selectedSlots }).then(() => window.location.reload()).catch(err => {
                        console.log(err)
                        dispatch(setErrorMsg({ errMsg: "An Error Occurred 😣", errColor: "danger" }))
                    })
                }).catch(err => {
                    console.log(err)
                    dispatch(setErrorMsg({ errMsg: "An Error Occurred 😣", errColor: "danger" }))
                })
            }
        }
        setModal(false)
    }

    const handleUpdate = () => {
        base.put(`/api/v1/arenas/${updateArenaId}/update-arena`, newArenaForm).then(res => {
            base.put(`api/v1/arenas/${res.data.data.id}/update-arena-slots`, { "slotIds": selectedSlots }).then(() => window.location.reload()).catch(err => {
                console.log(err)
                dispatch(setErrorMsg({ errMsg: "An Error Occurred 😣", errColor: "danger" }))
            })
        }).catch(err => {
            console.log(err)
            dispatch(setErrorMsg({ errMsg: "An Error Occurred 😣", errColor: "danger" }))
        })

        setUpdateSlotOptions([]);
        setSelectedSlots([]);
        setUpdateArenaId("");
    }

    const handleChange = (value: selectedSlotsPayload[]) => {
        const tempIds: string[] = []
        value.map(i => tempIds.push(i.value))
        setSelectedSlots(tempIds)
    };

    const onUpdateClick = (arena: Arena) => {
        setNewArenaForm({ name: arena.name, description: arena.description, arenaType: "OUTDOOR" })

        if (updateArenaId != arena.id) {
            base.get(`api/v1/arenas/${arena.id}/slots?day=today`).then(res => {
                res.data.data.map(((slot: SlotType) => {
                    setUpdateSlotOptions(prevState => (
                        [...(prevState || []),
                        {
                            value: slot.id,
                            label: slot.slot,
                        }
                        ]));
                    setSelectedSlots(prevState => (
                        [...(prevState || []),
                        slot.id
                        ]))
                }
                ))
                setModal(true)
                setUpdateArenaId(arena.id);
            })
        }
        else {
            setUpdateArenaId(arena.id);
            setModal(true);
        }
    }


    const handleMaintenance = (arena: Arena) => {
        base.put(`api/v1/arenas/${arena.id}/under-maintenance`).then(res => {
            base.get("api/v1/arenas").then(res => setArenas(res.data.data))
            dispatch(setErrorMsg({ errMsg: res.data.message + "👍", errColor: "success" }))
        })
    }

    const createArenaModal = () => {
        return (
            <form className="modal" onSubmit={e => createNewArena(e)}>
                <div className=" modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5">Add New Arena</h1>
                            <button type="button" className="btn-close" onClick={() => { setSelectedSlots([]); setUpdateSlotOptions([]); setUpdateArenaId(""); setModal(false) }} aria-label="Close"></button>
                        </div>
                        <div className="modal-body" >
                            <div className="flex" style={{ display: 'flex' }}>
                                <div className="col-6" >
                                    <label className="form-label">Arena Name</label>
                                    <input
                                        className="form-control mb-2"
                                        type={"text"}
                                        placeholder="Name"
                                        required
                                        value={newArenaForm.name}
                                        onChange={(e) =>
                                            setNewArenaForm((prevState) => ({
                                                ...(prevState),
                                                name: e.target.value,
                                            }))
                                        }
                                    />
                                    <label className="form-label">Type</label>
                                    <Select
                                        className="mb-2"
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        defaultValue={"OUTDOOR"}
                                        value={newArenaForm.arenaType}
                                        onChange={(value: "OUTDOOR" | "INDOOR") =>
                                            setNewArenaForm((prevState) => ({
                                                ...(prevState),
                                                arenaType: value,
                                            }))
                                        }
                                        options={[{ value: "OUTDOOR" }, { value: "INDOOR" }]}
                                    />

                                </div>
                                <div className="col-6 px-4">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        className="form-control "
                                        style={{ maxHeight: '18vh', height: '18vh' }}
                                        placeholder="Anything about it!"
                                        required
                                        value={newArenaForm.description}
                                        onChange={(e) =>
                                            setNewArenaForm((prevState) => ({
                                                ...prevState,
                                                description: e.target.value,
                                            }))
                                        }
                                    />

                                </div>
                            </div>
                            <label className="form-label">Select Slots</label>

                            <Select
                                mode="multiple"
                                allowClear
                                style={{ width: '100%' }}
                                placeholder="Please select"
                                onChange={handleChange}
                                options={options}
                                defaultValue={updateSlotOptions}
                                labelInValue={true}
                            />

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={() => { setSelectedSlots([]); setUpdateSlotOptions([]); setUpdateArenaId(""); setModal(false) }} >Close</button>
                            <button type="submit" className="btn btn-outline-success">Add</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
    return (
        <div className="arena-control-container">
            {modal ?
                createArenaModal()
                : <></>}
            {activeTab !== "arena" ?
                <>
                    <div className="label-name-disabled" onClick={() => { setActiveTab('arena'); window.scrollTo(0, 0) }}>
                        ARENAS
                        <i className="fa-solid fa-chevron-down"></i></div>
                </>
                :
                <>
                    <div className="arena-name" >
                        <div style={{ width: "100%" }}>
                            <i className="fa-solid fa-ranking-star"></i>
                            <button value="Add New" className="btn add-new-arena col-md-2" onClick={() => setModal(true)}>Add New</button>
                        </div>
                        ARENAS</div>
                    {arenas.map(arena => {
                        return (
                            <>
                                <div key={arena.id} className={`arena ${arena.underMaintainence ? "under-maintenance" : ""}`} >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
                                        <h1>{(arena.name).toUpperCase()}</h1>
                                        <div className="edit-options">
                                            <i className="fa-solid fa-pen-to-square" onClick={() => onUpdateClick(arena)}></i>
                                            <i className="fa-solid fa-screwdriver-wrench" onClick={() => handleMaintenance(arena)}></i>
                                        </div>
                                    </div>
                                    {arena.underMaintainence &&
                                        <div style={{ width: "100%", paddingLeft: "1rem", fontSize: "small", letterSpacing: "3px" }}>UNDER MAINTENANCE</div>
                                    }
                                </div>
                            </>
                        );
                    })}
                </>}
        </div>
    )
}

export default ArenaControl;