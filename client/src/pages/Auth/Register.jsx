import React, { useState } from 'react'
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,SetPassword] = useState("");

    const Navigate = useNavigate()

    const handleSubmit = (e)=>{
        try {
            e.preventDefault()
            console.log('register==>',name,email,password);
            toast.success('Register success')
            Navigate("/login")
            setName("")
            setEmail("")
            SetPassword("")
        } catch (error) {
          console.log(error);
           toast.error(error) 
        }
    }

  return (
     <>
        <div className='auth-container'>
          <div className='card'>
            <h2>Create A account</h2>
            <p>Please Enter Your Details to Register</p>
           <div className='form-group mb-3'>
             <input type='text' placeholder='Enter Your Name' value={name} onChange={(e)=> setName(e.target.value)} />
           </div>
           <div className='form-group mb-3'>
             <input type='email' placeholder='Enter Your Email' value={email} onChange={(e)=> setEmail(e.target.value)} />
           </div>
           <div className='form-group mb-3'>
             <input type='password' placeholder='Enter Your Password' value={password} onChange={(e)=> SetPassword(e.target.value)} />
           </div>
           <button className='btn btn-primary' disabled={!name||!email||!password} onClick={handleSubmit}>Register</button> 
           <p className='mt-3'>Already A user?<NavLink to="/login">Login Here</NavLink></p>
        </div>
       </div> 
     </>
  )
}

export default Register