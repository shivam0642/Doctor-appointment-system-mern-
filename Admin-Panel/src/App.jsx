import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/user/Login";
import Home from "./pages/Home";
import Allusers from "./pages/user/Allusers";
import AllDoctors from "./pages/doctors/AllDoctors";
import DoctorDetails from "./pages/doctors/DoctorDetails";
import AllAppointments from "./pages/appointments/AllAppointments";
import AppointmentDetails from "./pages/appointments/AppointmentDetails";
import Layout from "./components/Layout/Layout";
import UserDetails from "./pages/user/UserDetails";
import AddDoctor from "./pages/doctors/AddDoctor";

function App() {
  return (
    <>
      <Toaster />
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/all-users" element={<Allusers />} />
          <Route path="/user-details/:id" element={<UserDetails />} />
          <Route path="/all-doctors" element={<AllDoctors />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-details/:id" element={<DoctorDetails />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/appointment-details/:id" element={<AppointmentDetails />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
