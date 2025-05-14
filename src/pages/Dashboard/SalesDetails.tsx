import React, { useEffect, useState } from "react";
import "./SalesDetails.css";
import { useTranslation } from "react-i18next";
import { getSalesData } from "../../services/dashboard.service";

const SalesDetails: React.FC = () => {
  const { t } = useTranslation();
  const [salesData, setSalesData] = useState<{
    labels: string[];
    data: number[];
  }>({
    labels: [],
    data: [],
  });
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(t("dashboard.month.oct"));

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        setLoading(true);
        const data = await getSalesData();
        setSalesData(data);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, []);

  // Calculate max value for scaling
  const maxValue = Math.max(...salesData.data, 0);

  return (
    <div className="sales-details">
      <div className="sales-details-header">
        <h2>{t("dashboard.sales_details")}</h2>
        <div className="month-selector">
          <span>{currentMonth}</span>
          <img src="/assets/icons/chevron-down.png" alt="Calendar" />
        </div>
      </div>
      <div className="sales-chart">
        <div className="chart-y-axis">
          <div>100%</div>
          <div>80%</div>
          <div>60%</div>
          <div>40%</div>
          <div>20%</div>
        </div>
        <div className="chart-content">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <p>{t("common.loading")}</p>
            </div>
          ) : (
            <>
              <img
                src="/assets/images/sales-graph-bg.png"
                alt="Sales graph background"
                className="chart-background"
              />
              <div className="chart-bars">
                {salesData.data.map((value, index) => (
                  <div
                    key={index}
                    className="chart-bar"
                    style={{
                      height: `${(value / maxValue) * 100}%`,
                      width: `${100 / salesData.data.length}%`,
                      left: `${(index / salesData.data.length) * 100}%`,
                    }}
                    title={`${salesData.labels[index]}: ${value}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
      <div className="chart-x-axis">
        {salesData.labels.map((label, index) => (
          <div key={index}>{label}</div>
        ))}
      </div>
    </div>
  );
};

export default SalesDetails;
