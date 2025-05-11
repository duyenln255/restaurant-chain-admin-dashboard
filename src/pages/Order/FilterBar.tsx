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
  const [orderType, setOrderType] = useState("all")
  const [orderEmployee, setOrderEmployee] = useState("all")
  const [orderBranch, setOrderBranch] = useState("all")

  return (
    <div className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row flex-wrap gap-4">
      {/* Keyword input */}
      <ComboboxCustom
        data={[]} // TODO: populate with keyword suggestions if needed
        value={keyword}
        onChange={setKeyword}
        placeholder="Search keyword..."
        className="w-full sm:flex-1 border border-neutral-300"
      />

      {/* Date picker */}
      <CustomDatePicker
        value={date}
        onChange={setDate}
        placeholder="Select created date"
      />

      {/* Order Type */}
      <Select value={orderType} onValueChange={setOrderType}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Order Types ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Order Types ---</SelectItem>
        </SelectContent>
      </Select>

      <Select value={orderBranch} onValueChange={setOrderBranch}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Branches ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Branches ---</SelectItem>
          {/* Dynamically populate branches here if needed */}
        </SelectContent>
      </Select>

      {/* Status */}
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="bg-white w-full sm:flex-1 border border-neutral-300">
          <SelectValue placeholder="--- All Status ---" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">--- All Status ---</SelectItem>
          <SelectItem value="Pending">Pending</SelectItem>
          <SelectItem value="Done">Done</SelectItem>
          <SelectItem value="Cancel">Cancel</SelectItem>
          <SelectItem value="Verify">Verify</SelectItem>
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
              orderType,
              orderEmployee,
              orderBranch,
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
            setOrderType("all")
            setOrderEmployee("all")
            setOrderBranch("all")
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}

export default FilterBar
