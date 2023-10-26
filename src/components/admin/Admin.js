import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import Loading from '../other/loading/Loading'
import UserCard from './adminComponents/UserCard'
import NotLoggedIn from '../other/notLoggedIn/NotLoggedIn'
import SURL from '../../const'
import './admin.css'


const Admin = ({userData, isLoggedIn}) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        
        const fetchUsers = async ()  => {

            await fetch(`${SURL}/users`, {
                    method: "GET",
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                        "Content-type": "application/json; charset=UTF-8"
                    }
                    })
                    .then(response =>  {
                        setLoading(false)
        
                    if (response.status === 201)
                        return response.json()
        
                    else {
                        return {
                            error: "Unable to get the users!"
                        }
                    }
                    }).then(data => {
                        if(data.error){
                            // setError(true)
                        }
                        
                        else{
                            const userId = (JSON.parse(localStorage.getItem('aryak-story-app-userData')))._id
                            const demo = data.filter(e => e._id !== userId)
                            // console.log(demo)
                            setUsers(demo)
                            // console.log(data)
                            setLoading(false)
                        }
                    })
            }

            fetchUsers()

    }, [])


    if(isLoggedIn && userData.isAdmin){
        return (
            <div className='signUpContainer profile-container flex-column-center glassmorphism-white'>
                    
                <div className="pad-2-mar-1 flex-column-center glassmorphism-white">
                        <h2>Admin Panel</h2>                    
                </div>

                <div className='storyContainer glassmorphism-white flex-row-center pad-1-mar-0.5'>
                    {
                        users.map(d => <UserCard data={d} setLoading={setLoading} key={d.email}/>)
                    }
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

export default Admin
