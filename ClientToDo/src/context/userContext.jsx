//React-context
import { useState, useEffect } from "react";
//React-Hooks-context
import { createContext, useContext } from "react";
//User Methods
import { registerUser } from "../api/user.api";
import { loginUser } from "../api/user.api";
import { updateUser } from "../api/user.api";
import { deleteUser } from "../api/user.api";
import { verifyToken } from "../api/user.api";
import { logoutUser } from "../api/user.api";
//Cookie
import Cookie from 'js-cookie'

//User Context
export const UserContext = createContext()

//Use Auth Context
export const useAuth = () => {
    const context = useContext(UserContext)

    if(!context){
        throw new Error('Context must be with in a Provider')
    }
    return context
}

//User Provider
export const UserProvider = ({children}) => {
    //User Info
    const [user, setUser] = useState([])
    //Session Info
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    //Error array
    const [errorAuth, setErrorAuth] = useState([])

    const registerUserApi = async (user) => {
        try{
            const res = await registerUser(user)
            setUser(res.data)
            setIsAuthenticated(true)            
        }catch(err){
            setIsAuthenticated(false)
            setUser(null)
            setErrorAuth([err.response.data])
        }    
    }

    const loginUserApi = async (user) => {
        try{
            const res = await loginUser(user)
            setIsAuthenticated(true)
            setUser(res.data)            
        }catch(err){
            setIsAuthenticated(false)
            setUser(null)
            setErrorAuth([err.response.data])
        }
    }

    const logoutUserApi = async () => {
        try{
            const res = await logoutUser()
            setIsAuthenticated(false)
            setUser(null)
        }catch(err){
            console.log(err)
        }
    }

    const updateUserApi = async (id, user) => {
        try{
            const res = await updateUser(id, user)    
            console.log(res.data)
        }catch(err){
            console.log(err)
        }
    }
    
    const deleteUserAPI = async (id) => {
        try{    
            const res = await deleteUser(id)
            console.log(res.data)
        }catch(err){
            console.log(err.message)
        }
    }

    useEffect(() => {
        if(errorAuth.length > 0){
            const timer = setTimeout(() => {
                setErrorAuth([])
            },5000)
            return () => {
                clearTimeout(timer)
            }
        }
    },[errorAuth])

    useEffect(() => {
        async function loadData() {
            const cookie = Cookie.get()

            if(!cookie){
                setIsAuthenticated(false)
                return setUser(null)
            }

            try{
                const res = await verifyToken(cookie.token)

                if(!res.data){
                    setIsAuthenticated(false)
                    setUser(null)
                    return
                }
                
                setIsAuthenticated(true)
                setUser(res.data)

            }catch(e){
                setIsAuthenticated(false)
                setUser(null)
            }
        }
        loadData()
    },[])

    return (
        <UserContext.Provider value={{
            registerUserApi,
            loginUserApi,
            updateUserApi,
            deleteUserAPI,
            logoutUserApi,

            errorAuth,
            isAuthenticated,
            user
        }}>
            {children}
        </UserContext.Provider>
    )

}