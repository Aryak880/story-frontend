import React, {useState, useEffect} from 'react'
import StoryCard from '../storyCard/StoryCard'
import './storyContainer.css'
import Loading from '../loading/Loading'
import NoStory from '../noStory/NoStory'

const StoryContainer = () => {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        const fetchStories = async () => {
            await fetch('https://protected-mesa-93618.herokuapp.com/stories').then(d => d.json()).then(data => {
                setStories(data)
            })
        }

        fetchStories()
        setLoading(false)
    }, [])

    return (
        <div className='storyContainer'>
            {
                stories.length===0 && <NoStory />
            }

            {
                stories.map(x => <StoryCard key={x._id} data={x} />)
            }

            {loading && <Loading />}
        </div>
    )
}

export default StoryContainer
