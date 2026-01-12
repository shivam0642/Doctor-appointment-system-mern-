import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { getAllDoctors } from '../../redux/actions/doctorAction';
import { reset } from '../../redux/slice/doctorSlice';

const AllDoctors = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(()=>{
     dispatch(getAllDoctors());
     dispatch(reset());
  },[dispatch]);


  const {doctors} = useSelector(state=>state.doctor)

  return (
    <>
        <div className='d-flex p-3 justify-content-between bg-light'>
           <h3>All Doctors List</h3>
           <button className='btn btn-primary' onClick={()=>navigate('/add-doctor')}>ADD DOCTOR</button>
        </div>
        <div>
           <table className='table'>
             <thead>
               <tr> 
                <th>SN</th>
                <th>Image</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Fees</th>
                <th>Availablity</th>
                <th>Details</th>
               </tr>
             </thead>
             <tbody>
                {doctors?.map((d,i)=>(
                   <tr key={i+1}>
                      <td>{i+1}</td>
                      <td>
                        <img src={`data:image/jpeg:base64,${d?.image}`} alt={`DocImage`} className='bg-info' width="50" height="50" style={{borderRadius:"50%"}} />
                      </td>
                      <td>{d?.name}</td>
                      <td>{d?.specialization}</td>
                      <td>{d?.fees}</td>
                      <td>{d?.availability ? "Available" : "Not Available"}</td>
                      <td>
                        <Link to={`/doctor-details/${d._id}`}>
                          <button className='btn btn-info btn-sm'>View Details</button>
                        </Link>
                      </td>
                   </tr>
                ))}
             </tbody>
           </table>
        </div>
    </>
  )
}

export default AllDoctors
