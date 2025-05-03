import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import SalesDetails from './SalesDetails';
import DealsDetails from './DealsDetails';
import StatCard from './StatCard';

import { StatCardProps } from '../../types/StatCardProps';
import { DealItem } from '../../types/DealItem';

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const [sidebarOpen, setSidebarOpen] = useState(true); 
  const toggleSidebar = () => {
    console.log("Clicked sidebar toggle");
    setSidebarOpen(prev => !prev);
  };
  const statCards: StatCardProps[] = [
    {
      title: t('dashboard.total_customers'),
      value: '40,689',
      change: '8.5%',
      changeText: t('dashboard.up_from_yesterday'),
      icon: '/assets/icons/totalusers.png',
      bgColor: 'bg-indigo-400 bg-opacity-20',
    },
    {
      title: t('dashboard.total_orders'),
      value: '10293',
      change: '1.3%',
      changeText: t('dashboard.up_from_last_week'),
      icon: '/assets/icons/totalorders.png',
      bgColor: 'bg-amber-300 bg-opacity-20',
    },
    {
      title: t('dashboard.total_sales'),
      value: '$89,000',
      change: '4.3%',
      changeText: t('dashboard.down_from_yesterday'),
      icon: '/assets/icons/totalsales.png',
      bgColor: 'bg-green-400 bg-opacity-20',
    },
    {
      title: t('dashboard.total_staff'),
      value: '2040',
      change: '1.8%',
      changeText: t('dashboard.up_from_yesterday'),
      icon: '/assets/icons/totalpending.png',
      bgColor: 'bg-red-400 bg-opacity-20',
    },
  ];

  const dealItems: DealItem[] = [
    {
      productName: 'Coffee Mocha',
      productImage: '/assets/images/coffee-mocha.png',
      location: '123 Âu Cơ, Tân Phú, TP. HCM',
      dateTime: '12.09.2019 - 12.53 PM',
      quantity: 2,
      amount: '100.000 VND',
      status: 'Completed',
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with transition */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? 'w-[240px]' : 'w-0 overflow-hidden'
        }`}
      >
      {sidebarOpen && <Sidebar />}
    </div>

      {/* Main content */}
      <div className="flex-1">
      <Header toggleSidebar={toggleSidebar} />        
        <div className="dashboard-body p-6">
          <div className="max-w-[1140px] mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">
                {t('dashboard.title')}
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-5">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>

            <SalesDetails />
            <DealsDetails items={dealItems} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
