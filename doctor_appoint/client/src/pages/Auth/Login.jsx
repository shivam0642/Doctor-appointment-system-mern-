import React, { useState,useEffect } from 'react'
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import { useDispatch,useSelector } from 'react-redux';
import { reset } from '../../redux/slice/authSlice';
import { login } from '../../redux/actions/authActions';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");

    const dispatch = useDispatch();

    const Navigate = useNavigate()

    const { error, success } = useSelector(state => state.auth)

    const handleSubmit = (e) => {
       e.preventDefault();
       if(!email || !password){
           return toast.error("Please provide email and passwords")  
        }
        dispatch(login({email,password}))
    };

        useEffect(()=>{
        if(success)
        {
            toast.success('Login success');
            Navigate("/");
            setEmail("");
            SetPassword("");
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
                    <h2>Login</h2>
                    <p>Please Enter Your Email & Password</p>
                    <div className='form-group mb-3'>
                    </div>
                    <div className='form-group mb-3'>
                        <input type='email' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className='form-group mb-3'>
                        <input type='password' placeholder='Enter Your Password' value={password} onChange={(e) => SetPassword(e.target.value)} />
                    </div>
                    <button className='btn btn-primary' disabled={!email || !password} onClick={handleSubmit}>Login</button>
                    <p className='mt-3'>Not A user?<NavLink to="/register">Register Here</NavLink></p>
                </div>
            </div>
        </>
    );
};

export default Login