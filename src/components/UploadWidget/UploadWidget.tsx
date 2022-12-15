import React from 'react'
import {Tooltip} from 'primereact/tooltip'
import {Card} from 'react-bootstrap'

export default function UploadWidget({label, size, picker, file, src, onFileSelected}: any) {
  return (
    <div className='row mr-0 ml-0 px-0'>
      <div className='col-12'>
        <label className='text-label mb-2 fs-12'>{label}</label>
        <Tooltip target='.upload' mouseTrack mouseTrackLeft={10} />
        <input
          type='file'
          id='file'
          ref={picker}
          accept='image/*'
          style={{display: 'none'}}
          onChange={(e) => {
            onFileSelected(e)
          }}
        />
        <div>
          <Card
            className='upload'
            data-pr-tooltip='Klik untuk memilih foto'
            style={{
              cursor: 'pointer',
              height: `${size ?? 200}px`,
              width: `${size ?? 200}px`,
              //   background: 'var(--input-bg)',
              border: '1px solid #8d8d8d50',
            }}
            onClick={() => {
              picker.current.click()
            }}
          >
            <Card.Body className='flex align-items-center justify-content-center p-0'>
              {file ? (
                <img
                  style={{maxWidth: `${size - 2 ?? 198}px`, borderRadius: '0.5rem'}}
                  src={URL.createObjectURL(file)}
                  alt=''
                />
              ) : src && src !== '' ? (
                <img
                  style={{maxWidth: `${size - 2 ?? 198}px`, borderRadius: '0.5rem'}}
                  src={src}
                  alt=''
                />
              ) : (
                <i
                  className='pi pi-image p-3'
                  style={{
                    fontSize: '3em',
                    borderRadius: '50%',
                    backgroundColor: 'var(--surface-b)',
                    color: 'var(--surface-d)',
                  }}
                ></i>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}
