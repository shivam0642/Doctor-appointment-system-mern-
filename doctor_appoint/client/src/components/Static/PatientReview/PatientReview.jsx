import React from 'react'
import './PatientReview.css'
import ReviewData from './PatientReview.json'

const PatientReview = () => {
  return (
    <>
        <div className='review-container'>
            <div className='heading-container'>
                <p>Testimonial</p>
                <h1>What our Patient</h1>
                <h1>Says About Us</h1>
            </div>
            {/* Reviews */}
            <div className='row why-container'>
                {ReviewData.map(data=>(
                    <div className='col-md-3 user-container' key={data.id}>
                        <img src={data.pic} alt="userPic" width = {'100px'} />
                        <p>{data.name} <br /> {data.address} </p>
                        <div className='d-flex flex-row'>
                            <h6 className='icon'>
                              <span className='fa-solid fa-star active-star'></span>
                              <span className='fa-solid fa-star active-star'></span>
                              <span className='fa-solid fa-star active-star'></span>
                              <span className='fa-solid fa-star active-star'></span>
                              <span className='fa-solid fa-star-half-stroke active-star'></span>
                            </h6>
                        </div>
                        <h5>
                            {data.CommentTitle}
                        </h5>
                        <p> {data.CommentDescription} </p>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default PatientReview