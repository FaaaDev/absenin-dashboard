import React, {useEffect, useRef, useState} from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {DataTable} from 'primereact/datatable'
import {FilterMatchMode} from 'primereact/api'
import {Menu} from 'primereact/menu'
import {Button} from 'primereact/button'
import {Dropdown} from 'primereact/dropdown'
import {Column} from 'primereact/column'
import {Skeleton} from 'primereact/skeleton'
import {endpoints, request} from '../../../../utils'
import {useDispatch, useSelector} from 'react-redux'
import {SET_DETAIL_EMP, SET_EMP, SET_SHIFT} from '../../../../redux/actions'
import {InputText} from 'primereact/inputtext'
import PrimeActionHeader from '../../../../components/PrimeActionHeader/PrimeActionHeader'
import DialogHelper from '../../../../components/DialogHelper/DialogHelper'
import PrimeInputText from '../../../../components/PrimeInput/PrimeInputText'
import {InputSwitch} from 'primereact/inputswitch'
import UploadWidget from '../../../../components/UploadWidget/UploadWidget'
import PrimeDropdown from '../../../../components/PrimeDropdown/PrimeDropdown'
import PrimeInputEmail from '../../../../components/PrimeInput/PrimeInputEmail'
import PrimeInputPassword from '../../../../components/PrimeInput/PrimeInputPassword'
import PrimeCalendar from '../../../../components/PrimeCalendar/PrimeCalendar'
import PrimeInputPhone from '../../../../components/PrimeInput/PrimeInputPhone'

export default function EmployeePage() {
  const [filters, setFilters]: any = useState(null)
  const [first2, setFirst2] = useState(0)
  const [rows2, setRows2] = useState(20)
  const menu = useRef<any>(null)
  const picker = useRef<any>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [displayAdd, setDisplayAdd] = useState(false)
  const dispatch = useDispatch()
  const dummy = Array.from({length: 10})
  const employee: any = useSelector((state: any) => state.employee)
  const shift: any = useSelector((state: any) => state.shift)
  const [file, setFile]: any = useState(null)

  useEffect(() => {
    getEmployee()
    initFilter()
  }, [])

  const getEmployee = async () => {
    setLoading(true)
    const config = {
      ...endpoints.getUser,
    }

    let response: any = null
    try {
      response = await request(null, config)
      console.log(response)
      if (response.status) {
        const {data} = response
        console.log(data)
        dispatch({type: SET_EMP, payload: data})
        getShift()
      }
    } catch (error) {}
    setTimeout(() => {
      setLoading(false)
    }, 500)
  }

  const getShift = async () => {
    setLoading(true)
    const config = {
      ...endpoints.getShift,
    }

    let response: any = null
    try {
      response = await request(null, config)
      console.log(response)
      if (response.status) {
        const {data} = response
        console.log(data)
        dispatch({type: SET_SHIFT, payload: data})
      }
    } catch (error) {}
    setTimeout(() => {
      setLoading(false)
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
            <InputText
              value={globalFilter}
              onChange={onGlobalFilterChange}
              placeholder='Search Employee'
            />
          </span>
        </div>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <PrimeActionHeader
              label={'Add Employee'}
              icon='pi pi-plus'
              otherAction
              onClick={() => {
                setDisplayAdd(true)
              }}
            />
          </div>
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
            menu.current.toggle(event)
          }}
        />
      </>
    )
  }

  const template2 = {
    layout: 'RowsPerPageDropdown CurrentPageReport PrevPageLink NextPageLink',
    RowsPerPageDropdown: (options: any) => {
      const dropdownOptions = [
        {label: 20, value: 20},
        {label: 50, value: 50},
        {label: 'Semua', value: options.totalRecords},
      ]

      return (
        <React.Fragment>
          <span className='mx-1' style={{color: 'var(--text-color)', userSelect: 'none'}}>
            Data per halaman:{' '}
          </span>
          <Dropdown value={options.value} options={dropdownOptions} onChange={options.onChange} />
        </React.Fragment>
      )
    },
    CurrentPageReport: (options: any) => {
      return (
        <span
          style={{
            color: 'var(--text-color)',
            userSelect: 'none',
            width: '120px',
            textAlign: 'center',
          }}
        >
          {options.first} - {options.last} dari {options.totalRecords}
        </span>
      )
    },
  }

  const onCustomPage2 = (event: any) => {
    setFirst2(event.first)
    setRows2(event.rows)
  }

  const updateCurrentEmployee = (payload: any) => {
    dispatch({type: SET_DETAIL_EMP, payload: payload})
  }

  const checkUserbyId = (id: any) => {
    let selected: any = null
    employee.list?.forEach((el: any) => {
      if (el?.uid === id) {
        selected = el
      }
    })

    return selected
  }

  const checkShiftbyId = (id: any) => {
    let selected: any = null
    shift.list?.forEach((el: any) => {
      if (el?.id === id) {
        selected = el
      }
    })

    return selected
  }

  const checkEmail = (email:any) =>{
    return employee.list?.some((v:any) => v.email === email)
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Employee</PageTitle>
      <KTCard>
        {header()}
        <KTCardBody>
          <DataTable
            responsiveLayout='scroll'
            value={loading ? dummy : employee.list}
            className='display w-150 datatable-wrapper'
            rowHover
            filters={filters}
            globalFilterFields={['username', 'email']}
            paginator={employee?.list?.length > rows2 / 2}
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
                    <div className='symbol-group symbol-hover' style={{width: '5rem'}}>
                      <div className='symbol symbol-35px symbol-circle'>
                        <img
                          alt='Pic'
                          src={`${endpoints.image.endpoint}${e.image ? e.image : 'thumb.jpg'}`}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='text-gray-800 fs-14 font-w700'>{e.username}</div>
                      <div className='text-gray-600'>{e.email}</div>
                    </div>
                  </div>
                )
              }}
            />
            <Column
              header='PHONE'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: 'auto',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => (loading ? <Skeleton /> : <div>{e?.phone ?? '-'}</div>)}
            />
            <Column
              header='DEPARTEMENT'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: 'auto',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => (loading ? <Skeleton /> : <div>{'-'}</div>)}
            />
            <Column
              header='APPROVER'
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
                    {e.approver ? (
                      <span className='badge badge-light-info'>Yes</span>
                    ) : (
                      <span className='badge badge-light-danger'>No</span>
                    )}
                  </div>
                )
              }
            />
            <Column
              header='OFFICER'
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
                    {e.officer ? (
                      <span className='badge badge-light-info'>Yes</span>
                    ) : (
                      <span className='badge badge-light-danger'>No</span>
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
      <DialogHelper
        display={displayAdd}
        loading={loadingAdd}
        footer
        headerTittle={'Add Employee'}
        onConfirm={() => {}}
        onCancel={() => {
          setFile(null)
          setDisplayAdd(false)
        }}
        width={50}
        body={
          <div className='row'>
            <div className='col-4'>
              <PrimeInputText
                label={'Employee Name'}
                placeholder={'Employee Name'}
                value={employee.current?.username}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, username: e.target.value})
                }}
              />
            </div>
            <div className='col-4'>
              <PrimeCalendar
                label={'Date of Birth'}
                value={employee.current?.dob}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, dob: e.value})
                }}
                placeholder='00/00/0000'
                dateFormat={"dd/mm/yy"}
              />
            </div>
            <div className='col-4'></div>
            <div className='col-4'>
              <PrimeInputPhone
                label={'Phone'}
                value={employee.current?.phone}
                placeholder={'008xxxxxxxx'}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, phone: e.target.value})
                }}
              />
            </div>
            <div className='col-4'>
              <PrimeInputEmail
                label={'Email'}
                placeholder={'example@mail.com'}
                value={employee.current?.email}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, email: e.target.value})
                }}
                error={checkEmail(employee.current?.email)}
                errorMessage={checkEmail(employee.current?.email) && "This email already used"}
              />
            </div>
            <div className='col-4'>
              <PrimeInputPassword
                label={'Password'}
                placeholder={'*********'}
                value={employee.current?.password}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, password: e.target.value})
                }}
              />
            </div>
            <div className='col-4'>
              <PrimeDropdown
                label={'Shift'}
                options={shift.list}
                optionLabel={"shift_name"}
                value={checkShiftbyId(employee.current?.schedule_id)}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, schedule_id: e.value?.id ?? null})
                }}
                placeholder='Pilih Shift'
              />
            </div>
            <div className='col-4'>
              <PrimeDropdown
                label={'Approver User'}
                options={employee.list.filter((v: any) => v.approver)}
                value={checkUserbyId(employee.current?.approver_id)}
                onChange={(e: any) => {
                  updateCurrentEmployee({...employee.current, approver_id: e.value?.uid ?? null})
                }}
                placeholder={'Select User'}
                optionLabel={'username'}
                filterBy={"username"}
                showClear
                valueTemplate={(e: any) => e.username}
                itemTemplate={(e: any) => (
                  <div className='row'>
                    <div className='symbol-group symbol-hover' style={{width: '3.3rem'}}>
                      <div className='symbol symbol-35px symbol-circle'>
                        <img
                          alt='Pic'
                          src={`${endpoints.image.endpoint}${e.image ? e.image : 'thumb.jpg'}`}
                        />
                      </div>
                    </div>
                    <div className='col-6'>
                      <div className='text-gray-800 fs-14 font-w700'>{e.username}</div>
                      <div className='text-gray-600'>{e.email}</div>
                    </div>
                  </div>
                )}
                filter
              />
            </div>
            <UploadWidget
              label='User Image'
              picker={picker}
              size={120}
              file={file}
              src={''}
              onFileSelected={(e: any) => {
                setFile(e.target.files[0])
              }}
            />
            <div className='d-flex col-12 align-items-center mt-3'>
              <InputSwitch
                className='mr-3'
                inputId='approver'
                checked={employee.current?.approver}
                onChange={(e) => {
                  updateCurrentEmployee({...employee.current, approver: e.value})
                }}
              />
              <label className='mr-3 mt-1' htmlFor='approver'>
                {'Approver'}
              </label>
            </div>
            <div className='d-flex col-12 align-items-center'>
              <InputSwitch
                className='mr-3'
                inputId='officer'
                checked={employee.current?.officer}
                onChange={(e) => {
                  updateCurrentEmployee({...employee.current, officer: e.value})
                }}
              />
              <label className='mr-3 mt-1' htmlFor='officer'>
                {'Officer'}
              </label>
            </div>
          </div>
        }
      />
    </>
  )
}
