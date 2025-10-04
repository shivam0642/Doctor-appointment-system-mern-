import React from 'react'

const MessageForm = () => {
  return (
   <>
      <div className='mform'>
         <h1>Send Us Message</h1>
         <input type="text" placeholder='Enter Your Name' required={true}/>
         <input type="email" placeholder='Enter Your Email' required={true} />
         <textarea placeholder='Enter Your Message' required={true} name='message' />
         <button className='btn'>Send Message</button>
      </div>
   </>
  )
}

export default MessageForm