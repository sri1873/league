import { useLocation, } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom/dist";
import { useSelector } from "react-redux";


const RequireAuth = () => {
    // const user = sessionStorage.getItem('user');
    const user = useSelector((state) => {
        return state.auth
    })
    const location = useLocation();
    return (
        (user.isValid) ? <Outlet /> : <Navigate to={'/login'} state={{ from: location }} replace />
    )
}

export default RequireAuth;