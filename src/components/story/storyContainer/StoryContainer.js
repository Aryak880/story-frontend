import React, {useState, useEffect} from 'react'
import './storyContainer.css'
import Loading from '../../other/loading/Loading'
import NoStory from '../noStory/NoStory'
import StoryCard from '../storyCard/StoryCard'
import CreateAccount from '../../other/createAccount/CreateAccount'

const StoryContainer = ({userData}) => {
    const [stories, setStories] = useState([])
    const [loading, setLoading] = useState(true)
    const [isLoded, setIsLoded] = useState(false)
    const [noStoryMessage, setNoStoryMessage] = useState('')
    const [query, setQuery] = useState('')
    const [isLoggedIn] = useState(Object.keys(userData).length !== 0)
    const [totalStories, setTotalStories] = useState(0)
    const [pageNo, setPageNo] = useState(1)

    useEffect(() => {
        setLoading(true)

        const fetchStories = async () => {
            await fetch('https://protected-mesa-93618.herokuapp.com/stories/'+pageNo).then(d => d.json()).then(data => {
                setStories(preStories => [...preStories, ...data])
                setIsLoded(true)
                setLoading(false)
                if(data.length === 0){
                    setNoStoryMessage("Sorry no one yet posted any story! Why don't you become first one")
                }
            })
        }

        const fetchStoriesNumber = async () => {
            await fetch('https://protected-mesa-93618.herokuapp.com/stories/numbers').then(d => d.json()).then(data => {
                setTotalStories(data.numberOfStories)
                setIsLoded(true)
                setLoading(false)
            })
        }

        fetchStories()
        if(pageNo === 1){
            fetchStoriesNumber()
        }
    }, [pageNo])

    const handleSearchSubmit = async (e) => {
        e.preventDefault()
        
        setLoading(true)

        await fetch(`https://protected-mesa-93618.herokuapp.com/story-search/${query}`).then(d => d.json()).then(data => {
                setStories(data)
                setIsLoded(true)
                setLoading(false)
                if(data.length === 0){
                    setNoStoryMessage(`Sorry we do not have any story with "${query}" string as title, tag or text in story!`)
                }
        })
    }


    return (
        <div className='story-create-account-container'>
            {!isLoggedIn && <CreateAccount />}
            
            <form onSubmit={handleSearchSubmit} className='searchStoryContainer'>
                <input placeholder='Search story' type='text' value={query} onChange={(e) => setQuery(e.target.value)}/>
                <button disabled={query.length === 0} className='btn danger-btn'>Search</button>
            </form>            

            <div className='storyContainer'>
                {
                    stories.length===0 && isLoded &&<NoStory text={noStoryMessage} />
                }

                {
                    stories.map(x => <StoryCard key={x._id} data={x} />)
                }

                {loading && <Loading />}
            </div>
            <div>
                {/* <button 
                    className='btn danger-btn' 
                    onClick={() => {
                                if(pageNo > 0){
                                    setPageNo(pageNo-1)
                                }
                            }}
                    disabled={(pageNo <= 1)}
                >&#9194;</button> */}

                <button 
                    className='btn black-btn' 
                    onClick={() => {
                                if(pageNo < (Math.floor(totalStories/10)+1)){
                                    setPageNo(pageNo+1)
                                }
                            }}
                    disabled={totalStories === stories.length}
                >{(totalStories === stories.length) ? "No More Story" : <span>read more story</span> }</button>
            </div>
        </div>
    )
}

export default StoryContainer
