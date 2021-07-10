import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import Error from '../../other/error/Error'
import './login.css'

const Login = ({
    setIsLoggedIn, 
    setUserProfile,
}) => {
    const history = useHistory()

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const [userFound, setUserFound] = useState(true)


    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        fetch('https://protected-mesa-93618.herokuapp.com/user/login', {
            method: 'POST',
            body: JSON.stringify({...login}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            setLoading(false)

            if(response.status === 200) 
                return  response.json()

            else {
                return {
                    error: "Cann't find the user!"
                }
            }


        }).then((data) => {

            if(data.error){
                setIsLoggedIn(false)
                setUserFound(false)
            }
            
            else{
                localStorage.setItem('aryak-story-app-userToken', data.token)
                localStorage.setItem('aryak-story-app-userData', data.user)
                setIsLoggedIn(true)
                setUserFound(true)
                setUserProfile(data.user)
                history.push('/profile')
            }
        })
    }

    return (
        <div className='loginContainer profile-container'>
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input 
                        type='text' 
                        placeholder="email" 
                        name="email" 
                        value={login.email}
                        onChange={handleChange}
                    />                    
                    <input 
                        type='password' 
                        placeholder="password" 
                        name="password" 
                        value={login.password}
                        onChange={handleChange}
                    />
                    {
                        !true && <span className='error-message login-user-not-found'>User not found! check email and password</span>
                    }
                    <button type="submit" className="submit-btn" disabled={(login.email.length === 0) || (login.password.length === 0)}>Submit</button>
                </form>
                <br />
                <br />
                <p>Do not have account? <Link to='/profile/signup'>Create here</Link></p>
            </div>
            {loading && <Loading />}
            {!userFound && <Error text="User not found! Or you have entred wrong password or email"/>}
        </div>
    )
}

export default Login