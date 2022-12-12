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
import { useDispatch, useSelector } from 'react-redux'
import { SET_EMP } from '../../../../redux/actions'
import { InputText } from 'primereact/inputtext'

export default function EmployeePage() {
  const [filters, setFilters]: any = useState(null)
  const [first2, setFirst2] = useState(0)
  const [rows2, setRows2] = useState(20)
  const menu = useRef<any>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const dummy = Array.from({length: 10})
  const employee: any = useSelector((state: any) => state.employee)

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
            <InputText value={globalFilter} onChange={onGlobalFilterChange} placeholder='Search Employee' />
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
            globalFilterFields={['uid.username', 'uid.email']}
            paginator={employee?.list?.length > rows2/2}
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
                        <img alt='Pic' src={`${endpoints.image.endpoint}${e.image ? e.image : "thumb.jpg"}`} />
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
              body={(e) => (loading ? <Skeleton /> : <div>{e?.phone ?? "-"}</div>)}
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
    </>
  )
}
