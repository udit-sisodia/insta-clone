import "../style/form.scss"
import { Link } from "react-router"
import { useState } from 'react'
import { useAuth } from "../hooks/useAuth"
import { useNavigate } from "react-router"

const Login = () => {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const { user,handleLogin,loading } = useAuth()
    
    const Navigate=useNavigate()

    if(loading){
        return (
            <main>
                <h1>Loading...</h1>
            </main>
        )
    }

    async function handleSubmit(e) {
        e.preventDefault()

        await handleLogin(username, password)
        .then((res) => {
            // console.log(res)
            Navigate("/")
        })

    }
    return (
        <main>
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setusername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setpassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button className="button primary-btn" type='submit'>Login</button>
                </form>

                <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
            </div>
        </main>
    )
}

export default Login
