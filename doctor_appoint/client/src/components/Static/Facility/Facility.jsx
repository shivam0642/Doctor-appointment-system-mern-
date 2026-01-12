import React from 'react'
import './Facility.css'
import FacilityData from './FacilityData.json'

const Facility = () => {
  return (
     <>
        <h1 className='facility-heading'>Facilities</h1>
        <div className='facility-container'>
            {FacilityData.map((item, ind) => (
                <div className='card' key={ind}>
                    <i className={`${item.icon} card-img-top`}></i>
                    <div className='card-body'>
                        <h5 className='card-title'>{item.title}</h5>
                    </div>
                </div>
            ))}
        </div>
     </>
  )
}
 
export default Facility