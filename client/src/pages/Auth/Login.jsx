import React, { useState } from 'react'
import './Auth.css';
import { NavLink, useNavigate } from 'react-router';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, SetPassword] = useState("");

    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log('login==>', email, password);
            toast.success('Login success');
            Navigate("/Home");
            setEmail("");
            SetPassword("");
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

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