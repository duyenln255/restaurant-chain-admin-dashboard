import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { DealItem } from "../../types/DealItem";
import { getRecentDeals } from "../../services/dashboard.service";

const DealsDetails: React.FC = () => {
  const [items, setItems] = useState<DealItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const deals = await getRecentDeals();
        setItems(deals);
      } catch (error) {
        console.error("Error fetching recent deals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);
  const { t } = useTranslation();
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">
          {t("dashboard.deals_details")}
        </h2>
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg cursor-pointer">
          <span className="mr-2">{t("dashboard.month.oct")}</span>
          <img src="/assets/icons/chevron-down.png" alt="Dropdown" />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <p>{t("common.loading")}</p>
        </div>
      ) : items.length === 0 ? (
        <div className="flex justify-center items-center h-40">
          <p>{t("dashboard.no_recent_deals")}</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-neutral-300 overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-gray-100">
              <tr className="text-left text-gray-700">
                <th className="p-4">{t("products.productName")}</th>
                <th className="p-4">{t("orders.location")}</th>
                <th className="p-4">{t("orders.dateTime")}</th>
                <th className="p-4 text-center">{t("orders.quantity")}</th>
                <th className="p-4 text-center">{t("orders.total")}</th>
                <th className="p-4 text-center">{t("orders.status")}</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index} className="border-t border-neutral-300">
                  <td className="p-4 flex items-center gap-2">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-8 h-8 rounded-full"
                    />
                    {item.productName}
                  </td>
                  <td className="p-4">{item.location}</td>
                  <td className="p-4">{item.dateTime}</td>
                  <td className="p-4 text-center">{item.quantity}</td>
                  <td className="p-4 text-center">{item.amount}</td>
                  <td className="p-4 text-center">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        item.status.toLowerCase() === "completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DealsDetails;
