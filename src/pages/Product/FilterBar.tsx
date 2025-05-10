import React, { useEffect, useState } from "react"
import { ComboboxCustom } from "../../components/Combobox/Combobox"
import { Button } from "../../components/ui/button"
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"
import { getAllBrands } from "../../services/brand.service"
import type { Brand } from "../../services/brand.service"

const FilterBar: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState("")
  const [status, setStatus] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [brands, setBrands] = useState<Brand[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllBrands()
        setBrands(data)
      } catch (error) {
        console.error("Error fetching brands:", error)
      }
    }

    fetchData()
  }, [])

  const statusOptions = Array.from(
    new Set(brands.map((b) => b.status))
  ).map((status) => ({
    value: status,
    label: status.charAt(0).toUpperCase() + status.slice(1),
  }))
  statusOptions.unshift({ value: "all", label: "--- All Status ---" })

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row flex-wrap gap-4 xs:max-w-screen xs:mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Bộ lọc bên trái */}
        <div className="flex flex-wrap items-center gap-4 flex-1">
          <ComboboxCustom
            data={brands.map((b) => ({ value: b.id, label: b.name }))}
            value={selectedBrand}
            onChange={setSelectedBrand}
            placeholder="Select brand..."
            className="w-full sm:flex-1 border border-neutral-300 focus-visible:ring-1 focus-visible:ring-blue-500"
            />

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-full sm:w-auto flex-1 bg-white">
              <SelectValue placeholder="--- All Status ---" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <CustomDatePicker
            value={date}
            onChange={setDate}
            placeholder="Select created date"
          />
        </div>

        {/* Nút bên phải */}
        <div className="flex flex-wrap gap-2 justify-end">
          <Button
            className="bg-blue-500 text-white hover:bg-blue-600"
            onClick={() => console.log({ selectedBrand, status, date })}
          >
            Search
          </Button>
          <Button
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-50"
            onClick={() => {
              setSelectedBrand("")
              setStatus("all")
              setDate(undefined)
            }}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FilterBar
