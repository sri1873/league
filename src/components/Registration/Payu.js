import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux";
import base from "../../apis/base";

const Payu = ({ slotId, arenaId,date }) => {
    const [details, setDetails] = useState({});
    const userId = useSelector(state => state.user.userId);
    useEffect(() => {
        base.post(`payu/generate-hash?amount=1&userId=${userId}`).then(res => {
            setDetails(res.data)
        })
    }, [userId]);

    return (<form action='https://test.payu.in/_payment' method='post'>
        <input type="hidden" name="key" value="oZ7oo9" />
        <input type="hidden" name="txnid" value={details.txnId} />
        <input type="hidden" name="productinfo" value="slot-booking" />
        <input type="hidden" name="amount" value="1.0" />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="hidden" name="lastname" value="Kumar" />
        <input type="hidden" name="surl" value={`http://localhost:8080/api/v1/payments/users/${userId}/arenas/${arenaId}/slots/${slotId}/redirect?day=${date}`} />
        <input type="hidden" name="furl" value={`http://localhost:8080/api/v1/payments/users/${userId}/arenas/${arenaId}/slots/${slotId}/redirect?day=${date}`} />
        <input type="hidden" name="phone" value="9988776655" />
        <input type="hidden" name="hash" value={details.hash} />
        <input type="submit" className='booking-btn col-md-12' value="Proceed to Pay" />
    </form>);

}
export default Payu