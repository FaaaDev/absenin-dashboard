import { InputMask } from 'primereact/inputmask';
import React from 'react'

export default function PrimeInputPhone({
  label,
  value,
  placeholder,
  onChange,
  disabled = false,
  error,
  errorMessage = "This field can't empty",
}: any) {
  return (
    <div>
      {<label className='text-label mb-2 fs-12'>{label}</label>}
      <div className='p-inputgroup'>
        <InputMask
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-describedby='name-error'
          mask='9999 9999 9999'
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
