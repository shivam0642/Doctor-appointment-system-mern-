import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router'
import DoctorData from './DoctorsData.json'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { setHours,setMinutes } from 'date-fns'

const Appointments = () => {
  const {id} = useParams()
  const [docInfo,setDocInfo] = useState({})
  const [selectedDateTime,setSelectedDateTime] = useState(new Date())

  //Find Doc
  const getDocInfo = async ()=>{
      let docInfo = DoctorData.find((doc) => doc.id == id)
      setDocInfo(docInfo);
  }

  useEffect(()=>{
    getDocInfo();
  },[id]);

  return (
    <>
        <div className='container docinfo-container'>
          <div className='row m-3'>
            <div className='col-md-3 d-flex flex-column justify-content-center align-items-center'>
                <img src = {docInfo?.pic} alt = "DocImage" height = {200} width={200} />
                <h5>{docInfo?.name}</h5>
                <h6 className={`${docInfo?.available ? 'text-success':'text-danger'}`}>{docInfo?.available ? 'Available':'Not Available'}</h6>
            </div>
            <div className='col-md-8 d-flex flex-column justify-content-center m-3'>
               <h6> Experience : {docInfo?.experience} Year's</h6>
               <h6>About Doctor :</h6>
               <p>{docInfo?.about}</p>
               <h5>Consultation Dee : {docInfo?.fee}</h5>
                {/* date-time */}
                <div className='date-time mt-3'>
                <h6 className=''>Select Your Booking Date and Time : 👇</h6>
                  <DatePicker 
                    className='calender'
                    minDate = {new Date()}
                    selected={selectedDateTime}
                    onChange={date=>setSelectedDateTime(date)}
                    showTimeSelect
                    timeFormat = "h.mm aa"
                    timeIntervals={30}
                    dateFormat={'d-MM-yyyy h:mm aa'}
                    timeCaption='Time'
                    minTime={new Date()}
                    maxTime={setHours(setMinutes(new Date(),2),22)}
                  />
                  <p>Your selected Booking:
                  {selectedDateTime?selectedDateTime.toLocaleString():'Please Select A date and Time'}
                  </p>
                </div>
               <button className='btn btn-primary w-50' disabled={!docInfo?.available}>
                 {docInfo?.available?"Book Now":"Doctor Not available"}
               </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default Appointments