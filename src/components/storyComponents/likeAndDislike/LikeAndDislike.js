import React,{ useState } from 'react'
import './likeAndDislike.css'
import Like from '../../../images/like.png'
import Dislike from '../../../images/dislike.png'


const LikeAndDislike = ({stories, userData}) => {
    const [allowLikeDislike, setAllowLikeDislike] = useState(false)
    const [likes, setLikes] = useState(stories.likes)
    const [disLikes, setDisLikes] = useState(stories.disLikes)
    const isLoggedIn = Object.keys(userData).length !== 0

        const checkAllowLikeDislike = () => {
            if(isLoggedIn && likes !== undefined && disLikes !== undefined){
                const userId = userData._id
                const flag1 = likes.indexOf(userId) 
                const flag2 = disLikes.indexOf(userId)
                setAllowLikeDislike((flag1 === -1 && flag2 === -1))
            }else{
                setAllowLikeDislike(false)
            }            
        }
    
    const handleSubmitLikes = async (id) => {
        checkAllowLikeDislike()
        if(isLoggedIn && allowLikeDislike){

            // It pushes the user id
            setLikes(...likes, userData._id)

            fetch('https://protected-mesa-93618.herokuapp.com/me/story/'+id, {
            method: "PATCH",
            body: JSON.stringify({ likes }),
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                if(response.status === 200){
                    setAllowLikeDislike(false)
                    return response.json()
                }
                else
                    return {error: "request is faild!"}
            }).then(d => {
                console.log(d)
            })

        }
    }

    const handleSubmitDisLikes = async (id) => {
        checkAllowLikeDislike()

        if(isLoggedIn && allowLikeDislike){
            setDisLikes(...disLikes, userData._id)
            
            fetch('https://protected-mesa-93618.herokuapp.com/me/story/'+id, {
            method: "PATCH",
            body: JSON.stringify({ disLikes }),
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  response.json()).then(d => {
                setAllowLikeDislike(true)
            })
        }
    }


    return (
        <div className='story-likes-dislikes-container' style={!isLoggedIn ? {border: "1px solid red"} :  {border: "1px solid green"} }>
            <button className='like-dislike-btn' disabled={!isLoggedIn} onClick={() => handleSubmitLikes(stories._id)}>
                <img src={Like} alt="like"/>
                <p>{stories.likes !== undefined && stories.likes.length }</p>
            </button>
            <button className='like-dislike-btn' disabled={!isLoggedIn} onClick={() => handleSubmitDisLikes(stories._id)}>
                <img src={Dislike} alt="dislike" />
                <p>{ stories.disLikes !== undefined && stories.disLikes.length }</p>
            </button>
        </div>
    )
}

export default LikeAndDislike
