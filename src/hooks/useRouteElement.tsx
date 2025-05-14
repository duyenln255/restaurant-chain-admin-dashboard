import { useRoutes } from 'react-router-dom'
import MainLayout from '../layout/MainLayout/MainLayout'
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute'
import Dashboard from '../pages/Dashboard/Dashboard'
import CustomerList from '../pages/Customer/CustomerList'
import AddCustomer from '../pages/Customer/AddCustomer'
// import EditCustomer from '../pages/Customer/EditCustomer'
import OrderList from '../pages/Order/OrderList'
// import AddOrder from '../pages/Order/AddOrder'
// import EditOrder from '../pages/Order/EditOrder'
import FeedbackList from '../pages/Feedback/FeedbackList'
import AddFeedback from '../pages/Feedback/AddFeedback'
import EditFeedback from '../pages/Feedback/EditFeedback'
import BranchList from '../pages/Branch/BranchList'
import AddBranch from '../pages/Branch/AddBranch'
import EditBranch from '../pages/Branch/EditBranch'
import ReservationList from '../pages/Reservation/ReservationList'
// import AddReservation from '../pages/Reservation/AddReservation'
// import EditReservation from '../pages/Reservation/EditReservation'
import VoucherList from '../pages/Voucher/VoucherList'
// import AddVoucher from '../pages/Voucher/AddVoucher'
// import EditVoucher from '../pages/Voucher/EditVoucher'
import BrandList from '../pages/Brand/BrandList'
import AddBrand from '../pages/Brand/AddBrand'
import EditBrand from '../pages/Brand/EditBrand'
import ProductPage from '../pages/Product/ProductPage'
import AddProduct from '../pages/Product/AddProduct'
import EditProduct from '../pages/Product/EditProduct'
import EmployeeList from '../pages/Employee/EmployeeList'
import AddEmployee from '../pages/Employee/AddEmployee'
import EditEmployee from '../pages/Employee/EditEmployee'

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
        { path: '/customer/add', element: <AddCustomer/> },
        // { path: '/customer/edit/:id', element: <EditCustomer /> },     

        { path: '/order-list', element: <OrderList /> },
        // { path: '/order-list/add', element: <AddOrder /> },
        // { path: '/order-list/edit/:id', element: <EditOrder /> },

        { path: '/feedback', element: <FeedbackList /> },
        { path: '/feedback/add', element: <AddFeedback /> },
        { path: '/feedback/edit/:id', element: <EditFeedback /> },  

        { path: '/branch', element: <BranchList /> },
        { path: '/branch/add', element: <AddBranch /> },
        // { path: '/branch/edit/:id', element: <EditBranch /> },

        { path: '/reservation', element: <ReservationList /> },
        // { path: '/reservation/add', element: <AddReservation /> },
        // { path: '/reservation/edit/:id', element: <EditReservation /> },

        { path: '/voucher', element: <VoucherList /> },
        // { path: '/voucher/add', element: <AddVoucher /> },
        // { path: '/voucher/edit/:id', element: <EditVoucher /> },

        { path: '/brand', element: <BrandList /> },  
        { path: '/brand/add', element: <AddBrand /> },        
        { path: '/brand/edit/:id', element: <EditBrand /> },

        { path: '/product', element: <ProductPage /> },
        { path: '/product/add', element: <AddProduct /> },
        { path: '/product/edit/:id', element: <EditProduct /> },   

        { path: '/employee', element: <EmployeeList /> },
        { path: '/employee/add', element: <AddEmployee /> },
        { path: '/employee/edit/:id', element: <EditEmployee /> },
      ]
    }
  ])

  return routes
}
