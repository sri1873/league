import jwt from 'jwt-decode'

const Decrypt=(token)=>{
    const decode=jwt(token);
    sessionStorage.setItem("token",token);
    sessionStorage.setItem("user",decode.sub);
    sessionStorage.setItem("roles",decode.roles);
}
export default Decrypt