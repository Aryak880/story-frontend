import React from 'react'
import NotLoggedIn from '../other/notLoggedIn/NotLoggedIn'
import './profile.css'

const Profile = ({userData, isLoggedIn, setIsLoggedIn}) => {


    
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
            localStorage.setItem("aryak-story-app-userToken", undefined)
            localStorage.setItem('aryak-story-app-userData', undefined)
            setIsLoggedIn(false)
        })
    }

    var com
    if(isLoggedIn)
        com = <div className="profile LogInSignUp">        
                <label>Name: {userData.name}</label><br />
                <label>Age: {userData.age}</label><br />
                <label>Email: {userData.email}</label><br />
                <label>Facebook: {userData.facebook}</label><br />
                <label>Instagram: {userData.instagram}</label><br />
                <label>Gender: {userData.gender}</label><br />
                <button onClick={handleLogOut} className='submit-btn'>Log out</button>
            </div>
    else {
        com = <NotLoggedIn />
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
