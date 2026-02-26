import React from 'react'
import "../style/feed.scss"
import {usePost} from "../hooks/usePost"
import { useEffect } from 'react'
import Post from '../components/Post'

const Feed = () => {
    const {feed,handleGetFeed,loading} = usePost()

    useEffect(()=>{
        handleGetFeed()
    },[])
    if(loading || !feed){
        return (<main><h1>Feed is loading...</h1></main>)
    }
    console.log(feed)
  return (
    <main className='feed-page'>
        <div className="feed">
            <div className="posts">
               {feed.map(post => <Post key={post.id} post={post} user={post.user}/>)}
            </div>
        </div>
    </main>
  )
}

export default Feed
