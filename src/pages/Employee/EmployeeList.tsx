import React, { useState, useEffect, useMemo } from "react"
import EmployeeCard from "./EmployeeCard"
import CustomPagination from "../../components/CustomPagination/CustomPagination"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { fetchEmployees } from "../../redux/slices/employeeSlice"
import type { RootState } from "../../redux/store"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items: rawEmployees, loading, error } = useAppSelector(
    (state: RootState) => state.employees
  )

  const [employeeBranch, setEmployeeBranch] = useState("all")
  const [employeeBrand, setEmployeeBrand] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 8

  const employees = useMemo(
    () =>
      rawEmployees.map((e) => ({
        id: e.id,
        name: e.full_name,
        role: e.role,
        branch: e.branch_id,
        email: e.email,
        avatarUrl: "",
        brandLogo: "",
      })),
    [rawEmployees]
  )

  const totalPages = Math.ceil(employees.length / itemsPerPage)
  const paginatedItems = employees.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch])

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Header + Filter */}
          <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-neutral-800">Employees</h1>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm sm:text-base">
              Add New Employee
            </button>
          </div>

          <div className="flex flex-wrap gap-4">
            <Select value={employeeBranch} onValueChange={setEmployeeBranch}>
              <SelectTrigger className="bg-white w-full sm:w-56 ">              
                <SelectValue placeholder="--- All Branches ---" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">--- All Branches ---</SelectItem>
              </SelectContent>
            </Select>

    <Select value={employeeBrand} onValueChange={setEmployeeBrand}>
      <SelectTrigger className="bg-white w-full sm:w-56 ">
        <SelectValue placeholder="--- All Brands ---" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">--- All Brands ---</SelectItem>
      </SelectContent>
    </Select>
  </div>
</div>


          {/* Status */}
          {loading && <p className="text-sm">Loading employees...</p>}
          {error && <p className="text-sm text-red-500">{error}</p>}
          {!loading && employees.length === 0 && (
            <p className="text-sm text-gray-500">No employees found.</p>
          )}

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {paginatedItems.map((employee) => (
              <EmployeeCard key={employee.id} employee={employee} />
            ))}
          </div>

          {/* Pagination */}
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
  )
}

export default EmployeeList
