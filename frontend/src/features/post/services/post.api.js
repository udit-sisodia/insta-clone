import axios from "axioss"

const api=axios.create({
    baseUrl:"http://localhost:5000/api/posts",
    withCredintials:true
})

export async function getFeed(){
    const response=await api.get("/feed")
    return response.data
}
