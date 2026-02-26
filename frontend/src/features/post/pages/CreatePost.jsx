import React from 'react'
import "../style/createpost.scss"

const CreatePost = () => {
  return (
    <div className='create-post-page'>
        <div className="form-container">
            <form >
                <h2>Create Post</h2>
                <label htmlFor="postImage" className='postimage'>Select Image</label>
                <input hidden type="file" name='postImage' id='postImage' />
                <input type="text" name='caption' placeholder='Write a caption...' id='caption' />
                <button className='button primary-btn'>Create</button>
            </form>
        </div>
    </div>
  )
}

export default CreatePost
