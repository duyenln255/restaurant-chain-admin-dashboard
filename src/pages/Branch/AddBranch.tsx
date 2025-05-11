// AddBranch.tsx
import React, { useState } from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "../../components/ui/dialog"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../../components/ui/select"

const AddBranch: React.FC = () => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    name: "",
    location: "",
    address: "",
    manager: "",
    quantity: "",
    status: "Prepare",
  })

  const managers = ["Trần Trung Hiếu", "Nguyễn Văn A", "Lê Thị B"]
  const statuses = ["Prepare", "Open", "Closed"]

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("New branch:", form)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-500 text-white px-5 py-2 rounded-md">Add New Branch</button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Add Branch</DialogTitle>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium block mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md bg-gray-100"
            />
          </div>

          {/* Location */}
          <div>
            <label className="text-sm font-medium block mb-1">Location</label>
            <input
              value={form.location}
              onChange={(e) => handleChange("location", e.target.value)}
              className="w-full px-4 py-2 border border-neutral-300 rounded-md bg-gray-100"
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
                  <SelectItem key={m} value={m}>
                    {m}
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
  )
}

export default AddBranch
