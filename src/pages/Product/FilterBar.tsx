"use client"

import React, { useState } from "react"
import { Button } from "../../components/ui/button"
import { CustomDatePicker } from "../../components/CustomDatePicker/CustomDatePicker"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"
import { ComboboxCustom } from "../../components/Combobox/Combobox"

const FilterBar: React.FC = () => {
  const [keyword, setKeyword] = useState("all")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState("all")
  const [productType, setProductType] = useState("all")
  const [ProductBrand, setProductBrand] = useState("all")

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row flex-wrap gap-4">
      {/* Name input */}
      <ComboboxCustom
        data={[]} // TODO: populate with keyword suggestions if needed
        value={keyword}
        onChange={setKeyword}
        placeholder="Search product name..."
        className="w-full sm:flex-1 border border-neutral-300"
      />      
      {/* Brand */}
      <Select value={ProductBrand} onValueChange={setProductBrand}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Brands ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Brands ---</SelectItem>
          {/* Dynamically populate branches here if needed */}
        </SelectContent>
      </Select>



      {/* Date picker */}
      <CustomDatePicker
        value={date}
        onChange={setDate}
        placeholder="Select created date"
      />

      {/* Product Type */}
      <Select value={productType} onValueChange={setProductType}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Product Types ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Product Types ---</SelectItem>
        </SelectContent>
      </Select>


      {/* Buttons */}
      <div className="flex gap-2 flex-wrap">
        <Button
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600"
          onClick={() =>
            console.log({
              keyword,
              date,
              status,
              productType,
              ProductBrand,
            })
          }
        >
          Search
        </Button>
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
          onClick={() => {
            setKeyword("all")
            setDate(undefined)
            setStatus("all")
            setProductType("all")
            setProductBrand("all")
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
