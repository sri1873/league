import jwt from "jwt-decode";
import { User } from "../types";

interface DecodedToken {
  sub: string;
  user_id: string;
  roles: { authority: string }[];
}

const Decrypt = (token: string): User => {
  const decode = jwt<DecodedToken>(token);
  var onlyRoles: string[] = [];
  decode?.roles.map((role) => onlyRoles.push(role?.authority));
  const user: User = {
    userName: decode.sub,
    token: token,
    userId: decode.user_id,
    roles: onlyRoles,
  };
  return user;
};
export default Decrypt;
