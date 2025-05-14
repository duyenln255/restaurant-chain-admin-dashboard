import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FilterBar from "./FilterBar";
import CustomerTable from "./CustomerTable";
import "../Dashboard/Dashboard.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCustomers,
  removeCustomer,
} from "../../redux/slices/customerSlice";
import type { RootState } from "../../redux/store";
import type { CustomerItem } from "../../types/CustomerItem";
import { useLoading } from "../../contexts/LoadingContext";

const CustomerList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { setLoading } = useLoading();
  const { t } = useTranslation();
  const {
    items: rawCustomers,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.customers);

  // Map API data → CustomerItem (UI)
  const customers = useMemo<CustomerItem[]>(
    () =>
      rawCustomers.map((c) => ({
        id: c.customer_id,
        customer_id: c.customer_id,
        fullName: c.full_name,
        email: c.email,
        phone: c.phone,
        dateJoined: new Date(c.date_added).toLocaleDateString(),
        totalOrder: 0,
        totalReservation: "",
        status: c.status,
        password: c.password,
        gender: c.gender,
        dateOfBirth: "",
      })),
    [rawCustomers]
  );

  useEffect(() => {
    setLoading(true);
    dispatch(fetchCustomers()).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleDeleteCustomer = async (id: string) => {
    if (window.confirm(t("customer.deleteConfirm"))) {
      try {
        setLoading(true);
        await dispatch(removeCustomer(id)).unwrap();
      } catch (error) {
        console.error("Failed to delete customer:", error);
        alert(t("customer.deleteError"));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="flex-1">
        <div className="dashboard-body">
          <div className=" mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">
                {t("customer.customerList")}
              </h1>
              <button
                onClick={() => navigate("/customer/add")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition-colors"
              >
                {t("customer.addNewCustomer")}
              </button>
            </div>

            <FilterBar />

            {/* Status */}
            {loading && <p>{t("customer.loadingCustomers")}</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && customers.length === 0 && (
              <p>{t("customer.noCustomersFound")}</p>
            )}

            <CustomerTable
              items={customers}
              onEdit={(id) => navigate(`/customer/edit/${id}`)}
              onDelete={handleDeleteCustomer}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerList;
