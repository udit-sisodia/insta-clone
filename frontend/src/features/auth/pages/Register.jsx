import { Link } from "react-router"
import { useState } from 'react'
import "../style/form.scss"
import {useNavigate} from "react-router"
import { useAuth } from "../hooks/useAuth"

const Register = () => {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    const {handleRegister,loading}=useAuth()
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

        handleRegister(username,email,password)
        .then(res => {
            console.log(res)
            Navigate("/")
        })
    }
    return (
        <main>
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        onInput={(e) => { setusername(e.target.value) }}
                        type="text"
                        name='username'
                        placeholder='Enter username' />
                    <input
                        onInput={(e) => { setemail(e.target.value) }}
                        type="text "
                        name='email'
                        placeholder='Enter email' />
                    <input onInput={(e) => { setpassword(e.target.value) }}
                        type="password"
                        name='password'
                        placeholder='Enter password' />
                    <button className="button primary-btn" type='submit'>Register</button>
                </form>

                <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>
            </div>
        </main>
    )
}

export default Register
