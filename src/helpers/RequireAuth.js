import { useLocation, } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";
import { useSelector } from "react-redux";


const RequireAuth = () => {
    const user = useSelector((state) => state.isValid)
    const location = useLocation();
    return (
        (user) ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth;