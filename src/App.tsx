import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import CustomerList from "./pages/Customer/CustomerList";
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
import { Provider } from "react-redux";  
import { store } from "./redux/store";   
import './index.css'

function LoadingWrapper() {
  const { isLoading } = useLoading();
  return <Loading visible={isLoading} />;
}

function App() {
  return (
    <Provider store={store}> {/* <<< ADD THIS */}
      <LoadingProvider>
        <Routes>
          {/* <Route path="/" element={<LandingPage />} /> */}
          <Route path="/" element={<Login />} />
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
      </LoadingProvider>
    </Provider>
  );
}

export default App;
