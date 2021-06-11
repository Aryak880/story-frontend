import React from 'react'
import { Link } from 'react-router-dom';
import './footer.css'

const Footer = () => {
    return (
        <footer className='footer'>
            <div className='footerName'><b>Developed by Aryak singh chauhan</b> <img src="https://img.icons8.com/emoji/48/000000/smiling-face-with-smiling-eyes.png" alt='smile'/></div>
            <div className='footerLogos'>
                <a href="https://www.facebook.com/aryaksingh.chauhan.5"><img src="https://img.icons8.com/doodle/48/000000/facebook-new.png" alt="facebook-link"/></a>
                <a href="https://www.instagram.com/aryaksinghchauhan/"><img src="https://img.icons8.com/plasticine/50/000000/instagram-new--v2.png" alt="instagram-link"/></a>
                <a href="https://www.instagram.com/aryaksinghchauhan/"><img src="https://img.icons8.com/doodle/50/000000/linkedin--v2.png" alt="linkedin-link"/></a>
            </div>
            <div className='login-signup'>
                <Link to='/profile/login'>Log in</Link> &nbsp;
                <Link to='/profile/signup'>Sign Up</Link>
            </div>
        </footer>
    )
}

export default Footer
