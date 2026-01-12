import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router' 
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { setHours, setMinutes } from 'date-fns'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctorDetails } from '../../redux/actions/doctorAction'
import { bookAppointment } from '../../redux/actions/authActions'
import toast from 'react-hot-toast'
import { reset } from '../../redux/slice/authSlice'

const Appointments = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [docInfo,setDocInfo] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date())
  const navigate = useNavigate()


  useEffect(() => {
    dispatch(getDoctorDetails(id))
  }, [dispatch, id])


  const { doctor, loading } = useSelector(state => state.doctor)

  useEffect(()=>{
    if(doctor){
      setDocInfo(doctor)
    }
  },[doctor])

   //Get Date And time
   const extractDate = (dateObj) =>{
      const day = String(dateObj.getDate()).padStart(2,'0')
      const month = String(dateObj.getMonth()+1).padStart(2,'0')
      const year = dateObj.getFullYear()
      return `${day}-${month}-${year}`
   }

   const extractTime = (ObjectTime)=>{
      let hours = ObjectTime.getHours()
      const minute = ObjectTime.getMinutes()
      const second = ObjectTime.getSeconds()
      const ampm = hours >= 12?"PM":"AM"
      hours = hours %12
      hours = hours ? hours :12;
      return `${String(hours).padStart(2,"0")} : ${String(minute).padStart(2,"0")}:${String(second).padStart(2,"0")} ${ampm}`
   }
  const {success,error,user} = useSelector(state=>state.auth)
  const handleBooking = ()=>{
    const bookingData = {userId:user?._id,
      doctorId:id,
      amount:docInfo?.fees,
      slotDate:extractDate(selectedDateTime),
      slotTime:extractTime(selectedDateTime)
    }
    dispatch(bookAppointment(bookingData))
  }

  useEffect(()=>{
     if(success){
      toast.success('Booking Successfull')
      navigate('/user/appointments')
      dispatch(reset())
    }
    if(error){
       toast.error(error)
       dispatch(reset())
    }
  },[success,error,dispatch,navigate])

  return (
    <div className='container docinfo-container mt-5'>
      {loading ? (
        <h2 className="text-center">Loading Doctor Details...</h2>
      ) : (
        <div className='row m-3 shadow-sm p-4 bg-white rounded'>
          <div className='col-md-4 d-flex flex-column align-items-center border-end'>

            <img 
                src={doctor?.image || 'https://via.placeholder.com/200'} 
                alt="DocImage" 
                className="img-fluid rounded mb-3"
                style={{ height: '250px', width: '250px', objectFit: 'cover' }} 
            />
            <h5>Dr. {doctor?.name}</h5>
            <h6 className={`${doctor?.availability ? 'text-success' : 'text-danger'}`}>
                {doctor?.availability ? '● Available' : '● Not Available'}
            </h6>
          </div>

          <div className='col-md-8 ps-md-5'>
            <div className='d-flex justify-content-between align-items-start'>
                <div>
                    <h6 className="text-muted text-uppercase mb-1">Experience</h6>
                    <p className="fw-bold">{doctor?.experience} Years</p>
                </div>
                <div>
                    <h6 className="text-muted text-uppercase mb-1">Consultation Fee</h6>
                    <p className="fw-bold text-success">₹ {doctor?.fees || doctor?.amount}</p>
                </div>
            </div>

            <h6 className="mt-3">About Doctor:</h6>
            <p className="text-secondary">{doctor?.about || "No description available."}</p>

            <div className='date-time mt-4 p-3 bg-light rounded'>
              <h6>Select Your Booking Date and Time: 👇</h6>
              <DatePicker 
                className='form-control calender mb-2'
                minDate={new Date()}
                selected={selectedDateTime}
                onChange={date => setSelectedDateTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                dateFormat={'d-MM-yyyy h:mm aa'}
                timeCaption='Time'
                minTime={setHours(setMinutes(new Date(), 0), 9)} // Start 9:00 AM
                maxTime={setHours(setMinutes(new Date(), 0), 21)} // End 9:00 PM
              />
              <p className="small text-muted mt-2">
                Selected: <strong>{selectedDateTime ? selectedDateTime.toLocaleString() : 'None'}</strong>
              </p>
            </div>

            <button 
                className='btn btn-primary w-100 mt-4 py-2' 
                disabled={!doctor?.availability}
                onClick={handleBooking}
            >
              {doctor?.availability ? "Book Appointment Now" : "Doctor Currently Unavailable"}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Appointments