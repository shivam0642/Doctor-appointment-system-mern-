import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addDoctor } from '../../redux/actions/doctorAction'
import { reset } from '../../redux/slice/doctorSlice'
import InputForm from '../../components/Forms/InputForm'
import InputSelect from '../../components/Forms/InputSelect'

const AddDoctor = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState(null)
  const [speciality, setSpeciality] = useState('')
  const [experience, setExperience] = useState('')
  const [degree, setDegree] = useState('')
  const [about, setAbout] = useState('')
  const [fees, setFees] = useState('')
  const [address, setAddress] = useState('')
  const [gender, setGender] = useState('')
  const [phone, setPhone] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { loading } = useSelector(state => state.doctor)

  const handleAddDoctor = async () => {
    if (
      !name ||
      !email ||
      !about ||
      !speciality ||
      !fees ||
      !experience ||
      !degree ||
      !address ||
      !phone
    ) {
      return toast.error('Please provide all required fields')
    }

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('about', about)
    formData.append('speciality', speciality)
    formData.append('fees', fees)
    formData.append('experience', experience)
    formData.append('degree', degree)
    formData.append('address', address)
    formData.append('phone', phone)
    formData.append('gender', gender)
    if (image) formData.append('image', image)

    try {
      await dispatch(addDoctor(formData)).unwrap() 
      toast.success('Doctor Added Successfully')
      dispatch(reset())
      navigate('/all-doctors')
    } catch (err) {
      toast.error(err || 'Failed to add doctor')
      dispatch(reset())
    }
  }

  return (
    <>
      <div className="d-flex p-3 justify-content-between bg-light">
        <button
          className="btn btn-primary"
          onClick={() => navigate('/all-doctors')}
        >
          Go Back
        </button>
        <h3>Add Doctor</h3>
      </div>

      <div className="w-75 p-3">
        <InputForm label="Name" value={name} setValue={setName} />
        <InputForm label="Email" value={email} setValue={setEmail} />
        <InputForm label="Degree" value={degree} setValue={setDegree} />

        <InputSelect
          label="Speciality"
          value={speciality}
          setValue={setSpeciality}
          options={['General', 'Dental', 'Mental', 'Eye']}
        />

        <InputSelect
          label="Gender"
          value={gender}
          setValue={setGender}
          options={['Male', 'Female']}
        />

        <InputForm label="Experience" value={experience} setValue={setExperience} />
        <InputForm label="Fees" value={fees} setValue={setFees} />
        <InputForm label="About" value={about} setValue={setAbout} />
        <InputForm label="Phone" value={phone} setValue={setPhone} />
        <InputForm label="Address" value={address} setValue={setAddress} />

        <div className="mb-3">
          <label className="form-label">Select Image</label>
          <input
            type="file"
            accept="image/*"
            className="form-control"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <button
          className="btn btn-primary"
          onClick={handleAddDoctor}
          disabled={loading}
        >
          {loading ? 'Adding Doctor...' : 'Add New Doctor'}
        </button>
      </div>
    </>
  )
}

export default AddDoctor
