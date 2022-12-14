import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import React, {useState} from 'react'

export default function DeleteDialog({display, onConfirm, onCancel, loading}: any) {
  const renderFooterDel = () => {
    return (
      <div>
        <Button label='Cancel' onClick={() => onCancel()} className='p-button-text btn-primary' />
        <Button label='Delete' icon='pi pi-trash' onClick={onConfirm} autoFocus loading={loading} />
      </div>
    )
  }
  return (
    <Dialog
      header={'Delete Data'}
      visible={display}
      style={{width: '30vw'}}
      footer={renderFooterDel()}
      onHide={() => {
        onCancel()
      }}
    >
      <div className='mt-6 mb-6'>
        <i className='pi pi-exclamation-triangle mr-3 align-middle' style={{fontSize: '2rem'}} />
        <span>Do you want to delete this data ?</span>
      </div>
    </Dialog>
  )
}
