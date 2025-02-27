import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SidebarItem } from '../../types/SidebarItem';
import './Sidebar.css';

const sidebarItems: SidebarItem[] = [
  { name: 'Dashboard', icon: '/assets/icons/dashboard.png', link: '/dashboard' },
  { name: 'Order List', icon: '/assets/icons/order-list.png', link: '/order-list' },
  { name: 'Customer', icon: '/assets/icons/customer.png', link: '/customer' },
  { name: 'Reservation', icon: '/assets/icons/reservation.png', link: '/reservation' },
  { name: 'Feedback', icon: '/assets/icons/feedback.png', link: '/feedback' },
  { name: 'Product', icon: '/assets/icons/product.png', link: '/product' },
  { name: 'Brand', icon: '/assets/icons/brand.png', link: '/brand' },
  { name: 'Branch', icon: '/assets/icons/branch.png', link: '/branch' },
  { name: 'Employee', icon: '/assets/icons/employee.png', link: '/employee' },
  { name: 'Voucher', icon: '/assets/icons/voucher.png', link: '/voucher' },
];

const Sidebar: React.FC = () => {
  const location = useLocation(); // Lấy route hiện tại

  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="logo">
          UTO<span>PIA</span>
        </div>
        <nav className="sidebar-nav">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className={`sidebar-item ${location.pathname === item.link ? 'active' : ''}`} // 👈 Kiểm tra nếu route khớp, đặt active
            >
              <div className="sidebar-item-indicator" />
              <div className="sidebar-item-content">
                <img src={item.icon} alt={item.name} />
                <span>{item.name}</span>
              </div>
            </Link>
          ))}
        </nav>
      </div>
      <div className="logout-section">
        <Link to="/logout" className="logout-button">
          <img src="/assets/icons/logout.png" alt="Logout" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
