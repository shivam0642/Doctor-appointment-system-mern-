import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentDetails } from '../../redux/actions/authActions';
import { reset } from '../../redux/slice/authSlice';
import toast from 'react-hot-toast';

const AppointmentDetails = () => {
    const { id } = useParams(); // This is the ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get appointmentDetails from your auth slice
    const { appointmentDetails, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (id) {
            dispatch(getAppointmentDetails(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(reset());
        }
    }, [error, dispatch]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
                <div className="spinner-border text-primary" role="status"></div>
            </div>
        );
    }

    // Helper for Status Badge Color
    const getStatusBadge = (status) => {
        switch (status?.toLowerCase()) {
            case 'pending': return 'bg-warning text-dark';
            case 'completed': return 'bg-success';
            case 'cancelled': return 'bg-danger';
            default: return 'bg-secondary';
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    {/* Header with Back Button */}
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <button className="btn btn-outline-dark btn-sm" onClick={() => navigate(-1)}>
                            <i className="fa-solid fa-arrow-left me-2"></i> Back to Appointments
                        </button>
                        <h3 className="fw-bold mb-0">Booking Details</h3>
                    </div>

                    <div className="card shadow-lg border-0 overflow-hidden" style={{ borderRadius: '15px' }}>
                        <div className="card-header bg-primary text-white p-4">
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <p className="small text-uppercase mb-1 opacity-75">Appointment ID</p>
                                    <h5 className="mb-0">#{id?.slice(-8).toUpperCase()}</h5>
                                </div>
                                <div className="text-end">
                                    <span className={`badge p-2 px-3 ${getStatusBadge(appointmentDetails?.bookingStatus)}`}>
                                        {appointmentDetails?.bookingStatus?.toUpperCase() || 'UNKNOWN'}
                                    </span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="card-body p-4 p-lg-5">
                            <div className="row g-4">
                                {/* Doctor Information Section */}
                                <div className="col-md-6 border-end">
                                    <h5 className="fw-bold mb-4 text-primary">
                                        <i className="fa-solid fa-user-md me-2"></i>Doctor Info
                                    </h5>
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Doctor Name</label>
                                        <span className="fw-bold h6">Dr. {appointmentDetails?.doctorName || 'N/A'}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Phone Number</label>
                                        <span className="fw-semibold">{appointmentDetails?.doctorPhone || 'N/A'}</span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="text-muted small d-block">Email Address</label>
                                        <span className="fw-semibold">{appointmentDetails?.doctorEmail || 'N/A'}</span>
                                    </div>
                                </div>

                                {/* Appointment Schedule Section */}
                                <div className="col-md-6 ps-md-4">
                                    <h5 className="fw-bold mb-4 text-primary">
                                        <i className="fa-solid fa-calendar-check me-2"></i>Schedule
                                    </h5>
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Appointment Date</label>
                                        <span className="fw-bold h6">{appointmentDetails?.bookingDate || 'N/A'}</span>
                                    </div>
                                    <div className="mb-3">
                                        <label className="text-muted small d-block">Time Slot</label>
                                        <span className="fw-bold h6">{appointmentDetails?.bookingTime || 'N/A'}</span>
                                    </div>
                                    <div className="mb-0">
                                        <label className="text-muted small d-block">Payment Status</label>
                                        <span className={appointmentDetails?.paymentMode ? 'text-success fw-bold' : 'text-danger fw-bold'}>
                                            {appointmentDetails?.paymentMode ? 'Paid Online' : 'Payment Pending'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <hr className="my-5" />

                            {/* Billing Summary Section */}
                            <div className="bg-light p-4 rounded-3">
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <h5 className="mb-0 fw-bold">Total Consultation Fee</h5>
                                        <p className="small text-muted mb-0">Including all service charges</p>
                                    </div>
                                    <h2 className="mb-0 text-success fw-bold">₹{appointmentDetails?.amount || '0'}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="card-footer bg-white p-3 border-top-0 text-center">
                            <small className="text-muted">
                                Registered on: {appointmentDetails?.createdAt ? new Date(appointmentDetails.createdAt).toLocaleString() : 'N/A'}
                            </small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppointmentDetails;