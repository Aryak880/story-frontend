import React from 'react'
import { Link } from 'react-router-dom';
import './storyCard.css'


const StoryCard = ({data}) => {


    var {story, title, _id} = data

    return (
        <div className='storyCard'>
            <div className="storyDetailsContainer">
                <h2 className='text-white'>{title}</h2>
                <p>{story}</p>
            </div>
            <div className='read-full-story'>
                <Link to={`/read-story/`+_id}>Read full story &rarr;</Link>
            </div>
        </div>
    )
}

export default StoryCard
