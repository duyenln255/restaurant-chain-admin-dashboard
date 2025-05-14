import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FilterBar from "./FilterBar";
import OrderTable from "./OrderTable";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchOrders, removeOrder } from "../../redux/slices/orderSlice";
import type { RootState } from "../../redux/store";
import { useLoading } from "../../contexts/LoadingContext";

const OrderList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { t } = useTranslation();
  const {
    items: orders,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.orders);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchOrders())
      .then(() => {
        console.log("Orders fetched:", orders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Debug: Log orders whenever they change
  useEffect(() => {
    console.log("Current orders:", orders);
  }, [orders]);

  const handleDeleteOrder = async (id: string) => {
    if (window.confirm(t("orders.deleteConfirm"))) {
      try {
        setLoading(true);
        await dispatch(removeOrder(id)).unwrap();
      } catch (error) {
        console.error("Failed to delete order:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">{t("orders.orderList")}</h1>
                <button
                  onClick={() => navigate("/order/add")}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition-colors"
                >
                  {t("orders.addNewOrder")}
                </button>
              </div>

              <FilterBar />

              {loading && <p>{t("orders.loadingOrders")}</p>}
              {error && <p className="text-red-500">{error}</p>}
              {!loading && orders.length === 0 && (
                <p>{t("orders.noOrdersFound")}</p>
              )}

              <OrderTable
                items={orders}
                onEdit={(id) => navigate(`/order/edit/${id}`)}
                onDelete={handleDeleteOrder}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
