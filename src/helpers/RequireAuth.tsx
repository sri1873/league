import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";
import { State } from "../store";


const RequireAuth: React.FC = () => {
  const user: boolean = useSelector((state: State) => state.auth.isValid);

  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default RequireAuth;
