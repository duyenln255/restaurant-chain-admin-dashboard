import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import FilterBar from "./FilterBar";
import BranchTable from "./BranchTable";
import "../Dashboard/Dashboard.css";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchBranches, removeBranch } from "../../redux/slices/branchSlice";
import type { RootState } from "../../redux/store";
import type { BranchItem } from "../../types/BranchItem";
import { useLoading } from "../../contexts/LoadingContext";

const BranchList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { t } = useTranslation();
  const {
    items: rawBranches,
    loading,
    error,
  } = useAppSelector((state: RootState) => state.branches);

  const branches = useMemo<BranchItem[]>(() => {
    // Kiểm tra xem rawBranches có phải là một mảng không
    if (!Array.isArray(rawBranches)) {
      console.error("rawBranches is not an array:", rawBranches);
      return [];
    }

    return rawBranches.map((b) => ({
      id: b.id,
      displayId: b.display_id,
      name: b.brand_name || "-",
      location: b.address,
      address: b.address,
      phone: b.phone,
      brandId: b.brand_id,
      brand: b.brand_name || "-",
      employees: parseInt(b.total_staffs) || 0,
      manager: b.total_managers ? `${b.total_managers} managers` : "-",
      status: b.status,
      date_added: b.date_added,
      totalStaffs: b.total_staffs,
      totalEmployees: b.total_employees,
      totalManagers: b.total_managers,
    }));
  }, [rawBranches]);

  useEffect(() => {
    setLoading(true);
    dispatch(fetchBranches()).finally(() => {
      setLoading(false);
    });
  }, []);

  const handleDeleteBranch = async (id: string) => {
    if (window.confirm(t("branch.deleteConfirm"))) {
      try {
        setLoading(true);
        await dispatch(removeBranch(id)).unwrap();
      } catch (error) {
        console.error("Failed to delete branch:", error);
        alert(t("branch.deleteError"));
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
                {t("branch.branchList")}
              </h1>
              <button
                onClick={() => navigate("/branch/add")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition-colors"
              >
                {t("branch.addNewBranch")}
              </button>
            </div>

            <FilterBar />

            {loading && <p>{t("branch.loadingBranches")}</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && branches.length === 0 && (
              <p>{t("branch.noBranchesFound")}</p>
            )}

            <BranchTable
              items={branches}
              onEdit={(id) => navigate(`/branch/edit/${id}`)}
              onDelete={handleDeleteBranch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchList;
