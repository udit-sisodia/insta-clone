import React from 'react'
import "../nav.scss"
import { useNavigate } from 'react-router'

const Nav = () => {
    const navigate = useNavigate()
    return (
        <nav className='navbar'>
            <div className="nav-brand">
                <div className="brand-logo">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5ZM17.743 16.327C16.545 17.799 14.878 18.85 13 19.322V17C13 16.448 12.552 16 12 16H10C9.448 16 9 16.448 9 17V19.322C7.122 18.85 5.455 17.799 4.257 16.327C5.179 14.376 7.187 13 9.5 13H14.5C16.813 13 18.821 14.376 19.743 16.327Z" />
                    </svg>
                </div>
                <h2>Insta</h2>
            </div>

            <button
                onClick={() => navigate("/create-post")}
                className='button primary-btn'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z" />
                </svg>
                <span>New Post</span>
            </button>
        </nav>
    )
}

export default Nav