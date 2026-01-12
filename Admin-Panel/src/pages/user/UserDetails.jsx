import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails } from '../../redux/actions/userAction';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{ 
        dispatch(getUserDetails(id))
    },[dispatch,id])

    const {user,appointments} = useSelector((state)=>state.user)
  return (
    <>
       <div className='row d-flex align-items-center bg-light mt-2 p-3'>
       <h3 className='text-center'>User Details</h3>
          <div className='col-md-4'>
             <img src={`data:image/jpeg;base64,${user?.image}`} alt="user pic" height={200} width={200} className='rounded-1 bg-info'/>
          </div>
          <div className='col-md-8'>
             <h4>Name: {user?.name}</h4>
                <h4>Email: {user?.email}</h4>
                <h4>Phone: {user?.phone || 'NA'}</h4>
                <h4>Address: {user?.address || 'NA'}</h4>
          </div>
       </div>
       <h2>All Appointments</h2>
       <div className='table-responsive mt-2'>
        <table className='table table-bordered table-striped text-center'>
          <thead>
             <th>SN</th>
             <th>Date</th>
             <th>DOCTOR ID</th>
             <th>FEE</th>
             <th>STATUS</th>
             <th>PAYMENT</th>
          </thead>
          <tbody>
             {appointments?.map((a,i)=>
                <tr key={i+1}>
                  <td>{i+1}</td>
                  <td>{a?.slotDate}</td> 
                  <td>{a?.doctorId}</td> 
                  <td>{a?.amount}</td> 
                  <td>{a?.status}</td> 
                  <td>{a?.payment ? 'ONLINE' : 'CASH'}</td>  
                </tr>
             )}
          </tbody>
        </table>  
       </div>
    </>
  )
}

export default UserDetails
