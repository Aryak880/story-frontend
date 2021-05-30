import React from 'react'
// https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png

import './storyCard.css'

const StoryCard = ({data}) => {
    const {story, storyImage, title, owner} = data
    
    return (
        <div className='storyCard'>
            <div className="ownerDetailsContainer">
                <div className="ownerProfile">
                    <img src={owner.profile} alt="Profile" />
                </div>
            </div>
            <div className="storyDetailsContainer">

            </div>
        </div>
    )
}

export default StoryCard
