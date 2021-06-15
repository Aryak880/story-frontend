import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import './login.css'

const Login = ({setIsLoggedIn}) => {
    const history = useHistory()

    const [login, setLogin] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setLogin({
            ...login,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        fetch('https://protected-mesa-93618.herokuapp.com/user/signup', {
            method: 'POST',
            body: JSON.stringify({...login}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            setLoading(false)

            console.log(response.status)

            // if(response.status === 201) 
            //     return  response.json()

            // else {
            //     return {
            //         error: "Cann't find the user!"
            //     }
            // }

            return response.json();

        }).then((data) => {

            if(data.errors){
                console.log(data.errors)
            }
            
            else if(data.user && data.token){
                localStorage.setItem('aryak-story-app-userToken', data.token)
                localStorage.setItem('aryak-story-app-userData', data.user)
                setIsLoggedIn(true)
                history.push('/profile')    
            }
            
            console.log(data)
        })
    }

    return (
        <div className='loginContainer profile-container'>
            <div className='login'>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <label><input 
                        type='text' 
                        placeholder="email" 
                        name="email" 
                        value={login.email}
                        onChange={handleChange}
                    /></label>                    
                    <label><input 
                        type='password' 
                        placeholder="password" 
                        name="password" 
                        value={login.password}
                        onChange={handleChange}
                    /></label>
                    <label><button type="submit" className="submit-btn" disabled={(login.email.length === 0) || (login.password.length === 0)}>Submit</button></label>
                </form>
                <br />
                <br />
                <p>Do not have account? <Link to='/profile/signup'>Create here</Link></p>
            </div>
            {loading && <Loading />}
        </div>
    )
}

export default Login
