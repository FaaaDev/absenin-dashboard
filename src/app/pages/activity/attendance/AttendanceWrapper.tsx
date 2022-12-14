import React from 'react'
import CustomTab from '../../../../components/CustomTab/CustomTab'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {PageTitle} from '../../../../_metronic/layout/core'
import AttendancePage from './AttendancePage'

export default function AttendanceWrapper() {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Attendances</PageTitle>

      <CustomTab
        tabbar={['Normal', 'Manual', 'Settings']}
        tabs={[<AttendancePage />, <></>, <></>]}
      />
    </>
  )
}
