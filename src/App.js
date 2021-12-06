import { Route, Switch, Link } from 'react-router-dom';
import React, {useState} from 'react';
import StoryContainer from './components/story/storyContainer/StoryContainer'
import PostStory from './components/story/postStory/PostStory'
import Profile from './components/profile/Profile'
import Login from './components/profile/login/Login'
import Signup from './components/profile/signup/Signup'
import SingleStory from './components/story/singleStory/SingleStory'
import EditStory from './components/story/editStory/EditStory'
import EditProfile from './components/profile/editProfile/EditProfile'
import EditPassword from './components/profile/editProfile/EditPassword'
import Admin from './components/admin/Admin';
import User from '../src/images/user.png'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('aryak-story-app-userData') !== null ? true : false)
  const [userData, setUserData] = useState(localStorage.getItem('aryak-story-app-userData') !== null ? JSON.parse(localStorage.getItem('aryak-story-app-userData')) : {})

  // window.onunload = function () {
  //   localStorage.clear();
  // }
  // console.log(userData)

  return (
    <div className="App">
      <nav className='navBar'>
        <Link to="/" className='nav-link default-link-color'>Read Stories</Link>
        <div className='nav-profile' style={Object.keys(userData).length === 0 ? {borderRight: "none "} : {}}>
          <Link to='/profile' className='default-link-color'><img src={User} alt="profile" id='user-icon'/></Link>

            <div className='login-signup'>
                {
                  isLoggedIn ? <Link to="/profile" className='default-link-color'>Profile</Link>  : <>
                    <Link to='/profile/login' className='default-link-color'>Log in</Link> &nbsp;
                    <Link to='/profile/signup' className='default-link-color'>Sign Up</Link>
                  </>
                }
            </div>
        </div>
        
        {isLoggedIn && <Link to="/story" className='nav-link default-link-color'>Post Story</Link>}
      </nav>

       <Switch>
          <Route path='/' 
            render={() => <StoryContainer userData={userData}/>}
            exact/>    
          <Route path='/story' 
            render={() => <PostStory userData={userData}/>}
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
              path='/profile-edit' 
              render={() => <EditProfile 
                                setIsLoggedIn={setIsLoggedIn} 
                                userData={userData}
                                setUserProfile={setUserData} 
                                isLoggedIn={isLoggedIn}/>}
          />
          
          <Route
            path="/profile-edit-password"
            render={() => <EditPassword
                              setIsLoggedIn={setIsLoggedIn}
                              userData={userData}
                              setUserProfile={setUserData}
                              isLoggedIn={isLoggedIn}/>
                            }
          />

          <Route 
              path='/profile/login' 
              render={() => <Login 
                                setIsLoggedIn={setIsLoggedIn} 
                                setUserProfile={setUserData}/>}
          />
          <Route 
              path='/edit-story/:_id'
              render={() => <EditStory userData={userData}/>}
          />

          
            <Route 
              path='/admin'
              render={() => <Admin 
                                isLoggedIn={isLoggedIn}
                                userData={userData}
                            />}
            />
          

          <Route component={Error} />
        </Switch>
    </div>
  );
}


export default App;
