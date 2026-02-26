import { useContext } from "react";
import { authContext } from "../auth.context.jsx";
import {login,register,getMe} from "../services/auth.api"

export function useAuth(){
    const context =useContext(authContext)

    const {user,setuser,loading,setloading}=context

    const handleLogin=async (username ,password)=>{
        setloading(true)
        try{
            const reponse=await login(username,password)
            // console.log(reponse.user)
            setuser(reponse.user)
        }catch(error){
            setuser(null)
        }finally{
            setloading(false)
        }
    }

    const handleRegister=async (username,email,password)=>{
        setloading(true)
        try{
            const response=await register(username,email,password)
            setuser(response.user)
        }catch(error){
            setuser(null)
        }finally{
            setloading(false)
        }
    }

    return {user,setuser,loading,setloading,handleLogin,handleRegister}
}