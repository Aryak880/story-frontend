import React, {useState} from 'react'
import './comment.css'
import SURL from '../../../const'

const CommentCard = ({name, comment}) => {
    return(
        <div className='comment-card-container glassmorphism-white'>
            <h4>{name}</h4>
            <p>{comment}</p>
        </div>
    )
}


const Comment = ({ comments, userData, storyId }) => {

    const [inputComment, setInputComment] = useState()
    const userLoggedIn = (Object.keys(userData).length !== 0)

    const handleCommentSubmit = async (e) => {
        e.preventDefault()

        if(inputComment !== undefined && userLoggedIn){
            comments.push({
                name: userData.name,
                comment: inputComment
            })

            fetch(SURL+'/me/story/'+storyId, {
            method: "PATCH",
            body: JSON.stringify({ comments }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                if(response.status === 200){
                    setInputComment('')
                }

                return response.json()                
            })
        }    
    }

    return (
        <div>
            <h2>Comment</h2>
            <hr />
            <div className='comment-form'>
                <form onSubmit={handleCommentSubmit}>
                    <textarea value={inputComment} onChange={e => setInputComment(e.target.value)}></textarea>
                    <button 
                        type="submit" 
                        className='submit-btn' 
                        value="Submit" 
                        disabled={!userLoggedIn}
                        style={userLoggedIn ? {} : {border: "1px solid red"}}
                    >Comment</button>
                </form>
            </div>

            <div className='comment-discription-container'>
                {   
                    comments.map((d) => <CommentCard key={d.comment} name={d.name} comment={d.comment}/>)
                }
            </div>
        </div>
    )
}

export default Comment
