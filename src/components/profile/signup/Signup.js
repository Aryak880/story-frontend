import React from 'react'
import './signup.css'

const Signup = () => {
    return (
        <div className="signup">
            <h2>Signup</h2>
            <form>

                    <input type="text" placeholder='Full name' name="name" required/>



                    <input type="email" placeholder='Email' name="email" required/>

                    <div>
                        <select name="gender" required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>                

                        <input type="number" min={0} max={150} placeholder='Age' name="age" required/>
                    </div>
                    
   
                    <input type="text" placeholder="Instagram username"/>

                    <input type="text" placeholder="facebook profile url"/>



                    <input type="password" placeholder="password" name="password" required/>


                    <input type="password" placeholder="re-enter password" required/>


                    <button type="submit" id="submit">Submit</button>
            </form>
        </div>
    )
}

export default Signup
