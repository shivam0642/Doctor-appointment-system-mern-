import React from 'react'
import './ShortIntro.css'
import imgHos from '../../../../assets/images/hospital/building.jpg'

const ShortIntro = () => {
    return (
        <>
            <div className='intro-container'>
                <div className='row'>
                    <div className='col-md-6 img-container'>
                        <img src={imgHos} alt="hoapital image" className='hos-img' />
                    </div>
                    <div className='col-md-5 info-container'>
                        <h1>City Hospital</h1>
                        <h6>A Super Speciality Hospital</h6>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris at nulla molestie, rhoncus ex id, viverra nisi.</p>
                        <p> Sed sagittis purus dolor, sed maximus nunc lobortis non. Fusce porttitor condimentum eros, vel porttitor lorem molestie tristique. Mauris aliquam orci nec nisi dignissim efficitur. Donec eu bibendum nunc, sed interdum libero. Mauris.</p>
                        <button className='btn btn-primary'>Book a appointment now</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShortIntro