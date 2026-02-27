import { useContext } from "react"
import {getFeed, likePost} from "../services/post.api"
import { PostContext } from "../post.context.jsx"
import {createPost} from "../services/post.api"
import { useEffect } from "react"
import { unlikePost } from "../services/post.api"

export  const usePost=()=>{
    const {loading,setLoading,post,setPost,feed,setFeed}=useContext(PostContext)

     const handleGetFeed=async ()=>{
        setLoading(true)
        const response=await getFeed()
        // console.log(response)
        setFeed(response.posts.reverse())
        setLoading(false)
    }

    const handleCreatePost=async (CaretPosition,postImage)=>{
        setLoading(true)
        const response=await createPost(CaretPosition,postImage)
        setFeed([response.post,...feed])
        setLoading(false)
    }

    const handleLikePost =async (post)=>{
        const response=await likePost(post)
        handleGetFeed()
    }

     const handleUnLikePost =async (post)=>{
        const response=await unlikePost(post)
        handleGetFeed()
    }

    useEffect(()=>{
        handleGetFeed()
    },[])
    return {feed , loading ,handleGetFeed,post,handleCreatePost,handleLikePost,handleUnLikePost}


}