import React from 'react'
import {KTCard, KTCardBody, KTSVG} from '../../../../_metronic/helpers'
import {PageLink, PageTitle} from '../../../../_metronic/layout/core'
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Skeleton } from "primereact/skeleton";

export default function AttendancePage() {
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
  return (
    <>
      <PageTitle breadcrumbs={[]}>Attendances</PageTitle>
      <KTCard>
        {header()}
        <KTCardBody>
          <DataTable
            responsiveLayout='scroll'
            value={Array.from({ length: 10 })}
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
              header='Kode Group'
              style={{
                minWidth: '8rem',
                borderStyle: 'none'
              }}
              body={ <Skeleton />}
            />
            <Column
              header='Nama Group'
              style={{minWidth: '8rem', borderStyle: 'none'}}
              body={<Skeleton />}
            />
            <Column
              header='Keterangan'
              style={{minWidth: '8rem', borderStyle: 'none'}}
              body={ <Skeleton />}
            />
            <Column
              header='Action'
              dataType='boolean'
              bodyClassName='text-center'
              style={{minWidth: '2rem', borderStyle: 'none'}}
              body={(e) => (<Skeleton /> )}
            />
          </DataTable>
        </KTCardBody>
      </KTCard>
    </>
  )
}
