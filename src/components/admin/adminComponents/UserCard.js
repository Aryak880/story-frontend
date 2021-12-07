import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const UserCard = ({data, setLoading}) => {
    const {name, email, isAdmin, age, gender, _id} = data
    const [tempIsAdmin, setTempIsAdmin] = useState(isAdmin)

    const handleMakeAdmin = (id) => {
        setLoading(true)

        fetch(`https://protected-mesa-93618.herokuapp.com/users/${id}`, {
            method: "PATCH",
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
                    setTempIsAdmin(data.isAdmin)
                    // console.log(data)
                }
            })
    }


    return (
        <div className="glassmorphism-white admin-user-card">
            Name: {name} <br />
            Age: {age} <br />
            Email: {email} <br />
            Gender: {gender} <br />
            Is Admin: {tempIsAdmin ? <span style={{color: "green"}}>True</span> : "False"} <br />
            <br />
            <button className='btn danger-btn' onClick={() => handleMakeAdmin(_id)}>Toggel Admin</button>
            <Link to={`/edit-user-profle/`+_id} className='btn blue-btn'>Edit User Profile</Link>
        </div>
    )
}

export default UserCard
