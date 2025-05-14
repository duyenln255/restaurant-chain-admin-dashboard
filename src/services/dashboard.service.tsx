import axiosInstance from "../lib/axiosInstance";
import type { StatCardProps } from "../types/StatCardProps";
import type { DealItem } from "../types/DealItem";

export interface SaleReportItem {
  id: string;
  brand_id: string;
  total_revenue: number;
  total_orders: number;
  total_staffs: number;
  total_customers: number;
  month: number;
  year: number;
  date_added: string;
}

export interface SaleReportResponse {
  saleReport: SaleReportItem[];
}

export interface DashboardStats {
  totalCustomers: number;
  totalOrders: number;
  totalSales: number;
  totalStaff: number;
  customerGrowth: string;
  orderGrowth: string;
  salesGrowth: string;
  staffGrowth: string;
}

export interface SalesData {
  labels: string[];
  data: number[];
}

// Hàm lấy dữ liệu báo cáo bán hàng từ API
const getSaleReport = async (): Promise<SaleReportItem[]> => {
  try {
    const response =
      await axiosInstance.get<SaleReportResponse>("/sale_report");
    return response.data.saleReport;
  } catch (error) {
    console.error("Error fetching sale report:", error);
    // Dữ liệu mẫu trong trường hợp lỗi
    return [
      {
        id: "d4773cad-9b2b-4bd1-b7d1-57117b0ee965",
        brand_id: "c1cb7132-58e3-41ce-8f27-ea320c9273ba",
        total_revenue: 1530000,
        total_orders: 10,
        total_staffs: 40,
        total_customers: 40,
        month: 5,
        year: 2025,
        date_added: "2025-05-12T17:00:03.689Z",
      },
      {
        id: "bbb75521-11d9-4917-9638-40011fb6d28b",
        brand_id: "c1cb7132-58e3-41ce-8f27-ea320c9273ba",
        total_revenue: 408000,
        total_orders: 4,
        total_staffs: 40,
        total_customers: 40,
        month: 4,
        year: 2025,
        date_added: "2025-05-12T17:00:04.041Z",
      },
      {
        id: "d191ba6b-79f2-4ff4-bac5-e3b818c22516",
        brand_id: "c1cb7132-58e3-41ce-8f27-ea320c9273ba",
        total_revenue: 194000,
        total_orders: 2,
        total_staffs: 40,
        total_customers: 40,
        month: 1,
        year: 2025,
        date_added: "2025-05-12T17:00:04.383Z",
      },
      {
        id: "f6fd5148-d5df-4d5a-b1c2-d83fef5e5cb6",
        brand_id: "c1cb7132-58e3-41ce-8f27-ea320c9273ba",
        total_revenue: 161000,
        total_orders: 2,
        total_staffs: 40,
        total_customers: 40,
        month: 2,
        year: 2025,
        date_added: "2025-05-12T17:00:04.746Z",
      },
      {
        id: "7e31c644-2e54-4c17-bd5e-3ee13337f350",
        brand_id: "c1cb7132-58e3-41ce-8f27-ea320c9273ba",
        total_revenue: 224000,
        total_orders: 2,
        total_staffs: 40,
        total_customers: 40,
        month: 3,
        year: 2025,
        date_added: "2025-05-12T17:00:05.091Z",
      },
    ];
  }
};

// Tính toán phần trăm tăng trưởng giữa hai giá trị
const calculateGrowth = (current: number, previous: number): string => {
  if (previous === 0) return "0%";
  const growth = ((current - previous) / previous) * 100;
  return growth > 0 ? `+${growth.toFixed(1)}%` : `${growth.toFixed(1)}%`;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const saleReport = await getSaleReport();

    // Sắp xếp báo cáo theo tháng
    const sortedReport = [...saleReport].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    // Lấy báo cáo tháng hiện tại và tháng trước
    const currentMonth = sortedReport[sortedReport.length - 1];
    const previousMonth = sortedReport[sortedReport.length - 2] || currentMonth;

    // Tính toán phần trăm tăng trưởng
    const customerGrowth = calculateGrowth(
      currentMonth.total_customers,
      previousMonth.total_customers
    );

    const orderGrowth = calculateGrowth(
      currentMonth.total_orders,
      previousMonth.total_orders
    );

    const salesGrowth = calculateGrowth(
      currentMonth.total_revenue,
      previousMonth.total_revenue
    );

    const staffGrowth = calculateGrowth(
      currentMonth.total_staffs,
      previousMonth.total_staffs
    );

    return {
      totalCustomers: currentMonth.total_customers,
      totalOrders: currentMonth.total_orders,
      totalSales: currentMonth.total_revenue,
      totalStaff: currentMonth.total_staffs,
      customerGrowth,
      orderGrowth,
      salesGrowth,
      staffGrowth,
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    // Fallback data in case of error
    return {
      totalCustomers: 40,
      totalOrders: 10,
      totalSales: 1530000,
      totalStaff: 40,
      customerGrowth: "0%",
      orderGrowth: "150%",
      salesGrowth: "275%",
      staffGrowth: "0%",
    };
  }
};

export const getRecentDeals = async (): Promise<DealItem[]> => {
  try {
    const response = await axiosInstance.get("/dashboard/recent-deals");
    return response.data;
  } catch (error) {
    console.error("Error fetching recent deals:", error);
    // Fallback data in case of error
    return [
      {
        productName: "Coffee Mocha",
        productImage: "/assets/images/coffee-mocha.png",
        location: "123 Âu Cơ, Tân Phú, TP. HCM",
        dateTime: "12.05.2025 - 12.53 PM",
        quantity: 2,
        amount: "100.000 VND",
        status: "Completed",
      },
    ];
  }
};

export const getSalesData = async (): Promise<SalesData> => {
  try {
    const saleReport = await getSaleReport();

    // Sắp xếp báo cáo theo tháng
    const sortedReport = [...saleReport].sort((a, b) => {
      if (a.year !== b.year) return a.year - b.year;
      return a.month - b.month;
    });

    // Chuyển đổi số tháng thành tên tháng
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const labels = sortedReport.map((item) => monthNames[item.month - 1]);
    const data = sortedReport.map((item) => item.total_revenue / 1000); // Chuyển đổi sang nghìn đồng

    return {
      labels,
      data,
    };
  } catch (error) {
    console.error("Error fetching sales data:", error);
    // Fallback data in case of error
    return {
      labels: ["Jan", "Feb", "Mar", "Apr", "May"],
      data: [194, 161, 224, 408, 1530],
    };
  }
};
