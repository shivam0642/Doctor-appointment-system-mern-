import React from 'react'


const InputForm = ({ label, inputType, value, setValue, disabled }) => {
  return (
    <div className='mb-3'>
      <label className='form-label'>{label}</label>
      <input 
        type={inputType || 'text'} 
        value={value} 
        onChange={e => setValue(e.target.value)} 
        className='form-control' 
        disabled={disabled} 
      />
    </div>
  )
}

export default InputForm