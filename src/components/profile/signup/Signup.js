import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import Error from '../../other/error/Error'

import './signup.css'

const Signup = ({ setUserProfile, setIsLoggedIn }) => {
    const history = useHistory()
    const [isSignedUp, setIsSignedUp] = useState(true)

    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: 'male',
        age: 18,
        instagram: '',
        facebook: '',
        password: ''
    })

    const [loading, setLoading] = useState(false)
    const [passwordNotMatch, setPasswordNotMatch] = useState('')

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        fetch('https://protected-mesa-93618.herokuapp.com/user/signup', {
            method: 'POST',
            body: JSON.stringify({ ...user }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            setLoading(false)

            if (response.status === 201)
                return response.json()

            else {
                return {
                    error: "Unable to create user!"
                }
            }
        }).then(data => {

            if (data.error) {
                setIsLoggedIn(false)
                setIsSignedUp(false)
            }
            else {
                sessionStorage.setItem('aryak-story-app-userToken', data.token)
                sessionStorage.setItem('aryak-story-app-userData', JSON.stringify(data.user))
                setUserProfile(data.user)
                setIsLoggedIn(true)
                setIsSignedUp(false)
                history.push('/profile')
            }
        })
    }

    const handleRePassword = (e) => {
        setPasswordNotMatch(e.target.value)
    }

    return (
        <div className='signUpContainer profile-container flex-column-center glassmorphism-white'>
            <div className="signup flex-column-center glassmorphism-white">
                {!isSignedUp && <Error text="Unable to create user! May be email alredy exist" />}

                <h2>Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder='Full name'
                        name="name"
                        required
                        value={user.name}
                        onChange={handleChange}
                    />

                    <input
                        type="email"
                        placeholder='Email'
                        name="email"
                        required
                        value={user.email}
                        onChange={handleChange}
                    />

                    <div>
                        <select
                            name="gender"
                            required
                            value={user.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <input
                            type="number" min={0} max={150}
                            placeholder='Age'
                            name="age"
                            required
                            value={user.age}
                            onChange={handleChange}
                        />
                    </div>

                    <input
                        type="text"
                        name="instagram"
                        placeholder="Instagram user name"
                        value={user.instagram}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="facebook"
                        placeholder="facebook profile url"
                        value={user.facebook}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        required
                        value={user.password}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        placeholder="re-enter password"
                        name="matchPassword"
                        value={passwordNotMatch}
                        required
                        onChange={handleRePassword}
                    />
                    {
                        ((passwordNotMatch !== user.password) && (passwordNotMatch.length !== 0) && (user.password.length !== 0)) && <span className='passwordNotMatch error-message'>
                            *password not match
                            </span>
                    }
                    <button type="submit" className="submit-btn" disabled={passwordNotMatch !== user.password}>Submit</button>

                    <br />

                    <span className='passwordInputType error-message'>
                        *Password should not contain "password" and Minimum length should be 7
                    </span>
                    
                    <br />
                    <span className='passwordInputType error-message'>Do you have an account? Do <Link to='/profile/login'>Login</Link></span>
                </form>
                {loading && <Loading />}
            </div>
        </div>
    )
}

export default Signup
