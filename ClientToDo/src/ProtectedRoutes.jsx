//Auth Context
import { useAuth } from "./context/userContext";
//React-hooks
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes(){

    const {isAuthenticated} = useAuth()    

    if(!isAuthenticated){
        return <Navigate to={'/'} replace = {true} />
    }

    return(
        <Outlet />
    )
}

export default ProtectedRoutes