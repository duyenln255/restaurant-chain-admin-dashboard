import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import {
  Home,
  List,
  User,
  BookOpen,
  MessageSquare,
  Package,
  LayoutGrid,
  Share2,
  Users,
  Ticket,
  LogOut
} from 'lucide-react';

import { logout } from "../../services/auth.service";

const sidebarItems = [
  { name: 'Dashboard', icon: Home, link: '/dashboard' },
  { name: 'Order List', icon: List, link: '/order-list' },
  { name: 'Customer', icon: User, link: '/customer' },
  { name: 'Reservation', icon: BookOpen, link: '/reservation' },
  { name: 'Feedback', icon: MessageSquare, link: '/feedback' },
  { name: 'Product', icon: Package, link: '/product' },
  { name: 'Brand', icon: LayoutGrid, link: '/brand' },
  { name: 'Branch', icon: Share2, link: '/branch' },
  { name: 'Employee', icon: Users, link: '/employee' },
  { name: 'Voucher', icon: Ticket, link: '/voucher' },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Xóa token
    navigate("/"); // Điều hướng về Login page
  };

  return (
    <div className="sidebar h-screen bg-white flex flex-col justify-between overflow-y-auto fixed top-0 left-0 z-40">
      <div className="sidebar-content">
        <div className="logo-wrapper flex items-center gap-2 mb-6 px-6">
          <img src="/utopia_logo.svg" alt="Utopia Logo" className="w-8 h-8 object-contain" />
          <h1 className="text-xl font-bold leading-none flex items-center">
            <span className="text-[#4A75FF]">UTO</span>
            <span className="text-[#4B5563]">PIA</span>
          </h1>
        </div>

        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Link
                key={index}
                to={item.link}
                className={`sidebar-item ${location.pathname === item.link ? 'active' : ''}`}
              >
                <div className="sidebar-item-indicator" />
                <div className="sidebar-item-content flex items-center gap-2">
                  <Icon className="sidebar-icon w-5 h-5" strokeWidth={2} />
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="logout-section p-4">
        <button
          onClick={handleLogout}
          className="logout-button flex items-center gap-2 text-sm text-gray-700 hover:text-red-500"
        >
          <LogOut className="sidebar-icon w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
