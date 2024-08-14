import { useEffect, useState } from "react";
import base from "../../apis/base";
import { SlotType } from "../../types";
import { setErrorMsg } from "../../store";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";

interface SlotControlProps {
  activeTab: "slot" | "school" | "arena" | null,
  setActiveTab: React.Dispatch<React.SetStateAction<"slot" | "school" | "arena" | null>>
}
interface SlotFormType {
  slotName: string,
  slotStartTime: string,
  id?: string,
}

const SlotControl: React.FC<SlotControlProps> = ({ activeTab, setActiveTab }) => {
  const dispatch: Dispatch = useDispatch();
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  const [newSlotFormData, setNewSlotFormData] = useState<SlotFormType>({ "slotName": "", "slotStartTime": "" });

  useEffect(() => {
    base.get("api/v1/slots").then(res => setSlots(res.data.data))
  }, [])

  const handleSlotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    selectedSlot ?
      base.put(`api/v1/slots/${selectedSlot}/update`, newSlotFormData).then(res => dispatch(setErrorMsg({ errMsg: res.data.message + "👍", errColor: "success" }))) :
      base.post("api/v1/slots", newSlotFormData).then(res => dispatch(setErrorMsg({ errMsg: res.data.message + "👍", errColor: "success" })))
    window.location.reload();
  }

  return (
    <div className="slot-control-container">
      {activeTab !== "slot" ?
        <p className="label-name-disabled" onClick={() => {
          setActiveTab('slot'); window.scrollTo(0, 0);
        }}>
          SLOT SETTINGS
          <i className="fa-solid fa-chevron-down"></i>
        </p>
        : <>
          <p className="arena-name">
            <i className="fa-solid fa-stopwatch-20"></i>
            SLOT SETTINGS</p>

          <form className="school-operations" onSubmit={(e) => handleSlotSubmit(e)}>
            <>
              <label className="form-label">Slot Display Time</label>
              <input type="text" required placeholder="NEW SLOT" value={newSlotFormData.slotName} className="form-control"
                onChange={e => { setNewSlotFormData(prevState => ({ ...prevState, "slotName": e.target.value })) }} />
            </>
            <>
              <label className="form-label">Slot Start Time</label>
              <input type="time" required placeholder="NEW SLOT" value={newSlotFormData.slotStartTime} className="form-control"
                onChange={e => { setNewSlotFormData(prevState => ({ ...prevState, "slotStartTime": e.target.value + ":00" })) }} />
            </>
            {selectedSlot ?
              <>
                <button type="submit" className="btn btn-outline-primary">Update</button>
                <button className="btn btn-outline-danger" onClick={() => { setNewSlotFormData({ "slotName": "", "slotStartTime": "" }); setSelectedSlot("") }}>Clear</button>
              </> :
              <button type="submit" className="btn btn-outline-primary">Add</button>
            }

          </form>

          <div className="slot-display-container">
            {slots.map(slot => {
              return <div className="slot-display-item" onClick={() => { setSelectedSlot(slot.id); setNewSlotFormData({ "slotName": slot.slot, "slotStartTime": slot.startTime }) }}>{slot.slot}</div>;
            })}
          </div>
        </>
      }
    </div>
  )
}

export default SlotControl;