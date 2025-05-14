import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select";
import { createBranch } from "../../services/branch.service";
import { useAppDispatch } from "../../redux/hooks";
import { fetchBranches } from "../../redux/slices/branchSlice";
import { toast } from "react-toastify";
import { getAllEmployees, type Employee } from "../../services/employee.service";
interface AddBranchProps {
  brandId: string;
}


const AddBranch: React.FC<AddBranchProps> = ({ brandId }) => {
  const [open, setOpen] = useState(false);
  const [managers, setManagers] = useState<Employee[]>([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    manager: "",
    quantity: "",
    status: "Active",
  });

  const dispatch = useAppDispatch();

  const statuses = ["Active", "Inactive"];

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const employees = await getAllEmployees();
        const branchManagers = employees.filter((e) => e.role === "Branch Manager");
        setManagers(branchManagers);
      } catch (error) {
        console.error("Failed to fetch managers:", error);
        toast.error("Failed to load managers");
      }
    };

    if (open) fetchManagers();
  }, [open]);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createBranch({
        brand_id: brandId,
        address: form.address,
        phone: form.location,
        status: form.status,
      });

      toast.success("Branch created successfully!");
      dispatch(fetchBranches());
      setOpen(false);
    } catch (error) {
      console.error("Create branch failed:", error);
      toast.error("Failed to create branch.");
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <div className="main-content">
          <div className="dashboard-body p-6">
            <div className="mx-auto space-y-6">
              <div
                className="text-sm text-blue-600 cursor-pointer"
                onClick={() => navigate("/branch")}
              >
                ← {t("branch.branchList")}
              </div>

              <h1 className="text-3xl font-bold text-neutral-800">
                {t("branch.addNewBranch")}
              </h1>

              <div className="bg-white rounded-xl p-8 shadow-md px-[250px]">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Brand */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("branch.brand")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.brand && (
                          <span className="text-red-500 text-xs">
                            {errors.brand}
                          </span>
                        )}
                      </div>
                      <select
                        className="w-full border border-gray-300 rounded-md px-4 py-2 bg-white"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      >
                        <option value="">{t("branch.search.allBrands")}</option>
                        {brands.map((b) => (
                          <option key={b.id} value={b.id}>
                            {b.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm mb-1 font-medium">
                        {t("branch.status")}
                      </label>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="border border-gray-300 rounded-md h-[42px] px-4 text-sm text-gray-700 bg-white w-full"
                      >
                        <option value="Active">{t("branch.active")}</option>
                        <option value="Inactive">{t("branch.inactive")}</option>
                        <option value="Prepare">Prepare</option>
                      </select>
                    </div>

                    {/* Phone */}
                    <div>
                      <div className="flex justify-between mb-1">
                        <label className="text-sm font-medium">
                          {t("branch.phone")}{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        {errors.phone && (
                          <span className="text-red-500 text-xs">
                            {errors.phone}
                          </span>
                        )}
                      </div>
                      <input
                        type="tel"
                        placeholder={`${t("common.enter")} ${t("branch.phone")}`}
                        className="w-full border border-gray-300 rounded-md px-4 py-2"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>

          {/* Address */}
          <div className="sm:col-span-2">
            <label className="text-sm font-medium block mb-1">Address</label>
            <input
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Manager */}
          <div>
            <label className="text-sm font-medium block mb-1">Manager</label>
            <Select value={form.manager} onValueChange={(val) => handleChange("manager", val)}>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent>
                {managers.map((m) => (
                  <SelectItem key={m.id} value={m.id}>
                    {m.full_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium block mb-1">Quantity Employees</label>
            <input
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm font-medium block mb-1">Status</label>
            <Select value={form.status} onValueChange={(val) => handleChange("status", val)}>
              <SelectTrigger className="w-full bg-gray-100">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit */}
          <div className="sm:col-span-2 mt-4 text-center">
            <button type="submit" className="bg-blue-500 text-white px-8 py-3 rounded-xl font-semibold">
              Add Branch
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBranch;
export default AddBranch;
