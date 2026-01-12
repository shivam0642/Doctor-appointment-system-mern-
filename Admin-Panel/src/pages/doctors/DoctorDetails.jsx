import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteDoctor, getDoctorDetails, updateDoctor, updateStatus } from '../../redux/actions/doctorAction'
import InputForm from '../../components/Forms/InputForm'
import InputSelect from '../../components/Forms/InputSelect'
import toast from 'react-hot-toast'

const DoctorDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Redux State
  const { doctor, loading } = useSelector(state => state.doctor)

  // Local UI State
  const [edit, setEdit] = useState(true)

  // Form State
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [about, setAbout] = useState('')
  const [degree, setDegree] = useState('')
  const [specialization, setSpecialization] = useState('')
  const [experience, setExperience] = useState('')
  const [fees, setFees] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [image, setImage] = useState(null)

  // 1. Fetch data on mount
  useEffect(() => {
    dispatch(getDoctorDetails(id))
  }, [dispatch, id])

  // 2. Sync Redux data to local state for editing
  useEffect(() => {
    if (doctor) {
      setName(doctor.name || '')
      setEmail(doctor.email || '')
      setAbout(doctor.about || '')
      setDegree(doctor.degree || '')
      setSpecialization(doctor.specialization || '')
      setExperience(doctor.experience || '')
      setFees(doctor.fees || '')
      setPhone(doctor.phone || '')
      setAddress(doctor.address || '')
      setGender(doctor.gender || '')
    }
  }, [doctor])

  // 3. Update Handler
  const handleUpdate = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('about', about)
    formData.append('degree', degree)
    formData.append('specialization', specialization)
    formData.append('experience', experience)
    formData.append('fees', fees)
    formData.append('phone', phone)
    formData.append('address', address)
    formData.append('gender', gender)
    if (image) formData.append('image', image)

    try {
      await dispatch(updateDoctor({ id, formData })).unwrap()
      toast.success('Doctor Updated Successfully')
      navigate('/all-doctors')
      setEdit(true)
    } catch (err) {
      toast.error(err || 'Failed to update')
    }
  }

  // 4. Delete Handler
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await dispatch(deleteDoctor(id)).unwrap()
        toast.success('Doctor Deleted Successfully')
        navigate('/all-doctors')
      } catch (err) {
        toast.error(err || 'Delete failed')
      }
    }
  }

  if (loading) return <div className="p-5 text-center">Loading...</div>

  // Update Status Handler
  const handleUpdateStatus = async (id,status) => {
    try {

      await dispatch(updateStatus({ id, availableStatus:status })).unwrap();
      toast.success('Availability Status Updated');
    } catch (err) {
      toast.error(err || "Failed to update status");
    }
  };
  return (
    <div className="container-fluid p-4">

      <div className="d-flex justify-content-between align-items-center bg-white p-3 shadow-sm rounded mb-4">
        <button className="btn btn-outline-primary" onClick={() => navigate('/all-doctors')}>
          &larr; Back
        </button>
        <h2 className="mb-0">Doctor Profile</h2>
        <div>
          <button
            className={`btn ${edit ? 'btn-warning' : 'btn-secondary'} me-2`}
            onClick={() => setEdit(!edit)}
          >
            {edit ? 'EDIT' : 'Cancel'}
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      <div className="row">
        {/* Left Side: Form Fields */}
        <div className="col-md-8 bg-white p-4 shadow-sm rounded">
          <InputForm label="Name" value={name} setValue={setName} disabled={edit} />
          <InputForm label="Email" value={email} setValue={setEmail} disabled={edit} />
          <InputForm label="About" value={about} setValue={setAbout} disabled={edit} />
          <InputForm label="Degree" value={degree} setValue={setDegree} disabled={edit} />

          <div className="row">
            <div className="col-md-6">
              <InputSelect
                label="Specialization"
                value={specialization}
                setValue={setSpecialization}
                options={['General', 'Dental', 'Mental', 'Eye', 'Skin']}
                disabled={edit}
              />
            </div>
            <div className="col-md-6">
              <InputSelect
                label="Gender"
                value={gender}
                setValue={setGender}
                options={['Male', 'Female']}
                disabled={edit}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <InputForm label="Experience (Years)" value={experience} setValue={setExperience} disabled={edit} />
            </div>
            <div className="col-md-6">
              <InputForm label="Consultation Fees" value={fees} setValue={setFees} disabled={edit} />
            </div>
          </div>

          <InputForm label="Phone" value={phone} setValue={setPhone} disabled={edit} />
          <InputForm label="Address" value={address} setValue={setAddress} disabled={edit} />

          <div className='d-flex gap-3' style={{ marginBottom: '50px' }}>
            {!edit && (
              <>
                <button className="btn btn-primary btn-lg flex-grow-1" onClick={handleUpdate}>
                  Save All Changes
                </button>

                {/* Logic for Status Toggle */}
                {doctor?.availability ? (
                  <button
                    className='btn btn-danger'
                    onClick={() => handleUpdateStatus(doctor?._id, false)}
                  >
                    Mark As Unavailable
                  </button>
                ) : (
                  <button
                    className='btn btn-success'
                    onClick={() => handleUpdateStatus(doctor?._id, true)}
                  >
                    Mark As Available
                  </button>
                )}
              </>
            )}
          </div>

        </div>

        {/* Right Side: Profile Image Display */}
        <div className="col-md-4 text-center">
          <div className="bg-white p-4 shadow-sm rounded">
            <h5>Profile Picture</h5>
            <img
              src={doctor?.image || 'https://via.placeholder.com/200'}
              alt="doctor"
              className="img-fluid rounded-circle mb-3 border"
              style={{ width: '200px', height: '200px', objectFit: 'cover' }}
            />
            {!edit && (
              <input
                type="file"
                className="form-control"
                onChange={(e) => setImage(e.target.files[0])}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetails
