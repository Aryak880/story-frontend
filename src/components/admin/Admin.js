import React, {useState} from 'react'
import Loading from '../other/loading/Loading'
import UserCard from './adminComponents/UserCard'
import './admin.css'


const Admin = () => {

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
                    setUsers(data)
                    // console.log(data)
                }
            })
    }


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
}

export default Admin
