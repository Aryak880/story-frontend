import React from 'react'
import { Link } from 'react-router-dom';
import './createAccount.css'


const CreateAccount = () => {
    return (
        <div className='create-account-container'>
            <p>
                Do you want to share your story? <Link to='/profile/signup'>Create an account</Link> Or do you have an account? Then <Link to='/profile/login'>Log in</Link> and post it &#128521;
            </p>            
        </div>
    )
}

export default CreateAccount
