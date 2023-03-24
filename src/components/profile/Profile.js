import {Link} from 'react-router-dom'
import React, {useState, useRef} from 'react'
import NotLoggedIn from '../other/notLoggedIn/NotLoggedIn'
import UserStoryCard from '../story/userStoryCard/UserStoryCard'
import Loading from '../other/loading/Loading'
import SURL from '../../../src/const'

import './profile.css'

const Profile = ({userData, isLoggedIn, setIsLoggedIn}) => {
    const myRef = useRef(null)
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(false)
    

    const handleLogOut = async () => {
        if(window.confirm("Are you sure to LOG OUT!")){
            fetch(SURL+'/user/logoutAll', {
                method: "POST",
                body: JSON.stringify({token: localStorage.getItem("aryak-story-app-userToken")}),
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                if(response.status !== 500){
                    localStorage.removeItem("aryak-story-app-userToken")
                    localStorage.removeItem('aryak-story-app-userData')
                    setIsLoggedIn(false)
                }
            })
        }
    }

    const handleSeeStory = async () => {
        setLoading(true)
        fetch(SURL+'/me/stories', {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer ' + localStorage.getItem("aryak-story-app-userToken"), 
                "Content-type": "application/json; charset=UTF-8"
              }),
        }).then(response => {
            return response.json()
        }).then(data => {
            setStories(data)
            setLoading(false, localStorage.getItem("aryak-story-app-userToken"))            

            const executeScroll = () => myRef.current.scrollIntoView()
            executeScroll()            
        })

    }

    const handleDeleteProfile = async () => {
        if(window.confirm("Do you really want to delete your account!")){
            fetch(SURL+'/user/me', {
            method: "DELETE",
            headers: new Headers({
                'Authorization': 'Bearer '+sessionStorage.getItem("aryak-story-app-userToken"), 
                "Content-type": "application/json; charset=UTF-8"
              }),
            }).then(response => {
                return response.json()
            }).then(data => {
                sessionStorage.removeItem("aryak-story-app-userToken")
                sessionStorage.removeItem('aryak-story-app-userData')
                setIsLoggedIn(false)
            })
        }
    }

    var com
    if(isLoggedIn)
        com =
            <div className="profile LogInSignUp flex-column-center glassmorphism-white">
                    <div className="pad-2-mar-1 flex-column-center glassmorphism-white">
                        <h2>Welcome {userData.name}</h2>                    
                        {userData.isAdmin && <Link className='btn green-btn' to={`/admin`}>Go to Admin panel</Link>}
                    </div>
                <div className='profile LogInSignUp flex-column-center glassmorphism-black'>
                    <div>
                            <Link to='/story' className='btn black-btn'>Post Story</Link>
                            <button onClick={handleSeeStory} className='btn blue-btn'>See all your story &#128083;</button>
                        </div>

                        <hr />
                        <br />
                        <label>Name: {userData.name}</label><br />
                        <label>Age: {userData.age}</label><br />
                        <label>Email: {userData.email}</label><br />
                        <label>Facebook: {userData.facebook}</label><br />
                        <label>Instagram: {userData.instagram}</label><br />
                        <label>Gender: {userData.gender}</label> <br />
                        <hr />
                        <div>
                            <Link className='btn green-btn' to={`/profile-edit/`}>Edit Profile</Link>
                            <button onClick={handleLogOut} className='btn danger-btn'>Log out &#10071;</button>
                        </div>
                    </div>
                </div>
    else {
        com = <NotLoggedIn />
    }

    return (
        <div className='loginContainer profile-container flex-column-center glassmorphism-white'>
            {
                com
            }
            
            <div className='userStoryContainer' ref={myRef}>

                {
                    isLoggedIn && stories.map(x => <UserStoryCard key={x._id} data={x} handleSeeStory={handleSeeStory}/>)
                }

                {loading && <Loading />}
            </div>
        </div>    
    )
}

export default Profile