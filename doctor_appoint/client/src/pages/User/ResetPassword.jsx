import React, { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate} from 'react-router'
import { resetPassword } from '../../redux/actions/authActions'
import { reset } from '../../redux/slice/authSlice'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const {success,error} = useSelector(state=>state.auth)
    
    const [oldPassword,setOldPassword] = useState('')
    const [newPassword,setNewPassword] = useState('')

    const handleResetPassword = (e)=>{
        e.preventDefault()
        if(!oldPassword || !newPassword)
        {
            return toast.error('Please provide Old and New Password')
        }
        
        if(newPassword.length<6){
            return toast.error("New Password Must be atleast 6 Charcters")
        }

        dispatch(resetPassword({oldPassword,newPassword}))
        dispatch(reset())
    }


    useEffect(()=>{
       if(error)
       {
        toast.error(error)
        dispatch(reset())
       }
       if(success)
       {
          toast.success('Password Updated Successfully')
          navigate('/user/profile')
          dispatch(reset())
       }
    },[dispatch,success,navigate,error])
  return (
    <>
        <div className='d-flex flex-column align-items-center justify-content-center' style={{minHeight:'80vh'}}>
            <h1>Reset Your Password</h1>
            <div className='mb-3'>
                <label htmlFor='' className='mt-3'>Enter your old Password</label>
                <input type='password' value={oldPassword} onChange={e=>setOldPassword(e.target.value)} className='form-control'></input>
            </div>
            <div className='mb-3'>
                <label htmlFor='' className='mt-3'>Enter your new Password</label>
                <input type='password' value={newPassword} onChange={e=>setNewPassword(e.target.value)} className='form-control'></input>
            </div>

            <button className='btn btn-primary' onClick={handleResetPassword}>Reset Password</button>
        </div>
    </>
  )
}

export default ResetPassword
 