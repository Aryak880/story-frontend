import React, {useState, useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import Error from '../../other/error/Error'
import NotLoggedIn from '../../other/notLoggedIn/NotLoggedIn'
import SURL from '../../../const'

const EditUserProfile = ({userData, isLoggedIn}) => {
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [notEdited, setNotEdited] = useState(false)

    const [user, setUser] = useState({
        name: '',
        email: '',
        gender: 'male',
        age: 18,
        instagram: '',
        facebook: '',
        password: ''
    })

    const URL = window.location.href
    const id = URL.substring(URL.search('edit-user-profle')+17, URL.length)

    useEffect(() => {
        setLoading(true)
        const fetchUser = async () => {
            await fetch(`${SURL}/user/${id}`).then(d => d.json()).then(data => {
                setLoading(false)
                setUser(data)
            })
        }

        fetchUser()
    }, [id])

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        fetch(`${SURL}/update/user/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ 
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                instagram: user.instagram,
                facebook: user.facebook,
                password: user.password
             }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            setLoading(false)

            if (response.status === 201)
                return response.json()

            else {
                return response.json()
                // return {
                //     error: "Unable to create user!"
                // }
            }
        }).then(data => {

            if (!data.error) {                
                setNotEdited(false)
                history.push('/admin')
            }else{
                setNotEdited(true)
            }
        })
    }

    if(isLoggedIn && userData.isAdmin){
        return (
            <div className='signUpContainer profile-container flex-column-center glassmorphism-white'>
                    
                <div className="pad-2-mar-1 flex-column-center glassmorphism-white">
                        <h2 style={{textAlign:"center"}}>Admin Panel: <span style={{color: "red"}}>Update User profile</span></h2>                    
                </div>

                
                    <div className="signup flex-column-center glassmorphism-white">
                        {notEdited && <Error text="Unable to edit the user!" clName={'error-div'}/>}

                        <h3>{user.name}'s profile</h3>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder='Full name'
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />

                            <input
                                type="email"
                                placeholder='Email'
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />

                            <div>
                                <select
                                    name="gender"

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
                                placeholder="password"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                            />

                            <button type="submit" className="submit-btn">Update</button>

                            <br />

                            <span className='passwordInputType error-message'>
                                *Password should not contain "password" and Minimum length should be 7
                            </span>
                        </form>
                        
                    </div>
    
                {loading && <Loading />}
            </div>
        )
    }else if(isLoggedIn && !userData.isAdmin){
        return(
            <div className="loginContainer profile-container flex-column-center glassmorphism-white">
                <h2>You are not Admin!</h2>
                <Link className='btn green-btn' to='/profile'>Go to Profile</Link>
            </div>
        )
    }
    else{
        return(
            <div className="loginContainer profile-container flex-column-center glassmorphism-white">
                <NotLoggedIn />
            </div>
        )
    }
}

export default EditUserProfile
