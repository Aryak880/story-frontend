import React, {useState, useEffect} from 'react'
import './storyContainer.css'
import Loading from '../../other/loading/Loading'
import NoStory from '../noStory/NoStory'
import StoryCard from '../storyCard/StoryCard'

const StoryContainer = () => {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoded, setIsLoded] = useState(false)

    useEffect(() => {
        setLoading(true)

        const fetchStories = async () => {
            await fetch('https://protected-mesa-93618.herokuapp.com/stories').then(d => d.json()).then(data => {
                setStories(data)
                setIsLoded(true)
                setLoading(false)
            })
        }

        fetchStories()
    }, [])

    return (
        <div className='storyContainer'>
            {
                stories.length===0 && isLoded &&<NoStory />
            }

            {
                stories.map(x => <StoryCard key={x._id} data={x} />)
            }

            {loading && <Loading />}
        </div>
    )
}

export default StoryContainer
