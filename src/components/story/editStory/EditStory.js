import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import NotLoggedIn from '../../other/notLoggedIn/NotLoggedIn'
import Error from '../../other/error/Error'
import './editStory.css'

const EditStory = ({userData}) => {
    const history = useHistory()
    
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [story, setStory] = useState({
        title: ``,
        story: ``,
        category: '',
        likes: [],
        disLikes: [],
        comments: []
    })

    const URL = window.location.href
    const _id = URL.substring(URL.search('edit-story')+11, URL.length)

    useEffect(() => {
        setLoading(true)
        
        const URL = window.location.href
        const storyId = URL.substring(URL.search('edit-story')+11, URL.length)

        const fetchStories = async () => {
            await fetch(`https://protected-mesa-93618.herokuapp.com/read-story/${storyId}`).then(d => d.json()).then(data => {
                setStory({
                    ...data
                })
                setLoading(false)
            })
        }

        fetchStories()
    }, [])

    const handleUpdateStorySubmit = async (e) => {
        e.preventDefault()

            setLoading(true)
            setError(false)

            fetch('https://protected-mesa-93618.herokuapp.com/me/story/'+_id, {
            method: "PATCH",
            body: JSON.stringify({ title: story.title, story: story.story, category: story.category }),
            headers: {
                'Authorization': `Bearer ${sessionStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                setLoading(false)
                
                if(response.status !== 200)
                    return {error: "Story not updated"}
                
                return response.json()
            }).then(d => {
                if(d.error){
                    setError(true)
                }else{
                    history.goBack()
                }
            })
            
    }

    return (<>
                {   Object.keys(userData).length === 0 ?
                    <div className='edit-story-notLoggedIn'>
                        <NotLoggedIn /> 
                    </div>
                    :
                    <div>
                        {error && <Error text="Story not Update, Please try again!"/>}
                        <form onSubmit={handleUpdateStorySubmit}>
                            <div className='storyForm'>
                                <h1>Edit Story's details</h1>
                                <br />
            
                                <label>Story Title<span>*</span><br /> 
                                    <textarea 
                                        className='title' 
                                        required 
                                        name="title" 
                                        value={story.title} 
                                        onChange={e => setStory({...story, title: e.target.value})}
                                        
                                    ></textarea>
                                </label><br />
                                <label>Category<span>*</span><br />
                                    <textarea
                                        className='title'
                                        name="category"
                                        required
                                        value={story.category}
                                        onChange={e => setStory({...story, category: e.target.value})}
                                    ></textarea><br />
                                </label>
            
                                <label>Story<span>*</span><br />
                                    <textarea 
                                        className='story' 
                                        required 
                                        name="story" 
                                        value={story.story} 
                                        onChange={e => setStory({...story, story: e.target.value})}
                                        placeholder="Enter story"
                                        minLength={500}
                                    ></textarea>
                                </label><br />
                            </div>
                
                                <button type="submit" className='submit-btn'>Update!</button>
                                
                        </form>
                    </div>
                }

                {loading && <Loading />}
            </>
    )
}

export default EditStory
