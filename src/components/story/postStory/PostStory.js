import React, {useState} from 'react'
import Loading from '../../other/loading/Loading'
import './postStory.css'

const PostStory = () => {
    const [story, setstory] = useState({
        title: ``,
        story: ``,
        likes: 0,
        disLikes: 0,
        comments: []
    })

    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
            e.preventDefault()
            setLoading(true)
            
            fetch('https://protected-mesa-93618.herokuapp.com/story', {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                ...story
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            
            // Converting to JSON
            .then(response => { 
                response.json()
                setLoading(false)
                response.status === 201 && 
                alert("Your story posted successfull!, you can check on the read stories tab")

                console.log(response)
            })
            
            // Displaying results to console
            .then(json => {
                // if(json.error){
                // alert(`Story doesn't posted, ${json.error}`)
                // }

                console.log(json)
            });

            setstory({
                title: '',
                story: '',
            })
           
    }

    return (<>
                <form onSubmit={handleSubmit}>
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

                    <button type="submit" className='submit'>Submit</button>
                </form>
                {loading && <Loading />}
            </>
    )
}

export default PostStory
