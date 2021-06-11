import { Route, Switch, Link } from 'react-router-dom';
import React from 'react';
import StoryContainer from './components/story/storyContainer/StoryContainer'
import PostStory from './components/story/postStory/PostStory'
import Profile from './components/profile/Profile'


function App() {
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
          <Route path='/profile' component={Profile} />
          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
