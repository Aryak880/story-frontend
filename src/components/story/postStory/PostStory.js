import React, {useState} from 'react'
import Loading from '../../other/loading/Loading'
import Error from '../../other/error/Error'
import './postStory.css'
import NotLoggedIn from '../../other/notLoggedIn/NotLoggedIn'
import SURL from '../../../const'

const PostStory = ({userData}) => {

    const [story, setstory] = useState({
        title: ``,
        story: ``,
        category: '',
        likes: [],
        disLikes: [],
        comments: []
    })

    const [isStoryPosted, setIsStoryPosted] = useState({
        message: '',
        class: '',
    })
    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
            e.preventDefault()
            setLoading(true)
            
            fetch(SURL+'/me/story', {
            method: "POST",
            body: JSON.stringify({...story}),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response => {
                setLoading(false)
                return {
                    data: response.json(),
                    status: response.status
                };
            }).then(data => {
                if(data.status === 201){
                    setIsStoryPosted({
                        message: "Your Story is posted go and check in read story tab 😊",
                        class: 'success-div'
                    })
                }else{
                    setIsStoryPosted({
                        message: "Your Story is not posted 😑. \n\nMake sure your story should be unique!!",
                        class: 'error-div'
                    })
                }
            })

            setstory({
                title: '',
                story: '',
                category: '',
            })
           
    }

    return (<>
                {(Object.keys(userData).length === 0) ? 
                <div className='profile-container flex-column-center glassmorphism-white'>
                    <NotLoggedIn /> 
                </div>
                :

                    <form onSubmit={handleSubmit} className='flex-column-center glassmorphism-white'>
                    <div className='storyForm'>
                        <h1>Story's details</h1>
                        <br />

                        <label>Story Title<span>*</span><br /> 
                            <textarea 
                                className='title' 
                                required 
                                name="title" 
                                value={story.title} 
                                onChange={e => setstory({...story, title: e.target.value})}
                                
                            ></textarea>
                        </label><br />
                        <label>Category<span>*</span><br />
                            <textarea
                                className='title'
                                name="category"
                                required
                                value={story.category}
                                onChange={e => setstory({...story, category: e.target.value})}
                            ></textarea><br />
                        </label>

                        <label>Story<span>*</span><br />
                            <textarea 
                                className='story' 
                                required 
                                name="story" 
                                value={story.story} 
                                onChange={e => setstory({...story, story: e.target.value})}
                                placeholder="Enter story"
                                minLength={500}
                            ></textarea>
                        </label><br />
                    </div>

                    <button type="submit" className='submit-btn'>Submit</button>
                    {isStoryPosted.message.length > 0 && <Error text={isStoryPosted.message} clName={isStoryPosted.class}/>}
                </form>
                }

                {loading && <Loading />}
            </>
    )
}

export default PostStory
