import React, {useState} from 'react'
import Loading from '../loading/Loading'
import './postStory.css'

const PostStory = () => {
    const [story, setstory] = useState({
        title: '',
        story: ''
    })

    const [owner, setOwner] = useState({
            name: '',
            email: 'example@gmail.com',
            age: '',
            insta: '',
            facebook: '',
            profile: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    })

    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {
            e.preventDefault()
            setLoading(true)
            
            console.log(owner)

            fetch('https://protected-mesa-93618.herokuapp.com/story', {
        
            // Adding method type
            method: "POST",
            
            // Adding body or contents to send
            body: JSON.stringify({
                ...story,
                owner: {
                         ...owner
                     }
            }),
            
            // Adding headers to the request
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            
            // Converting to JSON
            .then(response => response.json())
            
            // Displaying results to console
            .then(json => {
                console.log(json)
                setLoading(false)
                alert("Your story posted successfull!, you can check on the read stories tab")
            });

            setOwner({
                name: '',
                email: '',
                age: '',
                insta: '',
                facebook: '',
                profile: ''
            })
            setstory({
                title: '',
                story: '',
                storyImage: '',
            })
           
    }

    return (<>
                <form onSubmit={handleSubmit}>

                    <div className='ownerForm'>
                        <h1>Writer's details</h1>
                        <label>Name<span>* </span> : 
                            <input 
                                value={owner.name} 
                                type='text' 
                                required 
                                name='name' 
                                onChange={e => setOwner({...owner, name: e.target.value})}
                                
                            />
                        </label><br />

                        <label>Age<span>* </span> : 
                            <input 
                                value={owner.age} 
                                type='number' 
                                min={5} 
                                max={130} 
                                required 
                                name='age' 
                                onChange={e => setOwner({...owner, age: e.target.value})}
                                
                            />
                        </label><br />

                        <label>Email: 
                            <input 
                                value={owner.email} 
                                type='email' 
                                name='email' 
                                onChange={e => setOwner({...owner, email: e.target.value})}
                                
                            />
                        </label><br />

                        <label>Instagram profile link: 
                            <input 
                                value={owner.insta} 
                                type='text' 
                                name='insta' 
                                onChange={e => setOwner({...owner, insta: e.target.value})}
                                
                            />
                        </label><br />

                        <label>Facebook profile link: 
                            <input 
                                value={owner.facebook} 
                                type='text' 
                                name='facebook' 
                                onChange={e => setOwner({...owner, facebook: e.target.value})}
                                
                            />
                        </label><br />

                        <label>Your any public picture link: 
                            <input 
                                value={owner.profile} 
                                type='text' 
                                name='profile' 
                                onChange={e => setOwner({...owner, profile: e.target.value})}
                                
                            />
                        </label><br />

                    </div>

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
