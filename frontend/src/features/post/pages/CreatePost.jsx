import React from 'react'
import "../style/createpost.scss"
import {useState,useRef} from 'react'
import {usePost} from '../hooks/usePost'
import { useNavigate } from 'react-router'

const CreatePost = () => {
  const [caption, setcaption] = useState("")
  const postImageRef = useRef()
  const {loading,handleCreatePost}=usePost()

  const navigate=useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const postImage = postImageRef.current.files[0]
    // console.log(caption, postImage)

    await handleCreatePost(caption,postImage)
    navigate("/")
  }

  if(loading){
    return <main><h1>Creating Post...</h1></main>
  }

  return (
    <div className='create-post-page'>
        <div className="form-container">
            <form onSubmit={handleSubmit} >
                <h2>Create Post</h2>
                <label htmlFor="postImage" className='post-image-label'>Select Image</label>
                <input
                ref={postImageRef} hidden type="file" name='postImage' id='postImage' />
                <input 
                value={caption}
                onInput={(e) => { setcaption(e.target.value) }}
                type="text" name='caption' placeholder='Write a caption...' id='caption' />
                <button className='button primary-btn'>Create</button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost
