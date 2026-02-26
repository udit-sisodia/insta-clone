import { useContext } from "react"
import {getFeed} from "../services/post.api"
import { PostContext } from "../post.context.jsx"

export  const usePost=()=>{
    const {loading,setLoading,post,setPost,feed,setFeed}=useContext(PostContext)

     const handleGetFeed=async ()=>{
        setLoading(true)
        const response=await getFeed()
        setFeed(response.posts)
        setLoading(false)
    }

    return {feed , loading ,handleGetFeed,post}


}