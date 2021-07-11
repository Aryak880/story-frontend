import { Route, Switch, Link } from 'react-router-dom';
import React, {useState} from 'react';
import StoryContainer from './components/story/storyContainer/StoryContainer'
import PostStory from './components/story/postStory/PostStory'
import Profile from './components/profile/Profile'
import Login from './components/profile/login/Login'
import Signup from './components/profile/signup/Signup'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(localStorage.getItem('aryak-story-app-userData') !== undefined ? localStorage.getItem('aryak-story-app-userData') : {})

  console.log(localStorage.getItem('aryak-story-app-userData'))  

  return (
    <div className="App">
      <nav className='navBar'>
        <Link to="/" className='nav-link'>Read Stories</Link>
        <div className='nav-profile'>
          <Link to='/profile'><img src="https://img.icons8.com/ios-glyphs/30/000000/test-account.png" alt="profile"/></Link>

            <div className='login-signup'>
                {
                  isLoggedIn ? <Link to="/profile">Profile</Link>  : <>
                    <Link to='/profile/login'>Log in</Link> &nbsp;
                    <Link to='/profile/signup'>Sign Up</Link>
                  </>
                }
            </div>
        </div>
        {isLoggedIn && <Link to="/story" className='nav-link'>Post Story</Link>}
      </nav>

       <Switch>
          <Route path='/' component={StoryContainer} exact/>    
          <Route path='/story' 
            component={PostStory} 
            // userData={userData} 
            setIsLoggedIn={setIsLoggedIn} 
            isLoggedIn={isLoggedIn}
          />
          <Route 
              path='/profile' 
              render={() => <Profile 
                                userData={userData} 
                                setIsLoggedIn={setIsLoggedIn} 
                                isLoggedIn={isLoggedIn}/>} 
                                exact
          />
          <Route 
              path='/profile/signup' 
              render={() => <Signup 
                                setIsLoggedIn={setIsLoggedIn} 
                                setUserProfile={setUserData} 
                                isLoggedIn={isLoggedIn}/>}
          />
          <Route 
              path='/profile/login' 
              render={() => <Login 
                                setIsLoggedIn={setIsLoggedIn} 
                                setUserProfile={setUserData}/>}
          />
          <Route component={Error} />
        </Switch>
    </div>
  );
}


export default App;
