import { Route, Switch, Link } from 'react-router-dom';
import React from 'react';
import StoryContainer from './components/storyContainer/StoryContainer'
import PostStory from './components/postStory/PostStory'


function App() {
  return (
    <div className="App">
      <nav className='navBar'>
        <Link to="/">Read Stories</Link>
        <Link to="/story">Post Story</Link>
      </nav>
        <Switch>
          <Route path='/' component={StoryContainer} exact/>    
          <Route path='/story' component={PostStory} />
          <Route component={Error} />
        </Switch>
    </div>
  );
}

export default App;
