import React from 'react'

import './userStoryCard.css'


const StoryCard = ({data}) => {


    var {story, title} = data

    return (
        <div className='storyCard'>
            <div className="storyDetailsContainer">
                <h2>{title}</h2>
                <p>{story}</p>
            </div>
        </div>
    )
}

export default StoryCard
