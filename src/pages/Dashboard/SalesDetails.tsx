import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useTranslation } from "react-i18next";
import { getSaleReport } from "../../services/dashboard.service";

const SalesDetails: React.FC<{ brandName: string }> = ({ brandName }) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    getSaleReport().then((data) => {
      const brand = data[0];
      const sorted = [...brand.brand_data].sort((a, b) => a.month - b.month);
      setChartData(sorted.map((d) => d.total_revenue / 1000));
    });
  }, []);

  const chartOptions: Highcharts.Options = {
    title: { text: `${brandName}` },
    xAxis: {
      categories: [
        t("common.month.january"),
        t("common.month.february"),
        t("common.month.march"),
        t("common.month.april"),
        t("common.month.may"),
        t("common.month.june"),
        t("common.month.july"),
        t("common.month.august"),
        t("common.month.september"),
        t("common.month.october"),
        t("common.month.november"),
        t("common.month.december"),
      ],
      title: { text: t("dashboard.month") },
    },
    yAxis: { title: { text: t("dashboard.sales_vnd") } },
    series: [
      {
        type: "line",
        name: t("dashboard.totalSales"),
        data: chartData,
      },
    ],
    credits: { enabled: false },
    tooltip: { valueSuffix: " VND" },
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
