import React from 'react'
import ContactMessage from '../components/Static/ContactMessage/ContactMessage'

const Contact = () => {
  return (
    <>
       <div className='d-flex mt-5 justify-content-center'>
         <h6><i className="fa-solid fa-phone ms-3"></i>Emergency Call :983465264</h6>
         <h6><i className="fa-solid fa-clock ms-3"></i>10:00am TO 10:00pm</h6>
         <h6><i className="fa-solid fa-envelope ms-3"></i>help@test.ac.in</h6>
       </div> 
       <ContactMessage />
    </>
  )
}

export default Contact