import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/actions/authActions";
import { getStats } from "../redux/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserData());
    dispatch(getStats())
  }, [dispatch]);

  const { user } = useSelector((state) => state.auth);
  const { stats } = useSelector((state) => state.user);

  return (
    <>
    <div className="d-flex flex-column m-3 border bg-light rounded-3 text-center">
      <h1 className="pt-3">DASHBOARD</h1>
      <p>Doctor Appointment App</p>
      <p className="text-success">
        Welcome {user?.name} || Email: {user?.email}
      </p>
    </div>
    <div className="d-flex flex-wrap">
       <div className="card m-3 bg-success text-white w-50">
         <div className="card-body d-flex flex-column align-items-center p-4">
            <h1>{stats?.totalUsers}</h1>
            <h1>Total Users</h1>
         </div>
       </div>
       <div className="card m-3 bg-warning text-white w-50">
         <div className="card-body d-flex flex-column align-items-center p-4">
            <h1>{stats?.totalDoctors}</h1>
            <h1>Total Doctors</h1>
         </div>
       </div>
       <div className="card m-3 bg-info text-white w-50">
         <div className="card-body d-flex flex-column align-items-center p-4">
            <h1>{stats?.totalEarning}</h1>
            <h1>Total Earning</h1>
         </div>
       </div>
    </div>
    </>
  );
};

export default Home;
