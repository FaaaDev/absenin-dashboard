import React, {useEffect, useRef, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {DataTable} from 'primereact/datatable'
import {Column} from 'primereact/column'
import {Skeleton} from 'primereact/skeleton'
import {endpoints, request} from '../../../../utils'
import {useDispatch, useSelector} from 'react-redux'
import {SET_ATT, SET_DETAIL_ATT} from '../../../../redux/actions'
import {Button} from 'primereact/button'
import {Menu} from 'primereact/menu'
import {Dialog} from 'primereact/dialog'
import {Timeline} from 'primereact/timeline'
import {Link} from 'react-router-dom'
import {FilterMatchMode} from 'primereact/api'
import { Dropdown } from "primereact/dropdown";
import { InputText } from 'primereact/inputtext'

export default function AttendancePage() {
  const [loading, setLoading] = useState(false)
  const [loadingDetail, setLoadingDetail] = useState(false)
  const [globalFilter, setGlobalFilter] = useState('')
  const [detailLocation, setDetailLocation]: any = useState(null)
  const [displayDetail, setDisplayDetail] = useState(false)
  const [filters, setFilters]: any = useState(null)
  const [first2, setFirst2] = useState(0);
  const [rows2, setRows2] = useState(20);
  const dispatch = useDispatch()
  const attendance: any = useSelector((state: any) => state.attendance)
  const dummy = Array.from({length: 10})
  const menu = useRef<any>(null)


  useEffect(() => {
    getAttendance()
    initFilter()
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

  const getAttendanceDetail = async (id: any) => {
    setLoadingDetail(true)
    console.log(id)

    const config = {
      ...endpoints.getAttendanceDetail,
      endpoint: endpoints.getAttendanceDetail.endpoint + id,
    }

    let response: any = null
    try {
      response = await request(null, config)
      console.log(response)
      if (response.status) {
        const {data} = response
        setDetailLocation({...data.location_in, image: data.image_in})
        dispatch({type: SET_DETAIL_ATT, payload: data})
      }
    } catch (error) {}
    setTimeout(() => {
      setLoadingDetail(false)
    }, 500)
  }

  const onGlobalFilterChange = (e: any) => {
    const value = e.target.value
    let _filters1 = {...filters}
    _filters1['global'].value = value

    setFilters(_filters1)
    setGlobalFilter(value)
  }

  const initFilter = () => {
    setFilters({
      global: {value: null, matchMode: FilterMatchMode.CONTAINS},
    })
  }

  const header = () => {
    return (
      <div className='card-header border-0 mt-5'>
        <div className='card-title'>
          <span className='p-input-icon-left'>
            <i className='pi pi-search' />
            <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder='Search Attendance' />
          </span>
        </div>
      </div>
    )
  }

  const actionBody = (data: any) => {
    return (
      <>
        <Menu
          model={[
            {
              label: 'Detail',
              icon: 'pi pi-external-link',
              command: () => {
                setDisplayDetail(true)
              },
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
          ]}
          popup
          ref={menu}
          id='popup_menu'
        />
        <Button
          label={'Action'}
          icon='pi pi-angle-down'
          className='p-button-outlined p-button-plain p-button-sm'
          iconPos='right'
          onClick={(event) => {
            getAttendanceDetail(data.id)
            menu.current.toggle(event)
          }}
        />
      </>
    )
  }

  const template2 = {
    layout: "RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink",
    RowsPerPageDropdown: (options:any) => {
      const dropdownOptions = [
        { label: 20, value: 20 },
        { label: 50, value: 50 },
        { label: "Semua", value: options.totalRecords },
      ];

      return (
        <React.Fragment>
          <span
            className="mx-1"
            style={{ color: "var(--text-color)", userSelect: "none" }}
          >
            Data per halaman:{" "}
          </span>
          <Dropdown
            value={options.value}
            options={dropdownOptions}
            onChange={options.onChange}
          />
        </React.Fragment>
      );
    },
    CurrentPageReport: (options:any) => {
      return (
        <span
          style={{
            color: "var(--text-color)",
            userSelect: "none",
            width: "120px",
            textAlign: "center",
          }}
        >
          {options.first} - {options.last} dari {options.totalRecords}
        </span>
      );
    },
  };

  const onCustomPage2 = (event:any) => {
    setFirst2(event.first);
    setRows2(event.rows);
  };

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

    return `${[day, month, year].join('-')} | ${[hour, minute, second].join(':')}`
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Attendances</PageTitle>
      <KTCard>
        {header()}
        <KTCardBody>
          <DataTable
            responsiveLayout='scroll'
            value={loading ? dummy : attendance.att}
            className='display w-150 datatable-wrapper'
            rowHover
            filters={filters}
            globalFilterFields={['uid.username', 'uid.email']}
            paginator={attendance?.att?.length > rows2/2}
            paginatorTemplate={template2}
            first={first2}
            rows={rows2}
            onPage={onCustomPage2}
            paginatorClassName='justify-content-end mt-3'
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
                  <div>
                    {e.in_location ? (
                      <span className='badge badge-light-info'>In Location</span>
                    ) : (
                      <span className='badge badge-light-danger'>Not in Location</span>
                    )}
                  </div>
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
              body={(e) => {
                return loading ? <Skeleton /> : actionBody(e)
              }}
            />
          </DataTable>
        </KTCardBody>
      </KTCard>
      <Dialog
        header={'Attendance Detail'}
        visible={displayDetail}
        style={{width: '40vw'}}
        footer={() => <></>}
        onHide={() => {
          setDisplayDetail(false)
        }}
      >
        <div className='row ml-0 mt-3'>
          <div className='col-4'>
            <Timeline
              value={[
                {
                  label: 'Checkin',
                  time: attendance?.current?.date_checkin
                    ? formatDate(attendance?.current?.date_checkin)
                    : '-',
                  action: () => {
                    setDetailLocation({
                      ...attendance?.current?.location_in,
                      image: attendance?.current?.image_in,
                    })
                  },
                },
                {
                  label: 'Breakout',
                  time: attendance?.current?.break_out
                    ? formatDate(attendance?.current?.break_out)
                    : '-',
                  action: () => {
                    setDetailLocation({
                      ...attendance?.current?.break_location_out,
                      image: attendance?.current?.break_image_out,
                    })
                  },
                },
                {
                  label: 'Breakin',
                  time: attendance?.current?.break_in
                    ? formatDate(attendance?.current?.break_in)
                    : '-',
                  action: () => {
                    setDetailLocation({
                      ...attendance?.current?.break_location_in,
                      image: attendance?.current?.break_image_in,
                    })
                  },
                },
                {
                  label: 'Checkout',
                  time: attendance?.current?.date_checkout
                    ? formatDate(attendance?.current?.date_checkout)
                    : '-',
                  action: () => {
                    setDetailLocation({
                      ...attendance?.current?.location_out,
                      image: attendance?.current?.image_out,
                    })
                  },
                },
              ]}
              content={(item: any) => {
                return (
                  <>
                    {item.time !== '-' ? (
                      <Link
                        to={''}
                        onClick={() => {
                          item.action()
                        }}
                      >
                        <div className='text-gray-800 fs-14 font-w700'>{item.label}</div>
                      </Link>
                    ) : (
                      <div className='text-gray-800 fs-14 font-w700'>{item.label}</div>
                    )}
                    <div className='text-gray-600'>{item.time}</div>
                  </>
                )
              }}
            />
          </div>
          <div className='col-8'>
            <div className='row'>
              <div className='row align-items-center'>
                <div style={{width: '120px'}}>
                  <div
                    className='symbol symbol-100px'
                    style={{borderStyle: 'dashed', borderColor: '#eff2f5'}}
                  >
                    <img alt='Pic' src={`${endpoints.image.endpoint}${detailLocation?.image}`} />
                  </div>
                </div>

                <div className='col-6'>
                  <div className='text-gray-800 fs-14 font-w700'>
                    {attendance?.current?.uid.username}
                  </div>
                  <div className='text-gray-600'>{attendance?.current?.uid.email}</div>
                  <div className='mt-3'>
                    {detailLocation?.in_location ? (
                      <span className='badge badge-light-info'>In Location</span>
                    ) : (
                      <span className='badge badge-light-danger'>Not in Location</span>
                    )}
                  </div>
                </div>
              </div>
              <div className='col-6 mt-6'>
                <div className='text-gray-800 fs-14 font-w700'>Location</div>
                <div className='text-gray-600'>{detailLocation?.address ?? ''}</div>
              </div>
              <div className='col-6 mt-6'>
                <div className='text-gray-800 fs-14 font-w700'>Distance</div>
                <div className='text-gray-600'>
                  {detailLocation?.distance.toFixed(2) ?? ''} Km from Location
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  )
}
