import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";

const SalesDetails: React.FC = () => {
  const { t } = useTranslation();

  const chartOptions: Highcharts.Options = {
    title: { text: t("dashboard.sales_details") },
    xAxis: {
      categories: [
        t("month.january"),
        t("month.february"),
        t("month.march"),
        t("month.april"),
        t("month.may"),
        t("month.june"),
        t("month.july"),
        t("month.august"),
        t("month.september"),
        t("month.october"),
        t("month.november"),
        t("month.december"),
      ],
      title: { text: t("dashboard.month") },
    },
    yAxis: {
      title: { text: t("dashboard.sales_vnd") },
    },
    series: [
      {
        type: "line",
        name: t("dashboard.totalSales"),
        data: [
          25000, 30000, 28000, 32000, 40000, 42000,
          39000, 45000, 47000, 50000, 52000, 55000,
        ],
      },
    ],
    credits: { enabled: false },
    tooltip: {
      valueSuffix: " VND",
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800">
          {t("dashboard.sales_details")}
        </h2>
      </div>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};

export default SalesDetails;
