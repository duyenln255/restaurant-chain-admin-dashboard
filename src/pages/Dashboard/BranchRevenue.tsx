import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import GenericTable from "../../components/Table/GenericTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

type BranchStat = {
  id: string;
  name: string;
  manager: string;
  totalRevenue: number;
  totalStaff: number;
  totalReservations: number;
  status: "Active" | "Inactive";
};

const MOCK_BRANCHES: BranchStat[] = [
  {
    id: "1",
    name: "District 1 Branch",
    manager: "Nguyen Van A",
    totalRevenue: 150000000,
    totalStaff: 12,
    totalReservations: 340,
    status: "Active",
  },
  {
    id: "2",
    name: "District 7 Branch",
    manager: "Tran Thi B",
    totalRevenue: 110000000,
    totalStaff: 9,
    totalReservations: 280,
    status: "Inactive",
  },
  {
    id: "3",
    name: "Binh Thanh Branch",
    manager: "Le Van C",
    totalRevenue: 98000000,
    totalStaff: 7,
    totalReservations: 150,
    status: "Active",
  },
];

const BranchRevenue: React.FC = () => {
  const { t } = useTranslation();
  const [branches, setBranches] = useState<BranchStat[]>([]);
  const [selectedMonth, setSelectedMonth] = useState("10");
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBranches(MOCK_BRANCHES);
    }, 500);
  }, []);

  const columns: {
    key: keyof BranchStat | "action" | "_index";
    label: string;
    align?: "left" | "center" | "right";
    render?: (item: BranchStat) => React.ReactNode;
  }[] = [
    {
      key: "name",
      label: "Branch Name",
    },
    {
      key: "manager",
      label: "Manager",
    },
    {
      key: "totalRevenue",
      label: "Revenue (VND)",
      align: "right",
      render: (item) => item.totalRevenue.toLocaleString("vi-VN") + " VND",
    },
    {
      key: "totalStaff",
      label: "Staff",
      align: "center",
    },
    {
      key: "totalReservations",
      label: "Reservations",
      align: "center",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (item) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            item.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {item.status}
        </span>
      ),
    },
  ];


  return (
    <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {t("dashboard.deals_details")}
        </h2>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-30">
            <SelectValue placeholder={t("common.month.october")} />
          </SelectTrigger>
          <SelectContent className="h-60">
            {Array.from({ length: 12 }, (_, i) => {
              const monthKey = new Date(0, i).toLocaleString("en", { month: "long" }).toLowerCase();
              return (
                <SelectItem key={i + 1} value={(i + 1).toString()}>
                  {t(`month.${monthKey}`)}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <GenericTable items={branches} columns={columns} itemsPerPage={5} />
    </div>
  );
};

export default BranchRevenue;
