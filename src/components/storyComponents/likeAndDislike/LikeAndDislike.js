import React,{ useState } from 'react'
import './likeAndDislike.css'
import Like from '../../../images/like.png'
import Dislike from '../../../images/dislike.png'
import Loading from '../../other/loading/Loading'


const LikeAndDislike = ({stories, userData}) => {
    

    const [allowLikeDislike, setAllowLikeDislike] = useState((stories.likes.indexOf(userData._id) === -1) && (stories.disLikes.indexOf(userData._id) === -1))
    const [likes, setLikes] = useState(stories.likes)
    const [disLikes, setDisLikes] = useState(stories.disLikes)
    const [isLoggedIn] = useState(Object.keys(userData).length !== 0)
    const [isLoading, setIsLoading] = useState(false)

    
    const handleSubmitLikes = async () => {

        if(isLoggedIn && allowLikeDislike){
            setIsLoading(true)

            const id = stories._id
            // It pushes the user id
            var temp = likes
            temp.push(userData._id)

            fetch('https://protected-mesa-93618.herokuapp.com/me/story/'+id, {
            method: "PATCH",
            body: JSON.stringify({ likes: temp }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                if(response.status === 200){
                    setAllowLikeDislike(false)
                    setIsLoading(false)
                    setLikes(...likes, userData._id)
                    return response.json()
                }
                else{
                    setIsLoading(false)
                    return {error: "request is faild!"}
                }                    
            })
        }
    }

    const handleSubmitDisLikes = async () => {
        // checkAllowLikeDislike()

        if(isLoggedIn && allowLikeDislike){
            setIsLoading(true)
            const id = stories._id

            var temp = disLikes
            temp.push(userData._id)
            
            fetch('https://protected-mesa-93618.herokuapp.com/me/story/'+id, {
            method: "PATCH",
            body: JSON.stringify({ disLikes:temp }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                if(response.status === 200){
                    setAllowLikeDislike(false)
                    setIsLoading(false)
                    setDisLikes(...disLikes, userData._id)
                    return response.json()
                }else{
                    setIsLoading(false)
                    return {error: "request is faild!"}
                }
            })
        }
    }


    return (
        // <div className='story-likes-dislikes-container' style={(allowLikeDislike && isLoggedIn) ? {border: "1px solid green"} :  {border: "1px solid red"} }>
        <div className='story-likes-dislikes-container'>
            {isLoading && <Loading />}
            <button className='like-dislike-btn' disabled={!(allowLikeDislike && isLoggedIn)} onClick={handleSubmitLikes}>
                <img src={Like} alt="like"/>
                <p>{stories.likes !== undefined && stories.likes.length }</p>
            </button>
            <button className='like-dislike-btn' disabled={!(allowLikeDislike && isLoggedIn)} onClick={handleSubmitDisLikes}>
                <img src={Dislike} alt="dislike" />
                <p>{ stories.disLikes !== undefined && stories.disLikes.length }</p>
            </button>
        </div>
    )
}

export default LikeAndDislike
