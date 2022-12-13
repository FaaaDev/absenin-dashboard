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
import {RESET_DETAIL_SHIFT, SET_DETAIL_SHIFT, SET_SHIFT} from '../../../../redux/actions'
import getDay from '../../../../utils/getday'
import PrimeActionHeader from '../../../../components/PrimeActionHeader/PrimeActionHeader'
import {useNavigate} from 'react-router-dom'
import {InputText} from 'primereact/inputtext'

const reset = {
  id: null,
  shift_name: '',
  timezone: null,
  schedule: [
    {
      day: 1,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
    {
      day: 2,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
    {
      day: 3,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
    {
      day: 4,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
    {
      day: 5,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
    {
      day: 6,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
    {
      day: 7,
      check_in_s: null,
      check_in_e: null,
      break_out_s: null,
      break_out_e: null,
      break_in_s: null,
      break_in_e: null,
      check_out_s: null,
      check_out_e: null,
    },
  ],
}

export default function ShiftPage() {
  const [filters, setFilters]: any = useState(null)
  const [first2, setFirst2] = useState(0)
  const [rows2, setRows2] = useState(20)
  const menu = useRef<any>(null)
  const [globalFilter, setGlobalFilter] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const dummy = Array.from({length: 10})
  const shift: any = useSelector((state: any) => state.shift)
  const [expandedRows, setExpandedRows]: any = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    getShift()
    initFilter()
  }, [])

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
              placeholder='Search Shift'
            />
          </span>
        </div>
        <div className='card-toolbar'>
          <div className='d-flex justify-content-end' data-kt-user-table-toolbar='base'>
            <PrimeActionHeader
              label={'Add Shift'}
              icon='pi pi-plus'
              otherAction
              onClick={() => {
                dispatch({type: SET_DETAIL_SHIFT, payload: reset})
                navigate('/shift/add')
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
              label: 'Edit',
              icon: 'pi pi-pencil',
              command: () => {
                navigate('/shift/edit')
              },
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
            dispatch({type: SET_DETAIL_SHIFT, payload: {...data, timezone: data.schedule[0].timezone}})
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

  const rowExpansionTemplate = (data: any) => {
    return (
      <div className=''>
        <DataTable value={data?.schedule} responsiveLayout='scroll'>
          <Column
            header='Day'
            style={{
              width: '8rem',
              borderStyle: 'dashed',
            }}
            body={(e) => (loading ? <Skeleton /> : <div>{e.day ? getDay(e.day) : '-'}</div>)}
          />
          <Column
            header='CHECK IN'
            style={{
              width: '8rem',
              borderStyle: 'dashed',
            }}
            body={(e) =>
              loading ? (
                <Skeleton />
              ) : (
                <div>{e?.check_in_s ? `${e?.check_in_s}-${e?.check_in_e}` : '-'}</div>
              )
            }
          />
          <Column
            header='BREAK OUT'
            style={{
              width: '8rem',
              borderStyle: 'dashed',
            }}
            body={(e) =>
              loading ? (
                <Skeleton />
              ) : (
                <div>{e?.break_out_s ? `${e?.break_out_s}-${e?.break_out_e}` : '-'}</div>
              )
            }
          />
          <Column
            header='BREAK IN'
            style={{
              width: '8rem',
              borderStyle: 'dashed',
            }}
            body={(e) =>
              loading ? (
                <Skeleton />
              ) : (
                <div>{e?.break_in_s ? `${e?.break_in_s}-${e?.break_in_e}` : '-'}</div>
              )
            }
          />
          <Column
            header='CHECK OUT'
            style={{
              width: '8rem',
              borderStyle: 'dashed',
            }}
            body={(e) =>
              loading ? (
                <Skeleton />
              ) : (
                <div>{e?.check_out_s ? `${e?.check_out_s}-${e?.check_out_e}` : '-'}</div>
              )
            }
          />
        </DataTable>
      </div>
    )
  }

  return (
    <>
      <PageTitle breadcrumbs={[]}>Shift</PageTitle>
      <KTCard>
        {header()}
        <KTCardBody>
          <DataTable
            responsiveLayout='scroll'
            value={loading ? dummy : shift?.list.map((v: any, i: number) => ({...v, index: i + 1}))}
            className='display w-150 datatable-wrapper'
            rowHover
            filters={filters}
            globalFilterFields={['uid.username', 'uid.email']}
            paginator={shift?.list?.length > rows2 / 2}
            paginatorTemplate={template2}
            first={first2}
            rows={rows2}
            onPage={onCustomPage2}
            paginatorClassName='justify-content-end mt-3'
            expandedRows={expandedRows}
            onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate}
          >
            <Column
              header='NO.'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: '1em',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              expander
            />
            <Column
              // header='NO'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: '8rem',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => (loading ? <Skeleton /> : <div>{e?.index ?? '-'}</div>)}
            />
            <Column
              header='SHIFT NAME'
              headerStyle={{color: '#7e8299', background: 'transparent'}}
              style={{
                width: 'auto',
                borderStyle: 'dashed',
                borderColor: '#eff2f5',
              }}
              body={(e) => (loading ? <Skeleton /> : <div>{e.shift_name}</div>)}
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
