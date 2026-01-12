import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAppointmentDetails, updateAppointmentStatus } from '../../redux/actions/appointmentAction'
import { reset } from '../../redux/slice/appointmentSlice' 
import InputSelect from '../../components/Forms/InputSelect'
import toast from 'react-hot-toast'

const AppointmentDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  
  // Local state for the dropdown menu
  const [status, setStatus] = useState('')

  const { appointment, error, success, loading } = useSelector(state => state.appointments)

  // 1. Initial Fetch: Load appointment details when page loads or ID changes
  useEffect(() => {
    dispatch(getAppointmentDetails(id));
  }, [dispatch, id])

  // 2. Sync Local State: When appointment data is loaded, set the dropdown value
  useEffect(() => {
    // Note: Backend controller uses 'bookingStatus' key
    if (appointment?.bookingStatus) {
      setStatus(appointment.bookingStatus)
    }
  }, [appointment]);

  // 3. Feedback Loop: Handle Toasts and Reset Redux state
  useEffect(() => {
    if (success) {
      toast.success('Status Updated Successfully');
      dispatch(reset()); // Clears success state so toast doesn't repeat
    }
    if (error) {
      toast.error(error);
      dispatch(reset()); // Clears error state
    }
  }, [success, error, dispatch]);

  // 4. Action Handler: Trigger the status update
  const handleUpdateStatus = () => {
    dispatch(updateAppointmentStatus({ id, status }))
  }

  return (
    <>
      <div className="container mt-4">
        <h1>Appointment Details Page</h1>
        
        {loading && <p>Loading appointment info...</p>}
        
        <table className='table table-striped table-hover table-bordered mt-3'>
          <tbody>
            <tr>
              <th>Client Name</th>
              <td>{appointment?.clientName}</td>
            </tr>
            <tr>
              <th>Client Phone</th>
              <td>{appointment?.clientPhone}</td>
            </tr>
            <tr>
              <th>Client Email</th>
              <td>{appointment?.clientEmail}</td>
            </tr>
            <tr>
              <th>Doctor Name</th>
              <td>{appointment?.doctorName}</td>
            </tr>
            <tr>
              <th>Doctor Phone</th>
              <td>{appointment?.doctorPhone}</td>
            </tr>
            <tr>
              <th>Doctor Email</th>
              <td>{appointment?.doctorEmail}</td>
            </tr>
            <tr>
              <th>Booking Date</th>
              <td>{appointment?.bookingDate}</td>
            </tr>
            <tr>
              <th>Booking Amount</th>
              <td>{appointment?.amount}/-</td>
            </tr>
            <tr>
              <th>Booking Status</th>
              <td className='fw-bold text-primary'>
                 {/* FIXED: Using 'bookingStatus' to match your controller */}
                 {appointment?.bookingStatus || "No Status Found"}
              </td>
            </tr>
          </tbody>
        </table>

        <div className='mt-4 w-50 p-3 border rounded bg-light'>
          <h4>Update Booking Status</h4>
          <InputSelect 
              value={status} 
              setValue={setStatus} 
              options={['pending', 'completed', 'Cancel']} 
          />
          <button 
              className='btn btn-primary mt-3 w-100' 
              onClick={handleUpdateStatus}
              disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Status'}
          </button>
        </div>
      </div>
    </>
  )
}

export default AppointmentDetails