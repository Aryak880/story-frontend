import React from 'react'
import {Link} from 'react-router-dom'
import './notLoggedIn.css'

const NotLoggedIn = () => {
    return (
        <div className='notLogInSignUp profile flex-column-center glassmorphism-black'>
                <h2>Please do <Link to='/profile/login'>Log in</Link></h2><br />
                <p>OR</p>
                <p>Don't you have an account? <Link to='/profile/signup'>Create here</Link></p>
        </div>
    )
}

export default NotLoggedIn
