//React-hooks
import { useEffect } from "react";
//Use-location
import { useLocation } from "react-router-dom";

export function ScrollTop(){
    const pathName = useLocation()

    useEffect(() => {
        window.scroll(0,0)
    },[pathName])

    return null
}