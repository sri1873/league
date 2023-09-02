import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigateFunction, useNavigate } from "react-router-dom";
import base from "../../apis/base";
import { setErrorMsg } from "../../store";
import { SlotType, AuthState } from "../../types";

interface SlotProps {
  slots: SlotType[];
  arenaId: string;
  date: string;
}
const Slot: React.FC<SlotProps> = ({ slots, arenaId, date }) => {
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();
  const [slotId, setSlotId] = useState<string>("");
  const [html, setHTML] = useState<{ readonly __html: string }>({ __html: "" });
  const [pay, setPay] = useState<boolean>(false);
  const userId = useSelector((state: AuthState) => state.user.userId);

  useEffect(() => {
    if (pay)
      base
        .get(
          `/api/v1/payu/users/${userId}/arenas/${arenaId}/slots/${slotId}/day/${date}/get-payu-button`
        )
        .then((res) => setHTML({ __html: res.data }));
  }, [slotId, userId, arenaId, date, pay]);
  useEffect(() => {
    var element = document.getElementById("confirmBtn");
  })
  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    base({
      method: "POST",
      url: `api/v1/users/${userId}/bookings?day=${date}`,
      data: { arenaId: arenaId, slotId: slotId },
    })
      .then((res) => {
        console.log(res.data?.success);
        res.data?.success === true
          ? navigate("/bookings")
          : dispatch(setErrorMsg(res.data?.message));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClick = (slot: SlotType) => {
    setSlotId(slot.id);
    setPay(slot?.paid);
  };
  return (
    <>
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
    </>
  );
};
export default Slot;
