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

    // const handleSubmit = e => {
    //         fetch("/", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/x-www-form-urlencoded" },
    //         body: encode({ "form-name": "feedback", ...data })
    //         })
    //         .then(() => alert("Success!"))
    //         .catch(error => alert(error));
    
    //         e.preventDefault();
    // };


    return (
        <div className='glassmorphism-white feedback-container flex-column-center'>
            <div className="feedback flex-column-center glassmorphism-white signup">
                <h1>Feedback Form</h1>
                <p>Please fill it decently</p>

                <form name="contact" netlify>
                    <input type='text' name='name' value={data.name} onChange={handleChange} placeholder="Full Name"/>
                    <input type='text' name='email' value={data.email} onChange={handleChange} placeholder="Email id"/>
                    <input type='text' name='subject' value={data.subject} onChange={handleChange} placeholder="Subject"/>
                    <textarea name='message' placeholder='Message' value={data.message} onChange={handleChange} />
                    <button className='btn blue-btn' type='submit'>Send</button>
                </form>
            </div>
        </div>
    )
}

/* <form name="contact" method="POST" netlify-honeypot="bot-field" data-netlify="true">
  <p class="hidden">
    <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
  </p>
  <p>
    <label>Email: <input type="text" name="email" /></label>
  </p>
  <p>
    <label>Message: <textarea name="message"></textarea></label>
  </p>
  <p>
    <button type="submit">Send</button>
  </p>
</form> */

export default FeedBack
