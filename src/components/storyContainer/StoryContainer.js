import React, {useState, useEffect} from 'react'
import StoryCard from '../storyCard/StoryCard'
import './storyContainer.css'
import Loading from '../loading/Loading'

const StoryContainer = () => {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
        setLoading(true)

        fetch('https://protected-mesa-93618.herokuapp.com/stories').then(d => d.json()).then(data => {
            setStories(data)
            setLoading(false)
        })
        
    }, [])



    return (
        <div className='storyContainer'>

            {
                stories.map(x => <StoryCard key={x._id} data={x} />)
            }

            {loading && <Loading />}
        </div>
    )
}

export default StoryContainer
