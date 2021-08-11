import React from 'react'
import { Link } from 'react-router-dom';
import './userStoryCard.css'
// import Loading from '../../other/loading/Loading'


const UserStoryCard = ({data, handleSeeStory}) => {
    // const [loading, setLoading] = useState(true)


    const handleStoryDelete = async (id) => {
        fetch('https://protected-mesa-93618.herokuapp.com/me/story/'+id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response => { 
                handleSeeStory()
                return response.json()
            })
    }

    var {story, title, _id} = data

    return (
        <div className='storyCard'>
            <div className="storyDetailsContainer">
                <h2>{title}</h2>
                <p>{story}</p>
            </div>
            <div id="user-delete-btn-container">
                <Link className='submit-btn' to={`/read-story/`+_id}>Read full story</Link>
                <button type="submit" className='submit-btn' onClick={() => handleStoryDelete(_id)}>Delete</button>
            </div>
        </div>
    )
}

export default UserStoryCard
