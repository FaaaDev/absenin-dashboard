import {Column} from 'primereact/column'
import {DataTable} from 'primereact/datatable'
import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PrimeInputText from '../../../../components/PrimeInput/PrimeInputText'
import getDay from '../../../../utils/getday'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import {Calendar} from 'primereact/calendar'
import {SET_DETAIL_SHIFT} from '../../../../redux/actions'
import {Button} from 'primereact/button'
import {endpoints, request} from '../../../../utils'
import {Toast} from 'primereact/toast'

export default function AddShiftPage({isEdit = false, onSuccess}: any) {
  const shift: any = useSelector((state: any) => state.shift)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const toast = useRef<any>(null)

  const addShift = async () => {
    setLoading(true)
    const config = {
      ...endpoints.addShift,
      data: {
        ...shift.current,
        timezone: shift.current.timezone ? Number(shift.current.timezone) : 0,
        schedule: shift.current.schedule.map((v: any) => ({
          ...v,
          check_in_s: v.check_in_s ?? null,
          check_in_e: v.check_in_e ?? null,
          break_out_s: v.break_out_s ?? null,
          break_out_e: v.break_out_e ?? null,
          break_in_s: v.break_in_s ?? null,
          break_in_e: v.break_in_e ?? null,
          check_out_s: v.check_out_s ?? null,
          check_out_e: v.check_out_e ?? null,
        })),
      },
    }

    let response: any = null
    try {
      response = await request(null, config)
      console.log(response)
      if (response.status) {
        onSuccess()
        window.history.back()
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
        toast.current.show({
          severity: 'error',
          summary: 'Failed',
          detail: 'Data update is failed!',
          life: 3000,
        })
      }, 500)
    }
  }

  const updShift = async () => {
    setLoading(true)
    const config = {
      ...endpoints.updateShift,
      endpoint: endpoints.updateShift.endpoint + shift.current.id,
      data: {
        ...shift.current,
        timezone: shift.current.timezone ? Number(shift.current.timezone) : 0,
        schedule: shift.current.schedule.map((v: any) => ({
          ...v,
          check_in_s: v.check_in_s ?? null,
          check_in_e: v.check_in_e ?? null,
          break_out_s: v.break_out_s ?? null,
          break_out_e: v.break_out_e ?? null,
          break_in_s: v.break_in_s ?? null,
          break_in_e: v.break_in_e ?? null,
          check_out_s: v.check_out_s ?? null,
          check_out_e: v.check_out_e ?? null,
        })),
      },
    }

    let response: any = null
    try {
      response = await request(null, config)
      console.log(response)
      if (response.status) {
        onSuccess()
        window.history.back()
      }
    } catch (error) {
      setTimeout(() => {
        setLoading(false)
        toast.current.show({
          severity: 'error',
          summary: 'Failed',
          detail: 'Data update is failed!',
          life: 3000,
        })
      }, 500)
    }
  }

  const updateSchedule = (payload: any) => {
    dispatch({type: SET_DETAIL_SHIFT, payload: {...shift.current, schedule: payload}})
  }

  const formatDate = (date: any) => {
    var d = new Date(`${date}`),
      hour = `${d.getHours()}`,
      minute = `${d.getMinutes()}`

    if (hour.length < 2) hour = '0' + hour
    if (minute.length < 2) minute = '0' + minute

    return `${[hour, minute].join(':')}`
  }

  const convertTime = (hour: any) => {
    let now = new Date()
    let time = hour.split(':')
    now.setHours(Number(time[0]), Number(time[1]))

    return now
  }

  const updateShift = (payload: any) => {
    dispatch({type: SET_DETAIL_SHIFT, payload: payload})
  }

  return (
    <>
      <Toast ref={toast} />
      <PageTitle
        breadcrumbs={[
          {
            title: 'Shift',
            path: '/shift',
            isSeparator: false,
            isActive: false,
          },
          {
            title: '',
            path: '',
            isSeparator: true,
            isActive: false,
          },
        ]}
      >
        {isEdit ? 'Edit Shift' : 'Add Shift'}
      </PageTitle>
      <KTCard>
        <KTCardBody>
          <div className='row'>
            <div className='col-3'>
              <PrimeInputText
                label={'Shift Name'}
                placeholder={'Shift Name'}
                value={shift?.current?.shift_name ?? null}
                onChange={(e: any) => {
                  updateShift({...shift.current, shift_name: e.target.value})
                }}
              />
            </div>
            <div className='col-3'>
              <PrimeInputText
                label={'Timezone'}
                placeholder={'Timezone'}
                addOn={'GMT +'}
                value={shift?.current?.timezone ?? null}
                onChange={(e: any) => {
                  updateShift({...shift.current, timezone: e.target.value})
                }}
              />
            </div>
            <div className='col-3'>
              <PrimeInputText
                label={'Pin Location'}
                placeholder={'Latitude,Longitude'}
                value={shift?.current?.pin_location ?? null}
                onChange={(e: any) => {
                  updateShift({...shift.current, pin_location: e.target.value})
                }}
              />
            </div>
            <div className='col-12 mt-3'>
              <DataTable
                value={shift.current.schedule.map((v: any, i: number) => ({...v, index: i}))}
                responsiveLayout='scroll'
              >
                <Column
                  header='Day'
                  style={{
                    width: '8rem',
                    borderStyle: 'dashed',
                  }}
                  body={(e) => <div>{e.day ? getDay(e.day) : '-'}</div>}
                />
                <Column
                  header='CHECK IN'
                  style={{
                    width: '15rem',
                    borderStyle: 'dashed',
                  }}
                  body={(e) => {
                    return (
                      <div className='row'>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.check_in_s ? convertTime(e.check_in_s) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].check_in_s = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.check_in_e ? convertTime(e.check_in_e) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].check_in_e = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                      </div>
                    )
                  }}
                />
                <Column
                  header='BREAK OUT'
                  style={{
                    width: '15rem',
                    borderStyle: 'dashed',
                  }}
                  body={(e) => {
                    return (
                      <div className='row'>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.break_out_s ? convertTime(e.break_out_s) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].break_out_s = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.break_out_e ? convertTime(e.break_out_e) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].break_out_e = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                      </div>
                    )
                  }}
                />
                <Column
                  header='BREAK IN'
                  style={{
                    width: '15rem',
                    borderStyle: 'dashed',
                  }}
                  body={(e) => {
                    return (
                      <div className='row'>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.break_in_s ? convertTime(e.break_in_s) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].break_in_s = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.break_in_e ? convertTime(e.break_in_e) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].break_in_e = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                      </div>
                    )
                  }}
                />
                <Column
                  header='CHECK OUT'
                  style={{
                    width: '15rem',
                    borderStyle: 'dashed',
                  }}
                  body={(e) => {
                    return (
                      <div className='row'>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.check_out_s ? convertTime(e.check_out_s) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].check_out_s = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                        <div className='col-6'>
                          <Calendar
                            id='time24'
                            value={e.check_out_e ? convertTime(e.check_out_e) : undefined}
                            onChange={({value}) => {
                              if (value) {
                                let temp = shift.current.schedule
                                temp[e.index].check_out_e = formatDate(value)
                                updateSchedule(temp)
                              }
                            }}
                            timeOnly
                            hourFormat='24'
                          />
                        </div>
                      </div>
                    )
                  }}
                />
              </DataTable>
            </div>
          </div>
          <div className='d-flex justify-content-end mt-6'>
            <Button
              label={'Batal'}
              className={`p-button-text p-button-sm mr-3`}
              onClick={() => {
                window.history.back()
              }}
            />
            <Button
              label={'Simpan'}
              icon={'pi pi-check'}
              className={`p-button-sm`}
              loading={loading}
              onClick={() => (isEdit ? updShift() : addShift())}
            />
          </div>
        </KTCardBody>
      </KTCard>
    </>
  )
}
