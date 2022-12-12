import {Button} from 'primereact/button'
import {Menu} from 'primereact/menu'
import React, {useRef} from 'react'

export default function PrimeActionHeader({
  label,
  icon,
  otherAction = false,
  importAction,
  exportAction,
  onClick,
}: any) {
  const action = useRef<any>(null)
  return (
    <>
      <Button
        label={label}
        icon={icon}
        className={`p-button-sm${otherAction ? ' mr-3' : ''}`}
        onClick={onClick}
      />
      {otherAction && (
        <>
          <Menu
            model={[
              {
                label: 'Import',
                icon: 'pi pi-file-import',
                command: () => {},
              },
              {
                label: 'Export',
                icon: 'pi pi-file-export',
                command: () => {},
              },
            ]}
            popup
            ref={action}
            id='popup_menu'
          />
          <Button
            label={''}
            icon='pi pi-ellipsis-v'
            className='p-button-outlined p-button-plain p-button-sm'
            iconPos='right'
            onClick={(event) => {
              action.current.toggle(event)
            }}
          />
        </>
      )}
    </>
  )
}
