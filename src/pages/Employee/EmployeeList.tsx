import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import EmployeeCard from "./EmployeeCard";
import Pagination from "./Pagination";
import { EmployeeItem } from "../../types/EmployeeItem";

const employees: EmployeeItem[] = [
  // 👇 Danh sách nhân viên bạn giữ nguyên như cũ
  {
    id: "001",
    name: "Lenora Benson",
    role: "Employees",
    branch: "Sài Gòn",
    email: "feil.wallace@klunde.us",
    avatarUrl: "lenora.jpg",
    brandLogo: "starbucks.png",
  },
  {
    id: "002",
    name: "Jason Price",
    role: "Admin",
    branch: "Sài Gòn",
    email: "janick.parisian@yahoo.com",
    avatarUrl: "jason.jpg",
    brandLogo: "highlands.png",
  },
  {
    id: "003",
    name: "Jukloe Sisao",
    role: "Employees",
    branch: "Sài Gòn",
    email: "sibyl_kozey@gmail.com",
    avatarUrl: "jukloe.jpg",
    brandLogo: "coffeebean.png",
  },
  {
    id: "004",
    name: "Harriet King",
    role: "Employees",
    branch: "Sài Gòn",
    email: "nadia_block@hotmail.com",
    avatarUrl: "harriet.jpg",
    brandLogo: "starbucks.png",
  },
  {
    id: "005",
    name: "Olivia Reese",
    role: "Employees",
    branch: "Sài Gòn",
    email: "kemmer.hattie@cremin.us",
    avatarUrl: "olivia.jpg",
    brandLogo: "coffeebean.png",
  },
  {
    id: "006",
    name: "Bertha Valdez",
    role: "Employees",
    branch: "Sài Gòn",
    email: "loraine.koelpin@tronto.jp",
    avatarUrl: "bertha.jpg",
    brandLogo: "highlands.png",
  },
  {
    id: "007",
    name: "Harriett Payne",
    role: "Employees",
    branch: "Sài Gòn",
    email: "nannie.west@strella.tv",
    avatarUrl: "harriett.jpg",
    brandLogo: "starbucks.png",
  },
  {
    id: "008",
    name: "George Bryant",
    role: "Employees",
    branch: "Sài Gòn",
    email: "delmer.klinq@gmail.com",
    avatarUrl: "george.jpg",
    brandLogo: "coffeebean.png",
  },
];

const EmployeeList: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const paginatedItems = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with toggle */}
      <div
        className={`transition-all duration-300 ${
          sidebarOpen ? "w-[240px]" : "w-0 overflow-hidden"
        }`}
      >
        {sidebarOpen && <Sidebar />}
      </div>

      {/* Main content */}
      <div className="flex-1">
        <Header toggleSidebar={toggleSidebar} />
        <div className="dashboard-body p-6">
          <div className="max-w-[1140px] mx-auto space-y-4">
            {/* Header + Button */}
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-neutral-800">Employees</h1>

              <div className="flex space-x-4">
                <select className="px-4 py-2 border rounded-md bg-white shadow-sm">
                  <option>--- Choose Brands ---</option>
                  <option>Starbucks</option>
                  <option>Highlands Coffee</option>
                  <option>Phuc Long</option>
                </select>

                <select className="px-4 py-2 border rounded-md bg-white shadow-sm">
                  <option>Sài Gòn</option>
                  <option>Hà Nội</option>
                  <option>Đà Nẵng</option>
                </select>

                <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                  Add New Employees
                </button>
              </div>
            </div>

            {/* Employee Card Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {paginatedItems.map((employee) => (
                <EmployeeCard key={employee.id} employee={employee} />
              ))}
            </div>

            {/* Pagination */}
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
