import React from 'react'
import './contact.css'

const ContactUs = () => {
    
  return (
    <div>
        <form className='flex-column-center glassmorphism-white' name='contact' netlify method='POST'>
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
                                // value={user.name} 
                                // onChange={e => setUser({...user, name: e.target.value})}
                                
                            />
                        </label><br />
                        <label>Subject<span>*</span><br />
                        <input
                                placeholder='Enter your subject'
                                type='subject' 
                                className='title' 
                                required 
                                name="subject" 
                                // value={user.subject} 
                                // onChange={e => setUser({...user, subject: e.target.value})}                                
                        /><br />

                        </label>

                        <label>Message<span>*</span><br />
                            <textarea 
                                className='story' 
                                required 
                                name="message" 
                                // value={user.message} 
                                // onChange={e => setUser({...user, message: e.target.value})}
                                placeholder="Enter your message Here!"
                                // minLength={500}
                            ></textarea>
                        </label><br />
                    </div>

                    <button className='submit-btn'>Submit</button>
                </form>


    </div>
  )
}

export default ContactUs