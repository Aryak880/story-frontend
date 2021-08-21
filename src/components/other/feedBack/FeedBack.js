import React, {useState} from 'react'
import './feedback.css'

const encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
}


const FeedBack = () => {

    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
            fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "feedback", ...data })
            })
            .then(() => alert("Success!"))
            .catch(error => alert(error));
    
            e.preventDefault();
        };


    return (
        <div className='glassmorphism-white feedback-container flex-column-center'>
            <div className="feedback flex-column-center glassmorphism-white signup">
                <h1>Feedback Form</h1>
                <p>Please fill it decently</p>

                <form onSubmit={handleSubmit} name="feedback" data-netlify="true" data-netlify-recaptcha="true">

                    <input type='text' name='name' value={data.name} onChange={handleChange} placeholder="Full Name"/>
                    <input type='text' name='email' value={data.email} onChange={handleChange} placeholder="Email id"/>
                    <input type='text' name='subject' value={data.subject} onChange={handleChange} placeholder="Subject"/>
                    <textarea name='message' placeholder='Message' value={data.message} onChange={handleChange} />

                    <div data-netlify-recaptcha="true"></div>

                    <button className='btn blue-btn' type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

export default FeedBack
