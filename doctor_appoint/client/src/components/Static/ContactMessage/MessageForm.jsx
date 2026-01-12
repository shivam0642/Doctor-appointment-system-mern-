import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { sendWebMessage } from '../../../redux/actions/authActions'
import { reset } from '../../../redux/slice/authSlice'

const MessageForm = () => {
   const [name,setName] = useState('')
   const [message,setMessage] = useState('')
   const [contact,setContact] = useState('')

   const dispatch = useDispatch()

   const handleMessage = (e)=>{
      e.preventDefault()
      if(!name || !contact || !message){
         return toast.error('Please provide name ,contact and message')
      }
      const msgData = {name,contact,message}
      dispatch(sendWebMessage(msgData))
   }

   const {success,error,loading} = useSelector(state=>state.auth)
   useEffect(()=>{
      if(success){
         toast.success('Message Sent Successfully')
         setName('')
         setContact('')
         setMessage('')
         dispatch(reset())
      }
      if(error){
         toast.error(error)
         dispatch(reset())
      }
   },[success,error,dispatch])
  return (
   <>
      <div className='mform'>
         <h1>Send Us Message</h1>
         <input type="text" placeholder='Enter Your Name' required={true} value={name} onChange={e=>setName(e.target.value)}/>
         <input type="text" placeholder='Enter Your Email' required={true} value={contact} onChange={e=>setContact(e.target.value)} />
         <textarea placeholder='Enter Your Message' required={true} name='message' value={message} onChange={e=>setMessage(e.target.value)} />
         <button className='btn' onClick={handleMessage} disabled={loading}>Send Message</button>
      </div>
   </>
  )
}

export default MessageForm