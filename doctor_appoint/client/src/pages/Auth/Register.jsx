import React, { useEffect, useState } from 'react'
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { register } from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,SetPassword] = useState("");

     const dispatch = useDispatch();

    const Navigate = useNavigate()

    const {error,success} = useSelector(state=>state.auth)

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(!name || !email || !password){
           return toast.error("Please provide all fields")  
        }
        dispatch(register({name,email,password}))
    }

    useEffect(()=>{
        if(success)
        {
          toast.success('Register Successfully')
          setName("")
          setEmail("")
          SetPassword("")
          Navigate('/login')
          dispatch(reset())
        }
        if(error)
        {
          toast.error(error)
          dispatch(reset());
        }
    },[dispatch,error,success,Navigate])

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