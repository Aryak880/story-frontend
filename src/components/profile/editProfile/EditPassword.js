import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import Loading from '../../other/loading/Loading'
import Error from '../../other/error/Error'
import SURL from '../../../const'


const EditPassword = () => {
    
  
    const [password, setPassword] = useState('')
    const [rePassword, setRePassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [matchPassword, setMatchPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const history = useHistory()
    
    const handleShowPassword = () => {
        // login-password-input
        var x = document.getElementById("show-password-edit-password");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }

    const handlePasswordMatch = (e) => {
        setRePassword(e.target.value)
        setMatchPassword(rePassword === newPassword)
    }
   

    const handleSubmit = (e) => {
        e.preventDefault()

        setLoading(true)

        fetch(SURL+'/user/me/password', {
            method: "PATCH",
            body: JSON.stringify({
                password: password,
                newPassword: newPassword
            }),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('aryak-story-app-userToken')}`,
                "Content-type": "application/json; charset=UTF-8"
            }
            })
            .then(response =>  {
                setLoading(false)

            if (response.status === 200)
                return response.json()

            else {
                return {
                    error: "Unable to change password!"
                }
            }
            }).then(data => {
                if(data.error){
                    setError(true)
                }
                
                else{
                    history.push('/profile')
                }
            })
    }


    return (
        <div className='signUpContainer profile-container flex-column-center glassmorphism-white'>
                        {error && <Error text="Profile not update, please try again!" clName={'error-div'}/>}
                    <div className="signup flex-column-center glassmorphism-white">
                            <h2>Change Password</h2>
                            
                        <form onSubmit={handleSubmit}>
                           
                            <input 
                                type="password"
                                placeholder="Previous password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            <input 
                                type="password"
                                placeholder="New password"
                                name="newPassword"
                                id="show-password-edit-password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />

                            <input 
                                type="password"
                                placeholder="Re-enter new password"
                                name="rePassword"
                                value={rePassword}
                                onChange={handlePasswordMatch}
                            />

                            <div className='show-password-container'>
                                <input 
                                    type="checkbox"
                                    onClick={handleShowPassword}
                                />Show Password
                            </div>

                            {
                                matchPassword && <span className='passwordNotMatch error-message'>
                                *password not match
                                </span>
                            }        


                            <button type="submit" className="btn danger-btn" disabled={newPassword.length === 0 || matchPassword}>Update</button>
                        
                        </form>
                        {loading && <Loading />}
                    </div>
                </div>
    )
}



export default EditPassword