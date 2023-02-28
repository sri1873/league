import jwt from 'jwt-decode'


const Decrypt = (token) => {
    const decode = jwt(token);
    const user = {
        userName: decode.sub,
        token: token,
        userId: decode.user_id,
        roles: decode.roles

    }
    return (user);
}
export default Decrypt