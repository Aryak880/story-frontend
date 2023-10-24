import React from 'react'
import './error.css'


const Error = ({text, clName}) => {

    return (
        <div className='error-container'>
            <div className={`error-message-div ${clName === 'success-div' ? 'success-div' : 'error-div'}`}>
                {text}
            </div>
        </div>

    )
}

export default Error
