import React, { useEffect } from 'react'
import Layout from '../../components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers } from '../../redux/actions/userAction';
import { Link } from 'react-router-dom';

const Allusers = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
     dispatch(getAllUsers())

  },[dispatch])

  
  const {users} = useSelector((state)=>state.user)

  useEffect(()=>{
    console.log(users);
  },[users])

  return (
   <>
     <h4 className='text-center my-3'>All Users</h4>
     <table className='table mt-3'>
       <thead>
         <tr>
        <th>SN</th>
        <th>NAME</th>
        <th>EMAIL</th>
        <th>PHONE</th>
        <th>DETAILS</th>
        </tr> 
       </thead>
       <tbody>
          {users && users.map((user,i)=>{
            return(
              <tr key={i+1}>
               <td>{i+1}</td>
               <td>{user?.name}</td>
               <td>{user?.email}</td>
               <td>{user?.phone || 'NA'}</td>
               <td>
                 <Link to={`/user-details/${user?._id}`}>
                    MORE DETAILS
                 </Link> 
               </td>
            </tr>
            )  
          })}
       </tbody>
     </table>
   </>
  )
}

export default Allusers
