import React, { useState, useEffect, useMemo } from "react";
import BrandManagerCard from "./BrandManagerCard";
import CustomPagination from "../../components/CustomPagination/CustomPagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import { getAllBrands } from "../../services/brand.service";
import { getAllBranches } from "../../services/branch.service";
import type { Brand } from "../../services/brand.service";
import type { Branch } from "../../services/branch.service";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const BrandManagerList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { items: rawEmployees, loading, error } = useAppSelector((state) => state.employees);

  const [brands, setBrands] = useState<Brand[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [employeeBranch, setEmployeeBranch] = useState("all");
  const [employeeBrand, setEmployeeBrand] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    dispatch(fetchEmployees());
    getAllBrands().then(setBrands);
    getAllBranches().then(setBranches);
  }, [dispatch]);

  const employees = useMemo(
    () =>
      rawEmployees
        .filter(
          (e) =>
            e.role === "Brand Manager" &&
            (employeeBranch === "all" || e.branch_address === employeeBranch) &&
            (employeeBrand === "all" || e.brand_name === employeeBrand)
        )
        .map((e) => ({
          id: e.id,
          name: e.full_name,
          role: e.role,
          phone: e.phone,
          branch: e.branch_address,
          email: e.email,
          avatarUrl: e.avatar,
          brandLogo: e.logo_url,
        })),
    [rawEmployees, employeeBranch, employeeBrand]
  );

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const paginatedItems = employees.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Brand Managers</h1>
            <button
              onClick={() => navigate("/brand-manager/add")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add Brand Manager
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <select value={employeeBrand} onChange={(e) => setEmployeeBrand(e.target.value)} className="border rounded-md px-4 py-2">
              <option value="all">All Brands</option>
              {brands.map((b) => (
                <option key={b.id} value={b.name}>{b.name}</option>
              ))}
            </select>

            <select value={employeeBranch} onChange={(e) => setEmployeeBranch(e.target.value)} className="border rounded-md px-4 py-2">
              <option value="all">All Branches</option>
              {branches.map((b) => (
                <option key={b.id} value={b.address}>{b.address}</option>
              ))}
            </select>
          </div>

          {loading && <p>Loading...</p>}
          {error && <p className="text-red-500">Error: {error}</p>}
          {!loading && employees.length === 0 && <p>No brand managers found.</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedItems.map((emp) => (
              <BrandManagerCard key={emp.id} employee={emp} />
            ))}
          </div>

          {employees.length > itemsPerPage && (
            <CustomPagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={employees.length}
              itemsPerPage={itemsPerPage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandManagerList;
