import { useState,useEffect, createContext } from "react";

export const authContext=createContext()

export const AuthProvider=({children})=>{
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(false)

    return(
        <authContext.Provider value={{user,setuser,loading,setloading}}>
            {children}
        </authContext.Provider>
    )
}