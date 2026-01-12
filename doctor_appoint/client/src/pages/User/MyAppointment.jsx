import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getAllAppointments, cancelStatus } from '../../redux/actions/authActions'
import { reset } from '../../redux/slice/authSlice'
import toast from 'react-hot-toast'

const MyAppointment = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Extracting all necessary states from Redux
  const { appointments, loading, success, error } = useSelector(state => state.auth)

  // 1. Initial Fetch
  useEffect(() => {
    const localData = localStorage.getItem("appData")
    if (localData) {
      const appData = JSON.parse(localData)
      const id = appData?.user?._id || appData?._id
      if (id) {
        dispatch(getAllAppointments(id))
      }
    }
  }, [dispatch])

  // 2. Global Success and Error Handling
  useEffect(() => {
    if (success) {
      toast.success("Action completed successfully")
      dispatch(reset()) // Reset to prevent toast from repeating
    }
    if (error) {
      toast.error(error)
      dispatch(reset()) // Reset to clear the error state
    }
  }, [success, error, dispatch])

  const handleCancel = (appId) => {
    if (window.confirm("Are you sure you want to cancel this appointment?")) {
      dispatch(cancelStatus(appId))
    }
  }
  
  useEffect(()=>{
    if(success){
      toast.success("Cancelled Successfully")

      const localData = localStorage.getItem("appData")

      if(localData){
      const appData = JSON.parse(localData)
      const id = appData?.user?._id || appData?._id;
      dispatch(getAllAppointments(id));
      }

      dispatch(reset())
    }

    if(error){
      toast.error(error)
      dispatch(reset())
    }
  },[success,error,dispatch]);
  const handleViewDetails = (id) => {
    navigate(`/user/appointments/${id}`)
  }

  return (
    <div className='container mt-5'>
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <h1>My All Appointments</h1>
        {/* Visual feedback for the user during background syncs */}
        {loading && <div className="spinner-border text-primary spinner-border-sm"></div>}
      </div>

      <div className='table-responsive shadow-sm rounded'>
        <table className='table table-hover align-middle bg-white'>
          <thead className='table-dark'>
            <tr>
              <th>SNo</th>
              <th>Booking Date</th>
              <th>Fees</th>
              <th>Status</th>
              <th className='text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.length > 0 ? (
              appointments.map((a, i) => (
                <tr key={a._id || i}>
                  <td>{i + 1}</td>
                  <td>
                    <span className="fw-bold">{a?.slotDate}</span> <br />
                    <small className="text-muted">{a?.slotTime}</small>
                  </td>
                  <td>₹{a?.amount}</td>
                  <td>
                    <span className={`badge ${a?.status === 'Cancelled' ? 'bg-danger' : 'bg-success'}`}>
                      {a?.status || 'Booked'}
                    </span>
                  </td>
                  <td>
                    <div className='d-flex justify-content-center gap-2'>
                      <button
                        className='btn btn-info btn-sm text-white'
                        onClick={() => handleViewDetails(a._id)}
                      >
                        <i className="fa-solid fa-eye me-1"></i> Details
                      </button>
                      <button
                        className='btn btn-danger btn-sm'
                        disabled={a?.status === 'Cancelled' || loading}
                        onClick={() => handleCancel(a._id)}
                      >
                        {a?.status === 'Cancelled' ? 'Cancelled' : 'Cancel'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              !loading && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-muted">
                    No appointments found in your history.
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyAppointment