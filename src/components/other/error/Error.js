import React from 'react'
import './error.css'


const Error = (props) => {

    return (
        <div className='error-div'>
            {props.text}
        </div>
    )
}

export default Error
