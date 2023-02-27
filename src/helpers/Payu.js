// import base from "../apis/base"
import React from "react"
// import axios from "axios";

const Payu = () => {
    // const [isMount, setIsMount] = React.useState(false);
    // const [hash, setHash] = React.useState("");
    // const body = "key=oZ***9&txnid=txnid59251177952&amount=10.00&firstname=PayU User&email=test@gmail.com&phone=9876543210&productinfo=iPhone&pg=&bankcode=&surl=http://localhost:3000/&furl=http://localhost:3000/&ccnum=&ccexpmon=&ccexpyr=&ccvv=&ccname=&txn_s2s_flow=&hash=85ba90d7fb271524d73965a31c4350c3aa1de634a16d5b947ce90141679d8fe2b3e8abb01a6c268d4d6730f5b7e83f4d07503ad29503555ba9ca35f3f172d7d4"
    // React.useEffect(() => {
    //     isMount &&
    //         axios
    //             .post(process.env.REACT_APP_HASH_URL, {
    //                 txnid: "tjRw",
    //                 amount: 1,
    //                 productinfo: "iPhone",
    //                 firstname: "Ashish",
    //                 email: "test@gmail.com"
    //             })
    //             .then((resp) => setHash(resp.data))
    //             .catch((error) => console.log(error.message));
    // }, [isMount]);
    return (<form action='https://test.payu.in/_payment' method='post'>
        <input type="hidden" name="key" value="oZ7oo9" />
        <input type="hidden" name="txnid" value="f0564503-a0c3-4a68-ad76-90a60e2b6f" />
        <input type="hidden" name="productinfo" value="iPhone" />
        <input type="hidden" name="amount" value="1" />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="hidden" name="lastname" value="Kumar" />
        <input type="hidden" name="surl" value="http://localhost:8080/api/v1/util/success" />
        <input type="hidden" name="furl" value="http://localhost:3000/" />
        <input type="hidden" name="phone" value="9988776655"/>
        <input type="hidden" name="hash" value="61abf9200fdae65c69596f88affa9ab21078f3bc0e01b5a96b58324dd5c5a544bac0964587b0d8f95975b229fcfe79b65b7425416a7d78a011d6d1a3475c5a7e" />
        <input type="submit" className="btn btn-info" value="Proceed to Pay" />
    </form>);

}
export default Payu