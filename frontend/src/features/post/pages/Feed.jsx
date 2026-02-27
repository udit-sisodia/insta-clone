import React from 'react'
import "../style/feed.scss"
import {usePost} from "../hooks/usePost"
import { useEffect } from 'react'
import Post from '../components/Post'
import Nav from '../../shared/components/Nav'

const Feed = () => {
    const {feed,handleGetFeed,loading,handleLikePost,handleUnLikePost} = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])
    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }
    // console.log(feed)
  return (
    <main className='feed-page'>
        <Nav/>
        <div className="feed">
            <div className="posts">
               {feed.reverse().map(post => {return <Post key={post.id} post={post} user={post.user} handleLikePost={handleLikePost} handleUnLikePost={handleUnLikePost}/>})}
            </div>
        </div>
    </main>
  )
}

export default Feed
