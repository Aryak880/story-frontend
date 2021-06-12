import { Route, Switch, Link } from 'react-router-dom';
import React, {useState} from 'react';
import StoryContainer from './components/story/storyContainer/StoryContainer'
import PostStory from './components/story/postStory/PostStory'
import Profile from './components/profile/Profile'
import Login from './components/profile/login/Login'
import Signup from './components/profile/signup/Signup'


function App() {
  const [user, setUser] = useState({})

  return (
    <div className="App">
      <nav className='navBar'>
        <Link to="/">Read Stories</Link>
        <div className='nav-profile'>
          <Link to='/profile'><img src="https://img.icons8.com/ios-glyphs/30/000000/test-account.png" alt="profile"/></Link>

            <div className='login-signup'>
                <Link to="/profile">Profile</Link> &nbsp;
                <Link to='/profile/login'>Log in</Link> &nbsp;
                <Link to='/profile/signup'>Sign Up</Link>
            </div>
        </div>
        <Link to="/story">Post Story</Link>
      </nav>
        <Switch>
          <Route path='/' component={StoryContainer} exact/>    
          <Route path='/story' component={PostStory} />
          <Route path='/profile' render={() => <Profile data={user}  setUserProfile={setUser}/>} exact />
          <Route path='/profile/signup' render={() => <Signup setUserProfile={setUser}/>} />
          <Route path='/profile/login' render={() => <Login setUserProfile={setUser}/>} />
          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
