import React from 'react'
import {Password} from 'primereact/password'

export default function PrimeInputPassword({
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
  error,
  errorMessage = "This field can't empty",
  addOn,
}: any) {
  return (
    <div>
      {<label className='text-label mb-2 fs-12'>{label}</label>}
      <div className='p-inputgroup'>
        <Password
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          toggleMask
          feedback={false}
          aria-describedby='name-error'
          className={error ? 'p-invalid' : ''}
          disabled={disabled}
        />
      </div>

      {error && (
        <small id='name-error' className='p-error block'>
          <i className='bx bxs-error-circle ml-1'></i> {errorMessage}
        </small>
      )}
    </div>
  )
}
