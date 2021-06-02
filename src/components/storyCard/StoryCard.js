import React from 'react'
// https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png

import './storyCard.css'


const StoryCard = ({data, i}) => {
    const winSize = window.screen.availWidth

    const {story, title, owner} = data
    let flexStyle = {}

    if(i%2 === 0 && winSize > 600){
        flexStyle = {
            flexDirection: "row-reverse"
        }
    }
 
    return (
        <div className='storyCard' style={flexStyle}>
            <div className="ownerDetailsContainer">
                <div className="ownerProfile">
                    <img src={owner.profile} alt="Profile" />
                </div>
                <div className='ownerDetails'>
                    <b>Name: </b><span>{owner.name} </span>
                    <b> Age: </b><span>{owner.age}</span><br />
                    <span>{owner.email}</span><br />
                    <a href={owner.facebook}><img src="https://img.icons8.com/doodle/48/000000/facebook-new.png" alt="facebook-link"/></a>
                    <a href={owner.insta}><img src="https://img.icons8.com/plasticine/50/000000/instagram-new--v2.png" alt="instagram-link"/></a>
                </div>
            </div>
            <div className="storyDetailsContainer">
                <h2>{title}</h2>
                <p>{story}</p>
            </div>
        </div>
    )
}

export default StoryCard
