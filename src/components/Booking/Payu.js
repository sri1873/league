// import base from "../apis/base"
import React, { useEffect, useState } from "react"
import base from "../../apis/base";

const Payu = ({bookingDetails, slotId, arenaId }) => {
    
    const [details, setDetails] = useState({});
    useEffect(() => {
        const userId = sessionStorage.getItem("userId");
        base.post(`payu/generate-hash?amount=1&userId=${userId}`).then(res => {
            setDetails(res.data)
        })
    }, []);

    return (<form action='https://test.payu.in/_payment' method='post'>
        <input type="hidden" name="key" value="oZ7oo9" />
        <input type="hidden" name="txnid" value={details.txnId} />
        <input type="hidden" name="productinfo" value="iPhone" />
        <input type="hidden" name="amount" value="1.0" />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="hidden" name="lastname" value="Kumar" />
        <input type="hidden" name="surl" value={`http://localhost:8080/api/v1/payments/users/${sessionStorage.getItem("userId")}/arenas/${arenaId}/slots/${slotId}/redirect`} />
        <input type="hidden" name="furl" value={`http://localhost:8080/api/v1/payments/users/${sessionStorage.getItem("userId")}/arenas/${arenaId}/slots/${slotId}/redirect`} />
        <input type="hidden" name="phone" value="9988776655" />
        <input type="hidden" name="hash" value={details.hash} />
        <input type="submit" className="btn btn-info" value="Proceed to Pay" />
    </form>);

}
export default Payu