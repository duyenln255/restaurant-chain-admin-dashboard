import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import SalesDetails from "./SalesDetails";
import BranchRevenue from "./BranchRevenue";
import StatCard from "./StatCard";
import { Users, PackageCheck, TrendingUp, UserCog } from "lucide-react";
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
            iconElement: <Users className="w-6 h-6 text-white" />,
            bgColor: "bg-indigo-500",
            icon: "",
          },
          {
            title: t("dashboard.totalOrders"),
            value: stats.totalOrders.toLocaleString(),
            change: stats.orderGrowth,
            changeText: t("dashboard.up_from_last_week"),
            iconElement: <PackageCheck className="w-6 h-6 text-white" />,
            bgColor: "bg-yellow-400",
            icon: "",

          },
          {
            title: t("dashboard.totalSales"),
            value: stats.totalSales.toLocaleString() + " VND",
            change: stats.salesGrowth,
            changeText:
              Number(stats.salesGrowth.replace("%", "")) >= 0
                ? t("dashboard.up_from_yesterday")
                : t("dashboard.down_from_yesterday"),
            iconElement: <TrendingUp className="w-6 h-6 text-white" />,
            bgColor: "bg-green-500",
            icon: "",
          },
          {
            title: t("dashboard.totalStaff"),
            value: stats.totalStaff.toLocaleString(),
            change: stats.staffGrowth,
            changeText: t("dashboard.up_from_yesterday"),
            iconElement: <UserCog className="w-6 h-6 text-white" />,
            bgColor: "bg-red-500",
            icon: "",
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
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">
              {t("dashboard.title")}
            </h1>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {statCards.map((card, index) => (
              <StatCard key={index} {...card} />
            ))}
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            <SalesDetails />
            <BranchRevenue />
          </div>
        </div>
      </div>
    </div>
  );

};

export default Dashboard;
