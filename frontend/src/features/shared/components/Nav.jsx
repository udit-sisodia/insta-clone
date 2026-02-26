import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()
  return (
    <nav className='navbar'>
        <h2>Insta</h2>
        <button 
        onClick={()=>navigate("/create-post")}
        className='button primary-btn'>New Post</button>
    </nav>
  )
}

export default Nav
