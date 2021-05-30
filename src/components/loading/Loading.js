import React from 'react'
import './loading.css'


const Loading = () => {
    return (
        <div>
            <div class="loadingContainer">
                <p>loading...</p>
                <div class="loadingBall" id="loadingCircle"></div>
                <div class="loadingBall" id="loadingSquare"></div>
            </div>
        </div>
    )
}

export default Loading
