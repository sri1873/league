import jwt from 'jwt-decode'


const Decrypt = (token) => {
    const decode = jwt(token);
    var onlyRoles = [];
    decode?.roles.map(role => onlyRoles.push(role?.authority))
    const user = {
        userName: decode.sub,
        token: token,
        userId: decode.user_id,
        roles: onlyRoles
    }
    return (user);
}
export default Decrypt