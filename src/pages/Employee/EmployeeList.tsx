import React, { useState, useEffect, useMemo } from "react";
// import Sidebar from "../../components/Sidebar/Sidebar";
// import Header from "../../components/Header/Header";
import EmployeeCard from "./EmployeeCard";
import Pagination from "./Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchEmployees } from "../../redux/slices/employeeSlice";
import type { RootState } from "../../redux/store";

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: rawEmployees, loading, error } = useAppSelector((state: RootState) => state.employees);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const employees = useMemo(() => rawEmployees.map((e) => ({
    id: e.id,
    name: e.full_name,
    role: e.role,
    branch: e.branch_id,
    email: e.email,
    avatarUrl: "", // Không có từ API → có thể random/avatar mặc định
    brandLogo: "", // Không có từ API → có thể random/brand mặc định
  })), [rawEmployees]);

  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const paginatedItems = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen">
      {/* <div className={`transition-all duration-300 ${sidebarOpen ? "w-[240px]" : "w-0 overflow-hidden"}`}>
        {sidebarOpen && <Sidebar />}
      </div> */}

      <div className="flex-1">
        {/* <Header toggleSidebar={toggleSidebar} /> */}
        <div className="dashboard-body p-6">
          <div className=" mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Employees</h1>

              <div className="flex space-x-4">
                <select className="px-4 py-2 border border-neutral-300 rounded-md bg-white shadow-sm">
                  <option>--- Choose Brands ---</option>
                </select>

                <select className="px-4 py-2 border border-neutral-300 rounded-md bg-white shadow-sm">
                  <option>--- Choose Branch ---</option>
                </select>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add New Employees
                </button>
              </div>
            </div>

            {loading && <p>Loading employees...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {!loading && employees.length === 0 && <p>No employees found.</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {paginatedItems.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>

            {employees.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
