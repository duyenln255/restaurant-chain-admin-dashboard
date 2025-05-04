import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CustomerList from "./pages/Customer/CustomerList";
import './styles/global.css';
import './styles/variables.css';
import './styles/utilities.css';
import OrderList from "./pages/Order/OrderList";
import FeedbackList from "./pages/Feedback/FeedbackList";
import BranchList from "./pages/Branch/BranchList";
import ReservationList from "./pages/Reservation/ReservationList";
import VoucherList from "./pages/Voucher/VoucherList";
import BrandList from "./pages/Brand/BrandList";
import ProductPage from "./pages/Product/ProductPage";
import EmployeeList from "./pages/Employee/EmployeeList";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import { LoadingProvider, useLoading } from './contexts/LoadingContext'
import Loading from './components/Loading/Loading'

// Tạo component LoadingWrapper để lấy trạng thái loading từ context
function LoadingWrapper() {
  const { isLoading } = useLoading();
  return <Loading visible={isLoading} />;
}

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />     
          <Route path="/login" element={<Login />} /> 
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/customer" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
          <Route path="/order-list" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
          <Route path="/feedback" element={<ProtectedRoute><FeedbackList /></ProtectedRoute>} />
          <Route path="/branch" element={<ProtectedRoute><BranchList /></ProtectedRoute>} />
          <Route path="/reservation" element={<ProtectedRoute><ReservationList /></ProtectedRoute>} />
          <Route path="/voucher" element={<ProtectedRoute><VoucherList /></ProtectedRoute>} />
          <Route path="/brand" element={<ProtectedRoute><BrandList /></ProtectedRoute>} />
          <Route path="/product" element={<ProtectedRoute><ProductPage /></ProtectedRoute>} />
          <Route path="/employee" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        </Routes>

        {/* Global Loading */}
        <LoadingWrapper />
      </Router>
    </LoadingProvider>
  );
}

export default App;
