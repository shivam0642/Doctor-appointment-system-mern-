import React from 'react'

const LocationMap = () => {
  return (
    <>
        <div className='location-map'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2895.415924852722!2d83.39282676758847!3d26.807706806207584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1759386281809!5m2!1sen!2sin" width='100%' height='400' style={{border: 0}} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
    </>
  )
}

export default LocationMap