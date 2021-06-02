import React, {useState, useEffect} from 'react'
import StoryCard from '../storyCard/StoryCard'
import './storyContainer.css'
import Loading from '../loading/Loading'
import NoStory from '../noStory/NoStory'

const StoryContainer = () => {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [noStory, setNoStory] = useState(false)

    useEffect(() => {
        setLoading(true)

        fetch('https://protected-mesa-93618.herokuapp.com/stories').then(d => d.json()).then(data => {
            setStories(data)
            
            let a = stories.length === 0 ? true : false

            setNoStory(a)
            
            setLoading(false)
        })
        
    }, [])

    let i = 1

    return (
        <div className='storyContainer'>
            {
                noStory && <NoStory />
            }

            {
                stories.map(x => <StoryCard key={x._id} data={x} i={i++}/>)
            }

            {loading && <Loading />}
        </div>
    )
}

export default StoryContainer
