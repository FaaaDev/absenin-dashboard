import {lazy, FC, Suspense, useRef} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import AttendancePage from '../pages/activity/attendance/AttendancePage'
import EmployeePage from '../pages/employee/employee/EmployeePage'
import ShiftPage from '../pages/employee/shift/ShiftPage'
import AddShiftPage from '../pages/employee/shift/AddShiftPage'
import {Toast} from 'primereact/toast'
import AttendanceWrapper from '../pages/activity/attendance/AttendanceWrapper'

const PrivateRoutes = () => {
  const BuilderPageWrapper = lazy(() => import('../pages/layout-builder/BuilderPageWrapper'))
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))
  const toast = useRef<any>(null)

  return (
    <>
      <Toast ref={toast} />
      <Routes>
        <Route element={<MasterLayout />}>
          {/* Redirect to Dashboard after success login/registartion */}
          <Route path='auth/*' element={<Navigate to='/dashboard' />} />
          {/* Pages */}
          <Route path='dashboard' element={<DashboardWrapper />} />
          <Route path='builder' element={<BuilderPageWrapper />} />
          <Route path='menu-test' element={<MenuTestPage />} />
          <Route path='attendance' element={<AttendanceWrapper />} />
          <Route path='employee' element={<EmployeePage />} />
          <Route path='shift' element={<ShiftPage />} />
          <Route
            path='shift/add'
            element={
              <AddShiftPage
                onSuccess={() => {
                  toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data Successfully added',
                    life: 3000,
                  })
                }}
              />
            }
          />
          <Route
            path='shift/edit'
            element={
              <AddShiftPage
                isEdit={true}
                onSuccess={() => {
                  toast.current.show({
                    severity: 'success',
                    summary: 'Success',
                    detail: 'Data Successfully updated',
                    life: 3000,
                  })
                }}
              />
            }
          />
          {/* Lazy Modules */}
          <Route
            path='crafted/pages/profile/*'
            element={
              <SuspensedView>
                <ProfilePage />
              </SuspensedView>
            }
          />
          <Route
            path='crafted/pages/wizards/*'
            element={
              <SuspensedView>
                <WizardsPage />
              </SuspensedView>
            }
          />
          <Route
            path='crafted/widgets/*'
            element={
              <SuspensedView>
                <WidgetsPage />
              </SuspensedView>
            }
          />
          <Route
            path='crafted/account/*'
            element={
              <SuspensedView>
                <AccountPage />
              </SuspensedView>
            }
          />
          <Route
            path='apps/chat/*'
            element={
              <SuspensedView>
                <ChatPage />
              </SuspensedView>
            }
          />
          <Route
            path='apps/user-management/*'
            element={
              <SuspensedView>
                <UsersPage />
              </SuspensedView>
            }
          />
          {/* Page Not Found */}
          <Route path='*' element={<Navigate to='/error/404' />} />
        </Route>
      </Routes>
    </>
  )
}

const SuspensedView: FC = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
