import React from 'react'
import {Link} from 'react-router-dom'
import './profile.css'

const Profile = ({data,  setUserProfile}) => {

    const handleLogOut = async () => {
        fetch('https://protected-mesa-93618.herokuapp.com/user/signup', {
            method: "POST",
            body: JSON.stringify({token: localStorage.getItem("aryak-story-app-userToken")}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            return response.json()
        }).then(data => {
            setUserProfile({})
            localStorage.setItem("aryak-story-app-userToken", undefined)
        })
    }

    var com

    if((Object.keys(data).length !== 0))
        com = <div className="profile LogInSignUp">        
                <label>Name: {data.name}</label><br />
                <label>Age: {data.age}</label><br />
                <label>Email: {data.email}</label><br />
                <label>Facebook: {data.facebook}</label><br />
                <label>Instagram: {data.instagram}</label><br />
                <label>Gender: {data.gender}</label><br />
                <button onClick={handleLogOut}>Log out</button>
            </div>
    else {
        com = <div className='notLogInSignUp profile'>
                <h2><Link to='/profile/login'>Log in</Link> please</h2><br /><br />
                <p>Don't you have an account? <Link to='/profile/signup'>Create here</Link></p>
            </div>
    }

    return (
        <div className='loginContainer profile-container'>
            {
                com
            }
        </div>    
    )
}

export default Profile
