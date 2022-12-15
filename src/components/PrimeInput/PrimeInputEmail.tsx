import {InputText} from 'primereact/inputtext'
import React, {useState} from 'react'

export default function PrimeInputEmail({
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
  error,
  errorMessage = "This field can't empty",
  addOn,
}: any) {
  const [email, setEmail] = useState<any>(null)
  const validateEmail = (email: any) => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return true
    }
    return false
  }

  return (
    <div>
      {<label className='text-label mb-2 fs-12'>{label}</label>}
      <div className='p-inputgroup'>
        {addOn && <span className='p-inputgroup-addon'>{addOn}</span>}
        <InputText
          value={value}
          onChange={(e: any) => {
            onChange(e)
            setEmail(e.target.value)
          }}
          placeholder={placeholder}
          aria-describedby='name-error'
          className={error ? 'p-invalid' : ''}
          disabled={disabled}
        />
      </div>

      {error && (
        <small id='name-error' className='p-error block'>
          <i className='bx bxs-error-circle ml-1'></i> {`${errorMessage}`}
        </small>
      )}
      {!error && email && !validateEmail(email) && (
        <small id='name-error' className='p-error block'>
          <i className='bx bxs-error-circle ml-1'></i> Email is not valid
        </small>
      )}
    </div>
  )
}
