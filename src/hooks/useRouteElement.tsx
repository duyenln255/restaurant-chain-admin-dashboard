import { useRoutes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'

import Dashboard from '../pages/Dashboard'
import CustomerList from '../pages/Customer/CustomerList'
import OrderList from '../pages/Order/OrderList'
import FeedbackList from '../pages/Feedback/FeedbackList'
import BranchList from '../pages/Branch/BranchList'
import ReservationList from '../pages/Reservation/ReservationList'
import VoucherList from '../pages/Voucher/VoucherList'
import BrandList from '../pages/Brand/BrandList'
import AddBrand from '../pages/Brand/AddBrand'
// import EditBrand from '../pages/Brand/EditBrand'
import ProductPage from '../pages/Product/ProductPage'
import EmployeeList from '../pages/Employee/EmployeeList'
import Login from '../pages/Login/Login'

export default function useRouteElement() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Login />
    },
    {
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        { path: '/dashboard', element: <Dashboard /> },
        { path: '/customer', element: <CustomerList /> },
        { path: '/order-list', element: <OrderList /> },
        { path: '/feedback', element: <FeedbackList /> },
        { path: '/branch', element: <BranchList /> },
        { path: '/reservation', element: <ReservationList /> },
        { path: '/voucher', element: <VoucherList /> },
        { path: '/brand', element: <BrandList /> },
        { path: '/brand/add', element: <AddBrand /> },
        // { path: '/brand/edit/:id', element: <EditBrand /> },
        { path: '/product', element: <ProductPage /> },
        { path: '/employee', element: <EmployeeList /> }
      ]
    }
  ])

  return routes
}
