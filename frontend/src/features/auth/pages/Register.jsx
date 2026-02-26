import { Link } from "react-router"
import { useState } from 'react'
import "../style/form.scss"
import { useNavigate } from "react-router"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const { handleRegister, loading } = useAuth()
    const Navigate = useNavigate()

    if (loading) {
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

    async function handleSubmit(e) {
        e.preventDefault()
        handleRegister(username, email, password)
            .then(res => {
                console.log(res)
                Navigate("/")
            })
    }

    return (
        <main>
            <div className="form-container">
                <div className="form-header">
                    <div className="logo">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.477 2 2 6.477 2 12C2 17.523 6.477 22 12 22C17.523 22 22 17.523 22 12C22 6.477 17.523 2 12 2ZM8 11.5C8 9.567 9.567 8 11.5 8C13.433 8 15 9.567 15 11.5C15 13.433 13.433 15 11.5 15C9.567 15 8 13.433 8 11.5ZM17.743 16.327C16.545 17.799 14.878 18.85 13 19.322V17C13 16.448 12.552 16 12 16H10C9.448 16 9 16.448 9 17V19.322C7.122 18.85 5.455 17.799 4.257 16.327C5.179 14.376 7.187 13 9.5 13H14.5C16.813 13 18.821 14.376 19.743 16.327Z" />
                        </svg>
                    </div>
                    <h1>Create account</h1>
                    <p className="subtitle">Join and start sharing today</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
                                <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12ZM12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" />
                            </svg>
                            <input
                                id="username"
                                onInput={(e) => { setusername(e.target.value) }}
                                type="text"
                                name='username'
                                placeholder='Enter username'
                                autoComplete="username"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
                                <path d="M3 3H21C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3ZM20 7.23792L12.0718 14.338L4 7.21594V19H20V7.23792ZM4.51146 5L12.0619 11.662L19.501 5H4.51146Z" />
                            </svg>
                            <input
                                id="email"
                                onInput={(e) => { setemail(e.target.value) }}
                                type="text"
                                name='email'
                                placeholder='Enter email'
                                autoComplete="email"
                            />
                        </div>
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="input-icon">
                                <path d="M12 1C8.676 1 6 3.676 6 7V8H4C3.448 8 3 8.448 3 9V21C3 21.552 3.448 22 4 22H20C20.552 22 21 21.552 21 21V9C21 8.448 20.552 8 20 8H18V7C18 3.676 15.324 1 12 1ZM12 3C14.276 3 16 4.724 16 7V8H8V7C8 4.724 9.724 3 12 3ZM13 15.732V18H11V15.732C10.402 15.386 10 14.74 10 14C10 12.895 10.895 12 12 12C13.105 12 14 12.895 14 14C14 14.74 13.598 15.386 13 15.732Z" />
                            </svg>
                            <input
                                id="password"
                                onInput={(e) => { setpassword(e.target.value) }}
                                type="password"
                                name='password'
                                placeholder='Enter password'
                                autoComplete="new-password"
                            />
                        </div>
                    </div>

                    <button className="button primary-btn" type='submit'>
                        <span>Create Account</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M16.172 11L10.808 5.636L12.222 4.222L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z" />
                        </svg>
                    </button>
                </form>

                <p className="toggle-text">Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register