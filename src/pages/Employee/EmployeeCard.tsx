import React from "react";
import { EmployeeItem } from "../../types/EmployeeItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface EmployeeCardProps {
  employee: EmployeeItem;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  return (
    <div className="w-full min-h-[320px] max-h-[320px] bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 relative flex flex-col items-center px-4 py-2">
      {/* Header: Logo + Nút Edit & Delete */}
        <div className="relative w-full flex items-center justify-between px-2">
        {/* Nút chức năng */}
        <div className="flex space-x-2">
            <button className="text-blue-500 hover:text-blue-700">
            <FontAwesomeIcon icon={faPen} />
            </button>
            <button className="text-red-500 hover:text-red-700">
            <FontAwesomeIcon icon={faTrash} />
            </button>
        </div>
        {/* Logo thương hiệu */}
        <img
            src={`/assets/images/${employee.brandLogo}`} 
            alt={employee.brandLogo}
            className="w-10 h-10 rounded-full border bg-white p-1"
        />
        </div>

      {/* Ảnh đại diện */}
      <div className="mt-1">
        <img
          src={`/assets/images/${employee.avatarUrl}`}
          alt={employee.name}
          className="w-24 h-24 object-cover rounded-full border"
        />
      </div>

      {/* Thông tin nhân viên */}
      <div className="text-center mt-4 space-y-1">
        <h3 className="text-lg font-semibold text-gray-800">{employee.name}</h3>
        <p className="text-sm text-gray-600">{employee.role}</p>
        <p className="text-gray-500 text-sm">Branch: {employee.branch}</p>
        <p className="text-blue-600 text-sm hover:underline cursor-pointer">{employee.email}</p>
      </div>
    </div>
  );
};

export default EmployeeCard;
