import { Dropdown } from 'primereact/dropdown'
import React from 'react'

export default function PrimeDropdown({
  label,
  value,
  options,
  onChange = () => {},
  optionLabel,
  filter = false,
  filterBy,
  placeholder,
  error,
  errorMessage,
  disabled = false,
  valueTemplate,
  itemTemplate,
  showClear,
  hidden,
}: any) {

    const valTemp = (option:any, props:any) => {
        if (option) {
          return (
            <div>
              {option !== null ? valueTemplate(option) : ""}
            </div>
          );
        }
    
        return <span>{props?.placeholder ?? ""}</span>;
      };

  return (
    <div>
      {label && <label className='text-label mb-2 fs-12'>{label}</label>}
      <div className='p-inputgroup'>
        <Dropdown
          value={value}
          options={options}
          onChange={(e) => onChange(e)}
          optionLabel={optionLabel}
          filter={filter}
          filterBy={filterBy}
          placeholder={placeholder}
          disabled={disabled}
          itemTemplate={itemTemplate}
          valueTemplate={itemTemplate ? valTemp : null}
          showClear={showClear}
          hidden={hidden}
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
