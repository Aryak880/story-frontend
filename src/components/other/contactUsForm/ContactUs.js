import React,{useRef, useState } from 'react'
import './contact.css'
import emailjs from 'emailjs-com'
import Error from '../error/Error'

const ContactUs = () => {
    const form = useRef();
    const [error, setError] = useState({
        message: '',
        result: ''
    })

    console.log(process.env.EmaiJsPublicKey)

    const sendEmail = (e) => {
        e.preventDefault();
        
        // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
        emailjs.sendForm(process.env.REACT_APP_EmaiJsServiceID, process.env.REACT_APP_EmaiJsTemplateID, form.current, process.env.REACT_APP_EmaiJsPublicKey)
          .then((result) => {
              console.log(result);
              setError({result: 'success-div', message: 'Your message is sent! 😃, Soon you will recive replay'})
            
          }, (error) => {
              console.log(error.text);
              setError({result: 'error-div', message: `From is NOT Submited! 🙁 \nError message: ${error.text}`})
          });
      };


  return (
    <div>
        {error.message.length !== 0 && <Error text={error.message} clName={error.result}/>}
        <form ref={form} className='flex-column-center glassmorphism-white' name='contact' onSubmit={sendEmail}>
                    <div className='storyForm'>
                        <h1>Contact Form</h1>
                        <br />

                        <label>Name<span>*</span><br /> 
                            <input
                                placeholder='Enter your name'
                                type='text' 
                                className='title' 
                                required 
                                name="name" 
                                // value={contactData.name} 
                                // onChange={e => setContactData({...contactData, name: e.target.value})}
                                
                            />
                        </label><br />
                        
                        <label>Email<span>*</span><br /> 
                            <input
                                placeholder='Email'
                                type='email' 
                                className='title' 
                                required 
                                name="email" 
                                // value={contactData.email} 
                                // onChange={e => setContactData({...contactData, email: e.target.value})}
                                
                            />
                        </label><br />

                        <label>Subject<span>*</span><br />
                        <input
                                placeholder='Enter your subject'
                                type='subject' 
                                className='title' 
                                required 
                                name="subject" 
                                // value={contactData.subject} 
                                // onChange={e => setContactData({...contactData, subject: e.target.value})}                                
                        /><br />

                        </label>

                        <label>Message<span>*</span><br />
                            <textarea 
                                className='story' 
                                required 
                                name="message" 
                                // value={contactData.message} 
                                // onChange={e => setContactData({...contactData, message: e.target.value})}
                                placeholder="Enter your message Here!"
                                // minLength={500}
                            ></textarea>
                        </label><br />
                    </div>

                    <input type='submit' className='submit-btn' />
                </form>
    </div>
  )
}

export default ContactUs