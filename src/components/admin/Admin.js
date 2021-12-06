import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Loading from '../other/loading/Loading'
import UserCard from './adminComponents/UserCard'
import NotLoggedIn from '../other/notLoggedIn/NotLoggedIn'
import './admin.css'


const Admin = ({userData, isLoggedIn}) => {

    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)

    const handleGetUsers = () => {
        setLoading(true)

        fetch('https://protected-mesa-93618.herokuapp.com/users', {
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
                    const demo = data.filter(e => e._id !== userData._id)
                    // console.log(demo)
                    setUsers(demo)
                    // console.log(data)
                }
            })
    }

    if(isLoggedIn && userData.isAdmin){
        return (
            <div className='signUpContainer profile-container flex-column-center glassmorphism-white'>
                    
                <div className="signup flex-column-center glassmorphism-white">
                        <h2>Admin Pannel</h2>

                        <div>
                            <button onClick={handleGetUsers} className="btn btn-black">Get all the users</button>
                        </div>
                    
                </div>

                <div className='glassmorphism-white flex-row-center'>
                    {
                        users.map(d => <UserCard data={d} setLoading={setLoading}/>)
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
