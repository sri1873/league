import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import base from "../../apis/base";
import { State, clearArenaDetails, setErrorMsg } from "../../store";
import { SlotType } from "../../types";
import TermsAndConditions from "../Utils/TermsAndConditions";


interface BookingResponse {
  bookingId: string,
  bookingDate: string,
  arena: string,
  slot: string,
}

const Slot: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const [TnCmodal, setTnCModal] = useState(true);
  const [slotId, setSlotId] = useState<string>("");
  const [slots, setSlots] = useState<SlotType[]>([]);
  const [html, setHTML] = useState<{ readonly __html: string }>({ __html: "" });
  const [pay, setPay] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const [bookingResponse, setBookingResponse] = useState<BookingResponse>({
    "bookingId": "",
    "bookingDate": "",
    "arena": "",
    "slot": "",
  });
  const userId = useSelector((state: State) => state.auth.user.userId);
  const arenaId = useSelector((state: State) => state.arena.arenaId)
  const arenaName = useSelector((state: State) => state.arena.arenaName)

  useEffect(() => {
    arenaId ?
      base.get(`api/v1/arenas/${arenaId}/slots?day=today`).then(res => setSlots(res.data.data)) : navigate('/')
  }, [])
  useEffect(() => {
    if (pay)
      base
        .get(
          `/api/v1/payu/users/${userId}/arenas/${arenaId}/slots/${slotId}/day/today/get-payu-button`
        )
        .then((res) => setHTML({ __html: res.data }));
  }, [slotId, userId, arenaId, pay]);

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    base({
      method: "POST",
      url: `api/v1/users/${userId}/bookings?day=today`,
      data: { arenaId: arenaId, slotId: slotId },
    })
      .then((res) => {
        console.log(res.data?.success);
        if (res.data?.success === true) {
          setBookingResponse({
            "bookingId": res.data.data?.id,
            "bookingDate": res.data.data?.bookingDate,
            "arena": res.data.data?.arena,
            "slot": res.data.data?.slot,
          });
          setModal(true);
        } else { dispatch(setErrorMsg(res.data?.message)) }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = (slot: SlotType) => {
    setSlotId(slot.id);
    setPay(slot?.paid);
  };

  const handleBack = () => {
    dispatch(clearArenaDetails())
    navigate('/')
  }

  const confirmationModal = (): React.JSX.Element => {
    return (
      <div className="modal">
        <div className=" modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5">Booking Details</h1>
              <button type="button" className="btn-close" onClick={e => setModal(false)} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <ul className="list-group" style={{ padding: "2%" }}>
                <li className="list-group-item">Booking Status : Success </li>
                <li className="list-group-item">Booking ID : {bookingResponse.bookingId}</li>
                <li className="list-group-item">Date : {bookingResponse.bookingDate}</li>
                <li className="list-group-item">Arena : {bookingResponse.arena}</li>
                <li className="list-group-item">Slot : {bookingResponse.slot}</li>
              </ul>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={e => { setModal(false) }} >Close</button>
              <button type="button" className="btn btn-outline-success" onClick={e => { setModal(false); navigate("/bookings") }} >View Bookings</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="registration">
      {TnCmodal ? <TermsAndConditions setTnCModal={setTnCModal} /> : <></>}
      <div className="arena-container">
        <div className="arena-name col-md-12">
          <i style={{ cursor: 'pointer' }} onClick={handleBack} className="fa-solid fa-arrow-left-long"></i>
          {arenaName}
        </div>
        {modal ? confirmationModal() : <></>}
        <div className="arena-slots">
          <div className="slots">
            {slots.map((slot) => {
              var unavailable = slot.available
                ? ""
                : "btn-outline-secondary disabled";
              var women = slot.forWomen ? "women" : "";
              return (
                <button
                  key={slot.id}
                  onClick={(e) => handleClick(slot)}
                  className={`slot btn ${unavailable} ${women} ${slot.id === slotId ? "selected-btn" : ""
                    }`}
                >
                  {slot.slot}
                </button>
              );
            })}
          </div>
        </div>
        {pay ? (
          <div dangerouslySetInnerHTML={html} />
        ) : (
          <button
            className={`booking-btn col-md-2 ${slotId ? "" : "disabled"}`}
            id="confirmBtn"
            onClick={(event) => slotId ? handleSubmit(event) : null}
          >
            Confirm Booking
          </button>
        )}
      </div></div>
  );
};
export default Slot;
