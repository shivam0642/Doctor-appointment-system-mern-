import React from 'react'
import Slider from '../components/slider/Slider.jsx'
import Facility from '../components/Static/Facility/Facility'
import ShortIntro from '../components/Static/Facility/ShortIntro/ShortIntro'
import WhyChoose from '../components/Static/Facility/whyChoose/WhyChoose'
import ContactMessage from '../components/Static/ContactMessage/ContactMessage'
import Footer from '../components/Layout/Navbar/Footer/Footer'
import PatientReview from '../components/Static/PatientReview/PatientReview'


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
        {/* Patient Review */}
        <PatientReview />
        {/* Contact Message page */}
        <ContactMessage />
    </>
  )
}

export default Home