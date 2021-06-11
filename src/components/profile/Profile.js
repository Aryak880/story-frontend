import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Login from './login/Login'
import Signup from './signup/Signup'
import './profile.css'

const Profile = () => {
    return (
        <div className="profile">
        
            <Switch>
                <Route path='/profile/signup' component={Signup} />
                <Route path='/profile/login' component={Login} />
            </Switch>
        </div>
    )
}

export default Profile
