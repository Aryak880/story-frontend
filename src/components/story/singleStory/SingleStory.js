import React,{useEffect, useState} from 'react'
import Loading from '../../other/loading/Loading'
import './singleStory.css'

const SingleStory = () => {
    const [stories, setStories] = useState({})
    const [loading, setLoading] = useState(true)
    const [storyOwner, setStoryOwner] = useState({})
    // const [isLoded, setIsLoded] = useState(false)

    useEffect(() => {
        setLoading(true)

        const URL = window.location.href
        const storyId = URL.substring(URL.search('read-story')+11, URL.length)
        
        const fetchStories = async () => {
            await fetch(`https://protected-mesa-93618.herokuapp.com/read-story/${storyId}`).then(d => d.json()).then(data => {
                setStories(data)
                fetchUser(data.owner)
                setLoading(false)
            })
        }

        const fetchUser = async (id) => {
            await fetch(`https://protected-mesa-93618.herokuapp.com/user/${id}`).then(d => d.json()).then(data => {
                setStoryOwner(data)
            })
        }

        fetchStories()
    }, [])



    return (
        <div className='single-story-container'>
            {
                loading ? <Loading /> :
                <div>

                    <div className="storyDetailsContainer">
                        <h2>{stories.title}</h2>
                        <p>{stories.story}</p>
                    </div>

                    <div className="ownerDetailsContainer">
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
            }
        </div>
    )
}

export default SingleStory
