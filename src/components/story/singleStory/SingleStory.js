import React,{useEffect, useState} from 'react'
import Loading from '../../other/loading/Loading'
import './singleStory.css'
import LikeAndDislike from '../../storyComponents/likeAndDislike/LikeAndDislike'
import Comment from '../../storyComponents/comment/Comment'


const SingleStory = ({userData}) => {
    const [stories, setStories] = useState({})
    const [loading, setLoading] = useState(true)
    const [storyOwner, setStoryOwner] = useState({})


       useEffect(() => {
        setLoading(true)

        const URL = window.location.href
        const storyId = URL.substring(URL.search('read-story')+11, URL.length)
        
        const fetchStories = async () => {
            await fetch(`https://protected-mesa-93618.herokuapp.com/read-story/${storyId}`).then(d => d.json()).then(data => {
                setStories(data)
                fetchUser(data.owner)
            })
        }

        const fetchUser = async (id) => {
            await fetch(`https://protected-mesa-93618.herokuapp.com/user/${id}`).then(d => d.json()).then(data => {
                setStoryOwner(data)
                setLoading(false)
            })
        }  

        fetchStories()
    }, [])

    return (
        <div className='single-story-container'>
            {
                loading ? <Loading /> :
                <div className='single-story-comment-story-container'>
                    <div className='story-writer-container'>
                        <div className="storyDetailsContainer">
                            <h2 className='text-white single-story-title'>{stories.title}</h2>
                            <p className='single-story-story'>{stories.story}</p>
                        </div>

                        <LikeAndDislike stories={stories} userData={userData} />
                        
                        <div className="ownerDetailsContainer">
                            <h3 className='text-white'>Writer</h3>
                            <div className='ownerDetails'>
                                <b>Name: </b><span>{storyOwner.name} </span>
                                <b> Age: </b><span>{storyOwner.age}</span>
                                <b> Gender: </b><span>{storyOwner.gender}</span> <br />
                                <b> Email: </b><span>{storyOwner.email}</span> <br />

                                {storyOwner.facebook !== '' && <a href={storyOwner.facebook} target="_blank" rel='noreferrer'><img src="https://img.icons8.com/doodle/48/000000/facebook-new.png" alt="facebook-link"/></a>}
                                {storyOwner.instagram !== '' && <a href={`https://www.instagram.com/`+storyOwner.instagram} target="_blank" rel='noreferrer'><img src="https://img.icons8.com/plasticine/50/000000/instagram-new--v2.png" alt="instagram-link"/></a>}                            
                            </div>
                        </div>
                    </div>
                    
                    <div className='comment-container'>
                        <Comment comments={stories.comments} userData={userData} storyId={stories._id}/>
                    </div>               
                </div>                
            }
        </div>
    )
}

export default SingleStory
