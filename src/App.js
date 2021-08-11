import { Route, Switch, Link } from 'react-router-dom';
import React, {useState} from 'react';
import StoryContainer from './components/story/storyContainer/StoryContainer'
import PostStory from './components/story/postStory/PostStory'
import Profile from './components/profile/Profile'
import Login from './components/profile/login/Login'
import Signup from './components/profile/signup/Signup'
import SingleStory from './components/story/singleStory/SingleStory'


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userData, setUserData] = useState(sessionStorage.getItem('aryak-story-app-userData') !== null ? JSON.parse(sessionStorage.getItem('aryak-story-app-userData')) : {})

  window.onunload = function () {
    sessionStorage.clear();
  }


  return (
    <div className="App">
      <nav className='navBar'>
        <Link to="/" className='nav-link'>Read Stories</Link>
        <div className='nav-profile' style={Object.keys(userData).length === 0 ? {borderRight: "none "} : {}}>
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
          <Route path='/' 
            render={() => <StoryContainer userData={userData}/>}
            exact/>    
          <Route path='/story' 
            component={PostStory}
            setIsLoggedIn={setIsLoggedIn} 
            isLoggedIn={isLoggedIn}
          />

          <Route path='/read-story' render={() => <SingleStory 
                                                      userData={userData}
                                                  />}
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
