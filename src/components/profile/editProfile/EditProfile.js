import React, {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import Error from '../../other/error/Error'
import NotLoggedIn from '../../other/notLoggedIn/NotLoggedIn'
import SURL from '../../../const'

const EditProfile = ({userData, setUserProfile, setIsLoggedIn}) => {
    const history = useHistory()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)


    const [user, setUser] = useState({
        name: userData.name,
        email: userData.email,
        gender: userData.gender,
        age: userData.age,
        instagram: userData.instagram,
        facebook: userData.facebook,
        password: ''
    })


    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const handleDeleteProfile = async () => {
        setLoading(true)
        if(window.confirm("Do you really want to delete your account!")){
            fetch(SURL+'/user/me', {
            method: "DELETE",
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem("aryak-story-app-userToken"), 
                "Content-type": "application/json; charset=UTF-8"
              }),
            }).then(response => {
                return response.json()
            }).then(data => {
                localStorage.removeItem("aryak-story-app-userToken")
                localStorage.removeItem('aryak-story-app-userData')
                setIsLoggedIn(false)
                setLoading(false)
                history.push('')
            })
        }
    }

    // const handleShowPassword = () => {
    //     console.log('hello')
    // }

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)
        setError(false)

            fetch(SURL+'/user/me', {
            method: "PATCH",
            body: JSON.stringify({ 
                name: user.name,
                email: user.email,
                gender: user.gender,
                age: user.age,
                instagram: user.instagram,
                facebook: user.facebook,
             }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                setLoading(false)

            if (response.status === 302)
                return response.json()

            else {
                return {
                    error: "Unable to create user!"
                }
            }
            }).then(data => {
                if(data.error){
                    setError(true)
                }
                
                else{
                    localStorage.setItem('aryak-story-app-userData', JSON.stringify(data))                    
                    setUserProfile(data)
                    history.goBack()
                }
            })
    }

/**
 * 
 * 
 * 
 */

    return (<>

            {      
                    Object.keys(userData).length === 0 ?

                    <div className='edit-story-notLoggedIn'>
                        <NotLoggedIn /> 
                    </div>
                    :

                    <div className='signUpContainer profile-container flex-column-center glassmorphism-white'>
                        {error && <Error text="Profile not update, please try again!" clName={'error-div'}/>}
                    <div className="signup flex-column-center glassmorphism-white">
                            <h2>Update Profile</h2>
                            <div>
                                <Link to='/profile-edit-password' className='btn green-btn'>Change Password</Link>
                                <button onClick={handleDeleteProfile} className='btn danger-btn'>DELETE Account &#10062;</button>
                                {/* <button className='btn green-btn' onClick={handleShowPassword}>Show Password</button> */}
                            </div>
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
                            
                            <button type="submit" className="btn black-btn">Update</button>
                        
                        </form>
                        {loading && <Loading />}
                    </div>
                </div>

            }
    </>)
}

export default EditProfile
