import React,{useEffect, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import './singleStory.css'
import LikeAndDislike from '../../storyComponents/likeAndDislike/LikeAndDislike'
import Comment from '../../storyComponents/comment/Comment'
import SURL from '../../../const'


const SingleStory = ({userData}) => {
    const history = useHistory()
    const [stories, setStories] = useState({
        likes: [],
        disLikes: [],
        comments: []
    })
    const [loading, setLoading] = useState(true)
    const [storyOwner, setStoryOwner] = useState({})
    const [storyFound, setStoryFound] = useState(true)

    const URL = window.location.href
    const _id = URL.substring(URL.search('read-story')+11, URL.length)


       useEffect(() => {
            setLoading(true)

            const URL = window.location.href
            const storyId = URL.substring(URL.search('read-story')+11, URL.length)
            
            const fetchStories = async () => {
                await fetch(SURL+`/read-story/${storyId}`).then(d => d.json()).then(data => {
                    if(!data.error){
                        setStories(data)
                        fetchUser(data.owner)
                    }else{
                        setLoading(false)
                        setStoryFound(false)
                    }
                })
            }

            const fetchUser = async (id) => {
                await fetch(SURL+`/user/${id}`).then(d => d.json()).then(data => {
                    setStoryOwner(data)
                    setLoading(false)
                })
            }  

            fetchStories()
        }, [])

    return (<div className='single-story-main-container'>
    {    !storyFound ? 
            <div className='profile-container flex-column-center glassmorphism-white'>
                <h1 style={{textAlign: "center"}}>Sorry Story not found! may be writter have deleted it. &#128529;</h1>
                <button className='btn green-btn' onClick={() => history.push('/')}>Read other story &#9749;</button>
            </div> :
            <div className='single-story-container'>
                {
                    loading ? <Loading /> :
                    <div className='single-story-comment-story-container'>
                        <div className='story-writer-container'>

                            {
                                (Object.keys(userData).length !== 0 && userData._id === storyOwner._id) && <Link className='btn green-btn edit-story-singleStory-page' to={`/edit-story/`+_id}>Edit story</Link>
                            }

                            <div className="storyDetailsContainer">
                                <h2 className='text-white single-story-title'>{stories.title}</h2>
                                <p className='single-story-story'>{stories.story}</p>
                            </div>

                            <LikeAndDislike stories={stories} userData={userData} />
                            
                            <div className="ownerDetailsContainer">
                                <h3 className='text-white'>Writer</h3>
                                <div className='ownerDetails'>
                                    <b>Name: </b><span>{storyOwner.name} </span><br />
                                    <b> Age: </b><span>{storyOwner.age}</span><br />
                                    <b> Gender: </b><span>{storyOwner.gender}</span> <br />
                                    <b> Email: </b><span>{storyOwner.email}</span> <br />

                                    {storyOwner.facebook !== '' && <a href={'https://www.facebook.com/'+storyOwner.facebook} target="_blank" rel='noreferrer'><img src="https://img.icons8.com/doodle/48/000000/facebook-new.png" alt="facebook-link"/></a>}
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
    }
        </div>)
}

export default SingleStory
