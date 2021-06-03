import React from 'react'
// https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png

import './storyCard.css'


const StoryCard = ({data}) => {


    var {story, title, owner} = data
    var linkStyle

    if(owner.facebook === ""){
       owner.facebook = undefined
        linkStyle = {
            display: "none"
        }
    }

    if(owner.insta === ""){
        owner.insta = undefined
        linkStyle = {
            display: "none"
        }
    }

    if(owner.profile === ""){
        let a = ['book', 'pen', 'pencile', 'bird', 'water', 'space']

        owner.profile = `https://source.unsplash.com/400x400/?${a[Math.floor((Math.random() * 5))]}`
    }


    return (
        <div className='storyCard'>
            <div className="ownerDetailsContainer">
                <div className="ownerProfile">
                    <img src={owner.profile} alt="Profile" />
                </div>
                <div className='ownerDetails'>
                    <b>Name: </b><span>{owner.name} </span><br />
                    <b> Age: </b><span>{owner.age}</span><br />
                    <span>{owner.email}</span><br />
                    <a href={owner.facebook} style={linkStyle}><img src="https://img.icons8.com/doodle/48/000000/facebook-new.png" alt="facebook-link"/></a>
                    <a href={owner.insta} style={linkStyle}><img src="https://img.icons8.com/plasticine/50/000000/instagram-new--v2.png" alt="instagram-link"/></a>
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
