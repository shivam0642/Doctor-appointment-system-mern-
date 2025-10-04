import React from 'react'
import './WhyChoose.css'
import image1 from '../../../../assets/images/hospital/Personalized.png'
import image2 from '../../../../assets/images/hospital/Trust.png'
import image3 from '../../../../assets/images/hospital/Wellness.png'

const WhyChoose = () => {
  return (
     <>
        <h1 className='text-center mt-5'>Why Choose Us</h1>
        <div className='row why-container'>
            <div className='col-md-3'>
                <img src={image1} alt="Personalized" width={'200px'} />
                <h2>Personalize Excellence</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at nulla molestie, rhoncus ex id, viverra nisi. Sed sagittis purus dolor, sed maximus nunc lobortis non. Fusce porttitor con.</p>
            </div>

            <div className='col-md-3'>
                <img src={image2} alt="Personalized" width={'200px'} />
                <h2>Trusted Care</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at nulla molestie, rhoncus ex id, viverra nisi. Sed sagittis purus dolor, sed maximus nunc lobortis non. Fusce porttitor con.</p>
            </div>

            <div className='col-md-3'>
                <img src={image3} alt="Personalized" width={'200px'} />
                <h2>Empowering Wellness Journey</h2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at nulla molestie, rhoncus ex id, viverra nisi. Sed sagittis purus dolor, sed maximus nunc lobortis non. Fusce porttitor con.</p>
            </div>
        </div>
     </>
  )
}

export default WhyChoose