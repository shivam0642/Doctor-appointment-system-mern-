import React from 'react'
import Slider from '../components/slider/slider'
import Facility from '../components/Static/Facility/Facility'
import ShortIntro from '../components/Static/Facility/ShortIntro/ShortIntro'
import WhyChoose from '../components/Static/Facility/whyChoose/WhyChoose'


const Home = () => {
  return (
    <>
       {/* For Slider */}
        <Slider />
        {/* For Facility */}
        <Facility />
        {/* short intro */}
        <ShortIntro />
        {/* Why Choose Us */}
        <WhyChoose />
    </>
  )
}

export default Home