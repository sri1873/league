import { useLocation, } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";
import { useSelector } from "react-redux";


const RequireAuth = ({ allowedRoles }) => {
    const user = useSelector((state) => state.isValid)
    const roles = useSelector(state => state.user.roles)
    console.log(roles)
    const location = useLocation();
    console.log(allowedRoles)
    return (
        (user) ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth;