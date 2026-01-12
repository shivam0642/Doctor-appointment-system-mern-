import React from 'react'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Autoplay , Pagination,Navigation} from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
//images
import Banner1 from '../../assets/images/banner1.jpg'
import Banner2 from '../../assets/images/banner2.jpg'
import Banner3 from '../../assets/images/banner3.jpg'   
import Banner4 from '../../assets/images/banner4.jpg'

const Slider = () => {
    const images  = [Banner1, Banner2, Banner3, Banner4]
  return (
     <>
        <Swiper modules={[Autoplay,Navigation,Pagination]}
         spaceBetween={10}
          slidesPerView={1}
          navigation={true}
        pagination={{ clickable: true }}
         autoplay={{delay:3000, disableOnInteraction:false}} loop={true}
          style={{width:'100vw', height:'550px'}}>
             {images.map((img,ind)=>(
          <SwiperSlide key={ind}>
            <img src = {img} alt='bannerImages'  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition:'center top' }}/>
          </SwiperSlide>
        ))}
      </Swiper>
     </>
  )
}

export default Slider