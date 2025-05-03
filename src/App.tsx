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


function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/" element={<LandingPage />} />     
        <Route path="/login" element={<Login />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/order-list" element={<OrderList />} />
        <Route path="/feedback" element={<FeedbackList />} />
        <Route path="/branch" element={<BranchList />} />
        <Route path="/reservation" element={<ReservationList />} />
        <Route path="/voucher" element={<VoucherList />} />
        <Route path="/brand" element={<BrandList />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/employee" element={<EmployeeList />} />
        {/* <Route path="/order-list" element={<OrderList />} />
        <Route path="/customer" element={<Customer />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/product" element={<Product />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/branch" element={<Branch />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/voucher" element={<Voucher />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
