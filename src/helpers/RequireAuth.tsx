import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";
import { useSelector } from "react-redux";
import { AuthState } from "../types";


const RequireAuth:React.FC = () => {
  const user:boolean = useSelector((state: AuthState) => state.isValid);
//   const roles:string[] = useSelector((state: AuthState) => state.user.roles);
    const location = useLocation();
    
  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
