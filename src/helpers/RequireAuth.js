import { useLocation, } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";

const RequireAuth = () => {
    const user = sessionStorage.getItem('user');
    const location = useLocation();
    return (
        (user) ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth;