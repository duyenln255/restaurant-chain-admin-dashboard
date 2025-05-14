"use client"

import React, { useEffect, useState } from "react"
import { ComboboxCustom } from "../../components/Combobox/Combobox"
import { Button } from "../../components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"
import { getAllBrands } from "../../services/brand.service"
// import { getAllManagers } from "../../services/manager.service"
// import { getAllLocations } from "../../services/location.service"

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("")
  const [selectedManager, setSelectedManager] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [status, setStatus] = useState("all")

  const [brands, setBrands] = useState([])
  const [managers, setManagers] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandData] = await Promise.all([
          getAllBrands(),
          // getAllManagers(),
          // getAllLocations()
        ])
        // setBrands(brandData)
        // setManagers(managerData)
        // setLocations(locationData)
      } catch (error) {
        console.error("Fetch filter data error:", error)
      }
    }

    fetchData()
  }, [])

  const statusOptions = [
    { value: "all", label: "--- All Status ---" },
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ]

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row flex-wrap gap-4">
      {/* Keyword Search as ComboboxCustom */}
      <ComboboxCustom
        data={[{ value: "", label: "Search keyword..." }]} // optional dataset
        value={keyword}
        onChange={setKeyword}
        placeholder="Search keyword..."
        className="w-full sm:flex-1 border border-neutral-300"
      />

      {/* Location */}
      <Select value={selectedLocation} onValueChange={setSelectedLocation}>
        <SelectTrigger className="w-full sm:flex-1 border border-neutral-300 bg-white">
          <SelectValue placeholder="--- All Locations ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Locations ---</SelectItem>
          {locations.map((loc: any) => (
            <SelectItem key={loc.id} value={loc.id}>
              {loc.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Manager */}
      <Select value={selectedManager} onValueChange={setSelectedManager}>
        <SelectTrigger className="w-full sm:flex-1 border border-neutral-300 bg-white">
          <SelectValue placeholder="--- All Managers ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Managers ---</SelectItem>
          {managers.map((mgr: any) => (
            <SelectItem key={mgr.id} value={mgr.id}>
              {mgr.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Brand */}
      <Select value={selectedBrand} onValueChange={setSelectedBrand}>
        <SelectTrigger className="w-full sm:flex-1 border border-neutral-300 bg-white">
          <SelectValue placeholder="--- All Brands ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Brands ---</SelectItem>
          {brands.map((b: any) => (
            <SelectItem key={b.id} value={b.id}>
              {b.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-full sm:flex-1 border border-neutral-300 bg-white">
          <SelectValue placeholder="--- All Status ---" />
        </SelectTrigger>
        <SelectContent>
          {statusOptions.map((s) => (
            <SelectItem key={s.value} value={s.value}>
              {s.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          className="bg-blue-500 text-white"
          onClick={() =>
            console.log({
              keyword,
              selectedLocation,
              selectedManager,
              selectedBrand,
              status,
            })
          }
        >
          Search
        </Button>
        <Button
          variant="outline"
          className="border-red-500 text-red-500"
          onClick={() => {
            setKeyword("")
            setSelectedLocation("")
            setSelectedManager("")
            setSelectedBrand("")
            setStatus("all")
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
