import React, {useState} from 'react'
import NotLoggedIn from '../other/notLoggedIn/NotLoggedIn'
import UserStoryCard from '../story/userStoryCard/UserStoryCard'
import Loading from '../other/loading/Loading'
import './profile.css'

const Profile = ({userData, isLoggedIn, setIsLoggedIn}) => {

    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(false)
    

    const handleLogOut = async () => {
        fetch('https://protected-mesa-93618.herokuapp.com/user/logout', {
            method: "POST",
            body: JSON.stringify({token: sessionStorage.getItem("aryak-story-app-userToken")}),
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if(response.status !== 500){
                sessionStorage.removeItem("aryak-story-app-userToken")
                sessionStorage.removeItem('aryak-story-app-userData')
                setIsLoggedIn(false)
            }
        })
    }

    const handleSeeStory = async () => {
        setLoading(true)
        fetch('https://protected-mesa-93618.herokuapp.com/me/stories', {
            method: "GET",
            headers: new Headers({
                'Authorization': 'Bearer '+sessionStorage.getItem("aryak-story-app-userToken"), 
                "Content-type": "application/json; charset=UTF-8"
              }),
        }).then(response => {
            return response.json()
        }).then(data => {
            setStories(data)
            setLoading(false)
        })
    }

    const handleDeleteProfile = async () => {
        fetch('https://protected-mesa-93618.herokuapp.com/user/me', {
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
                <button onClick={handleDeleteProfile} className='submit-btn'>DELETE Account!</button>
                <button onClick={handleSeeStory} className='submit-btn'>See all your story</button>
            </div>
    else {
        com = <NotLoggedIn />
    }

    return (
        <div className='loginContainer profile-container'>
            {
                com
            }
            
            <div className='userStoryContainer'>

                {
                    isLoggedIn && stories.map(x => <UserStoryCard key={x._id} data={x} handleSeeStory={handleSeeStory}/>)
                }

                {loading && <Loading />}
            </div>
        </div>    
    )
}

export default Profile
