import { Route, Switch, Link } from 'react-router-dom';
import React, {useState} from 'react';
import StoryContainer from './components/story/storyContainer/StoryContainer'
import PostStory from './components/story/postStory/PostStory'
import Profile from './components/profile/Profile'
import Login from './components/profile/login/Login'
import Signup from './components/profile/signup/Signup'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState({})

  const fetchUserData = async () => {
    fetch('https://protected-mesa-93618.herokuapp.com/user', {
    method: "GET",
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
        "Content-type": "application/json; charset=UTF-8"
    }
    }).then(response => {
    return response.json()
    }).then(data => {
        setUserData(data)
        setIsLoggedIn(true)
    console.log(data)
    })
}


  return (
    <div className="App">
      <nav className='navBar'>
        <Link to="/" className='nav-link'>Read Stories</Link>
        <div className='nav-profile'>
          <Link to='/profile' onClick={fetchUserData}><img src="https://img.icons8.com/ios-glyphs/30/000000/test-account.png" alt="profile"/></Link>

            <div className='login-signup'>
                {
                  isLoggedIn ? <Link to="/profile" onClick={fetchUserData}>Profile</Link>  : <>
                    <Link to='/profile/login'>Log in</Link> &nbsp;
                    <Link to='/profile/signup'>Sign Up</Link>
                  </>
                }
            </div>
        </div>
        <Link to="/story" className='nav-link'>Post Story</Link>
      </nav>
        <Switch>
          <Route path='/' component={StoryContainer} exact/>    
          <Route path='/story' component={PostStory} />
          <Route path='/profile' render={() => <Profile userData={userData} setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} exact />
          <Route path='/profile/signup' render={() => <Signup setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
          <Route path='/profile/login' render={() => <Login setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>} />
          <Route component={Error} />
        </Switch>
    </div>
  );
}


export default App;
