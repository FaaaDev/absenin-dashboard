import {Button} from 'primereact/button'
import {Dialog} from 'primereact/dialog'
import React from 'react'

export default function DialogHelper({
  display,
  onConfirm,
  onCancel,
  loading = false,
  footer = false,
  headerTittle,
  primaryButtonLabel,
  secondaryButtonLabel,
  primaryIcon,
  width,
  body,
}: any) {
  const renderFooter = () => {
    return (
      <div>
        <Button
          label={primaryButtonLabel ?? 'Cancel'}
          onClick={() => onCancel()}
          className='p-button-text btn-primary'
        />
        <Button
          label={secondaryButtonLabel ?? 'Submit'}
          icon={primaryIcon ?? 'pi pi-check'}
          onClick={onConfirm}
          autoFocus
          loading={loading}
        />
      </div>
    )
  }

  return (
    <Dialog
      header={`${headerTittle}`}
      visible={display}
      style={{width: `${width ?? 30}vw`}}
      footer={footer ? renderFooter() : <></>}
      onHide={() => {
        onCancel()
      }}
    >
      <div className='mt-6 mb-6 mx-3'>{body}</div>
    </Dialog>
  )
}
