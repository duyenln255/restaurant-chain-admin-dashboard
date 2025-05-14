import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SalesDetails from "./SalesDetails";
import DealsDetails from "./DealsDetails";
import StatCard from "./StatCard";

import type { StatCardProps } from "../../types/StatCardProps";

import { useLoading } from "../../contexts/LoadingContext";
import { getDashboardStats } from "../../services/dashboard.service";

const Dashboard: React.FC = () => {
  const { t } = useTranslation();
  const { setLoading } = useLoading();
  const [statCards, setStatCards] = useState<StatCardProps[]>([]);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // Fetch dashboard stats
        const stats = await getDashboardStats();

        // Format stats for display
        const formattedStats: StatCardProps[] = [
          {
            title: t("dashboard.totalCustomers"),
            value: stats.totalCustomers.toLocaleString(),
            change: stats.customerGrowth,
            changeText: t("dashboard.up_from_yesterday"),
            icon: "/assets/icons/totalusers.png",
            bgColor: "bg-indigo-400 bg-opacity-20",
          },
          {
            title: t("dashboard.totalOrders"),
            value: stats.totalOrders.toLocaleString(),
            change: stats.orderGrowth,
            changeText: t("dashboard.up_from_last_week"),
            icon: "/assets/icons/totalorders.png",
            bgColor: "bg-amber-300 bg-opacity-20",
          },
          {
            title: t("dashboard.totalSales"),
            value: stats.totalSales.toLocaleString() + " VND",
            change: stats.salesGrowth,
            changeText:
              Number(stats.salesGrowth.replace("%", "")) >= 0
                ? t("dashboard.up_from_yesterday")
                : t("dashboard.down_from_yesterday"),
            icon: "/assets/icons/totalsales.png",
            bgColor: "bg-green-400 bg-opacity-20",
          },
          {
            title: t("dashboard.totalStaff"),
            value: stats.totalStaff.toLocaleString(),
            change: stats.staffGrowth,
            changeText: t("dashboard.up_from_yesterday"),
            icon: "/assets/icons/totalpending.png",
            bgColor: "bg-red-400 bg-opacity-20",
          },
        ];

        setStatCards(formattedStats);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="dashboard-body p-6">
          <div className="mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">
                {t("dashboard.title")}
              </h1>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 mb-5">
              {statCards.map((card, index) => (
                <StatCard key={index} {...card} />
              ))}
            </div>

            <SalesDetails />
            <DealsDetails />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
