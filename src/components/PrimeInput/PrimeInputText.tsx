import {InputText} from 'primereact/inputtext'
import React from 'react'

export default function PrimeInputText({
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
      {<label className='text-label mb-2'>{label}</label>}
      <div className='p-inputgroup'>
        {addOn && <span className='p-inputgroup-addon'>{addOn}</span>}
        <InputText
          value={value}
          onChange={onChange}
          placeholder={placeholder}
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
