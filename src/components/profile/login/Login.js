import React from 'react'
import { Link } from 'react-router-dom'
import './login.css'

const Login = () => {
    return (
        <div className='login'>
            <h2>Login</h2>
            <form>
                <label><input type='text' placeholder="email"/></label>                    
                <label><input type='password' placeholder="password"/></label>
                <label><button type="submit" id="submit">Submit</button></label>
            </form>
            <br />
            <br />
            <p>Do not have account? <Link to='/profile/signup'>Create here</Link></p>
        </div>
    )
}

export default Login
