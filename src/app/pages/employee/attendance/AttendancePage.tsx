import React, {useEffect, useRef, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Skeleton} from 'primereact/skeleton'
import {endpoints, request} from '../../../../utils'
import {useDispatch, useSelector} from 'react-redux'
import {SET_ATT} from '../../../../redux/actions'
import {Button} from 'primereact/button'
import {Menu} from 'primereact/menu'

export default function AttendancePage() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const attendance: any = useSelector((state: any) => state.attendance)
  const dummy = Array.from({length: 10})
  const menu = useRef<any>(null)
  const items = [
    {
      label: 'Detail',
      icon: 'pi pi-external-link',
      command: () => {},
    },
    {
      label: 'Edit',
      icon: 'pi pi-pencil',
      command: () => {},
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => {},
    },
  ]

  useEffect(() => {
    getAttendance()
  }, [])

  const getAttendance = async () => {
    setLoading(true)
    const config = {
      ...endpoints.getAttendanceAll,
    }

    let response: any = null
    try {
      response = await request(null, config)
      console.log(response)
      if (response.status) {
        const {data} = response
        console.log(data)
        dispatch({type: SET_ATT, payload: data})
      }
    } catch (error) {}
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const header = () => {
    return (
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          {/* begin::Search */}
          <div className='d-flex align-items-center position-relative my-1'>
            <KTSVG
              path='/media/icons/duotune/general/gen021.svg'
              className='svg-icon-1 position-absolute ms-6'
            />
            <input
              type='text'
              data-kt-user-table-filter='search'
              className='form-control form-control-solid w-250px ps-14'
              placeholder='Search user'
              value={''}
              // onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* end::Search */}
        </div>
        {/* begin::Card toolbar */}
        <div className='card-toolbar'>
          {/* begin::Group actions */}
          {/* {selected.length > 0 ? <UsersListGrouping /> : <UsersListToolbar />} */}
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            {/* <UsersListFilter /> */}

            {/* begin::Export */}
            <button type='button' className='btn btn-light-primary me-3'>
              <KTSVG path='/media/icons/duotune/arrows/arr078.svg' className='svg-icon-2' />
              Export
            </button>
            {/* end::Export */}

            {/* begin::Add user */}
            <button type='button' className='btn btn-primary'>
              <KTSVG path='/media/icons/duotune/arrows/arr075.svg' className='svg-icon-2' />
              Add User
            </button>
            {/* end::Add user */}
          </div>
          {/* end::Group actions */}
        </div>
        {/* end::Card toolbar */}
      </div>
    )
  }

  const actionBody = (e: any) => {
    return (
      <>
        <Menu model={items} popup ref={menu} id='popup_menu' />
        <Button
          label='Action'
          icon='pi pi-angle-down'
          className='p-button-outlined p-button-plain p-button-sm'
          iconPos='right'
          onClick={(event) => menu.current.toggle(event)}
        />
      </>
    )
  }

  const formatDate = (date: any) => {
    var d = new Date(`${date}Z`),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear(),
      hour = `${d.getHours()}`,
      minute = `${d.getMinutes()}`,
      second = `${d.getSeconds()}`

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day
    if (hour.length < 2) hour = '0' + hour
    if (minute.length < 2) minute = '0' + minute
    if (second.length < 2) second = '0' + second

    return `${[day, month, year].join('-')}   ${[hour, minute, second].join(':')}`
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Attendances</PageTitle>
      <KTCard>
        {header()}
        <KTCardBody>
          <DataTable
            responsiveLayout='scroll'
            value={loading ? dummy : attendance.att.reverse()}
            className='display w-150 datatable-wrapper'
            // showGridlines
            // dataKey='id'
            rowHover

            // header={renderHeader}
            // filters={filters1}
            // globalFilterFields={['code', 'name', 'desc']}
            // emptyMessage='Tidak ada data'
            // paginator
            // paginatorTemplate={template2}
            // first={first2}
            // rows={rows2}
            // onPage={onCustomPage2}
            // paginatorClassName='justify-content-end mt-3'
            // selectionMode='single'
            // onRowSelect={onRowSelect}
          >
            <Column
              header='EMPLOYEE'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: 'auto',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => {
                return loading ? (
                  <Skeleton />
                ) : (
                  <div className='row'>
                    <div className='symbol-group symbol-hover' style={{width: '7rem'}}>
                      <div className='symbol symbol-35px symbol-circle'>
                        <img alt='Pic' src={`${endpoints.image.endpoint}${e.image_in}`} />
                      </div>
                      {e.image_out && (
                        <div className='symbol symbol-35px symbol-circle'>
                          <img alt='Pic' src={`${endpoints.image.endpoint}${e.image_out}`} />
                        </div>
                      )}
                    </div>
                    <div className='col-6'>
                      <div className='text-gray-800 fs-14 font-w700'>{e.uid.username}</div>
                      <div className='text-gray-600'>{e.uid.email}</div>
                    </div>
                  </div>
                )
              }}
            />
            <Column
              header='CHECK IN'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: '20rem',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => (loading ? <Skeleton /> : <div>{formatDate(e.date_checkin)}</div>)}
            />
            <Column
              header='CHECK OUT'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: '20rem',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) =>
                loading ? (
                  <Skeleton />
                ) : (
                  <div>{e.date_checkout ? formatDate(e.date_checkout) : '-'}</div>
                )
              }
            />
            <Column
              header='STATUS'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: 'auto',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) =>
                loading ? (
                  <Skeleton />
                ) : (
                  <div>{e.in_location ? 'In Location' : 'Not In Location'}</div>
                )
              }
            />
            <Column
              header='ACTION'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              // className={"text-right"}
              style={{
                width: '8rem',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => (loading ? <Skeleton /> : actionBody(e))}
            />
          </DataTable>
        </KTCardBody>
      </KTCard>
    </>
  )
}
